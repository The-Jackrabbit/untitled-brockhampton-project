import React, { Component } from 'react';
import './member.css'; 
import axios from "axios";
import CastList from "../../Components/Cast-List/castList";
import CreditCircle from "../../Components/Credit-Circle/creditCircle";
import NavDownArrow from "../../Components/NavDownArrow/navDownArrow";
import { PieChart, Pie, Tooltip, Cell, BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, ComposedChart, Line, Area } from 'recharts';

class Member extends Component {
	constructor() {
		super();
		
		this.state = {
			"person": "",
			"profilePicUrl": "",
			"castlist": "",
			"wordCount": "",
			"uniqueWordCount": "",
			"partData": {
				"barCategories": [],
				"data": [],
				"piePartData": [],
				"pieAlbumData": []
			},
			"partColors": ['#0A2463', '#2176FF', '#33A1FD', '#3E92CC', '#134074', '#011638', '#78C0E0'],
			"albumColors": ['#F9CB40', '#FFA737', '#FF6A00', '#FDCA40'],
			"fullHeight": "",
			"fullWidth": ""
		}

		this.printState = this.printState.bind(this);
		this.printProps = this.printProps.bind(this);
	}
	componentWillMount() {
		// console.log("window");
		// console.log(window);
		this.setState({
			"fullHeight": window.innerHeight,
			"fullWidth": window.innerWidth
		})
		var urlArgs;
		if (this.props.location === undefined) {
			urlArgs = ['member', 'Kevin+Abstract'];
		} else {
			urlArgs = this.props.location.pathname.split("/");
		}
		var personArg = urlArgs[urlArgs.length - 1];
		this.setState({
			"person": personArg,
			"castlist": <CastList activeLink={personArg}></CastList>
		});
		var _this = this;

		// GET PROFILE PIC
		axios.get(`http://localhost:8001/api/person/pics/?size=lg&name=${personArg}`)
		.then(function(res){
			_this.setState({
				"profilePicUrl": res.data.result.picUrl
			});
		});

		// GET WORD COUNTS AND STATS
		axios.get(`http://localhost:8001/api/person/words/?name=${personArg}&minLength=5&n=15`)
		.then(function(res){
			
			let wordBarCategories = [];
			res.data.result.words.forEach(element => {
				wordBarCategories.push(<Bar dataKey={element.name} fill='#FF6A00' />);
			});
			_this.setState({
				"wordCount": res.data.result.wordCount,
				"uniqueWordCount": res.data.result.uniqueWordCount,
				"words": res.data.result.words,
				"wordBarCategories": wordBarCategories
			});
			// console.log("res.data.result.words");
			// console.log(res.data.result.words);
		});
		

		// GET SONG PART STATS
		axios.get(`http://localhost:8001/api/memberPage/?name=${personArg}`)
		.then(function(res){
			_this.setState({
				"partData": res.data.result.partData
			});
			// console.log("this.state.partData.data");
			// console.log(_this.state.partData.data);
		})
	}

	printState() {
		console.log("heres the state");
		console.log(this.state);
	}

	printProps() {
		console.log("heres the props");
		console.log(this.props);
	}

	componentDidMount() {
		let a = ["a", "b", ["c", "d", "e"], ["f", ["g", "h"], "i"], "j"];
		let b = ["f", ["g", "h"], "i"];
		let s0 = "-0";
		let s1 = "12.34";
		let s2 = "57";
		let s3 = "0.12";
		console.log(this.weeblyFloat(s0));
		
		console.log(this.weeblyFloat(s1));
		console.log(this.weeblyFloat(s2));
		console.log(this.weeblyFloat(s3));
	}
	weeblyFloat(str) {
		// Catch case where string isn't number like or where str === "0"	
		// Technically this uses a full Number() just for the zero case,
		// but the method below it also works for 0.
		if (str.length == 0 || Number(str) === 0) {
			return 0;
		}
		/*
			Two cases:
			1) Pre-decimal
			2) Post-decimal
			POSTDECIMAL.PREDECIMAL
			If num has no decimal, great, it only reaches predecimal, else
			we need to format it properly
		*/
		let isPostDecimal = 0;
		let val = 0;
		let decimalLength = 0;
		let isNegative = (str[0] == "-") ? 1 : 0;
		// If isNegative, that means we should analyze all but the last char
		for (let i = str.length - 1 ; i >= isNegative; i--) {
			if (str[i] === ".") {
				isPostDecimal = 1;
				decimalLength = str.length - i - 1;
			}
			else {
				val += Number(str[i])*Math.pow(10, str.length - i - isPostDecimal - 1);	
				/* str.length - i - isPostDecimal - 1, need to offset by isPostDecimal, because
				the "." adds an extra place and we don't want that to contribute to the Math.pow()
				- if it never finds a "." then its fine because the offset wont happen.
				*/
			}
		}
		isNegative = (isNegative === 1) ? -1 : 1;
		return isNegative*(val/Math.pow(10, decimalLength));
	}


	flattenArray(arr) {
		let flattenedArray = [];
		while (arr.length > 0) {
			let element = arr.shift();
			if (Array.isArray(element)) {
				let flattendSubarray = this.flattenArray(element);
				// We can work with a single depth array element
				// it gets tricky when we have arrays in arrays in arrays etc
				flattenedArray = flattenedArray.concat(flattendSubarray);
			} else {
				flattenedArray.push(element);
			}
		}
		return flattenedArray;
	}

	render() {
		const data = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];
		
		return (
			<div className="member-page">
				<button onClick={this.printState}>State</button>
				<button onClick={this.printProps}>Props</button>
				<div className="member grid-container" id="sections" style={{"width": this.state.fullWidth, "height": this.state.fullHeight}}>
					<div className="header">
						{this.state.castlist}
					</div>
					
					<div className="body">
						
					
						<div className="profile">
							<CreditCircle 
								size="lg"
								strokeColor="#D8D8D8" 
								pathBase="http://localhost:8001" 
								iconUrl={this.state.profilePicUrl}
								imageKey="hi"
								key="hi">
							</CreditCircle>

						</div>
						
						<div className="quick-stats">
							<div className="quick-words">
								<h2>words: <span className="count">{this.state.wordCount}</span></h2>
								<h5>(unique): <span className="unique-count">{this.state.uniqueWordCount}</span></h5>
							</div>
							<div className="quick-parts">
								<span className="parts-title quick-title">parts: </span>	
								<PieChart width={250} height={200}>
									<Pie data={this.state.partData.piePartData} dataKey="value" nameKey="name" 
										cx="50%" cy="50%" innerRadius={0} outerRadius={70} 
										fill="#82ca9d" label 
										isAnimationActive={true}>
										{
											this.state.partData.piePartData.map((entry, index) => <Cell fill={this.state.partColors[index % this.state.partColors.length]}/>)
										}
									</Pie>
									<Tooltip/>
								</PieChart>
								
							</div>
							<div className="quick-albums">
								<span className="parts-title quick-title">songs: </span>	
								<PieChart width={250} height={200}>
									<Pie data={this.state.partData.pieAlbumData} dataKey="value" nameKey="name" 
										cx="50%" cy="50%" innerRadius={0} outerRadius={70} 
										fill="#82ca9d" label 
										isAnimationActive={true}>
										{
											this.state.partData.pieAlbumData.map((entry, index) => <Cell fill={this.state.albumColors[index % this.state.albumColors.length]}/>)
										}
									</Pie>
									<Tooltip/>
								</PieChart>
							</div>
						</div>

						<div className="section-nav">
							<a href="#sections">sections</a>
							<a href="#words">words</a>
							<a href="#songs">songs</a>
						</div>

						<div className="section-stats">
						
							<BarChart width={900} height={350} data={this.state.partData.data}
									margin={{top: 5, right: 30, left: 20, bottom: 5}}>
								<XAxis dataKey="name"/>
								<YAxis/>
								<CartesianGrid strokeDasharray="3 3"/>
								<Tooltip/>
								<Legend />
								<Bar dataKey="Saturation I" fill='#F9CB40' />
								<Bar dataKey="Saturation II" fill='#FFA737' />
								<Bar dataKey="Saturation III" fill='#FF6A00' />
							</BarChart>
						</div>
							
						
					</div>
					<div className="footer">
						<NavDownArrow></NavDownArrow>
					</div>
					
						
					
				</div>	
				<div className="word-stats grid-container" id="words" style={{"width": this.state.fullWidth, "height": this.state.fullHeight}}>
					<BarChart width={this.state.fullWidth} height={this.state.fullHeight} data={this.state.words}
							margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						<XAxis dataKey="name"/>
						<YAxis/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend />
						<Bar dataKey="value" fill='#FF6A00' />
					</BarChart>
				</div>
				<div className="song-stats grid-container" id="songs" style={{"width": this.state.fullWidth, "height": this.state.fullHeight}}>

				</div>
			</div>
				
		);
	}
}

export default Member;


