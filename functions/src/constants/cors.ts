import config from "../config";

const cors = [config.LOCALHOST, config.GITHUB_PAGE, /chrome-extension:\/\/.*/];

export default cors;
