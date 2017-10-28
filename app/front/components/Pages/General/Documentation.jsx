import React from 'react';
import { observer } from 'mobx-react'
import localStore from '../../../../src/localStore.js'
import '../../../../src/main.css';
import Sticky from 'react-stickynode';
import {PageHeader} from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import docContent from '../../../../src/docContent.js';

import Navbar from '../ReactComponents/Navbar.jsx';
//Doc Components
import Intro from './DocComponents/Intro.jsx';

@observer export default class Documentation extends React.Component {
    constructor(){
        super();
        this.state={
            selected : 0
        }
    }

    onSelect(e){
        e.preventDefault();
        console.log(e.target.getAttribute('value'));
        this.setState({
            selected: e.target.getAttribute('value')
        })
    }

    render() {
        return (
            <div>
                <Navbar type="loginNavbar"/>
                <div className='divContainer'>
                    <PageHeader> Documentation </PageHeader>
                    <Sticky enabled={true}>
                        <div className='docSidebar'>
                            {
                                docContent.map( (content, index) =>{
                                    if(Number(this.state.selected) === content.id){
                                        return <div>
                                            <h4 value={content.id} onClick={this.onSelect.bind(this)} className='clickableATag'
                                                key={content.id}> <strong>{content.title}</strong></h4>
                                        </div>
                                    }else{
                                        return <div>
                                            <h4 value={content.id} onClick={this.onSelect.bind(this)} className='clickableATag'
                                                key={content.id}> {content.title} </h4>
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </Sticky>
                    <div className='divContainer'>
                        {
                            Number(this.state.selected) === 0 &&(
                               <Intro/>
                            )
                        }
                        {
                            Number(this.state.selected) === 1 &&(
                                <h3> Not the intro </h3>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}