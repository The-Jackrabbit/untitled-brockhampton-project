import React, { Component } from 'react';
import './album.css';
import axios from "axios";
import CastList from "../../Components/Cast-List/castList";
import CreditCircle from "../../Components/Credit-Circle/creditCircle";

const qs = require('query-string');

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
		var albumPK = qs.parse(this.props.location.search)['pk'];
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
				var creditId = 0;
				for (var key in song.credits.writers) {
					credits.push(<CreditCircle iconUrl={song.credits.writers[key].img} strokeColor="#70A6ED" pathBase="http://localhost:8001" imageKey={'writer' + song.credits.writers[key].pk} key={creditId}></CreditCircle>);
					creditId++;
				}
				for (var key in song.credits.producers) {
					credits.push(<CreditCircle iconUrl={song.credits.producers[key].img} pathBase="http://localhost:8001" 
										imageKey={'producer' + song.credits.producers[key].pk} key={creditId} strokeColor="#F58123"></CreditCircle>);
					creditId++;
				}
				
				var songRow = 
				<div key={i} className="container">
					<div className="row align-items-center">
						<div className="col col-sm-4">
							<span className="song-name">{song.name}</span>
						</div>
						<div className="col col-sm-8" style={{'textAlign': 'end'}}>
							{credits}
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
								<div key={this.state.tracklist}>
								{this.state.tracklistMarkup}
								
								</div>
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


