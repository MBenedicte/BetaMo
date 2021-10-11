import { Badge } from "@mui/material";
import React, { useState, useContext } from "react";
import { img_300, img_500, unavailable } from "../../config/config";
import "./SingleContent.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { GlobalContext } from "../../context/globalState";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const [open, setOpen] = useState(false);
  const [item, setitem] = useState({});
  const [itemDetails, setitemDetails] = useState({});

  const handleOpen = () => {
    setOpen(true);
    fetchItem();
  };

  const handleClose = () => setOpen(false);

  const fetchItem = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setitem(data);

    const video = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setitemDetails(video);
  };

  const { addItemToWatchList, watchList, addItemToFavorite, favorite } =
    useContext(GlobalContext);

  let onWatchList = watchList.find((element) => element.id === id);
  let onFavorite = favorite.find((element) => element.id === id);

  const watchListdisabled = onWatchList ? true : false;
  const favoritedisabled = onFavorite ? true : false;

  return (
    <div>
      <div className="posterCard" onClick={handleOpen}>
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="image_poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <div className="info">
          <div className="title">{title}</div>
          <div className="date">{date}</div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
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
                  src={poster ? `${img_300}/${poster}` : unavailable}
                  alt={title}
                ></img>
              </Grid>
              <Grid item xs={12} md={7}>
                <h2>{title}</h2>

                <div className="TitleDate space">
                  <span className="space">{date}</span>
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
                <div></div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleContent;
