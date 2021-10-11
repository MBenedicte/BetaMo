import { Button, createTheme, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css";
import "../Shared/Shared.css";
import SingleContent from "../SingleContent/SingleContent";
import axios from "axios";

const Search = () => {
  const [type, setType] = useState(0);
  const [value, setValue] = useState("1");
  const [searchText, setsearchText] = useState("");
  const [content, setcontent] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ff7f50",
      },
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=1&include_adult=false`
      );
      setcontent(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [fetchSearch, type]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} columns={16} justifyContent="center">
            <Grid item xs={15}>
              <TextField
                label="Search"
                variant="filled"
                className="searchBox"
                onChange={(e) => setsearchText(e.target.value)}
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                className="searchButton"
                onClick={fetchSearch}
              >
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }} className="boxType">
          <Tabs
            value={type}
            textColor="white"
            centered
            onChange={(event, newValue) => {
              setType(newValue);
            }}
          >
            <Tab label="Search Movie" style={{ width: "50%" }} />
            <Tab label="Search TV Series" style={{ width: "50%" }} />
          </Tabs>
        </Box>
      </ThemeProvider>
      <div className="pageContent">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
