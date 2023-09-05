require('dotenv').config();
require('./config/database');
let express = require('express');
let encryptor = require('./utils/encryptor');

let app = express();
app.use(express.json());


//MODELS
let userModel = require('./models/users');

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        let isUserExist = await userModel.find({ emailId: email }).select('-createdAt -updatedAt').lean();
        if (isUserExist.length > 0) {
            let decryptPassword = encryptor.decryptPassword(isUserExist[0].password);
            if (decryptPassword == password) {
                delete isUserExist[0].password;
                res.json({ isSuccess: true, message: "LoggedIn Successfully", data: isUserExist[0] });
            } else {
                res.json({ isSuccess: true, message: "Invalid Credentials!", data: 0 });
            }
        } else {
            res.json({ isSuccess: true, message: "Invalid Credentials!", data: 0 });
        }
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            data: 0,
        });
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let isUserExist = await userModel.find({ emailId: email });
        if (isUserExist.length > 0) {
            res.json({ isSuccess: true, message: "Account already exist!", data: 0 });
        } else {
            let encryptedPassword = encryptor.encryptPassword(password);
            let userData = await userModel.create({
                name: name,
                emailId: email,
                password: encryptedPassword
            });
            res.json({
                isSuccess: true,
                message: "Account Created Successfully!",
                data: userData,
            })
        }
    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: err.message,
            data: 0,
        })
    }
});

app.listen(8080, () => console.log(`App is running on 8080`));
