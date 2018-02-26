import React, { Component } from 'react';
import './album.css';
import axios from "axios";
import CastList from "../../Components/Cast-List/castList";
import CreditCircle from "../../Components/Credit-Circle/creditCircle";

class Album extends Component {
	constructor() {
		super();

		this.state = {
			"data": false,
			"bgImg": "",
			"albumName": "",
			"runtime": "",
			"tracklist": [],
			"tracklistMarkup": [],
			"albumMap": {
				"saturation3" : 3,
				"saturationiii" : 3,
				3 : 3,
				"iii": 3,
				"saturation2" : 2,
				"saturationii" : 2,
				2 : 2,
				"ii": 2,
				"saturation" : 1,
				"saturation1" : 1,
				"saturationi" : 1,
				1 : 1,
				"ii": 1
			}
		}
	}
	componentWillMount() {
		var urlArgs = this.props.location.pathname.split("/");
		var albumArg = urlArgs[urlArgs.length - 1];
		var pk = this.state.albumMap[albumArg];
		this.setState({
			"pk": pk
		});
		
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
		// var albumPK = qs.parse(this.props.location.search)['pk'];
		var albumPK = this.state.pk;
		var _this = this;
		axios.get(`http://localhost:8001/api/albums/${albumPK}/detail`)
		.then(function(res){

			_this.setState({
				"data": res.data,
				"albumName": res.data.result.name,
				"bgImg": res.data.result.img_lg,
				"tracklist": res.data.result.tracklist,
				"runtime": res.data.result.runtime
			});

		})
		.catch(function(e) {
			console.log("ERROR ", e);
		})
		.finally(function() {
			var tracklistMarkup = [];
			
			_this.state.tracklist.forEach((song, i) => {
				var credits = [];
				var lyrics = [];
				for (var writerKey in song.credits.writers) {
					credits.push(
						<CreditCircle 
							size="sm" 
							strokeColor="#70A6ED" 
							iconUrl={song.credits.writers[writerKey].img} 
							pathBase="http://localhost:8001" 
							imageKey={'smwriter' + song.credits.writers[writerKey].pk} 
							key={'smwriter' + song.credits.writers[writerKey].pk} >
						</CreditCircle>
					);
				}
				for (var producerKey in song.credits.producers) {
					credits.push(
						<CreditCircle 
							size="sm" 
							strokeColor="#F58123"
							iconUrl={song.credits.producers[producerKey].img} 
							pathBase="http://localhost:8001" 
							imageKey={'smproducer' + song.credits.producers[producerKey].pk} 
							key={'smproducer' + song.credits.producers[producerKey].pk}>
						</CreditCircle>
					);
				}

				for (var key in song.body) {
					var part = song.body[key];
					var people = "";
					var peopleCircles = []
					var peopleCircleCount = 0;
					for (var key in part.persons) {
						var person = part.persons[key];
						people += person.name;
						var circ = 
							<CreditCircle 
								size="md"
								strokeColor="#70A6ED" 
								pathBase="http://localhost:8001" 
								iconUrl={person.img} 
								imageKey={'mdwriter' + person.pk} 
								key={'mdwriter' + person.pk}>
							</CreditCircle>;
						peopleCircles.push(circ);
						if (peopleCircleCount < Object.keys(part.persons).length - 1) {
							people += " & ";
						}
						peopleCircleCount++;
					}
					var songPart = 
					<div className="container" key={part.pk}>
						<div className="row">
							<div className="col col-xs-12 col-sm-2" style={{'textAlign': 'end'}}>
								{peopleCircles}
							</div>
							<div className="col col-xs-12 col-sm-10">
								<h3 className="part-type-header">{part.partType + " - " + people}</h3>
								<p className="lyrics">{part.lyrics}</p>
							</div>
						</div>
					</div>

					lyrics.push(songPart);
				}
				
				var songRow = 
				<div key={i} className="container">
					<div className="row align-items-center justify-content-between song-row">
						<div className="col col-sm-auto">
							<span className="song-name">{song.name}</span>
						</div>
						<div className="col col-sm-auto credit-col" style={{'textAlign': 'end'}}>
							{credits}
						</div>
					</div>
					<div className="row song-lyrics-container" style={{'display': 'none'}}>
						<div className="col col-xs-12">
							{lyrics}
						</div>
					</div>
					<div className="row">
						<div className="col col-xs-12">
							<hr />
						</div>
					</div>
				</div>;

				tracklistMarkup.push(songRow);
			});
			_this.setState({'tracklistMarkup': tracklistMarkup});
		})
	}

	render() {
		return (
			<div>
				<div className="main-content">
					<div className="container" style={{'padding': '15px'}}>
						<div className="row">
							<div className="col col-md-1"></div>
							<div className="col col-md-10">
								{this.state.tracklistMarkup}
								
							</div>
							<div className="col col-md-1"></div>
						</div>
					</div>
				</div>
				<div className="splash-content">
					<p className="album-name">{this.state.albumName}</p>
					
					<CastList></CastList>
				</div>
				<div className="album-bg-container" style={{"backgroundImage": `url(http://localhost:8001${this.state.bgImg})`}}></div>
			</div>	
		);
	}
}

export default Album;


