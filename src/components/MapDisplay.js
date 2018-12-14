import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
  /*
  props = {
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.currShowingLocs}
  }
  */
 state={
  map:null,
  activeMarker:{},
  showingInfoWindow:false,
  markers:[],
  markersProps:[]
 };

 //react component listener
createMarker=()=>{
  //display marker.
  let markers=[],markersProps=[];
  //iterate over all locs.
  markers = this.props.locations.map((loc,index)=>{
    //create a marker object.
    //console.log(loc.title);
    //create new obj for marker property.
    let markerProp={}, marker;
    markerProp.key = loc.id;
    markerProp.title = loc.name;
    markerProp.position = loc.pos;
    //include it in markersProps list.
    markersProps.push(markerProp);
    //new marker object.
    marker = new window.google.maps.Marker({
    position: loc.pos,
    map: this.state.map,
    title: loc.name});
    markers.push(marker);
    //console.log(marker);
    marker.addListener('click', ()=>{
      this.onMarkerClick(markerProp,marker);
    });
    return marker;
  });
this.setState({markers,markersProps});
};

componentDidMount() {
//  console.log("cdmount");
  
}
//info-window for marker
/*displayInfoWindow = (marker,loc) =>{
  let infowindow = new window.google.maps.InfoWindow({
    content: loc.title
  });
  infowindow.open(this.state.map,marker);
};*/

//listener for map ready

mapReady = (props, map) =>{
  //store the map container ele in state's map prop
  this.setState({map}); 
  this.createMarker();
};

/*onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker:null
      });
    }
};*/

onMarkerClick = function(markerProp,marker){
 console.log(markerProp.title);
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
            onClick={this.onMapClicked}
            >
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyDAB7RAZ7CexF23xxdIOsEhsXNDs5M6BFk'
})(MapContainer)