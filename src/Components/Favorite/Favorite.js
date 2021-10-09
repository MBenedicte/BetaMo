import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import "../Shared/Shared.css";
import { GlobalContext } from "../../context/globalState";
import SingleContent from "../SingleContent/SingleContent";

const Favorite = () => {
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

  const { favorite } = useContext(GlobalContext);
  const checkFavorite = favorite.length;
  return (
    <div>
      <ThemeProvider theme={newTheme}>
        <div className="pageTitle">Favorite</div>
      </ThemeProvider>
      <div className="pageContent">
        {checkFavorite === 0 ? (
          <h2>No content found</h2>
        ) : (
          favorite.map((item) => (
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

export default Favorite;
