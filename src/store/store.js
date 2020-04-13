import myReducer from '../reducer/myReducer'

const  {createStore} = require('redux');

const store = createStore(myReducer);

export default store;