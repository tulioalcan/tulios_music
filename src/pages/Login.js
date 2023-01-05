import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import login from '../image/login.png';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isButtonDisabled: true,
      load: false,
    };
  }

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    }, () => this.validateButton());
  };

  validateButton = () => {
    const { user } = this.state;
    const condition = 3;
    if (user.length < condition) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  saveUser = async () => {
    this.setState({
      load: true });
    const { user } = this.state;
    await createUser({ name: `${user}` });
    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const {
      isButtonDisabled,
      load,
    } = this.state;

    return (
      <div
        className="login plogin"
        // style={ {
        //   display: 'flex',
        //   height: '89vh',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   // alignItems: 'center',
        //   background: `url(${login})`,
        //   backgroundSize: 'cover',
        // } }
      >
        <form
          data-testid="page-login"
          // style={ {
          //   margin: '120px',
          //   marginTop: '300px',
          //   fontSize: '40px',
          //   color: '#8B008B',
          // } }
        >
          Usuário
          <label htmlFor="LoginButton">
            <br />
            <input
              // className={ styles.inputs }
              data-testid="login-name-input"
              name="user"
              type="text"
              id="user"
              placeholder="User Name"
              onChange={ this.onInputChange }
            />
          </label>
          <br />
          <button
            // className={ styles.button }
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.saveUser }
          >
            Entrar
          </button>
          {load && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Login;
