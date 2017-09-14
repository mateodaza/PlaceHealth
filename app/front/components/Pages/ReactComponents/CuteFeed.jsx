import React from 'react';
import { CardStack, Card } from 'react-cardstack';

import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js'

@observer export default class CuteFeed extends React.Component {
    render() {
        return (
            /*
            <CardStack
                height={514}
                width={'100%'}
                background='#b0c4de'
                hoverOffset={25}>

                <Card background='#a0b2c9'>
                    <h1>Doctor 1</h1>
                </Card>

                <Card background='#b7c9e1'>
                    <h1>Doctor 2</h1>
                </Card>

                <Card background='#a0b2c9'>
                    <h1>Doctor 3</h1>
                </Card>

            </CardStack> */

            <CardStack
                height={514}
                width={'get-vw(350px)vw'}
                background={this.props.backgcolor}
                hoverOffset={10}>

                {this.props.valuesList.map((person, i) =>
                    <Card
                        key={i}
                        background={person.background}>
                        <TeamMemberCard {...person} />
                    </Card>
                )}

            </CardStack>

        )
    }

}


//Details inside card
const ProfilePicture = ({ imgSrc, borderColor }) => (
    <img
        style={{
            width: '60px',
            height: '60px',
            borderRadius: '100%',
            border: `3px solid ${borderColor}`,
        }}
        src={imgSrc}
    />
);

const DetailsRow = ({ icon, title, summary }) => {
    const renderSummary = () => {
        if (summary)	return (
            <p style={{ fontWeight: 300, lineHeight: 1.45 }}>
                {summary}
            </p>
        );
        return null;
    };

    return (
        <div style={styles.detailsRow.row}>
            <div style={{ width: '80%' }}>
                <h2 style={styles.detailsRow.title}>
                    {title}
                </h2>
                {renderSummary()}
            </div>
        </div>
    );
};

const TeamMemberCard = (props) => (
    <div style={{ position: 'absolute', top: 0 }} onClick={props.onClick}>
        <header style={styles.cardHeader} className='card-header-details'>
            <ProfilePicture imgSrc={props.imgSrc} borderColor={props.imgBorderColor} />
            <div>
                <h1 style={styles.headerName}>{props.name}</h1>
                <h3 style={styles.headerTitle}>{props.title}</h3>
            </div>
        </header>

        <div className='details'>

            <div>
                <h4>{props.desc}</h4>
            </div>

            <div>
                <h4>{props.mobileNo}</h4>
            </div>

            <div>
                <h4>{props.location}</h4>
            </div>
        </div>
    </div>
);

const styles = {
    cardHeader: {
        display: 'flex',
        height: '125px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        color: '#fff',
    },
    headerName: {
        margin: 0,
        fontWeight: 500,
        fontSize: '25px',
        textAlign: 'right'
    },
    headerTitle: {
        margin: '4px 0 0',
        fontWeight: 300,
        fontSize: '17px',
        opacity: 0.8,
        textAlign: 'right'
    },
    detailsRow: {
        row: {
            width: '100%',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            margin: '25px 0',
        },
        icon: {
            display: 'block',
            width: '25px',
            height: '30px',
            margin: '0 20px 0 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            fontSize: '22px',
        },
        title: {
            fontWeight: 500,
            fontSize: '20px',
            margin: 0,
            fontStyle: 'italic',
        },
    },
};
