import React, { Component } from 'react';
class AlbumTrigram extends Component {
	constructor() {
		super();

		this.state = {
			iconSize: 150,
			sat1x: 75,
			sat1y: 300,
			sat2x: 225,
			sat2y: 75,
			sat3x: 300,
			sat3y: 300
		}

		this.home = this.home.bind(this);
	}
	is_touch_device() {  
		try {  
			document.createEvent("TouchEvent");  
			return true;  
		} catch (e) {  
			return false;  
		}  
	}

	home() {
		console.log("hello");
		window.location = '/album/iii';
	}
	 
  	render() {
		return (
			<svg width="693px" height="603px" viewBox="0 0 693 603" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
				<desc>Created with Sketch.</desc>
				<defs>
					<pattern id="pattern-1" patternUnits="objectBoundingBox" x="0%" width="100%" height="100%">
							<use href="#image-2" transform="scale(0.232142857,0.232142857)"></use>
					</pattern>
					<pattern id="pattern-3" patternUnits="objectBoundingBox" x="0%" width="100%" height="100%">
							<use href="#image-4" transform="scale(0.244131455,0.244131455)"></use>
					</pattern>
					<pattern id="pattern-5" patternUnits="objectBoundingBox" x="0%" width="100%" height="100%">
							<use href="#image-6" transform="scale(0.244131455,0.244131455)"></use>
					</pattern>
				</defs>
				<g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<g id="Desktop" transform="translate(-373.000000, -114.000000)">
						<g id="Desktop-Trigram" transform="translate(377.000000, 118.000000)">
							<polygon id="Triangle" stroke="#4A4A4A" strokeWidth="7" points="342.5 104 566 491 119 491"></polygon>

							<polyline id="Path-2" stroke="#4A4A4A" strokeWidth="7" points="296.872472 311 296.872472 398.41215 390.6118 398.41215"></polyline>
							<polyline id="Path-5" stroke="#4A90E2" strokeWidth="3" points="308.302112 375.665802 325.986621 381.676024 337.472558 359.67644 359.285489 370.676232 383.353525 317.721971"></polyline>
							
							<rect onClick={this.home} id="Rectangle" fillOpacity="0" fill="#D8D8D8" x="292" y="305" width="101" height="101"></rect>
           
							<circle id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-1)" cx="104" cy="491" r="104"></circle>
							<circle id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-3)" cx="581" cy="491" r="104"></circle>
							<circle id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-5)" cx="343" cy="104" r="104"></circle>
						</g>
					</g>
				</g>
			</svg>
			
		);
  }
}

export default AlbumTrigram;