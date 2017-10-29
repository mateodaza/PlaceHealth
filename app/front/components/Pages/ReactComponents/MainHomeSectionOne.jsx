import React from 'react';
import { Panel, PanelGroup, Button } from 'react-bootstrap';
import doctors from '../../../../../res/doctors.js';
import services from '../../../../../res/services.js';
import Card from 'react-material-card';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class MainHomeSectionOne extends React.Component {
    render() {
        return (
            <div className="sectionOne">
                <section >
                    <Card
                        onOver={card => card.setLevel(2) }
                        onOut={card => card.setLevel(1)}
                    >
                        <img className="cardImg" src='https://chiefexecutive.net/wp-content/uploads/2016/11/GettyImages-508508902.jpg' />
                        <div style={{margin: '2px', height: 'auto', minHeight: '15vh'}}>
                            <h3>Profesionales</h3>
                            <p> Doctores especialistas en mútliples campos dispuestos a ayudarte. </p>
                        </div>
                    </Card>
                </section>
                <section >
                    <Card
                        onOver={card => card.setLevel(2) }
                        onOut={card => card.setLevel(1)}>
                        <img className="cardImg" src='https://cloud.lovindublin.com/images/shutterstock_156022646.jpg' />
                        <div style={{ margin: '2px', height: 'auto', minHeight: '15vh'}}>
                            <h3>Centros Médicos</h3>
                            <p> Los mejores centros médicos de la ciudad interesados en atenderte.  </p>
                        </div>
                    </Card>
                </section>
                <section >
                    <Card
                        onOver={card => card.setLevel(2) }
                        onOut={card => card.setLevel(1)}>
                        <img className="cardImg" src='http://thirdage-assets.thirdage.com/field/image/doctor-with-older-male-patient.jpg' />
                        <div style={{ margin: '2px', height: 'auto', minHeight: '15vh'}}>
                            <h3>Servicios Generales</h3>
                            <p> Una amplia lista de servicios médicos en un mismo sitio, para tu comodidad. </p>
                        </div>
                    </Card>
                </section>
            </div>
        )
    }

}