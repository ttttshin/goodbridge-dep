const User = require('../../db/User');
const Mongoose = require('mongoose'); 

//delete workout 
const deleteUser = async (req, res) =>{
    const {id} = req.params;

    //check if the id type is valid 
    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }
    
    const user = await User.findOneAndDelete({_id:id});

    if(!user){
        //use return to stop running the rest of the code 
        return res.status(400).json({error: 'no such user to delete'});
    }

    return res.status(200).json(user);

};

module.exports = {deleteUser};