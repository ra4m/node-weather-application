const path = require("path");

const app = require("./app");
const logger = require("./utils/logger");

const port = process.env.PORT;
const filename = path.basename(__filename);

app.listen(port, () => {
  logger.info(`${filename}: Server is up on port ${port}`);
});
