import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./appReducer";
const initialState = {
  favorite: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("favorite", JSON.stringify(state.favorite));
  }, [state]);

  const addItemToWatchList = (item) => {
    dispatch({ type: "ADD_ITEM_TO_WATCHLIST", payload: item });
  };

  const addItemToFavorite = (item) => {
    dispatch({ type: "ADD_ITEM_TO_FAVORITE", payload: item });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        favorite: state.favorite,
        addItemToFavorite,
        addItemToWatchList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
