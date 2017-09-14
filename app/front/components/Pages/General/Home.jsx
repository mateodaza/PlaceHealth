import React from 'react';
import { observer } from 'mobx-react'
import localStore from '../../../../src/localStore.js'
import '../../../../src/main.css';

import Carousel from '../ReactComponents/MainHomeCarousel.jsx';
import Navbar from '../ReactComponents/MainHomeNavbar.jsx';
import Footer from '../ReactComponents/MainHomeFooter.jsx';
import SectionOne from '../ReactComponents/MainHomeSectionOne.jsx';


@observer export default class Home extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        <Carousel />
        <SectionOne />
        <Footer />
      </div>
    )
  }

}