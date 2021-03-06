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
          <div className='vidContainer'>
              <video  id="background-video" preload='auto' autoPlay loop  style={{ opacity:1, width: '100%'}}>
                  <source src="./Falling-Leaf/Falling-Leaf.webm" type="video/webm" />
                  <source src="./Falling-Leaf/Falling-Leaf.mp4" type="video/mp4" />
                  <img alt="no video support" src="./Falling-Leaf/Falling-Leaf.jpg"/>
              </video>
              <div id="video_overlays">
                  <Sticky enabled={true} bottomBoundary={652}>
                      <Navbar type="navbar homeNavbar"/>
                  </Sticky>
              </div>
              <div>
                  <h1 className="overlay">keep calm and carry on</h1>
              </div>
          </div>

          <div style={{minHeight: '80vh'}}>
              <h1 className="sectionHeader"> PlaceHealth - Todo en un mismo lugar </h1>
              <SectionOne />
          </div>

          <Parallax bgImage="./carousel-2.png" strength={400}>
              <div style={{minHeight: '80vh'}}></div>
          </Parallax>

          <SectionTwo />

          <Parallax bgImage="./carousel-1.png" strength={400}>
              <div style={{minHeight: '80vh'}}>
                  <h3 className="sectionContent">  </h3>
              </div>
          </Parallax>

      </div>
    )
  }

}