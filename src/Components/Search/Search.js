import { createTheme, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";

import "./Search.css";
import "../Shared/Shared.css";
import SingleContent from "../SingleContent/SingleContent";
import axios from "axios";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setsearchText] = useState("");
  const [content, setcontent] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#ff7f50",
      },
    },
  });

  useEffect(() => {
    window.scroll(0, 0);

    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/${
            type ? "tv" : "movie"
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=1&include_adult=false`
        );
        setcontent(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearch();
  }, [type, searchText]);

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
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }} className="boxType">
          <Tabs
            value={type}
            textColor="primary"
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
        {searchText &&
          content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              dataItem={c}
              type={type ? "tv" : "movie"}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
