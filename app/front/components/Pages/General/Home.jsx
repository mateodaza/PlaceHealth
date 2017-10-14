import React from 'react';
import { observer } from 'mobx-react'
import localStore from '../../../../src/localStore.js'
import '../../../../src/main.css';
import Sticky from 'react-stickynode';
import {PageHeader} from 'react-bootstrap';
import Navbar from '../ReactComponents/Navbar.jsx';
import SectionOne from '../ReactComponents/MainHomeSectionOne.jsx';
import SectionTwo from '../ReactComponents/MainHomeSectionTwo.jsx';

@observer export default class Home extends React.Component {

  render() {
    return (
      <div>
          <Sticky enabled={true} bottomBoundary={710}>
              <Navbar type="homeNavbar"/>
          </Sticky>
          <video  id="background-video" preload autoPlay loop width={'100%'} height={690}>
              <source src="https://i.imgur.com/uy2KVZg.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
          </video>
          <h1 className="sectionHeader"> Medical Health Services </h1>
          <SectionOne />
          <SectionTwo />
      </div>
    )
  }

}