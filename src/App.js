import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'
import Pokemon from './ components/Pokemon'
import Home from './ components/Home'

const App = ()=> {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Home}/>
        <Route path='/:pokemon_name' component={Pokemon} />
      </BrowserRouter>
    );
}

// export default connect(mapStateToProps)(App);
export default App;
