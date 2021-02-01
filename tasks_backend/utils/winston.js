import winston from 'winston';
//Create logger
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format:'DD-MM-YYYY HH:mm:ss'}),
        winston.format.json()
    ),
    exitOnError: false,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            name: 'info-file',
            level: 'info',
            filename: 'logs/all-logs.log',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp:true
        }),
        new winston.transports.File({
            name: 'error-file',
            level: 'error',
            filename: 'logs/error-logs.log',
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp:true
        })
    ]
});

module.exports = logger;