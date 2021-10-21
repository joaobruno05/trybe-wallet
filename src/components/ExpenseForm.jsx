import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCodeCountries from '../API';
import { saveExpensesThunk } from '../actions';
import Table from './Table';

const PAY_METHODS = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

const TAG = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      // totalExpenses: 0,
      // id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  componentDidMount() {
    this.showCodeCountries();
  }

  async showCodeCountries() {
    const results = await getCodeCountries();
    // Peguei essa dica de deletar uma chave do objeto com o Rodrigo Augusto
    delete results.USDT;
    // console.log(results);
    this.setState({
      exchangeRates: results,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleAddExpense() {
    const { saveExpenses } = this.props;
    // this.setState(({ id }) => ({
    //   id: id + 1,
    // }));
    saveExpenses(this.state);
    // this.setState({
    //   value: '',
    //   description: '',
    //   currency: 'USD',
    //   method: 'Dinheiro',
    //   tag: 'Alimentação',
    //   exchangeRates: {},
    // });
  }

  renderValue() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        {' '}
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        {' '}
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrency() {
    const { exchangeRates, currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        {' '}
        <select
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            Object.keys(exchangeRates).map((code) => (
              <option key={ code } value={ code }>
                { code }
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  renderMethod() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        {' '}
        <select
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          {
            PAY_METHODS.map((payMethod, index) => (
              <option
                key={ index }
                value={ payMethod }
              >
                {payMethod}
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  renderTag() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        {' '}
        <select
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          {
            TAG.map((item, index) => (
              <option
                key={ index }
                value={ item }
              >
                { item }
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <form>
          { this.renderValue() }
          { this.renderDescription() }
          { this.renderCurrency() }
          { this.renderMethod() }
          { this.renderTag() }
        </form>
        <button
          type="button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesa
        </button>
        <Table />
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  saveExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(saveExpensesThunk(expenses)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
