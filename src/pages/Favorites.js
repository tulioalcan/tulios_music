import React from 'react';
import Header from './Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="page-favorites">Conteúdo Favorites</h1>
        <Header />
      </>
    );
  }
}

export default Favorites;
