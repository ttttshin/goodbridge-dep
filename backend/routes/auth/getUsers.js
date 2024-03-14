const User = require('../../db/User');

const getUsers = async (req, res) =>{
    //now here, you can get all of users except admin 
    const users = await User.find({isAdmin:false});

    res.status(200).json(users);
};

module.exports = {getUsers};