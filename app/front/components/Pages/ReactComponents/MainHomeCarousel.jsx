import React from 'react';
import { Carousel} from 'react-bootstrap';
import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeCarousel extends React.Component {
    constructor(){
        super();
        this.state = {
            index: 0,
            direction: null,
        };
    }

    handleSelect(selectedIndex, e) {
        //console.log('selected=' + selectedIndex + ', direction=' + e.direction);
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        return (
            <Carousel bsStyle="carousel" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
              <Carousel.Item>
                  <div className="carouselContainer">
                    <img src="/carousel-1.png"/>
                  </div>
                <Carousel.Caption>
                  <h3>Look at mee!</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                  <div className="carouselContainer">
                    <img src="carousel-2.png"/>
                  </div>
                <Carousel.Caption>
                  <h3>Ooh wee!!</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        );
    }
}