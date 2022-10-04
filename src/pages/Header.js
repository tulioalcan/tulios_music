import React from 'react';
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
        Conteúdo Header
        {load ? <Loading /> : <p data-testid="header-user-name">{`${user}`}</p>}
      </h1>
    );
  }
}

export default Header;
