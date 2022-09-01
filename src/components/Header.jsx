import React from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchGetUser();
  }

  fetchGetUser = async () => {
    this.setState(
      { isLoading: true },
      async () => {
        const { name } = await getUser();
        this.setState({
          isLoading: false,
          userName: name,
        });
      },
    );
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      isLoading ? <Carregando /> : (
        <header data-testid="header-component">
          <span data-testid="header-user-name">{ userName }</span>
        </header>
      )
    );
  }
}
