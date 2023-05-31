const userModel = require("../models/user.model");

class UserRepo {
  constructor(model) {
    this.model = userModel;
  }

  async getById(userId) {
    
    //console.log('**************_userId:',this.model.findById(userId))
    return this.model.findOne({user_id:userId});
  }
}

module.exports = new UserRepo(userModel);
