/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(morgan('dev'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/projects', require('./routes/api/projects'));

switch (process.env.NODE_ENV) {
  case 'production':
    app.use(express.static(path.join(__dirname, '../public')));
    break;
  case 'test':
    break;
  default: {
    const compiler = webpack(webpackConfig);
    // webpack-dev-middleware usage from
    // https://github.com/webpack/webpack-dev-middleware#usage
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: 'minimal'
      })
    );
    // webpack hot middleware from
    // https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage
    app.use(webpackHotMiddleware(compiler));
    break;
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
