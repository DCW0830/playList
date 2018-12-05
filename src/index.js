import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home_page_components/home_page'

import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <HomePage/>
      </BrowserRouter>
    )

  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
