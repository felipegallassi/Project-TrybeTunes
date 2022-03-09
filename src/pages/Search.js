import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange({ target }) {
    const MIN_LENGTH_VALUE = 2;
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { name } = this.state;
      const minNameValid = name.length;
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

  handleClick() {

  }

  render() {
    const { name, btnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <p>Search</p>
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="name"
            id="name"
            placeholder="Nome do Artista"
            value={ name }
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
        <Header />
      </div>
    );
  }
}

export default Search;
