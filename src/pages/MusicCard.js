import React from 'react';
import Header from './Header';

class MusicCard extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="MusicCard">Conteúdo MusicCard </h1>
        <Header />
      </>
    );
  }
}

export default MusicCard;
