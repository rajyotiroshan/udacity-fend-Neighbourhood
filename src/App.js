import React, { Component } from 'react';
import './App.css';
import locations from "./location.json"
class App extends Component {
  state= {
    lat:28.627956,
    lng:77.295627,
    zoom:13,
    allLoc:locations
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="main-heading"> Metro Location Delhi </h1>
        </header>
        
      </div>
    );
  }
}

export default App;
