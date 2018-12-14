import React, { Component } from 'react';
import './App.css';
import locations from './location.json'
import MapContainer from './components/MapDisplay'
import LocationList from './components/LocationsList'
class App extends Component {
  state= {
    lat:28.627956,
    lng:77.295627,
    zoom:13,
    allLoc:locations,
    currShowingLocs:locations,
    ListOpen:false,
    selectedLocItemIndex:null
  }

 toggleList = (event)=>{
    //toggle the menuOpen value bw false and true.
    this.setState({ListOpen:!this.state.ListOpen});
  };

  filterLocs = (srch)=> {
    this.setState({currShowingLocs: this.state.allLoc.filter((loc)=>loc.name.trim().toLowerCase().includes(srch.toLowerCase()))});
  };

  clickALocItem = (index)=> {
    this.setState({selectedLocItemIndex:index}); 
  };

  render() {
    //console.log(this.state.selectedLocItemIndex);//working
    return (
      <div className="App">
        <header className="App-header">
          <button className="ham-icon" onClick={this.toggleList}>
          <i className="fas fa-bars"></i>
          <i className="fas fa-bars"></i>
          <i className="fas fa-bars"></i>
          </button>
          <h1 className="main-heading"> Metro Location Delhi </h1>
        </header>
        <LocationList locations={this.state.currShowingLocs} listOpen={this.state.ListOpen} filterLocs = {this.filterLocs} clickALocItem={this.clickALocItem}/>
        <MapContainer
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.currShowingLocs}
          clickItemIndex={this.state.selectedLocItemIndex}
        />
      </div>
    );
  }
}

export default App;
