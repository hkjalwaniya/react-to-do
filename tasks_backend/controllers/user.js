import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import logger from '../utils/winston';
import { sendEmail } from '../utils/utils';


/**
 * Send verification email to user after registration.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.sendVerificationEmail = async (req, res) => {
    try {
        const { user } = res.locals;

        const encryptedUserId = Buffer.from(user['_id'].toString()).toString('base64');
        const encodedVerificationCode = crypto.createHash('md5').update(user.emailVerificationCode.code.toString()).digest('hex');
        const verificationUrl = `${config.FRONT_END_URL}/verify-email/${encodedVerificationCode}-${encryptedUserId}`;

        const html = `
            Dear ${user.firstName} <br/>
            Thank you for the registration with <a href=${config.FRONT_END_URL}>My Score</a> <br/>
            Please <a href='${verificationUrl}'> click here</a> to verify your email address.<br/>
            Regards,<br/>
            <a href=${config.FRONT_END_URL}>My Score</a>  Team
        `;

        const isEmailSent = await sendEmail(user.email, html, config.mailOptions.subject);
        if (isEmailSent) {
          res.status(200).json({
            success: true,
            message: 'User has been registered and a verification email has been sent to user!!!'
          });
        }

    } catch (err) {
        logger.error(`users/register/sendverifyemail/err- 400 - User has been registered but could not send verification email => ${JSON.stringify(err.message)}`);
        res.status(400).json({
          success: false,
          message: err.message
       });
    }
}

/**
 * Register a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.register = async (req, res, next) => {
    try {
        if (!req.body.firstName) throw Error('First name is required!!!');
        if (!req.body.lastName) throw Error('Last name is required!!!');
        if (!req.body.userName) throw Error('User name is required!!!');
        if (!req.body.email) throw Error('Email is required!!!');
        if (!req.body.password) throw Error('Password is required!!!');
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'User'
        });
        const userExistsQuery = {
            $or: [
                { userName: req.body.userName },
                { email: req.body.email }
            ]
        }
        //Check if user already exists
        const userAlreadyExist = await User.findOne(userExistsQuery);

        if (userAlreadyExist && userAlreadyExist.userName === req.body.userName) {
            throw Error('User with provided user name already exist!!');
        } else if (userAlreadyExist && userAlreadyExist.email === req.body.email) {
            throw Error('User with provided email already exist!!');
        }
        //Encrypt user password
        const passwordHash = await bcrypt.hash(user.password, config.BCRYPT.SALTROUNDS);
        user.password = passwordHash;
        const verificationCode = Math.floor(Math.random() * 900000) + 100000;
        user.emailVerificationCode = {
            code: verificationCode,
            count: 1,
            date: new Date()
        }

        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            role: user.role
        }

        const savedUser = await user.save();
        res.locals.user = savedUser;
        logger.info(`users/register/success- 200 - User registered successfully => email: ${savedUser.email}`);
        // res.status(200).json({
        //     success: true,
        //     message: 'user registered successfully',
        //     user: {
        //       userData: payload
        //     }
        // });
        next();
    } catch (err) {
        logger.error(`users/register/err- 400 - Could not register user => ${JSON.stringify(err)}`);
        res.status(400).json({
          success: false,
          message: err.message
       });
    }
}

/**
 * Login a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.login = async (req, res) => {
    try {
        if (!req.body.email) throw Error('Email is required!!!');
        if (!req.body.password) throw Error('Password is required!!!');
        const userExistsQuery = {
            email: req.body.email
        };

        const user = await User.findOne(userExistsQuery);
        if (!user) throw Error('User does not exist');
        //Match user password from database.
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw Error('Invalid credentials');

        const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            role: user.role
        }
        //create access_token for user
        const token = jwt.sign({
            data: payload
        }, config.SECRET.JWT, { expiresIn: '1h' });
        user.access_token = token;

        await user.save();
        res.status(200).json({
            success: true,
            message: 'log in successful',
            user: {
              userData: payload,
              userToken: token
            }
        })
    } catch (err) {
        logger.error(`users/login/err- 400 - Could not login user => ${JSON.stringify(err)}`);
        res.status(400).json({
          success: false,
          message: err.message
        });
    }
}

/**
 * Logout a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.logout = async (req, res) => {
    try {
        if (!req.body.email) throw Error('Email is required!!!');
        const userExistsQuery = {
            email: req.body.email
        };

        const user = await User.findOne(userExistsQuery);
        if (!user) throw Error('User does not exist');

        // remove access_token for user
        user.access_token = '';

        await user.save();
        res.status(200).json({
            success: true,
            message: 'log out successful'
        })
    } catch (err) {
        logger.error(`users/logout/err- 400 - Could not logout user => ${JSON.stringify(err)}`);
        res.status(400).json({
          success: false,
          message: err.message
        });
    }
}


/**
 * Get profile of a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.getProfile = async (req, res) => {
    try {
        if (!req.params.username) throw Error('Please provide user name!!!');
        const query = {
            userName: req.params.username
        };

        const user = await User.findOne(query);
        if (!user) throw Error('User not found!!!');

        const profileData = {
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            role: user.role
        }

        res.status(200).json({
            success: true,
            profileData: profileData
        })
    } catch (err) {
        logger.error(`users/getProfile/err- 400 - Could not get user profile => ${JSON.stringify(err)}`);
        res.status(400).json({
          success: false,
          message: err.message
        });
    }
}

/**
 * Verify user email.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.verifyEmail = async (req, res) => {
    try {
      console.log('req, res',req.headers);

    } catch (err) {
        logger.error(`users/verify-email/err- 400 - Could not verify user email => ${JSON.stringify(err)}`);
        res.status(400).json({
          success: false,
          message: err.message
        });
    }
}
