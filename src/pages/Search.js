import React from 'react';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="page-search">Conteúdo Search</h1>
        <Header />
      </>
    );
  }
}

export default Search;
