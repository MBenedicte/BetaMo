import axios from "axios";
import React, { useState, useEffect } from "react";
import SingleContent from "../SingleContent/SingleContent";
import "./Trending.css";
import "../Shared/Shared.css";

const Trending = () => {
  const [content, set_content] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    set_content(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div>
      <div className="pageTitle">Trending</div>
      <div className="pageContent">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default Trending;
