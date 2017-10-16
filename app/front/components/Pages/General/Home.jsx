import React from 'react';
import { observer } from 'mobx-react'
import localStore from '../../../../src/localStore.js'
import '../../../../src/main.css';
import Sticky from 'react-stickynode';
import {PageHeader} from 'react-bootstrap';
import { Parallax } from 'react-parallax';

import Navbar from '../ReactComponents/Navbar.jsx';
import SectionOne from '../ReactComponents/MainHomeSectionOne.jsx';
import SectionTwo from '../ReactComponents/MainHomeSectionTwo.jsx';

@observer export default class Home extends React.Component {

  render() {
    return (
      <div>
          <Sticky enabled={true} bottomBoundary={652}>
              <Navbar type="homeNavbar"/>
          </Sticky>
          <video  id="background-video" preload autoPlay loop  style={{opacity:1, width: '100%'}}>
              <source src="./Falling-Leaf/Falling-Leaf.webm" type="video/webm" />
              <source src="./Falling-Leaf/Falling-Leaf.ogv" type="video/ogv" />
              <source src="./Falling-Leaf/Falling-Leaf.mp4" type="video/mp4" />
              <img alt="no video support" src="./Falling-Leaf/Falling-Leaf.jpg"/>
          </video>
          <div className="overlay">
              <h1>Making the world a better place. </h1>
          </div>

          <h1 className="sectionHeader"> Medical Health Services </h1>
          <SectionOne />
          <Parallax bgImage="./carousel-2.png" strength={400}>
              <div style={{height: '80vh'}}>
              </div>
          </Parallax>
          <SectionTwo />
          <Parallax bgImage="./carousel-1.png" strength={400}>
              <div style={{height: '80vh'}}>
                  <h3 className="sectionContent"> THATS ALL FOLKS </h3>
              </div>
          </Parallax>
      </div>
    )
  }

}