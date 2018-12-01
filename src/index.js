import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomePage from './home_page_components/home_page'

class App extends Component {
  render() {
    return (
      <div>
        <HomePage/>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
