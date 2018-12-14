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
		let locs = this.props.locations;
		let props = this.props;
		console.log(locs);
		return (<div className="loc-srch-container">
			<ul className="locs-list-container">
			{props.listOpen && locs.length> 0 && (locs.map((loc,index)=>{
					return <li className="loc" key={index}><button key={index}>{loc.name}</button></li>;
				}))  
			}
			</ul>
		</div>
	)
}
}

export default LocationList
