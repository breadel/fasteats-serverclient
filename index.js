require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index'); 
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
const root = require('path').join(__dirname, 'build')
app.use(express.static(root));
app.use('/api', router)
app.get("/*", (req, res) => {
    res.sendFile('index.html', { root });
})
app.use(fileUpload({}))
app.use(errorHandler)




const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }catch (e) {
        console.log(e);
    }
};


start();