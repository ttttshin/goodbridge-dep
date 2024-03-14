const User = require('../../db/User');
const validator = require("validator"); 
const { hashNSalt } = require("../../utils/password");

//create a new user 
const createUser = async (req, res) =>{

    const {name, email, password} = req.body; 
    //now I'm here to check if any information of the users is valid
    //such as password and email and name cannot be empty and password should follow strong password rule

    if(!name ||!email ||!req.body.password){
        return res.status(400).json({error: 'Please fill in passwrod, name and email'});
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({error: 'password should be longer than 8 characters, have at least one number, lowercase letter, uppercase letter and special character'});
    }
    
    
    //add doc users to db
    try{
        req.body.email = req.body.email.toLowerCase();
        let emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).send({ message: "Email already exists" });
        }
        let user = new User(req.body);
        const hashedPassword = hashNSalt(user.password);
        user.password = hashedPassword;
        let result = await user.save();
        user = result.toObject();
        delete user.password;
        //---old code here ---
        //const user = await User.create({name, bio, email, password});
        res.status(200).json(user);    
    }catch(error){
        res.status(400).json({error: error.message});
    }

};

module.exports = {createUser};