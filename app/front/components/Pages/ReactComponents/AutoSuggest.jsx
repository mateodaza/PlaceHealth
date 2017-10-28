import React from 'react';
import Autosuggest from 'react-autosuggest';
import { observer } from 'mobx-react';
import localStore from '../../../../src/localStore.js';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    let stuff = [{title: 'Service', info:[]}, {title: 'Specialty', info:[]}];
    localStore.searchSuggestions.Service.map((i)=>{
        stuff[0].info.push({name: i});
    });
    localStore.searchSuggestions.Specialty.map((i)=>{
        stuff[1].info.push({name: i});
    });

    return stuff
        .map(section => {
            return {
                title: section.title,
                info: section.info.filter(info => regex.test(info.name))
            };
        })
        .filter(section => section.info.length > 0);
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

function renderSectionTitle(section) {
    return (
        <strong>{section.title}</strong>
    );
}

function getSectionSuggestions(section) {
    return section.info;
}


@observer export default class AutoSuggest extends React.Component {
    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
        //localStore.navSearchItem = '';
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
        localStore.navSearchItem = newValue;

    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
        localStore.navSearchItem = value;

    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
        localStore.navSearchItem = suggestionValue;
        //window.location.replace('/#/search/'+localStore.navSearchItem.replace(/\s/g, ''));
        //window.location.reload();
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "search",
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                multiSection={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                inputProps={inputProps} />
        );
    }
}