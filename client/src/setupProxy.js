const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
        //frontend에서 target을 5000번 포트로 주겠다
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
