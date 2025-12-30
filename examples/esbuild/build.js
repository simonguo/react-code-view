import * as esbuild from 'esbuild';
import { createServer, request as httpRequest } from 'http';
import reactCodeView from '@react-code-view/unplugin/esbuild';

const isDev = process.argv.includes('--dev');

const ctx = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.css': 'css',
  },
  plugins: [
    reactCodeView(),
  ],
  sourcemap: isDev,
  minify: !isDev,
  define: {
    'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
  },
  logLevel: 'info',
});

if (isDev) {
  // Watch mode
  await ctx.watch();
  
  // Serve with live reload
  const { host, port } = await ctx.serve({
    servedir: 'public',
    port: 3003,
    fallback: 'public/index.html',
  });

  // Proxy server to inject live reload script
  createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = httpRequest(options, (proxyRes) => {
      if (req.url === '/') {
        // Inject live reload script
        const originalHtml = [];
        proxyRes.on('data', (chunk) => originalHtml.push(chunk));
        proxyRes.on('end', () => {
          let html = Buffer.concat(originalHtml).toString();
          html = html.replace(
            '</body>',
            '<script>new EventSource("/esbuild").addEventListener("change", () => location.reload())</script></body>'
          );
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          res.end(html);
        });
      } else {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    });

    req.pipe(proxyReq, { end: true });
  }).listen(3003);

  console.log(`esbuild dev server running at http://localhost:3003`);
} else {
  // Build once for production
  await ctx.rebuild();
  await ctx.dispose();
  console.log('Build complete!');
}
