import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import "../Shared/Shared.css";
import { GlobalContext } from "../../context/globalState";
import SingleContent from "../SingleContent/SingleContent";

const WatchLater = () => {
  const newTheme = createTheme({
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

  const { watchList } = useContext(GlobalContext);
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <div className="pageTitle">Watch List</div>
      </ThemeProvider>
      <div className="pageContente">
        {watchList &&
          watchList.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default WatchLater;
