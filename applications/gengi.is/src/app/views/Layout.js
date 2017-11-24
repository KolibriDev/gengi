import React from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
// import Helmet from 'react-helmet'
import Home from './Home'
import AllCurrencies from './AllCurrencies'
// import About from '../../routes/About'

const NoMatch = () => <h1>Page not Found</h1>;

const Layout = () => (
  <div>
    {/* <Helmet titleTemplate="%s | Starter">
      <title>Hello World</title>
    </Helmet> */}
    <p>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </p>

    <br />
    <Switch>
      {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/allcurrencies" component={AllCurrencies} />
      {/* <Route exact path="/:code" component={Calculator} /> */}
      {/* <Route exact path="/:code/:amount" component={Calculator} /> */}
      {/* <Route exact path="/404" component={NoMatch} /> */}
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Layout