export const getSender = (loggedInUser, users) => {
  const sender = users.find((user) => user._id != loggedInUser._id);
  return sender;
};
