import React from 'react';
import { Link } from 'react-router-dom';
import { HiSearchCircle } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import styles from '../styles/Search.module.css';
import './header.css';

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
      <h1 data-testid="header-component" className="side-bar">
        {/* Header */}
        <Link
          to="/search"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-search"
        >
          <HiSearchCircle style={ { fontSize: '30px' } } />
          Pesquisar
        </Link>
        <Link
          to="/favorites"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-favorites"
        >
          <MdFavorite style={ { fontSize: '30px' } } />
          Favoritas
        </Link>
        <Link
          to="/profile"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-profile"
        >
          <FaUserAlt style={ { fontSize: '28px' } } />
          Perfil
        </Link>
        {
          load ? <Loading />
            : <p className="onboarding" data-testid="header-user-name">{`${user}`}</p>
        }
      </h1>
    );
  }
}

export default Header;
