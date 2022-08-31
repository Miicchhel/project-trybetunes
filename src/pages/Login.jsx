import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isDisabled: true,
      isLoading: false,
      redirect: false,
    };
  }

  onInputNameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isDisabled: value.length <= 2,
    });
  };

  btnClicked = () => {
    const { userName } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: userName });
      (this.setState({
        isLoading: false,
        redirect: true,
      }));
    });
  };

  render() {
    const { userName, isDisabled, isLoading, redirect } = this.state;

    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            {isLoading ? <Carregando />
              : (
                <form>
                  <label htmlFor="name">
                    nome
                    <input
                      type="text"
                      data-testid="login-name-input"
                      placeholder="Digite seu nome"
                      name="userName"
                      value={ userName }
                      onChange={ this.onInputNameChange }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ isDisabled }
                    onClick={ this.btnClicked }
                  >
                    Entrar
                  </button>
                </form>
              )}
          </div>
        )
    );
  }
}
