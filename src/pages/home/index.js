import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    makeStyles,
    CardContent,
    Card,
    CircularProgress,
    CardMedia,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import axios from 'axios';
import SeachIcon from "@material-ui/icons/Search";

const useStyle = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    searchbarContainer: {
        display: "flex",
        backgroundColor: "#fcffff",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
        borderRadius: "20px",
    },
    seachIcon: {
        color: "#036e6e",
        alignSelf: "center",
        paddingRight: "5px"
    },
    buttonLoadMore: {
        width: "100%",
        backgroundColor: "#99e6ff",
        marginTop: "20px"
    }
});

const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1);

const Home = (props) => {
    const { history } = props;
    const classes = useStyle();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [visible, setVisible] = useState(30);
    const objectLength = Object.keys(pokemonData).length;


    const loadMore = () => {
        setVisible(visible + 30);
    }

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=300')
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.searchbarContainer}>
                        <SeachIcon className={classes.seachIcon} />
                        <TextField
                            onChange={handleSearchChange}
                            label="Find Pokemon" />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).slice(0, visible).map(
                        (pokemonId) =>
                            pokemonData[pokemonId].name.includes(filter) &&
                            getPokemonCard(pokemonId)
                    )}
                </Grid>

            ) : (
                <CircularProgress />
            )}
            {visible < objectLength && (
                <Button className={classes.buttonLoadMore} onClick={loadMore}>Load More</Button>
            )}
        </div >
    )
}
export default Home;