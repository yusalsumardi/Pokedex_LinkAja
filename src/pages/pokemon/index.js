import { CircularProgress, Typography, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Pokemon = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);

    const toFirstCharUppercase = name =>
        name.charAt(0).toUpperCase() + name.slice(1);
    const generatePokemonJSX = () => {
        const { name, id, base_experience, stats, types } = pokemon;
        const fullImagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        console.log(stats);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2">
                    {`${id}.${toFirstCharUppercase(name)}`}
                </Typography>
                <img style={{ width: "200px", height: "200px" }} src={fullImagePokemon} alt={`${name}`} />
                <Typography variant="h3">
                    Pokemon Info
                </Typography>
                <Typography>
                    {`Base Experience: ${base_experience}`}
                </Typography>
                <Typography variant="h4">
                    Type:
                </Typography >
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}>{`${toFirstCharUppercase(name)}`}</Typography>
                })}
                <Typography variant="h4">
                    Stats
                </Typography>
                {stats.map((statInfo) => {
                    const { stat } = statInfo;
                    const { base_stat } = statInfo;
                    const { name } = stat;
                    return (
                        <Typography key={name & base_stat}> {`${toFirstCharUppercase(name)} : ${base_stat}`}</Typography>
                    );
                })
                }
            </div >
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f2fffe', width: '100%' }}>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}

            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    Back to pokedex
                </Button>)}
        </div>
    )
}

export default Pokemon;