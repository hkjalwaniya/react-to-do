import mongoose from 'mongoose';
import config from '../config';

const mongo_url =
    'mongodb://' + config.DB_HOST
    + ':' + config.DB_PORT + '/'
    + config.DB_NAME;

mongoose.connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const connectToDb = () => {
    const db = mongoose.connection;
    db.on('error', () => {
        console.log('could not connect to db!!!');
        process.exit(1);
    });

    db.on('connected', () => { console.log('connected to db!!!') });
}

export default connectToDb;