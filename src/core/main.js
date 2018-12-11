import '@babel/polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'core/root';

const rootElement = document.querySelector('#root');

ReactDOM.render(<Root />, rootElement);

/* "commodities": [
    {
      "id": "e69fcfb925bbf",
      "date": "03.12.2018",
      "name": "Молоко",
      "price": 62
    }
  ] */
