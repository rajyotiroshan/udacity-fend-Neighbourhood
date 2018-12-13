import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
 state={
  map:null,
  marker:[]
 };
 //react component listener
componentDidmount(){

}

//listener for map ready

mapReady = (props, map) =>{
  //store the map container ele in state's map prop
  this.setState({map}); 
};
  render() {
    //styele for mapcontainer
    const style = {
      width:'100%',
      height:'100%'
    }
    //initial focused locationfor map
    const center = {
      lat:this.props.lat,
      lng:this.props.lng
    }

    return (
      <Map  role="application"
            ariaLabel="map"
            onReady={this.mapReady}
            google={this.props.google} 
            zoom={this.props.zoom}
            style={style}
            initialCenter={center}
            >
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyDAB7RAZ7CexF23xxdIOsEhsXNDs5M6BFk'
})(MapContainer)