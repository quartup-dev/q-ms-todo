global.__basedir = __dirname;
import express from 'express';
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config' // con esto tenemos process.env
// console.log(process.env)
//______________conexion base de datos_______
require('./conn-mongo');
//____________________________________________
const morgan = require('morgan');
var helmet = require('helmet');

const cors = require('cors');
var app = express();
app.use(cors());

app.use(helmet());
// app.use(logger('dev'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/api', function (req, res) {
    res.send('mss-test');
});
app.use('/api/todo/task', require('./src/routes/task'));
// app.use('/api/mail/template', require('./src/routes/template'));
// app.use('/api/mail/mjml-to-html', require('./src/routes/transform'));

//_____________consumiendo rabbit mq-------------------

//____________ERRORES______________
function logErrors(err, req, res, next) {
    // console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(function (req, res, next) {
    res.status(404).json({ error: 'Sorry cant find that, in mail!, ops' });
});

export default app;