import React from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'

const router = () => session => {
  const context = {}
  session.on('server', next => {
    next()
    if (context.url) {
      session.req.redirect(context.status || 302, context.url)
    } else if (context.status) {
      session.req.status(context.status)
    }
  })

  return async next => {
    const children = await next()
    if (!process.env.BROWSER && session.req) {
      return (
        <StaticRouter location={session.req.url} context={context}>
          {children}
        </StaticRouter>
      )
    }
    return <BrowserRouter>{children}</BrowserRouter>
  }
}

export default router
