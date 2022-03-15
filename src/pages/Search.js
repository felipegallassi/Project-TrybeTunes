import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      btnDisabled: true,
      albuns: [],
      isLoading: false,
      inputSearch: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange({ target }) {
    const MIN_LENGTH_VALUE = 2;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { searchName } = this.state;
      const minNameValid = searchName.length;
      this.setState({
        btnDisabled: true,
      });
      if (minNameValid >= MIN_LENGTH_VALUE) {
        this.setState({
          btnDisabled: false,
        });
      }
    });
  }

  async handleClick() {
    this.setState({
      isLoading: true,
    });
    const { searchName } = this.state;
    this.setState({
      inputSearch: searchName,
      btnDisabled: true,
      isLoading: false,
    }, async () => {
      const result = await searchAlbumsAPI(searchName);
      this.setState({
        albuns: result,
        searchName: '',
      });
    });
  }

  render() {
    const { searchName, btnDisabled, isLoading, albuns, inputSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchName"
            id="searchName"
            placeholder="Nome do Artista"
            value={ searchName }
            onChange={ this.handlechange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            onClick={ this.handleClick }
            disabled={ btnDisabled }
          >
            Pesquisar
          </button>
        </form>
        {isLoading && <Loading />}
        {!isLoading && albuns.length === 0 && (
          <h2>Nenhum álbum foi encontrado</h2>
        )}
        {!isLoading
            && albuns.length !== 0
              && (
                <div>
                  <h3>{`Resultado de álbuns de: ${inputSearch}`}</h3>
                  <ul>
                    {albuns.map((album) => (
                      <li key={ album.collectionId }>
                        <Link
                          to={ `/album/${album.collectionId}` }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          <img
                            src={ album.artworkUrl100 }
                            alt={ `${album.collectionName} - ${album.artistName}` }
                          />
                          <p>{ album.collectionName }</p>
                          <p>{ album.artistName }</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
      </div>
    );
  }
}

export default Search;
