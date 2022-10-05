import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    load: false,
    isFavorite: false,
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    const { music } = this.props;
    this.setState({
      isFavorite: favorites.some((favorite) => music.trackId === favorite.trackId),
    });
  }

  handleFavorite = async (music) => {
    const { isFavorite } = this.state;
    if (isFavorite) {
      this.setState({
        isFavorite: false,
        load: true,
      });
      await removeSong(music);
    } else {
      this.setState({
        isFavorite: true,
        load: true,
      });
      await addSong(music);
    }
    this.setState({
      load: false,
    });
  };

  render() {
    const {
      load,
      isFavorite,
    } = this.state;

    const { music } = this.props;

    const {
      previewUrl,
      trackName,
      trackId,
    } = music;

    return load ? <Loading /> : (
      <div>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            onChange={ () => this.handleFavorite(music) }
            checked={ isFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
