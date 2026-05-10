#!/usr/bin/env python3
"""
Range-aware HTTP server — drop-in replacement for `python3 -m http.server`.
Required for HTML5 <audio>/<video> seek (拖曳時間軸) to work.

Usage:
    python3 scripts/range_server.py 8765
"""
import os, sys, re
from http.server import SimpleHTTPRequestHandler, HTTPServer
from functools import partial


class RangeRequestHandler(SimpleHTTPRequestHandler):
    """Adds RFC 7233 Range support so audio/video can seek."""

    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        if not os.path.isfile(path):
            self.send_error(404, "File not found")
            return None

        ctype = self.guess_type(path)
        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        try:
            fs = os.fstat(f.fileno())
            file_size = fs.st_size

            range_header = self.headers.get("Range")
            if range_header:
                m = re.match(r"bytes=(\d*)-(\d*)", range_header)
                if m:
                    start_s, end_s = m.groups()
                    start = int(start_s) if start_s else 0
                    end = int(end_s) if end_s else file_size - 1
                    end = min(end, file_size - 1)
                    if start >= file_size or start > end:
                        self.send_error(416, "Requested Range Not Satisfiable")
                        f.close()
                        return None
                    length = end - start + 1
                    f.seek(start)
                    self.send_response(206)
                    self.send_header("Content-Type", ctype)
                    self.send_header("Accept-Ranges", "bytes")
                    self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
                    self.send_header("Content-Length", str(length))
                    self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
                    self.end_headers()
                    # store remaining bytes to send via copyfile path
                    self._range_remaining = length
                    return f

            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Length", str(file_size))
            self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
            self.end_headers()
            self._range_remaining = None
            return f
        except Exception:
            f.close()
            raise

    def copyfile(self, source, outputfile):
        remaining = getattr(self, "_range_remaining", None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        # Stream only the requested bytes
        chunk = 64 * 1024
        while remaining > 0:
            buf = source.read(min(chunk, remaining))
            if not buf:
                break
            outputfile.write(buf)
            remaining -= len(buf)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    addr = ("0.0.0.0", port)
    server = HTTPServer(addr, RangeRequestHandler)
    print(f"📻 Range-aware server running on http://localhost:{port}/")
    print(f"   (supports HTML5 audio/video scrubbing)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nbye")
        server.server_close()


if __name__ == "__main__":
    main()
