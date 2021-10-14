import { Badge } from "@mui/material";
import React, { useState, useContext } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import axios from "axios";
import ModalContent from "../ModalContent/ModalContent";
import { GlobalContext } from "../../context/globalState";

const SingleContent = ({ dataItem, type }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { getItem, item } = useContext(GlobalContext);

  dataItem.media_type = type;

  const fetchItem = async () => {
    let itemType;
    if (dataItem.media_type !== undefined) {
      itemType = dataItem.media_type;
    } else {
      if (type !== undefined) {
        itemType = type;
      }
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${itemType}/${dataItem.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    data.media_type = type;
    getItem(data);
  };

  const handleOpen = async () => {
    setOpen(true);
    await fetchItem();
  };

  return (
    <div>
      <div className="posterCard" onClick={handleOpen}>
        <Badge
          badgeContent={dataItem.vote_average}
          color={dataItem.vote_average > 6 ? "primary" : "secondary"}
        />
        <img
          className="image_poster"
          src={
            dataItem.poster_path
              ? `${img_300}/${dataItem.poster_path}`
              : unavailable
          }
          alt={dataItem.title}
        />
        <div className="info">
          <div className="title">{dataItem.title}</div>
          <div className="date">{dataItem.release_date}</div>
        </div>
      </div>
      <ModalContent
        open={open}
        handleClose={handleClose}
        item={item ? item : dataItem}
      />
    </div>
  );
};

export default SingleContent;
