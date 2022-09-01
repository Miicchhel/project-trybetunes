import React, { Component } from 'react';
// import PropType from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isDisabled: value.length < 2,
    });
  };

  btnClicked = () => {
    this.setState({
      artistName: '',
    });
  };

  render() {
    const { artistName, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Nome do Artista"
              name="artistName"
              value={ artistName }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.btnClicked }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

// Search.propTypes = {
//   artistName: PropType.string,
//   onInputChange: PropType.func,
// }.isRequired;
