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
    default:
      return state;
  }
};

export default AppReducer;
