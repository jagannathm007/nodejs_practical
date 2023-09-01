let express = require('express');
let app = express()
app.use(express.json());


let users = [];

app.post('/login', (req, res) => {
    try {
        let request = req.body;
        let localUsers = JSON.parse(JSON.stringify(users))
        let isAlreadyExist = localUsers.filter((obj) => obj.emailId == request.emailId && obj.password == request.password);
        if (isAlreadyExist.length == 1) {
            delete isAlreadyExist[0].password;
            res.json({ message: "LoggedIn Successfully", data: isAlreadyExist });
        } else {
            res.json({ message: "Invalid credentials! Please try again." })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/signup', (req, res) => {
    let request = req.body;
    let isAlreadyExist = users.filter((obj) => obj.emailId == request.emailId);
    if (isAlreadyExist.length > 0) {
        res.json({ message: `User account already exist with ${request.emailId}.` });
    } else {
        users.push(request);
        res.json({ message: 'Account created successfully!' });
    }
})

app.listen(8080, () => console.log(`App is running on 8080`));



