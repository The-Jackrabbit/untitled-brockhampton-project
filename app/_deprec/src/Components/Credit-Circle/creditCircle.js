import React, { Component } from 'react';
import './creditCircle.css';
class CreditCircle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"size": "sm",
			"sizeMap": {
				"sm" : {
					"svg_size": 50,
					"pattern_size": 45,
					"cx": 22.5,
					"cy": 22.5,
					"r": 20.5
				},
				"md" : {
					"svg_size": 75,
					"pattern_size": 70,
					"cx": 35,
					"cy": 35,
					"r": 32.5
				},
				"lg" : {
					"svg_size": 240,
					"pattern_size": 230,
					"cx": 119.5,
					"cy": 119.5,
					"r": 115
				}
			}
		}

		this.hoverEvent = this.hoverEvent.bind(this);
	}

	componentWillMount() {
		if (this.props.size !== null) {
			this.setState({
				"size": this.props.size
			})
		}
	}

	componentDidMount() {
	}

	hoverEvent() {
		console.log("man im hovering");
	}

	render() {
		return (
			<svg width={this.state.sizeMap[this.state.size].svg_size}  height={this.state.sizeMap[this.state.size].svg_size} 
			 viewBox={`0 0 ${this.state.sizeMap[this.state.size].svg_size} ${this.state.sizeMap[this.state.size].svg_size}`} version="1.1" xmlns="http://www.w3.org/2000/svg" className="credit-circle"
			 onMouseEnter={this.hoverEvent}>
				<defs>
					<pattern id={`pattern-${this.props.imageKey}`} patternUnits="objectBoundingBox" x="0" width="100%"
						height="100%">
						<image href={`${this.props.pathBase}${this.props.iconUrl}`} x="0" y="0" 
							width={this.state.sizeMap[this.state.size].pattern_size} 
							height={this.state.sizeMap[this.state.size].pattern_size} 
						></image>
					</pattern>
				</defs>
				<circle id="Oval" 
					cx={this.state.sizeMap[this.state.size].cx} 
					cy={this.state.sizeMap[this.state.size].cy} 
					r={this.state.sizeMap[this.state.size].r} 
					fill={`url(#pattern-${this.props.imageKey})`} stroke={this.props.strokeColor} strokeWidth="3"/>	
			</svg>
		);
	}
}

export default CreditCircle;