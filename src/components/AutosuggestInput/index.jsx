import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './index.css'

export default class AutosuggestInput extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      // value: '',
      suggestions: []
    };
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log('auto sugg will receive props:', nextProps, this.state);
  // }

  onChange = (e, { newValue }) => {
    // this.setState({
    //   value: newValue
    // });
    this.props.onChange({
      [this.props.formField]: newValue
    })
    // console.log('on change log', this.refs );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.props.getSuggestions(this.props.inputList, value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, {suggestion}) => {
    e.preventDefault()
    if (this.props.onSelect) {
      this.props.onSelect(suggestion)
    }
    // console.log('onSelect', suggestion);
  }

  render() {
    // const { value, suggestions } = this.state;
    // const { suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: this.props.placeholder,
      value: this.props.value,
      onChange: this.onChange,
      required: true
      // ref={this.props.formField}
    };
    // console.log('Autosuggestion render!!!');
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.props.getSuggestionValue}
        focusInputOnSuggestionClick={this.props.focusOnSelect}
        renderSuggestion={this.props.renderSuggestion}
        inputProps={inputProps}
        ref='autosuggest'
      />
    );
  }
}
