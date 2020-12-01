const User = require("../models/user");
const jwt  = require("jsonwebtoken");

module.exports.signupUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm) {
            return res.status(422).json({
                status: "failure",
                reason: "Password and confirm password does not match"
            });
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create({name:req.body.name, email:req.body.email, password:req.body.password});
            return res.status(201).json({
                status: "success"
            });
        } else {
            return res.status(409).json({
                status: "failure",
                reason: "This user-name already exist"
            });

        }

    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}

// doctor login
module.exports.login = async function(req, res){
    try {
        // check a user with given name registered or not
        let user = await User.findOne({ name: req.body.name });
        // if not registered or password incorrect
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                status: "failure",
                reason: "invalid username or password"
            });
        }
        // login
        return res.status(200).json({
            status: "success",
            data: {
                token: jwt.sign(user.toJSON(), 'ccare', { expiresIn: '2 days' })
            }
        }); 
    }
    catch (err) {
        console.log("error", err);
        return res.json(500, {
            status: "failure",
            reason: "internal server error"
        });
    }
}