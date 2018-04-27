import React, { Component } from 'react';
import './splashscreen.css';
import $ from 'jquery';
import AlbumTrigram from '../../../Components/Album-Trigram/albumTrigram';
import AlbumTrigramMobile from '../../../Components/Album-Trigram/albumTrigramMobile';
import NavDownArrow from '../../../Components/NavDownArrow/navDownArrow';

class SplashScreen extends Component {
	constructor() {
		super();

		this.state = {
			"trigram": ""
		}
	}
	is_touch_device() {  
		try {  
			document.createEvent("TouchEvent");  
			console.log("im mobile");
			this.setState({
				"trigram": <AlbumTrigramMobile></AlbumTrigramMobile>
			})
			return true;  
		} catch (e) {  
			console.log("im desktop");
			this.setState({
				"trigram": <AlbumTrigram></AlbumTrigram>
			})
			return false;  
		}  
	}
	 

	componentWillMount() {
		this.is_touch_device();

		$('#statGraph').click(function() {
			console.log("im pressed");
		})
	}

	render() {
		return (
			<div className="splash grid-container">
				<div className="header"></div>
				<div className="trigram" >
					{this.state.trigram}
				</div>
				<div className="footer">

					<NavDownArrow></NavDownArrow>
				</div>
			</div>
		);
	}
}

export default SplashScreen;
