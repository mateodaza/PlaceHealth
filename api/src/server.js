/*eslint-disable no-console*/
const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();
const koaWebpack = require('koa-webpack');
const Webpack = require('webpack');
const config = require('../../webpack.config.js');
//...
/* KOA BASIC USE
app.use(ctx => {
  ctx.body = 'Hello This is Rubber. Quack!';
});
*/
app.use(serve('./res'));

//KOA-WEBPACK MIDDLEWARE
const compiler = Webpack(config);
const middleware = koaWebpack({
  // options 
  compiler: compiler,
  config: config
});

app.use(middleware);
//______________
app.listen(3000);

console.log('server will run on localhost:3000');

