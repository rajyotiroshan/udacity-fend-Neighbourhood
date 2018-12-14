import React, { Component } from 'react';
import './App.css';
import locations from './location.json'
import MapContainer from './components/MapDisplay'
import LocationsList from './components/LocationsList'
class App extends Component {
  state= {
    lat:28.627956,
    lng:77.295627,
    zoom:13,
    allLoc:locations,
    locationListOpen:true,
    currShowingLocs:locations,
    selectedLocItemID:null
  }

  toggleLocationList = (event)=>{
    //toggle the menuOpen value bw false and true.
    this.setState({locationListOpen:!this.state.locationListOpen});
  };

  filterLocs = (srch)=> {
    this.setState({currShowingLocs: this.state.allLoc.filter((loc)=>loc.name.trim().toLowerCase().includes(srch.toLowerCase()))});
  };

  clickALocItem = (id)=> {
    this.setState({selectedLocItemID:id}); 
  };

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <button className="menu-btn" onClick={this.toggleLocationList}>
            <i className="fa fa-bars"></i>
            <i className="fa fa-bars"></i>
            <i className="fa fa-bars"></i>
          </button>
          <h1 className="main-heading"> Metro Location Delhi </h1>
        </header>
        <MapContainer
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.currShowingLocs}
          selectedLocItemID = {this.state.selectedLocItemID}
        />
      </div>
    );
  }
}

export default App;
