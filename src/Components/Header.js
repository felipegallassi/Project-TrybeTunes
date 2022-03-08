import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: false,
    };

    this.handleUserName = this.handleUserName.bind(this);
  }

  componentDidMount() {
    this.handleUserName();
  }

  async handleUserName() {
    const user = await getUser();
    this.setState({
      userName: user,
      isLoading: true,
    });
  }

  render() {
    const { userName, isLoading } = this.state;
    return (isLoading ? (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{`${userName.name}`}</p>
      </header>) : <Loading />
    );
  }
}

export default Header;
