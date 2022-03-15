import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      musicList: [],
      album: '',
      artist: '',
      image: '',
      favorite: [],
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      const results = await getMusics(id);
      const favSongs = await getFavoriteSongs();
      this.setState({
        album: results[0].collectionName,
        artist: results[0].artistName,
        image: results[0].artworkUrl100,
        isLoading: false,
        musicList: results,
        favorite: favSongs,
      });
    });
  }

  handleCheckbox({ target: { checked } }, music) {
    this.setState({
      isLoading: true,
    }, async () => {
      if (checked) {
        await addSong(music);
        this.setState((prevState) => ({
          isLoading: false,
          favorite: [...prevState.favorite, music],
        }));
      } else {
        await removeSong(music);
        this.setState((prevState) => ({
          isLoading: false,
          favorite: prevState.favorite.filter((fav) => (
            fav.trackId !== music.trackId
          )),
        }));
      }
    });
  }

  render() {
    const { isLoading, musicList, album, artist, image, favorite } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ image } alt={ `${album} - ${artist}` } />
        </div>
        <div data-testid="album-name">
          <h3>{ album }</h3>
        </div>
        <div data-testid="artist-name">
          <p>{ artist }</p>
        </div>
        <div>
          {isLoading ? <Loading />
            : (
              <div>
                { musicList.map((music, index) => {
                  if (index !== 0) {
                    return (
                      <div key={ music.trackId }>
                        <MusicCard music={ music } />
                        <label htmlFor={ `favorite-${music.trackId}` }>
                          <input
                            id={ `favorite-${music.trackId}` }
                            type="checkbox"
                            name="favorite"
                            data-testid={ `checkbox-music-${music.trackId}` }
                            onChange={ (e) => this.handleCheckbox(e, music) }
                            checked={ favorite
                              .some((fav) => fav.trackId === music.trackId) }
                          />
                          Favorita
                        </label>
                      </div>
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
