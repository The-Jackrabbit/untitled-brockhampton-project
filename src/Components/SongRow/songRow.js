import React, { Component } from 'react';
import './songRow.css';
import CreditCircle from '../Credit-Circle/creditCircle';

class SongRow extends Component {
	constructor() {
		super();

		this.state = {
			"lyricBlockVisibility": "none"
		}
		this.toggleLyricBlock = this.toggleLyricBlock.bind(this);
	}
	is_touch_device() {  
		try {  
		  document.createEvent("TouchEvent");  
		  return true;  
		} catch (e) {  
		  return false;  
		}  
	}
	componentWillMount() {
		var credits = [];
		var lyrics = [];
		for (var writerKey in this.props.writers) {
			credits.push(
				<CreditCircle 
					size="sm" 
					strokeColor="#70A6ED" 
					iconUrl={this.props.writers[writerKey].img} 
					pathBase="http://localhost:8001" 
					imageKey={'smwriter' + this.props.writers[writerKey].pk} 
					key={'smwriter' + this.props.writers[writerKey].pk} >
				</CreditCircle>
			);
		}
		for (var producerKey in this.props.producers) {
			credits.push(
				<CreditCircle 
					size="sm" 
					strokeColor="#F58123"
					iconUrl={this.props.producers[producerKey].img} 
					pathBase="http://localhost:8001" 
					imageKey={'smproducer' + this.props.producers[producerKey].pk} 
					key={'smproducer' + this.props.producers[producerKey].pk}>
				</CreditCircle>
			);
		}
		for (var key in this.props.body) {
			var songPartData = this.props.body[key];
			var songPartTitle = songPartData.partType + " - ";
			var writerIcons = [];
			var writerCount = 0;
			for (var personKey in songPartData.persons) {
				var person = songPartData.persons[personKey];
				songPartTitle += person.name;
				var icon = 
					<CreditCircle 
						size="md"
						strokeColor="#70A6ED" 
						pathBase="http://localhost:8001" 
						iconUrl={person.img} 
						imageKey={this.props.name + 'mdwriter' + person.pk} 
						key={this.props.name + 'mdwriter' + person.pk}>
					</CreditCircle>;
				writerIcons.push(icon);
				if (writerCount < Object.keys(songPartData.persons).length - 1) {
					songPartTitle += " & ";
				}
				writerCount++;
			}

			var songPartBlock = 
			<div className="container" key={songPartData.pk}>
				<div className="row">
					<div className="col col-xs-12 col-sm-2" style={{'textAlign': 'end'}}>
						{writerIcons}
					</div>
					<div className="col col-xs-12 col-sm-10">
						<h3 className="part-type-header">{songPartTitle}</h3>
						<p className="lyrics">{songPartData.lyrics}</p>
					</div>
				</div>
			</div>;
			lyrics.push(songPartBlock);
			
		}
		
		this.setState({
			"lyrics": lyrics,
			"credits": credits
		});
	}

	toggleLyricBlock() {
		var newState = "none";
		if (this.state.lyricBlockVisibility === "none") {
			newState = "block";
		}
		this.setState({
			"lyricBlockVisibility":  newState
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row align-items-center justify-content-between song-row" onClick={this.toggleLyricBlock}>
					<div className="col col-sm-auto">
						<span className="song-name">{this.props.name}</span>
					</div>
					<div className="col col-sm-auto credit-col" style={{'textAlign': 'end'}}>
						{this.state.credits}
					</div>
				</div>
				<div className="row song-lyrics-container" style={{'display': this.state.lyricBlockVisibility}}>
					<div className="col col-xs-12">
						{this.state.lyrics}
					</div>
				</div>
				<div className="row">
					<div className="col col-xs-12">
						<hr />
					</div>
				</div>
			</div>
		);
	}
}

export default SongRow;


