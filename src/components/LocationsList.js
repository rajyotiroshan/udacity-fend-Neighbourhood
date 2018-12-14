import React, {Component} from 'react'

class LocationList extends Component {
	/*
		props = {
			locations:this.state.currShowingLocs
			listOpen:{this.state.ListOpen}
		}
	*/
	state = {

	};

	render() {
		let props = this.props;
		if(!props.listOpen || props.locations.length <= 0) return null;
		let locs = props.locations;
		console.log(locs);
		return (
		<div className="loc-srch-container">
			<ul className="locs-list-container">
			{
				locs.map((loc,index)=>{
					return <li className="loc" key={index}><button key={index}>{loc.name}</button></li>;
				})
			}
			</ul>
		</div>)
}
}

export default LocationList
