import React, { Component } from 'react';

import AutosuggestInput from '../AutosuggestInput'

// import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const initialState = {
  title: '',
  cost: '',
  amount: '',
  category: ''
}

export default class PurchaseForm extends Component {

// export const PurchaseForm = ({ categories, onSubmit }) => {

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onChange = (data) => {
    this.setState(data);
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state);
    this.setState(initialState);
    this.setFocus()
  }

  onSelectTitle = (suggestion) => {
    this.setState({
      category: suggestion.path_str.trim().replace(/\s*\/$/, '')
    })
    // console.log('refs', this.refs);
    this.refs.cost.focus()
  }

  setFocus = () =>
    this.refs.title.refs.autosuggest.input.focus()

  componentDidMount() {
    this.setFocus()
  }

  render() {
    // console.info('render purchase form!', this.state);
    return (
      <form onSubmit={this.onSubmit}>
        <table>
          <tbody>
            <tr>
              <td className='pr-10' style={{width:'50%'}}>
                <AutosuggestInput
                  onChange={this.onChange}
                  inputList={this.props.categories}
                  placeholder='Type a purchase title'
                  value={this.state.title}
                  formField='title'
                  getSuggestionValue={suggestion => suggestion.title}
                  getSuggestions={(list, value) =>
                    getSuggestions(list, value, 1)
                  }
                  renderSuggestion={renderTitleSuggestion}
                  onSelect={this.onSelectTitle}
                  focusOnSelect={false}
                  ref='title'
                />
              </td>
              <td className='pr-10' style={{width:'25%'}}>
                <input value={this.state.cost}
                  onChange={e => {
                    this.onChange({cost: e.target.value})
                  }}
                  placeholder='Cost'
                  type='number'
                  step='0.01'
                  required={true}
                  ref='cost'
                />
              </td>
              <td colSpan='2'>
                <input value={this.state.amount}
                  onChange={e => {
                    this.onChange({amount: e.target.value})
                  }}
                  placeholder='Amount'
                  type='text'
                  required={true}
                  ref='amount'
                />
              </td>
            </tr>
            <tr>
              <td colSpan='3'>
                <AutosuggestInput
                  onChange={this.onChange}
                  inputList={this.props.categories}
                  placeholder='Type a purchase category'
                  value={this.state.category}
                  formField='category'
                  getSuggestionValue={suggestion =>
                    suggestion.path_str + suggestion.title
                  }
                  getSuggestions={(list, value) =>
                    getSuggestions(list, value, -1)
                  }
                  renderSuggestion={renderTitleSuggestion}
                />
              </td>
              <td className='sm-btn'>
                <button className='form-control-sm-btn' type="submit">
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }

}


const getSuggestions = (inputList, value, order) => {
  // order: 1 - ascendant, -1 - descendant
  const inputValue = value.trim().toLowerCase(),
        inputLength = inputValue.length,
        suggestions = [];
  const createList = (data, path=[]) => {
    data.forEach((item, index) => {
      let title = item.title;
      if (title.toLowerCase().slice(0, inputLength) === inputValue) {
        suggestions.push({
          title,
          path,
          path_str: path.reduce((p, c) => p + c + ' / ', '')
        });
      }
      if (item.sub && item.sub.length) {
        createList(item.sub, path.concat([title]));
      }
    });
  }
  createList(inputList);
  return suggestions.sort((a, b) => (b.path.length - a.path.length)*order);
};

const renderTitleSuggestion = (suggestion, {query}) => {
  // const matches = AutosuggestHighlightMatch(suggestionText, query);
  const matches = [[0, query.length]];
  const parts = AutosuggestHighlightParse(suggestion.title, matches);
  return (
    <span>
      {suggestion.path_str}
      {
        parts.map((part, index) =>
          <span
            className={part.highlight ? 'highlight' : null}
            key={index}>
            {part.text}
          </span>
        )
      }
    </span>
  );
}
