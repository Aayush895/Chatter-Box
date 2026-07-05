import { createLogger, format, transports } from 'winston';
const { combine, json, colorize } = format;

export function customDatabaseLogger() {
  // Create a Winston logger
  const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message, duration }) => {
      return `DB-${level}: ${message} ----> @${duration}ms`;
    })
  );

  const logger = createLogger({
    level: 'info',
    format: combine(colorize(), json()),
    transports: [
      new transports.Console({
        format: consoleLogFormat,
      }),
      new transports.File({ filename: 'db.log' }),
    ],
  });

  return logger;
}
