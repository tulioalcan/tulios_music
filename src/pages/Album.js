import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';
// import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

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

    return load ? <Loading /> : (
      <div className="album-card">
        {/* <Header /> */}
        <div className="artist-name" data-testid="page-album">
          <h1 data-testid="artist-name">{ artistName }</h1>
        </div>
        <div>
          <h1 data-testid="album-name">{ albumName }</h1>
        </div>
        <div>
          <img className="album-image" src={ albumImage } alt={ albumName } />
        </div>
        <div>
          { allMusicsAlbum.map((music) => (
            <div key={ music.trackId }>
              <MusicCard
                music={ music }
                key={ music.trackId }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            </div>
          )) }
        </div>
      </div>
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
