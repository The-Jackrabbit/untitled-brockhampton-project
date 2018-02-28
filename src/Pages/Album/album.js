import React, { Component } from 'react';
import './album.css';
import axios from "axios";
import CastList from "../../Components/Cast-List/castList";
import CreditCircle from "../../Components/Credit-Circle/creditCircle";
import SongRow from '../../Components/SongRow/songRow';
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
				"i": 1
			}
		}

		this.toggleSongLyrics = this.toggleSongLyrics.bind(this);
	}
	componentWillMount() {
		var urlArgs;
		if (this.props.location === undefined) {
			urlArgs = ['album', 'iii'];
		} else {
			urlArgs = this.props.location.pathname.split("/");
		}
		var albumArg = urlArgs[urlArgs.length - 1];
		var pk = this.state.albumMap[albumArg];
		this.setState({
			"pk": pk
		});
		
	}
	toggleSongLyrics() {
		console.log("hi");
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
				var songRow = 
				<SongRow 
					writers={song.credits.writers}
					producers={song.credits.producers}
					body={song.body}
					name={song.name}
				></SongRow>;				

				tracklistMarkup.push(songRow);
			});
			_this.setState({'tracklistMarkup': tracklistMarkup});
		})
	}

	render() {
		return (
			<div>
				<div className="main-content">
					<div className="album grid-container" style={{'padding': '15px'}}>
						<div className="tracklist">
							{this.state.tracklistMarkup}
							
						</div>
					</div>
				</div>
				<div className="splash-content">
					{/*<p className="album-name">{this.state.albumName}</p>*/}
					
					<CastList></CastList>
				</div>
				<div className="album-bg-container" style={{"backgroundImage": `url(http://localhost:8001${this.state.bgImg})`}}></div>
			</div>	
		);
	}
}

export default Album;
