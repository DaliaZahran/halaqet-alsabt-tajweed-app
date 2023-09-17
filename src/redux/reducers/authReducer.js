const initialState = {
  user: null, // Initial state when the user is not authenticated
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
