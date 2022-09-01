import React, { Component } from 'react';
// import PropType from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isDisabled: true,
      isLoading: false,
      fetchOk: false,
      // data: [],
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
      isDisabled: value.length < 2,
    });
  };

  btnClicked = async () => {
    this.setState({ isLoading: true });
    const { artistName } = this.state;
    const nomePesquisa = artistName;
    const response = await searchAlbumsAPI(nomePesquisa);
    this.setState({
      isLoading: false,
      data: response,
      // dataLength: (data.length === 0),
      fetchOk: true,
      copyInputName: nomePesquisa,
    });
  };

  render() {
    const {
      artistName,
      isDisabled,
      isLoading,
      fetchOk,
      data,
      // dataLength,
      copyInputName } = this.state;
    const nomePesquisa = copyInputName;
    return (
      <div data-testid="page-search">

        <Header />
        {
          (isLoading) ? <Carregando /> : (
            <section>
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
                  onClick={ () => {
                    this.btnClicked();
                    this.setState({ artistName: '' });
                  } }
                >
                  Pesquisar
                </button>
              </form>
            </section>
          )
        }

        {
          fetchOk && (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                { nomePesquisa }
              </p>
              <Card
                data={ data }
                // dataLength={ dataLength }
              />
            </div>
          )
        }

      </div>

    );
  }
}

// Search.propTypes = {
//   artistName: PropType.string,
//   onInputChange: PropType.func,
// }.isRequired;
