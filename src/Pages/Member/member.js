import React, { Component } from 'react';
import './member.css'; 
import CastList from "../../Components/Cast-List/castList";

class Member extends Component {
	constructor() {
		super();

	}
	componentWillMount() {
		
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
				<div className="main-content">
					
				</div>
				<div className="splash-content">
					
					<CastList></CastList>
				</div>
			</div>	
		);
	}
}

export default Member;


