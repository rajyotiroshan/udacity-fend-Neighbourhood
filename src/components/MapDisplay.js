import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
 state={
  map:null,
  markers:[]
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
    //save passed locations.
    let locations= this.props.locations;
    //to show all markers in displayed map window..
    var bounds = new this.props.google.maps.LatLngBounds();
    //iterate over each locations pos property.
    for (var i = 0; i < locations.length; i++) {
      bounds.extend(locations[i].pos);
    }
    //console.log(locations);
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
            bounds={bounds}
            >
            {locations && locations.map((loc)=>{
              return <Marker title={loc.name} position={loc.pos}/>;
            })}
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyDAB7RAZ7CexF23xxdIOsEhsXNDs5M6BFk'
})(MapContainer)