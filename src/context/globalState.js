import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./appReducer";
const initialState = {
  favorite: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  item: localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : {},
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

  const getItem = (item) => {
    dispatch({ type: "GET_ITEM", payload: item });
  };

  const removeItemOnWatchList = (id) => {
    dispatch({ type: "REMOVE_ITEM_ON_WATCHLIST", payload: id });
  };

  const removeItemOnFavorite = (id) => {
    dispatch({ type: "REMOVE_ITEM_ON_FAVORITE", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        favorite: state.favorite,
        item: state.item,
        addItemToFavorite,
        addItemToWatchList,
        getItem,
        removeItemOnFavorite,
        removeItemOnWatchList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
