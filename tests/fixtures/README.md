The localhost certificate and private key in this directory are public, generated
test fixtures. They authenticate no real service and must never be used outside
the loopback-only TLS regression tests. The certificate covers DNS `localhost`
but deliberately does not cover IP `127.0.0.1`, so hostname failures can be tested.
