import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config';

/**
 * Validate a jwt token.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The function to pass control to next middleware function.
 */
exports.validateToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (token) {
            const parts = token.split('Bearer ');
            token = parts[1];
            const decodedToken = jwt.verify(token, config.SECRET.JWT);
            if (decodedToken.data.userName === req.params.username) {
                next();
            } else {
                throw Error('Access Denied!!!');
            }
        } else {
            throw Error('Access Denied!!!');
        }
    } catch (err) {
        res.json(401, ({ message: err.message }));
    }
}

/**
 * Send email to user.
 * @param {string} email - recipient user email.
 * @param {string} html - content of email.
 * @param {string} subject - subject for email.
 */
exports.sendEmail = async (email, html, subject ) => {
    try {
        // create transporter object with smtp server details
        const transporter = nodemailer.createTransport(config.SMTPOptions);
        // send mail with defined transport object
        await transporter.sendMail({
            from: config.mailOptions.mailFrom,
            to: email,
            subject: subject,
            html: html
        });
        return true;
    } catch (err) {
        throw new Error(err);
    }
}
