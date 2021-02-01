import 'dotenv/config';

export default {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 27017,
    DB_NAME: process.env.DB_NAME || 'tasks-db',

    FRONT_END_URL: process.env.APP_HOST === 'localhost' ? `http://localhost:${process.env.FRONT_END_PORT || 3000}` : `https://www.tasks.com`,

    BCRYPT: {
        "SALTROUNDS": 10
    },
    SECRET: {
        JWT: "4ho+J0xxea4Lll3fak7sv35QqHJf1IPJkNhRlHlp0aTPXMTJExXEOTSIgWHl+anVPJJ/X6pzM09gC1vV15XdswkahG8lLWVYUQbcLJXMW+yFuUqDKyAwBzvIODv7FgBM"
    },
    SMTPOptions:{
        host: "smtp.gmail.com",
        port: 587,
        domain: 'gmail.com',
        authentication: 'plain',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    mailOptions: {
        mailFrom: "Hamendra <tasks@gmail.com>",
        subject: "Registration Verification | My Score",
        html: "<h1>Please verify your email by clicking below link: </h1>"
    },

}
