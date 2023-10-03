import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import getCookie from '../../Utils/get-cookie';
import Loading from './Loading';

const withAuthentication = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        isLoading: true,
        user: null,
      };
    }

    async componentDidMount() {
      try {
        const token = getCookie('token');
        const response = await fetch('http://localhost:5000/auth/verify', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.setState({ isAuthenticated: true });
          const result = await response.json();
          this.setState({ user: result.user })
        } else if (response.status === 401) {
          this.setState({ isAuthenticated: false });
          
        } else {
          throw new Error(response.status);
        }
      } catch (error) {
        console.error(error);
        this.setState({ isAuthenticated: false });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    render() {
      const { isAuthenticated, isLoading } = this.state;

      if (isLoading) {
        return <Loading />;
      }

      if (isAuthenticated) {
        return <WrappedComponent user={this.state.user} />;
      } else {
         window.location.href = '/login';
      }
    }
  };
};

export default withAuthentication;
