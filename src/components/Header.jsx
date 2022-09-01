import React from 'react';
import { Link } from 'react-router-dom';
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
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">Search</Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </li>
          </ul>
          <span data-testid="header-user-name">{ userName }</span>
        </header>
      )
    );
  }
}
