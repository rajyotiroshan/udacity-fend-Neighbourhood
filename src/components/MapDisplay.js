import React, {Component} from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
 
class MapContainer extends Component {
  /*
  props = {
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.currShowingLocs}
          clickItemIndex={this.selectedLocItemIndex}(num)
  }
  */
 state={
  map:null,
  activeMarker:null,
  showingInfoWindow:false,
  markers:[],
  markersProps:[],
  activeMarkerProp:{},
  activeMarkerImg:''
 };

 //react component listener
createMarker=()=>{
  //console.log(this.props.locations);
  //display marker.
  let markers=[],markersProps=[];
  //iterate over all locs.
  markers = this.props.locations.map((loc,index)=>{
    //create a marker object.
    //console.log(loc.title);
    //create new obj for marker property.
    let markerProp={}, marker;
    markerProp.key = index;
    markerProp.title = loc.name;
    markerProp.position = loc.pos;
    markerProp.street = loc.street;
    markerProp.city = loc.city;
    markerProp.pin = loc.pin;
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

componentDidUpdate(preProps,preState) {
//  console.log("cdmount");
//create new marker with new locations.
//console.log(this.props.clickItemIndex);
  if(preProps.locations.length !== this.props.locations.length)
    {
      //console.log(this.props.clickItemIndex);
      //hide all markers.
      //console.log(preState.markers);
      preState.markers.forEach((marker)=>marker.setMap(null));
      this.createMarker(); 
    } 

  if(this.props.clickItemIndex !== null &&  preProps.clickItemIndex !== this.props.clickItemIndex ){
    this.setState({showingInfoWindow : !this.state.showingInfoWindow});
  }


  if(this.props.clickItemIndex !== null && preProps.clickItemIndex == this.props.clickItemIndex && this.state.activeMarker) {
   this.state.activeMarker.setAnimation(null);
  }

  if(!this.state.showingInfoWindow && this.props.clickItemIndex!=null && this.state.map != null) {
    //access marker.
   // console.log(this.props.clickItemIndex);
   /*//prev clicked loc marker animation to null.
    if(preProps.clickItemIndex!== null){
      preState.markers[preProps.clickItemIndex].setAnimation(null);
    }*/
    let marker = this.state.markers[this.props.clickItemIndex];
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    let markerProp = this.state.markersProps[this.props.clickItemIndex];
    this.displayInfoWindow(markerProp,marker);
  }
}
//info-window for marker
displayInfoWindow = (markerProp,marker) =>{
  let imgURL='';
  //fetch req from foursquare.
  fetch(`https://api.unsplash.com/search/photos?page=1&query=${markerProp.title}`,{
          headers:{
            Authorization:"Client-ID 6b5d3de1d8df43fc84c8df69b3e0b0e6e0e9dffe528caae212762dd4d8142c91"
          }
        })
        .then((response)=>{
          return response.json();
        })
        .then((res)=>{
          imgURL = res.results[0].urls.thumb;
          this.setState({showingInfoWindow:true, activeMarker: marker, activeMarkerProp: markerProp, activeMarkerImg:imgURL});
        })
        .catch((err)=>{
          this.setState({showingInfoWindow:true, activeMarker: marker, activeMarkerProp: markerProp, activeMarkerImg:""});
        });
//this.setState({showingInfoWindow:true, activeMarker: marker, activeMarkerProp: markerProp});
};

//listener for map ready

mapReady = (props, map) =>{
  //store the map container ele in state's map prop
  this.setState({map}); 
  this.createMarker();
};

onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker:null
      });
    }
};

onMarkerClick = function(markerProp,marker){
 //console.log(markerProp.title);
 //display info window.
 this.displayInfoWindow(markerProp,marker);
};

  render() {
   //console.log(this.props.clickItemIndex);workin
    let props = this.props;
    //save passed locations.
    let locations= props.locations;
    //to show all markers in displayed map window..
    var bounds = new props.google.maps.LatLngBounds();
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
      lat:props.lat,
      lng:props.lng
    }

    return (
      <Map  role="application"
            ariaLabel="map"
            onReady={this.mapReady}
            google={props.google} 
            zoom={props.zoom}
            style={style}
            initialCenter={center}
            bounds={bounds}
            onClick={this.onMapClicked}
            >
          <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h3>{this.state.activeMarkerProp.title}</h3>
              <p>{this.state.activeMarkerProp.street}</p>
              <p>{this.state.activeMarkerProp.city},{this.state.activeMarkerProp.pin}</p>
              <a href={`${this.state.activeMarkerImg}`} alt={`${this.state.activeMarkerProp.title} image link ${!this.state.activeMarkerImg && "not available"}`}> {!this.state.activeMarkerImg ?"image link not available":"view imagefrom unsplash"}</a>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey:'AIzaSyDAB7RAZ7CexF23xxdIOsEhsXNDs5M6BFk'
})(MapContainer)