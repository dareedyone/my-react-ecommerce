const rootReducer = (state, action) => {
  console.log(state);
  if (action.type === "UPDATE_ITEM") {
    console.log(state, action);
    return Object.assign({}, state, {
      items: action.payload,
      isAuthenticated: state.isAuthenticated
    });
  } else if (action.type === "UPDATE_AUTHORIZE") {
    console.log(state, action);
    return Object.assign({}, state, {
      isAuthenticated: action.payload.isAuthenticated,
      items: state.items
    });
  } else {
    return state;
  }
};
export default rootReducer;
