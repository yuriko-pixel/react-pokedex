import React from 'react';
import './App.css';
import {connect} from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: []
    }
  }
  componentDidMount =()=> {
    let currentComponent = this;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=807`).then(function(response) {
      if(response.ok) {
        response.json().then(function() {
          for(let i=1; i<=807; i++){
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(function(response) {
              if(response.ok) {
                response.json().then(function(res) {
                  let newState = Object.assign([], currentComponent.state);
                  // console.log(currentComponent.state);
                  const types = res.types.map(type=>[type.type.name]);
                  newState.pokemon.push({name: res.name, imgsrc: res.sprites.front_default, type: types})
                  currentComponent.setState(()=>{return newState})
                })
              }
              // currentComponent.setState({pokemon: {name: res.name, imgsrc: res.sprites.front_default, type: res.types.map(type=>[type.type.name])}})
              
          })
        }
          
        });
      } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
      }
    });
  }

  render() {
    console.log(this.state.pokemon);
    const img = this.state.pokemon.length?
      (this.state.pokemon.map(i=>{return <div className="pokemon"><img src={i.imgsrc} /><p>{i.name}</p><p id={Math.random()*10}>{i.type.map(i=>{return <p>{i}</p>})}</p></div>}))
      :(<div>Loading</div>)
    return (
      <div className="flex">
          {img}
          {/* {name}
          {type} */}
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  console.log(state.pokemon)
  return {
    imgsrc: state.imgsrc
  }
}

const mapDisptachToProps = (dispatch)=> {
  
}
// export default connect(mapStateToProps)(App);
export default App;
