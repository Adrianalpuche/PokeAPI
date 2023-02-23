//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import {apiPok,chainEvolution} from './pokeapi';

function Pokemon() {
  //mensaje que aparece al buscar al pokemon
    const [ esperar, setEsperar ] = useState(false);
    //busca en la api el pokwemon
    const [ pokemons, setPokemon ] = useState([]);

    const Pokeapis = async (nombrePokemon) => {
      try {
        const { data: {name,id,types,abilities,species,moves} } = await apiPok.get(`pokemon/${nombrePokemon}`);
        console.log(id);
        // const {evolution_chain} = await chainEvolution.get(`${id}`);
        const { data: { evolution_chain:{url} } } = await apiPok.get(`pokemon-species/${id}`);
        const {data:{chain}} = await axios.get(url);

        const etypes = types.reduce((prevValue, type2) => {
          const { data: { damage_relations } } = apiPok.get(`type/${types[0].type.name}`);
          return prevValue + damage_relations.no_damage_to[0].name;
        }, "");
        console.log(etypes);

        // types.forEach(element => {
        //    apiPok.get(`type/${element.type.name}`);
        // });

        if(types.count > 1){
          
          axios.all([
                apiPok.get(`type/${types[0].type.name}`),
                apiPok.get(`type/${types[1].type.name}`)
          ])
          .then(axios.spread((apiPok1, apiPok2) => {
            const response1 = apiPok1;
          
          }))
        }
        else{
          const { data: { damage_relations } } = await apiPok.get(`type/${types[0].type.name}`);

        }


        //const {data: {name} = await axios.get(`https://pokeapi.co/api/v2/move//`)}

        //console.log(types[0].type.name);
        
        const {data:{flavor_text_entries}} = await apiPok.get(`pokemon-species/${id}`);
        
        
        const ordenHabilidades = abilities.sort((a,b) => 
           a.ability.name.localeCompare(b.ability.name) 
        );

        const ordenarMovimiento = moves.sort((a,b) =>
          a.move.name.localeCompare(b.move.name)
        );

        const evolucion = [chain.species.name]
        let guardar = chain.evolves_to[0];

        while (guardar) {
          evolucion.push(guardar.species.name);
          guardar = guardar.evolves_to[0];
        }


        await new Promise(resolve => setTimeout(resolve, 2000));


        setPokemon([id,name,types,ordenHabilidades,ordenarMovimiento,species,chain,flavor_text_entries,evolucion,...pokemons]);
    } catch ({message}) {
    }
  };

    useEffect(() => {
      const nombrePokemon = prompt("Cual es el nombre del pokemon que buscas o su id ")
      setEsperar(true);
      Pokeapis(nombrePokemon).then(() => {
        setEsperar(false);
      });


        
    }, []);

  return (
    
    <div className="App">
    {esperar ? (
      <p>Cargando...</p>
    ) : (
      <div>
        <p>El id del pokemon es: {pokemons[0]}</p>
        <p>El nombre del pokemon es:</p>
        {pokemons.map((pokemons, key) => (
        <p key={key}>{pokemons.name}</p>
      ))}
      <p>Habilidades del pokemon:</p>
      <ul>
      {pokemons[3] && pokemons[3].map((ability, index) => (
        <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <p>Tipo de pokemon:</p>
      <ul>
      {pokemons[2] && pokemons[2].map((types, index) => (
        <li key={index}>{types.type.name}</li>
        ))}
      </ul>
      <p>Movimientos del pokemons: </p>
      <ul>
      {pokemons[4] && pokemons[4].map((moves, index) => (
        <li key={index}>{moves.move.name}</li>
        ))}
      </ul>
    <p>Evoluciones:</p>
    <ul>
    {pokemons[8] && pokemons[8].map((pokemon, index) => (
        <li key={index}>{pokemon}</li>
        ))}
      </ul>
    <p>Decripcion del pokemon: </p>
    </div>
    )}
    <code>
      <pre>
      {JSON.stringify(pokemons, null, 2)}
      </pre>
    </code>
  </div>
  
  );
}

export default Pokemon; 
