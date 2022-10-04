import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      load: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    this.setState({
      load: false,
      user: user.name,
    });
  };

  render() {
    const {
      user,
      load,
    } = this.state;
    return (
      <h1 data-testid="header-component">
        Header
        {load ? <Loading /> : <p data-testid="header-user-name">{`${user}`}</p>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </h1>
    );
  }
}

export default Header;
