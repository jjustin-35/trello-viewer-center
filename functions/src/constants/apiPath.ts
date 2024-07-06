import config from "../config";

enum apiPath {
  GET_BOARD_CARDS = `/boards/${config.BOARD_ID}/cards`,
}

export default apiPath;
