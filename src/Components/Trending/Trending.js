import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import SingleContent from "../SingleContent/SingleContent";
import "../Shared/Shared.css";

const Trending = () => {
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
  const [content, setContent] = useState([]);
  const [type, setType] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/${
            type ? "tv" : "movie"
          }/day?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setContent(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrending();
  }, [type]);
  return (
    <div>
      <div className="pageTitle">Trending</div>
      <ThemeProvider theme={darkTheme}>
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
            <SingleContent key={c.id} dataItem={c} type={c.media_type} />
          ))}
      </div>
    </div>
  );
};

export default Trending;
