import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="page-album">Conteúdo Album</h1>
        <Header />
      </>
    );
  }
}

export default Album;
