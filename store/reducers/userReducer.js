const initialState = {
  user: {
    name: "",
    lastname: "",
    username: "",
    _id: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return {
        ...state,
        user: {
          name: "",
          lastname: "",
          username: "",
          _id: "",
        },
      };

    default:
      return state;
  }
};

export default userReducer;
