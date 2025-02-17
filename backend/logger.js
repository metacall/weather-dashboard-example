const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // Default log level
    format: format.combine(
         // Add timestamp
        format.printf(({  level, message }) => {
            return `[${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // Log to console
        
    ]
});

module.exports = logger;
