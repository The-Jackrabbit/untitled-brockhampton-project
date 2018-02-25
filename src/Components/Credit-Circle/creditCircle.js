import React, { Component } from 'react';
import './creditCircle.css';
class CreditCircle extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
	}

	render() {
		return (
			<svg width="50" height="50" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" className="credit-circle">
				<defs>
					<pattern id={`pattern-${this.props.imageKey}`} patternUnits="objectBoundingBox" x="0" width="45" height="45">
						<image href={`${this.props.pathBase}${this.props.iconUrl}`} x="0" y="0" width="45" height="45"></image>
					</pattern>
				</defs>
				<circle id="Oval"  cx="22.5" cy="22.5" r="20.5" fill={`url(#pattern-${this.props.imageKey})`} stroke={this.props.strokeColor} strokeWidth="3"/>	
			</svg>
		);
	}
}

export default CreditCircle;