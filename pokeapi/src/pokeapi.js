import axios from "axios";

//Ventana de emejercia donde el usuario escribe que pokemon busca


// Api de pokemon
export const apiPok = axios.create({
    baseURL: `https://pokeapi.co/api/v2/`

});

export const chainEvolution = axios.create({
    baseURL: `https://pokeapi.co/api/v2/pokemon-species/`
})

// // Api de las evoluciones.
// export const apiEvoluciones = axios.create({
//     baseURL: `https://pokeapi.co/api/v2/evolution-chain/`
// })

// //Api de los tipos 
// export const apiTipos = axios.create({
//     baseURL: `https://pokeapi.co/api/v2/type/`
// })

// // Api de las habilidades 
// export const apiHabilidades = axios.create({
//     baseURL: `https://pokeapi.co/api/v2/ability/`
// })