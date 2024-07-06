import config from "../config";

const cors = [config.LOCALHOST, config.GITHUB, /chrome-extension:\/\/.*/];

export default cors;
