import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      trackName,
    } = this.props;

    return (
      <div>
        <section>
          <h1>{ trackName }</h1>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

export default MusicCard;
