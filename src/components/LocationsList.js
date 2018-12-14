import React, {Component} from 'react'

class LocationList extends Component {
	/*
		props = {
			locations:this.state.currShowingLocs(arr)
			listOpen:{this.state.ListOpen}(bool)
			filterLocs:{this.filterLocs}(func)
			clickALocItem={this.clickALocItem}(func)
		}
	*/
	state = {
		query:''
	};

	updateQuery =(evt)=>{
		let srchFor = evt.target.value;
		this.setState({query:srchFor});
		this.props.filterLocs(srchFor);
	};

	locItemClicked = (LocIndex)=>{
		this.props.clickALocItem(LocIndex);
	};

	render() {
		let props = this.props;
		if(!props.listOpen) return null;
		let locs = props.locations;
		return (
		<div className="loc-srch-container">
			<input className="srch-filter" type="text" placeholder="Search for locations" onChange={this.updateQuery}/>
			<ul className="locs-list-container">
			{
				locs.map((loc,index)=>{
					return <li className="loc" key={index}><button key={index} onClick={()=>{this.locItemClicked(index);}}>{loc.name}</button></li>;
				})
			}
			</ul>
		</div>)
}
}

export default LocationList
