import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  calculateTotalExpenses() {
    const { expenses } = this.props;
    // const { exchangeRates, currency } = expenses;
    const totalExpenses = expenses.reduce((
      acc, { exchangeRates, currency, value },
    ) => acc + exchangeRates[currency].ask * value, 0);
    return totalExpenses.toFixed(2);
  }

  render() {
    const { email } = this.props;
    const currencyField = 'BRL';
    return (
      <div>
        <span data-testid="email-field">
          { `Email: ${email}` }
          {' '}
        </span>
        <span data-testid="total-field">
          Despesa total: R$
          { this.calculateTotalExpenses() }
          {' '}
        </span>
        <span data-testid="header-currency-field">
          { `Câmbio: ${currencyField}` }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  // totalExpenses: state.user.totalExpenses,
  expenses: state.wallet.expenses,
  // expenses: (state.wallet.expenses).reduce(()),
});

export default connect(mapStateToProps)(Header);
