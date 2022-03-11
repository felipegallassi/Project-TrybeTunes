import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
    return (
      <div>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    trackName: propTypes.string,
    previewUrl: propTypes.string,
  }).isRequired,
};

export default MusicCard;
