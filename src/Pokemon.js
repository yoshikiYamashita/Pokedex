import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography, Link, CircularProgress, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

// import mockData from './mockData';
import { toFirstCharUppercase } from './constants';

const useStyles = makeStyles({
  pokemonContainer: {
    paddingTop: "40px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  pokemonContent: {
    textAlign: "center",
    backgroundColor: "white"
  },
  gobackBtn: {
    margin: "10px"
  }
})

const Pokemon = (props) => {
  const { history } = props;
  // const pokemonId = props.match.params.pokemonId;
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => {
      const { data } = response;
      setPokemon(data);
    })
    .catch((error) => {
      setPokemon(false);
    })
  }, [pokemonId]);



  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    console.log(pokemon)
    return (
      <>
        <Typography variant="h2" gutterBottom>
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} alt="char-icon" style={{ 
            position: "relative",
            top: "30px"
          }}/>
        </Typography>
        <img style={{width: "200px", height: "200px"}} src={fullImageUrl} alt="char-img" />
        <Typography variant="h4" gutterBottom>Pokemon Info</Typography>
        <Typography gutterBottom>
          {"Species: "}
          <Link href={species.url}>{toFirstCharUppercase(species.name)}</Link>
        </Typography>
        <Typography gutterBottom>Types: {
          types.map((typeInfo) => {
            const typeName = typeInfo.type.name;
            return typeName + " ";
          })
        }</Typography>
        <Typography gutterBottom>Height: {height} </Typography>
        <Typography gutterBottom>Weight: {weight} </Typography>
      </>
    )
  }


  return (<>

    <Grid container spacing={2} className={classes.pokemonContainer}>
      <Grid item xs={12} className={classes.pokemonContent}>
        {pokemon === undefined && <CircularProgress/>}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon === false && <Typography variant="h2">Pokemon not found</Typography>}
        {pokemon !== undefined && <Button variant="contained" className={classes.gobackBtn}
        onClick={() => history.push('/')}>Back to Pokedex</Button>}
      </Grid>
    </Grid>
  </>);
}
 
export default Pokemon;