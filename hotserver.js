const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU = require('lru-cache')
const app = new Koa()
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const resolve = file => path.resolve(__dirname, file)
const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
const isProd = process.env.NODE_ENV === 'production'

const serverInfo = `koa/${require('koa/package.json').version}|` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
function createRenderer (bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      template,
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  )
}
let renderer
let readyPromise
readyPromise = require('./build/setup-dev-server')(app,
  (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
const microCache = LRU({
  max: 100,
  maxAge: 10000
})
const isCacheable = ctx => useMicroCache
function render (ctx, next) {
  ctx.set('Content-Type', 'text/html')
  ctx.set('Server', serverInfo)
  return new Promise(function (resolve, reject) {
    const s = Date.now()
    const handleError = err => {
      if (err && err.code === 404) {
        ctx.status = 404
        ctx.body = '404 | Page Not Found'
      } else {
        ctx.status = 500
        ctx.body = '500 | Internal Server Error'
        console.error(`error during render : ${ctx.url}`)
        console.error(err.stack)
      }
      resolve()
    }
    const cacheable = isCacheable(ctx)
    if (cacheable) {
      const hit = microCache.get(ctx.url)
      if (hit) {
        if (!isProd) {
          console.log('cache hit!')
        }
        ctx.body = hit
        resolve()
        return
      }
    }
    const context = {
      title: 'Vue Ssr 2.3',
      url: ctx.url
    }
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err)
      }
      ctx.body = html
      resolve()
      if (cacheable) {
        microCache.set(ctx.url, html)
      }
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`)
      }
    })
  })
}
// response
app.use((ctx, next) => {
  return readyPromise.then(() => render(ctx, next))
})
app.listen(2345, () => {
  console.log('http://localhost:2345')
})