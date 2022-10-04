import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
import Header from './Header';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    albumImage: '',
    allMusicsAlbum: [],
    load: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const allMusics = await getMusics(id);
    const musics = allMusics.filter((music) => music.kind);
    const albuns = allMusics.find((album) => album);
    this.setState({
      artistName: albuns.artistName,
      albumName: albuns.collectionName,
      albumImage: albuns.artworkUrl100,
      allMusicsAlbum: musics,
    });
    this.setState({
      load: false,
    });
  }

  render() {
    const {
      artistName,
      albumName,
      albumImage,
      allMusicsAlbum,
      load,
    } = this.state;

    return (
      <>
        <h1 data-testid="page-album">Conteúdo Album</h1>
        <Header />
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
