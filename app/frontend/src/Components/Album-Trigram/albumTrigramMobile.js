import React, { Component } from 'react';

class AlbumTrigramMobile extends Component {
	constructor() {
		super();
		this.home = this.home.bind(this);
	}

	home() {
		window.location = '/album/iii';
	}

   render() {
		return (
			<svg width="356px" height="310px" viewBox="0 0 356 310" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
				<desc>Created with Sketch.</desc>
				<defs>
					<pattern id="pattern-1" patternUnits="objectBoundingBox" y="-0.0459225601%" height="100.045923%" width="100%">
							<use href="#image-2" transform="scale(0.117935349,0.117935349)"></use>
					</pattern>
					<pattern id="pattern-3" patternUnits="objectBoundingBox" y="-0.0459225601%" height="100.045923%" width="100%">
							<use href="#image-4" transform="scale(0.124025907,0.124025907)"></use>
					</pattern>
					<pattern id="pattern-5" patternUnits="objectBoundingBox" y="-0.0459225601%" height="100.045923%" width="100%">
							<use href="#image-6" transform="scale(0.124025907,0.124025907)"></use>
					</pattern>
				</defs>
				<g id="Welcome" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<g id="iPhone-8" transform="translate(-12.000000, -179.000000)">
						<g id="SaturationTrigram" transform="translate(16.000000, 183.000000)">
							<polygon id="Triangle" stroke="#4A4A4A" strokeWidth="7" points="174 52.7865546 287.544526 249.213445 60.4554745 249.213445"></polygon>
							<polyline id="Path-2" stroke="#4A4A4A" strokeWidth="7" points="150.884672 157.852101 150.884672 202.010084 198.639416 202.010084"></polyline>
							<polyline id="Path-5" stroke="#4A90E2" strokeWidth="3" points="156.472993 190.836318 165.451085 193.889076 171.282279 182.714878 182.356293 188.301977 194.575182 161.405042"></polyline>
							<ellipse id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-1)" fillRule="evenodd" cx="52.8350365" cy="249.213445" rx="52.8350365" ry="52.7865546"></ellipse>
							<ellipse id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-3)" fillRule="evenodd" cx="295.164964" cy="249.213445" rx="52.8350365" ry="52.7865546"></ellipse>
							<rect onClick={this.home} id="Rectangle" fillOpacity="0" fill="#FFFFFF" fillRule="evenodd" x="146.312409" y="151.253782" width="55.8832117" height="55.8319328"></rect>
							<ellipse id="Oval" stroke="#4A4A4A" strokeWidth="7" fill="url(#pattern-5)" fillRule="evenodd" cx="174.254015" cy="52.7865546" rx="52.8350365" ry="52.7865546"></ellipse>
						</g>
					</g>
				</g>
			</svg>
		);
   }
}

export default AlbumTrigramMobile;