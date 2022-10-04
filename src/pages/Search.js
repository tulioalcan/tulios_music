import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
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

  render() {
    const {
      isButtonDisabled,
    } = this.state;
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
            onClick={ () => {} }
          >
            Pesquisar
          </button>
        </form>
      </>
    );
  }
}

export default Search;
