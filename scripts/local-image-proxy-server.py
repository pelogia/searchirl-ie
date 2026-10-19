#!/usr/bin/env python3
"""Local-only dev helper: serves dist/ like a normal static server, but
intercepts Netlify's /.netlify/images?url=... image-optimization endpoint
(which only exists on real Netlify hosting) and serves the underlying
_astro/* file directly instead, so Image components preview locally.
Not used in production — safe to delete any time."""
import http.server
import os
import urllib.parse

DIST = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dist")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/.netlify/images":
            qs = urllib.parse.parse_qs(parsed.query)
            url = qs.get("url", [None])[0]
            if url:
                self.path = "/" + url.lstrip("/")
        return super().do_GET()


if __name__ == "__main__":
    port = 4323
    server = http.server.ThreadingHTTPServer(("", port), Handler)
    print(f"Serving {DIST} with Netlify image-proxy shim on http://localhost:{port}")
    server.serve_forever()
