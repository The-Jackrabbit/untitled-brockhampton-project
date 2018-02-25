import React, { Component } from 'react';
import './splashscreen.css';
import $ from 'jquery';
/*
import sat1 from '../../Assets/img/album_covers/150_saturation_1.jpg';
import sat2 from '../../Assets/img/album_covers/150_saturation_2.jpg';
import sat3 from '../../Assets/img/album_covers/150_saturation_3.jpg';
*/
import AlbumTrigram from '../../Components/Album-Trigram/albumTrigram';
var FontAwesome = require('react-fontawesome')

class SplashScreen extends Component {

	is_touch_device() {  
		try {  
		  document.createEvent("TouchEvent");  
		  return true;  
		} catch (e) {  
		  return false;  
		}  
	 }
	 

  componentDidMount() {
	$(document).ready(function() {
		console.log("hi");
		$('.circle').on("mouseover", function() {
			console.log("over");
		})
	});
  }

  render() {
    return (
		<div id="splash-main" className="container">
			<div className="row splash-row">
				<div className="col col-sm-3"></div>
				<div id="brock-trigram-container" className="col col-sm-6 vcenter">
					<div className="stat-icon-container">
						<FontAwesome name="bar-chart" className="stat-icon"/>
						<AlbumTrigram />
					</div>
				</div>
				<div className="col col-sm-3"></div>
			</div>
			
		</div>
    );
  }
}

export default SplashScreen;
