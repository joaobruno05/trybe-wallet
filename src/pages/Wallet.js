import React from 'react';
// import PropTypes from 'prop-types';
import ExpenseForm from '../components/ExpenseForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
      </div>
    );
  }
}

export default Wallet;
