// actions/authActions.js
// Assuming that `user` is an object with serializable properties
export const signIn = (user) => ({
  type: "SIGN_IN",
  payload: {
    email: user.email, // Replace with the actual property name in your user object
    name: user.displayName,
    // Other serializable properties from the user object
  },
});

export const signOut = () => ({
  type: "SIGN_OUT",
});
