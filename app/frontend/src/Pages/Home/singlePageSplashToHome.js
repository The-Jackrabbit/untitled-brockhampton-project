import React, { Component } from 'react';

import {ScrollToTopOnMount, SectionsContainer, Section} from 'react-fullpage';
import Home from './Home/home';
import SplashScreen from './Splashscreen/splashscreen';

class SplashToHome extends Component {
  render() {
	let options = {
      sectionClassName:     'section',
      anchors:              ['splash-page', 'home-page'],
      scrollBar:            false,
      navigation:           false,
      verticalAlign:        false,
		arrowNavigation:      true,
    };
    return (
      <div>
			<ScrollToTopOnMount />
			<SectionsContainer {...options}>
				<Section><SplashScreen></SplashScreen></Section>
				<Section><Home></Home></Section>
			</SectionsContainer>
		</div>
    );
  }
}

export default SplashToHome;
