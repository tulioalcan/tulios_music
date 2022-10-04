import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      load: false,
      artist: '',
      albuns: [],
      artistName: '',
    };
  }

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { artist } = this.state;
    const condition = 2;
    if (artist.length < condition) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  clearSearch = async () => {
    this.setState({
      load: true,
    });
    const { artist } = this.state;
    const arrayAlbum = await searchAlbumsAPI(artist);
    this.setState({
      load: false,
      albuns: arrayAlbum,
      artist: '',
      artistName: artist,
    });
  };

  render() {
    const {
      isButtonDisabled,
      load,
      albuns,
      artistName,
    } = this.state;
    if (load) {
      return (
        <Loading />
      );
    }
    return (
      <>
        <h1 data-testid="page-search">Conteúdo Search</h1>
        <Header />
        <form>
          <label htmlFor="artist">
            <input
              data-testid="search-artist-input"
              name="artist"
              type="text"
              id="artist"
              placeholder="artist"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.clearSearch }
          >
            Pesquisar
          </button>
          <section>
            {
              albuns.length >= 1 ? <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
                : <h2>null</h2>
            }
          </section>
        </form>
      </>
    );
  }
}

export default Search;
