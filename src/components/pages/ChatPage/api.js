import { postRequest } from "../../helpers/api";

export const findFriend = (username) =>
  postRequest("/friends/find", { username });
