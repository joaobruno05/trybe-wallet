import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login as loginAction } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      // totalExpenses: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Expressão do Regex pesquisei no stackoverflow e testei no RegEx Testing
  handleInputChange({ target }) {
    const minCaracteres = 5;
    const { name, value } = target;
    const { email, password } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    this.setState({
      [name]: value,
    });
    if (password.length >= minCaracteres && emailRegex.test(email)) {
      this.setState({
        disabled: false,
      });
    }
  }

  handleSubmit() {
    const { history, login } = this.props;
    const { email } = this.state;
    history.push('/carteira');

    login(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            id="email"
            placeholder="exemplo@email.com"
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            id="password"
            placeholder="Digite sua senha"
            onChange={ this.handleInputChange }
          />
        </label>

        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
