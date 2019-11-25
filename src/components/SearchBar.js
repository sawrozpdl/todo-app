import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

  render() {
    return (
      <div className="search-bar">
        <input className = "search-input" type = 'search' onChange = {this.handleChange} placeholder = {this.props.placeholder} />
      </div>
    );
  }
}

export default SearchBar;