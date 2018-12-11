import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import Reports from '../reports/reports';

function Root() {
  return (
  // <Tags />

    <BrowserRouter>
      <>
        <Header />
        <Route exact path="/" />
        <Route path="/reports" component={Reports} />
        <Route path="/add" />
      </>
    </BrowserRouter>
    /*      <BrowserRouter>
        <div>
            <Link to="/">tasks</Link>
            <Link to="/about">about</Link>
            <Route exact path="/" component={Tasks} />
            <Route path="/about" component={About} />
        </div>
        </BrowserRouter> */
  );
}

export default Root;
