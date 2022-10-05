import React from 'react';
import { Link } from 'react-router-dom';
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
      hasResult: true,
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

  clearAndShowSearch = async () => {
    const { artist } = this.state;
    this.setState({
      load: true,
    });
    await searchAlbumsAPI(artist).then(
      (albuns) => {
        this.setState({
          load: false,
          albuns,
          artist: '',
          artistName: artist,
        }, () => {
          if (albuns.length === 0) {
            this.setState({ hasResult: false });
          } else {
            this.setState({ hasResult: true });
          }
        });
      },
    );
  };

  render() {
    const {
      isButtonDisabled,
      load,
      albuns,
      artistName,
      hasResult,
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
            onClick={ this.clearAndShowSearch }
          >
            Pesquisar
          </button>
          <section>
            {
              hasResult && (<h2>{`Resultado de álbuns de: ${artistName}`}</h2>)
            }
          </section>
          <section>
            { hasResult ? (
              albuns.map((albun) => (
                <div key={ albun.collectionId }>
                  <img src={ albun.artworkUrl100 } alt={ albun.collectionName } />
                  <h2>{ albun.collectionName }</h2>
                  <h2>{ albun.artistName }</h2>
                  <h2>{ albun.collectionPrice }</h2>
                  <Link
                    to={ `/album/${albun.collectionId}` }
                    data-testid={ `link-to-album-${albun.collectionId}` }
                  >
                    select
                  </Link>
                </div>
              ))) : <h2>Nenhum álbum foi encontrado</h2>}
          </section>
        </form>
      </>
    );
  }
}

export default Search;
