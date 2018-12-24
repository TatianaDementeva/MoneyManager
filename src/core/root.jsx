import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../header/header';
import Reports from '../reports/reports';
import Add from '../add/add';

function Root() {
  return (
    //        <Route exact path="/" />
    <BrowserRouter>
      <>
        <Header />

        <Route exact path="/reports" component={Reports} />
        <Route path="/add" component={Add} />
      </>
    </BrowserRouter>
  );
}

export default Root;
