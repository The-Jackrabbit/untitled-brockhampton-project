import React, { Component } from 'react';
import sat1 from '../../Assets/img/album_covers/150_saturation_1.jpg';
import sat2 from '../../Assets/img/album_covers/150_saturation_2.jpg';
import sat3 from '../../Assets/img/album_covers/150_saturation_3.jpg';

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
		<div id="splash-main" className="container">
			<svg version="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg"
	  style={{"min-height":"600pt"}} >
    <defs>
		<pattern id="sat1" patternUnits="userSpaceOnUse" width={this.state.iconSize} height={this.state.iconSize}
			x={this.state.sat1x - this.state.iconSize/2} 
			y={this.state.sat1y - this.state.iconSize/2} >
            <image href={sat1} x="0" y="0"
                width={this.state.iconSize} height={this.state.iconSize} />
        </pattern>
		  <pattern id="sat2" patternUnits="userSpaceOnUse" width={this.state.iconSize} height={this.state.iconSize}
			x={this.state.sat2x - this.state.iconSize/2} 
			y={this.state.sat2y - this.state.iconSize/2} >
            <image href={sat2} x="0" y="0"
                width={this.state.iconSize} height={this.state.iconSize}/>
        </pattern>
		  <pattern id="sat3" patternUnits="userSpaceOnUse" width={this.state.iconSize} height={this.state.iconSize}
			x={this.state.sat3x - this.state.iconSize/2} 
			y={this.state.sat3y - this.state.iconSize/2} >
            <image href={sat3} x="0" y="0"
                width={this.state.iconSize} height={this.state.iconSize} />
        </pattern>
    </defs>
    <circle cx={this.state.sat1x} cy={this.state.sat1y} r={this.state.iconSize/2} fill="url(#sat1)" className="circle"/>
	 <circle cx={this.state.sat2x} cy={this.state.sat2y}  r={this.state.iconSize/2} fill="url(#sat2)" className="circle"/>
	 <circle cx={this.state.sat3x} cy={this.state.sat3y}  r={this.state.iconSize/2} fill="url(#sat3)" className="circle"/>
        
</svg>

			
		</div>
    );
  }
}

export default AlbumTrigram;
