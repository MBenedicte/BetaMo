import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { img_300, unavailable } from "../../config/config";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { GlobalContext } from "../../context/globalState";

const ModalContent = ({ open, handleClose, item }) => {
  const {
    addItemToWatchList,
    addItemToFavorite,
    watchList,
    favorite,
    removeItemOnWatchList,
    removeItemOnFavorite,
  } = useContext(GlobalContext);

  let onWatchList = watchList.find((element) => element.id === item.id);
  let onFavorite = favorite.find((element) => element.id === item.id);
  const watchListdisabled = onWatchList ? true : false;
  const favoritedisabled = onFavorite ? true : false;

  const { pathname } = window.location;

  const checkpath =
    pathname === "/favorites" || pathname === "/watchlist" ? true : false;
  const deleteFromList = (item) => {
    if (pathname === "/favorites") {
      removeItemOnFavorite(item.id);
    } else if (pathname === "/watchlist") {
      removeItemOnWatchList(item.id);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} style={{ overflow: "scroll" }}>
        <Box className="modalBox">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={5}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  className="image_poster_Modal"
                  src={
                    item.poster_path
                      ? `${img_300}/${item.poster_path}`
                      : unavailable
                  }
                  alt={item.name}
                ></img>
              </Grid>
              <Grid item xs={12} md={7}>
                <h2>{item.name}</h2>

                <div className="TitleDate space">
                  <span className="space">
                    {item.first_air_date || item.release_date}
                  </span>
                  <span className="space">
                    {item.genres === undefined
                      ? null
                      : item.genres.map((c) => (
                          <span key={c.id} className="space">
                            {c.name}
                          </span>
                        ))}
                  </span>
                </div>

                <h4>Overview</h4>
                <div className="overviewDesc space spaceBody">
                  {item.overview}
                </div>

                <div className=" space spaceBody">
                  <button
                    className="buttonIcon"
                    disabled={favoritedisabled}
                    onClick={() => addItemToFavorite(item)}
                  >
                    <FavoriteIcon className="icon" />
                  </button>
                  <button
                    className="buttonIcon"
                    disabled={watchListdisabled}
                    onClick={() => addItemToWatchList(item)}
                  >
                    <BookmarkIcon className="icon" />
                  </button>
                  <a href={item.homepage}>
                    <button className="buttonIcon">
                      <PlayArrowIcon className="icon" />
                    </button>
                  </a>
                </div>
                {checkpath ? (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => deleteFromList(item)}
                  >
                    Remove
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalContent;
