import { ADD_EXPENSES, DELETE_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas às despesas
const INITIAL_STATE = {
  expenses: [],
  id: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.payload.expenses,
        }],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
