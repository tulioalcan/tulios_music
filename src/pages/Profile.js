import React from 'react';
import Header from './Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="page-profile">Conteúdo Profile</h1>
        <Header />
      </>
    );
  }
}

export default Profile;
