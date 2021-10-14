import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import "../Shared/Shared.css";
import { GlobalContext } from "../../context/globalState";
import SingleContent from "../SingleContent/SingleContent";

const WatchList = () => {
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

  const checkWatchList = watchList.length === 0;

  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <div className="pageTitle">Watch List</div>
      </ThemeProvider>
      <div className="pageContent">
        {checkWatchList ? (
          <h2>No content found</h2>
        ) : (
          watchList.map((item) => (
            <SingleContent
              key={item.id}
              dataItem={item}
              type={item.media_type}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WatchList;
