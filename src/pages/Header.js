import React from 'react';
import { Link } from 'react-router-dom';
import { HiSearchCircle } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../styles/Search.module.css';

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
        {/* Header */}
        <Link
          to="/search"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-search"
        >
          <HiSearchCircle />
          Pesquisar
        </Link>
        <br />
        <br />
        <Link
          to="/favorites"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-favorites"
        >
          <MdFavorite />
          Favoritas
        </Link>
        <br />
        <br />
        <Link
          to="/profile"
          style={ { textDecoration: 'none', color: 'black' } }
          data-testid="link-to-profile"
        >
          <FaUserAlt />
          Perfil
        </Link>
        <br />
        <br />
        {
          load ? <Loading />
            : <p data-testid="header-user-name" className={ styles.pa }>{`${user}`}</p>
        }
      </h1>
    );
  }
}

export default Header;
