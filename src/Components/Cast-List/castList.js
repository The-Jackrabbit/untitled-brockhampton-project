import React, { Component } from 'react';
import './castList.css';
class CastList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			"members": {
				"firstRow": ["Kevin Abstract", "Ameer Vann", "Merlyn Wood", "Dom McLennon", "Matt Champion", "Joba", "Bearface", "Robert Ontenient"],
				"secondRow" : ["Romil Hemnani", "Jabari Manwa", "Kiko Merley", "Q3", "HK", "Kevin Doan", "Ashlan Grey"],
				
			},
			"albums": ["Saturation I", "Saturation II", "Saturation III"],
			"markup": {
				"firstRow": [],
				"secondRow": [],
				"albums": []
			}
		}
	}

	componentWillMount() {
		let firstRowMarkup = [];
		let spanKey = 0;
		this.state.members.firstRow.forEach((member) => {
			firstRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
			firstRowMarkup.push(this.generateLinkMarkup(member, "/member/"));
			spanKey++;
		});
		firstRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
		spanKey++;
		let secondRowMarkup = [];
		this.state.members.secondRow.forEach((member) => {
			secondRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
			secondRowMarkup.push(this.generateLinkMarkup(member, "/member/"));
			spanKey++;
		});
		secondRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
		spanKey++;
		let albumRowMarkup = [];
		this.state.albums.forEach((album) => {
			albumRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
			albumRowMarkup.push(this.generateLinkMarkup(album, "/album/"));
			spanKey++;
		});
		albumRowMarkup.push(<span key={`spanKey-${spanKey}`}>|</span>);
		this.setState({
			"markup": {
				"firstRow": firstRowMarkup,
				"secondRow": secondRowMarkup,
				"albums": albumRowMarkup
			}
		})
	}

	generateLinkMarkup(text, pathBase) {
		let relativePath = text.replace(" ", "+");
		if (relativePath === "HK") {
			relativePath = "Henock+Sileshi";
		}
		let isActive = relativePath === this.props.activeLink ? "active" : "";
		
		let markup = <a href={pathBase + relativePath} className={isActive} key={relativePath}>{text}</a>;
		return markup;
	}

  	render() {
		return (
			<div>
				<div className="cast-list">
					{this.state.markup.firstRow}
				</div>
				<div className="cast-list">
					{this.state.markup.secondRow}
				</div>
				<div className="cast-list albums">
					{this.state.markup.albums}
				</div>
			</div>
		);
   }
}

export default CastList;
