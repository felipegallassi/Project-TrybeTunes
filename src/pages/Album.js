import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      musicList: [],
      album: '',
      artist: '',
      image: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      const results = await getMusics(id);
      this.setState({
        album: results[0].collectionName,
        artist: results[0].artistName,
        image: results[0].artworkUrl100,
        isLoading: false,
        musicList: results,
      });
    });
  }

  render() {
    const { isLoading, musicList, album, artist, image } = this.state;
    return (
      <div>
        <Header />
        <div>
          {isLoading ? <Loading />
            : (
              <div>
                <div>
                  <img src={ image } alt={ `${album} - ${artist}` } />
                </div>
                <div data-testid="album-name">
                  <h3>{ album }</h3>
                </div>
                <div data-testid="artist-name">
                  <p>{ artist }</p>
                </div>
                { musicList.map((music, index) => {
                  if (index !== 0) {
                    return (
                      <MusicCard
                        music={ music }
                        key={ music.trackId }
                      />
                    );
                  } return '';
                })}
              </div>)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
