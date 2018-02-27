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
		<div>
			<div className="cast-list">
				<span>|</span>
				<a href="/member/ka">Kevin Abstract</a>
				<span>|</span>
				<a href="/member/av">Ameer Vann</a>
				<span>|</span>
				<a href="/member/mw">Merlyn Wood</a>
				<span>|</span>
				<a href="/member/dm">Dom McLennon</a>
				<span>|</span>
				<a href="/member/mc">Matt Champion</a>
				<span>|</span>
				<a href="/member/j">Joba</a>
				<span>|</span>
				<a href="/member/bf">Bear//Face</a>
				<span>|</span>
			</div>
			<div className="cast-list">
				<span>|</span>
				<a href="/member/rh">Romil Hemnani</a>
				<span>|</span>
				<a href="/member/jm">Jabari Manwa</a>
				<span>|</span>
				<a href="/member/km">Kiko Merley</a>
				<span>|</span>
				<a href="/member/q3">Q3</a>
				<span>|</span>
				<a href="/member/hk">HK</a>
				<span>|</span>
				<a href="/member/kd">Kevin Doan</a>
				<span>|</span>
				<a href="/member/ag">Ashlan Grey</a>
				<span>|</span>
			</div>
			<div className="cast-list albums">
				<span>|</span>
				<a href="/album/i">Saturation I</a>
				<span>|</span>
				<a href="/album/ii">Saturation II</a>
				<span>|</span>
				<a href="/album/iii">Saturation III</a>
				<span>|</span>
			</div>
		</div>
    );
  }
}

export default CastList;
