const jwt = require('jsonwebtoken');

const db = require("../models");
const Login = db.login;
const Op = db.Sequelize.Op;

exports.login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({
            message: "login Content can not be empty!"
        });
        return;
    }

    const user = await Login.findOne({ where: { username } });
    console.log(user);
    if (!user || password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, "ABC", { expiresIn: '12h' });
    res.json({ token });

};
