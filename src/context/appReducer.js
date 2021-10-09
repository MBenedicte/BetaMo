const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_WATCHLIST":
      return {
        ...state,
        watchList: [action.payload, ...state.watchList],
      };
    case "ADD_ITEM_TO_FAVORITE":
      return {
        ...state,
        favorite: [action.payload, ...state.favorite],
      };
    case "GET_ITEM":
      return { ...state, item: action.payload };
    case "REMOVE_ITEM_ON_WATCHLIST":
      return {
        ...state,
        watchList: [...state.watchList.filter((i) => i.id !== action.payload)],
      };
    case "REMOVE_ITEM_ON_FAVORITE":
      return {
        ...state,
        favorite: [...state.favorite.filter((i) => i.id !== action.payload)],
      };
    default:
      return state;
  }
};

export default AppReducer;
