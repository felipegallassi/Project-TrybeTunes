import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
      isLoading: false,
      redirectPag: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handlechange({ target }) {
    const MIN_LENGTH_VALUE = 3;
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

  async handleClick() {
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirectPag: true,
    });
  }

  render() {
    const { name, btnDisabled, isLoading, redirectPag } = this.state;
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div data-testid="page-login">
            <h1>Login</h1>
            <form>
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                id="name"
                placeholder="digite seu nome"
                value={ name }
                onChange={ this.handlechange }
              />
              <button
                data-testid="login-submit-button"
                type="button"
                onClick={ this.handleClick }
                disabled={ btnDisabled }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        { redirectPag && <Redirect to="/search" /> }
      </>
    );
  }
}

export default Login;
