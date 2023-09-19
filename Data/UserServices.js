const {  User  } = require('../Models/Model')

// Get user with id
exports.getUserWithId = async (id) => {
    let user = await User.findOne({where: {id: id}})
    .then( result => console.log( result ))
    .catch( err => console.log( err ))
}