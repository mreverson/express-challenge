
const handleErrors = require('./middleware/handleErrors');
const {NotFound} = require('./utils/errors');
const port = 3000;
const app = require('./app');


app.use(function (req, res, next) {
    throw new NotFound("Page Not Found");
})

app.use(handleErrors);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
