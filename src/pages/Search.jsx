import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  btnClicked = () => {

  };

  render() {
    // const { artistName } = this.state;
    const { onInputChange, artistName } = this.props;
    const isDisabled = artistName.length < 2;

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
              onChange={ onInputChange }
            />
          </label>

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.btnClicked }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  artistName: PropType.string,
  onInputChange: PropType.func,
}.isRequired;
