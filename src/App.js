import React, { Component } from 'react';
import './App.css';
import locations from './location.json'
import MapContainer from './components/MapDisplay'
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
        <MapContainer
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.allLoc}
        />
      </div>
    );
  }
}

export default App;
