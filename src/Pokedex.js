import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card, 
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Icon,
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

// import mockData from './mockData';
import { toFirstCharUppercase } from './constants';

const useStyles = makeStyles(theme => ({
  pokedexContainer: {
    paddingTop: "80px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  title: {
    flexGrow: 1,
  },
  filterListBtn: {
    color: "white",
    marginRight: "10px",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  //search
  const [searchFilter, setSearchFilter] = useState("");
  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };
  //filter
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [typeFilter, setTypeFilter] = useState("");


  useEffect(() => {
    console.log(typeFilter);
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
    .then((response) => {
      const { results } = response.data
      console.log('res', results);
      const newPokemonData = {}
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        };
      });
      setPokemonData(newPokemonData);
    });
  }, [typeFilter])

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={6} sm={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{width: "130px", height: "130px"}}
          />
          <CardContent>
            <Typography className={classes.cardContent}>
              {`${id}, ${toFirstCharUppercase(name)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  const typesInfo = [
    {name: "All", key: "all", icon: ""},
    {name: "Normal", key: "normal", icon: "thumb_up_alt"},
    {name: "Fire", key: "fire", icon: "local_fire_department"},
    {name: "Water", key: "water", icon: "invert_colors"},
    {name: "Grass", key: "grass", icon: "eco"},
    {name: "Electric", key: "electric", icon: "flash_on"},
    {name: "Ice", key: "ice", icon: "ac_unit"},
    {name: "Fighting", key: "fighting", icon: "fitness_center"},
    {name: "Poison", key: "poison", icon: "delete_forever"},
    {name: "Ground", key: "ground", icon: "filter_hdr"},
    {name: "Flying", key: "flying", icon: "flight"},
    {name: "Psychic", key: "psychic", icon: "leak_add"},
    {name: "Bug", key: "bug", icon: "bug_report"},
    {name: "Rock", key: "rock", icon: "sports_soccer"},
    {name: "Ghost", key: "ghost", icon: "blur_on"},
    {name: "Dragon", key: "dragon", icon: "security"},
    {name: "Dark", key: "dark", icon: "dark_mode"},
    {name: "Steel", key: "steel", icon: "settings"},
    {name: "Fairy", key: "fairy", icon: "filter_vintage"},
  ];

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>Pokedex</Typography>
          <IconButton className={classes.filterListBtn} onClick={(e) => handleClick(e)}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {
              typesInfo.map(typeInfo => {
                const { name, key, icon } = typeInfo;
                return <MenuItem key={key} onClick={() => {handleClose(); setTypeFilter({key})}}><Icon>{icon}</Icon> {name}</MenuItem>
              })
            }
          </Menu>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField 
              label="Pokemon"
              variant="standard" 
              className={classes.searchInput}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
        </Toolbar>
      </AppBar>

      {/* obj ? (if true do this) : (if false do this) */}
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(pokemonId => 
            pokemonData[pokemonId].name.includes(searchFilter) && getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (<CircularProgress />)}
    </>
  );
}
 
export default Pokedex;