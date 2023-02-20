const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/weather-app-server.log",
      format: format.combine(
        format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.Console({
      colorize: true,
      format: format.combine(
        format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

module.exports = logger;
