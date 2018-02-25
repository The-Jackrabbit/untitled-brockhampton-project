import React, { Component } from 'react';
import './castList.css';
class CastList extends Component {
	constructor() {
		super();

		this.state = {

		}
	}
	is_touch_device() {  
		try {  
		  document.createEvent("TouchEvent");  
		  return true;  
		} catch (e) {  
		  return false;  
		}  
	 }
	 

  componentDidMount() {

  }

  render() {
    return (
		<div className="cast-list">
			<span>|</span>
			<a href="/ka">Kevin Abstract</a>
			<span>|</span>
			<a href="/av">Ameer Vann</a>
			<span>|</span>
			<a href="/mw">Merlyn Wood</a>
			<span>|</span>
			<a href="/dm">Dom McLennon</a>
			<span>|</span>
			<a href="/mc">Matt Champion</a>
			<span>|</span>
			<a href="/j">Joba</a>
			<span>|</span>
			<a href="/bf">Bear//Face</a>
			<span>|</span>
		</div>
    );
  }
}

export default CastList;
