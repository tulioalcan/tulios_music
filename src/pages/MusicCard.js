import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      trackName,
    } = this.props;

    return (
      <div>
        <h1>{ trackName }</h1>
        <Header />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
