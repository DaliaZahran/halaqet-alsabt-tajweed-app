// actions/authActions.js

// Action Types
const actionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

// Assuming that `user` is an object with serializable properties
export const signIn = (user) => ({
  type: actionTypes.SIGN_IN,
  payload: {
    email: user.email,
    name: user.displayName,
    // Other serializable properties from the user object
  },
});

export const signOut = () => ({
  type: actionTypes.SIGN_OUT,
});
