import React from 'react'
import { Link } from 'react-router-dom'
import pokeball from '../pokeball.png'

class Home extends React.Component {
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
                  newState.pokemon.push({name: res.name, id: res.id, imgsrc: res.sprites.front_default, type: types})
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

  handlleClick = ()=> {
    alert();
  }
  render() {
    // console.log(this.state.pokemon);
    const poke = this.state.pokemon.length?
      (this.state.pokemon.map
        (i=>{return (<Link to ={'/' + i.name} >
                        <div className="pokemon" >
                        <div className="pokeimgcon" ><img className="pokeimage" src={i.imgsrc} /></div>
                        <div className="pokename">{i.name}</div>
                        {/* <p className="poketypeary" id={Math.random()*10}>
                          {i.type.map(i=>{return <div className="poketypeitem">{i}</div>})}</p> */}
                      </div>
                      </Link>
                      )}))
      :(<div class="flex"><img src={pokeball} className="pokeball img1" /><div class="load">Loading...</div></div>)
    return (
      <div>
        <div className="titlecontainer flex">
          <img src={pokeball} className="pokeball img1" /> 
          <h2 className="hometitle">Pokedex</h2>
          <img src={pokeball} className="pokeball img2" /> 
        </div>
        <div className="homecontainer flex">
          {poke}
        </div>
      </div>
     
    );
  }
}

export default Home;
