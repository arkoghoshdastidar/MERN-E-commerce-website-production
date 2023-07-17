const app = require('./app');
const connectDatabase = require('./config/database');

// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log('Listening on http://localhost:' + process.env.PORT);
});

// The unhandledRejection listener to unhandled promise errors
process.on('unhandledRejection', (error, p) => {
    console.error('unhandledRejection', error.stack);

    // Closing the express server
    server.close((err) => {
        console.log('server closed')
        process.exit(err ? 1 : 0)
    })
});

// Handling uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error(`Caught exception: ${error.message}\n`);
    process.exit(1);
});