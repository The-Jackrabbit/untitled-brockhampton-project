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
			<div className="song-part grid-container" key={songPartData.pk}>
				<div className="song-part name">
					<h3 className="part-type-header">{songPartTitle}</h3>
				</div>
				<div className="song-part credits">
					{writerIcons}
				</div>
				<div className="song-part lyrics">
					<p className="lyrics">{songPartData.lyrics}</p>
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
			<div className="song grid-container song-row" onClick={this.toggleLyricBlock}>
				<div className="song name">
					<p className="song-name">{this.props.name}</p>
				</div>
				<div className="song credits credit-col">
					{this.state.credits}
				</div>
				<div className="song lyrics" style={{'display': this.state.lyricBlockVisibility}}>
					{this.state.lyrics}
				</div>
				<div className="song separator">
					<hr />
				</div>
			</div>
		);
	}
}

export default SongRow;


