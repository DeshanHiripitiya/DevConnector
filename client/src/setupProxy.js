// // const { createProxyMiddleware } = require('http-proxy-middleware'); //createProxyMiddleware: This function is imported from http-proxy-middleware and is used to create a proxy middleware.

// // module.exports = function (app) {
// //   app.use(
// //     //This method is used to mount the proxy middleware on the Express application
// //     '/api', //'/api': This specifies that any requests starting with /api should be forwarded to the target server.
// //     createProxyMiddleware({
// //       target: 'http://localhost:5000', //This specifies the target URL where requests will be proxied.
// //       changeOrigin: true, //This option is necessary for virtual hosted sites. It changes the origin of the host header to the target URL.
// //     })
// //   );
// // };



// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   console.log('Setting up proxy...');
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:5000',
//       changeOrigin: true,
//       onProxyReq: (proxyReq, req, res) => {
//         console.log('Proxying request:', req.originalUrl);
//       },
//       onError: (err, req, res) => {
//         console.error('Proxy error:', err);
//       },
//     })
//   );
// };
