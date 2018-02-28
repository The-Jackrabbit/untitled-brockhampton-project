import React, { Component } from 'react';
import CastList from '../../../Components/Cast-List/castList';
import theBoys from '../../../Assets/img/group_photo.png';
import './home.css';
class Home extends Component {
  render() {
    return (
      <div className="home grid-container" >
			<div className="header">
				<CastList></CastList>
			</div>
			<div className="body">
				<img src={theBoys}/>
			</div>
		</div>
    );
  }
}

export default Home;
