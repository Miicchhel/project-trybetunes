import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      artistName: '',
      isDisabled: true,
      isLoading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      isDisabled: value.length <= 2,
    });
  };

  render() {
    const { userName, isDisabled, isLoading, artistName } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                artistName={ artistName }
                isDisabled={ isDisabled }
                onInputChange={ this.onInputChange }
              />
            ) }
          />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/album/:id" component={ Album } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                userName={ userName }
                isDisabled={ isDisabled }
                isLoading={ isLoading }
                onInputChange={ this.onInputChange }
              />
            ) }
          />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
