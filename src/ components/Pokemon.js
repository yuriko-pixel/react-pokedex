import React from 'react';

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      abilities: [],
      height: null,
      types: [],
      moves: [],
      sprites: [],
      color: null
    }
  }
  componentDidMount =()=> {
    let name = this.props.match.params.pokemon_name;

    let currentComponent = this;
    let newState = Object.assign([], currentComponent.state);
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(function(response) {
      if(response.ok) {
        response.json().then(function(res) {
          newState.name = res.name;

          newState.id = res.id;

          res.abilities.map(item=>{
            newState.abilities.push({abilityName: item.ability.name})
          })
          
          newState.height = res.height;
          
          res.types.map(item => {
            newState.types.push({typeName: item.type.name})
          })

          res.moves.map(item => {
            newState.moves.push({moveName: item.move.name})
          })

          newState.sprites.push(
            {back_default: res.sprites.back_defaul,
             back_female: res.sprites.back_female,
             back_shiny: res.sprites.back_shiny,
             back_shiny_female: res.sprites.back_shiny_female,
             front_default: res.sprites.front_default,
             front_female: res.sprites.front_female,
             front_shiny: res.sprites.front_shiny,
             front_shiny_female: res.sprites.front_shiny_female
            }
            );

            switch(res.types[0].type.name) {
              case 'normal':
                return newState.color = 'silver'
              case 'fire': 
                return newState.color = 'crimson'
              case 'water':
                return newState.color = 'royalblue'
              case 'electric':
                return newState.color = 'yellow'
              case 'grass':
                return newState.color = 'green'
              case 'poison':
                return newState.color = 'darkslateblue'
              case 'rock':
                return newState.color = 'slategray'
              case 'ground':
                return newState.color = 'coffee'
              case 'fighting':
                return newState.color = 'maroon'
              case 'psychic':
                return newState.color = 'franboise'
              case 'dark':
                return newState.color = 'navyblue'
              case 'dragon':
                return newState.color = 'wistaria'
              case 'fairy':
                return newState.color = 'rosepink'
              case 'flying':
                  return newState.color = 'pigeonblue'
              case 'ghost':
                  return newState.color = 'ultramarin'  
              case 'ice':
                  return newState.color = 'babyblue'
              case 'steel':
                  return newState.color = 'lightsteelblue'
            }
        }).then (()=> {
          currentComponent.setState(()=>{return newState})
        })
      } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
      }
    });
  }

  render() {
    const types = this.state.types.length?
      (this.state.types.map(item=> {
        return <div className="types">{item.typeName}</div>
      })):
      (<div>Loading</div>);

    const abilities = this.state.abilities.length?
      (this.state.abilities.map(item=> {
        return <div className="abilities">{item.abilityName}</div>
      })):
      (<div>Loading</div>);

    const imgbdf = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.back_default} />
    })):
    (<div></div>);

    const imgbs = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.back_shiny} />
    })):
    (<div></div>);

    const imgbf = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.back_female} />
    })):
    (<div></div>);
    
    const imgbfs = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.back_shiny_female} />
    })):
    (<div></div>);

    const imgfd = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.front_default} />
    })):
    (<div></div>);

    const imgff = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.front_female} />
    })):
    (<div></div>);

    const imgfs = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.front_shiny} />
    })):
    (<div></div>);

    const imgfsf = this.state.sprites.length?
    (this.state.sprites.map(item=> {
      return <img className="img" src={item.front_shiny_female} />
    })):
    (<div></div>);
    
    return (
      <div className="pkcontainer">
        <div className={this.state.color}>
        <img src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.id}.png`} className="eachpokeimg" />
            <div className="eachpokename">{this.state.name}</div>
            <div className="flex">
              <ul className="typebx">
                <div className="type flex row">
                  <div className="typelist col">Types: </div>
                  <list key={Math.random()} className="col">{types}</list>
                </div>
                <div className="ability flex row">
                  <div className="abilitylist col">Abilities: </div>
                  <list key={Math.random()} className="col">{abilities}</list>
                </div>
            </ul>
            <ul className="typebx">
              {imgbdf}
              {imgbs}
              {imgbf}
              {imgbfs}
              {imgfd}
              {imgff}
              {imgfs}
              {imgfsf}
            </ul>
          </div>
        </div>
      </div>
  );
  }
}

export default Pokemon;
