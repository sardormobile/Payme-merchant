const transactionModel = require("../models/transaction.model");

class TransactionRepo {
  constructor(model) {
    this.model = transactionModel;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async getById(transactionId) {
    return transactionModel.findOne({id:transactionId});
  }

  async getByFilter(filter) {
    return this.model.findOne(filter);
  }
  
  async getFilterByTime(fromDate, toDate) {
    return this.model.find({ create_time: { $gte: fromDate, $lt: toDate } })
    .sort({ create_time: 0 }); 
  }

  async updateById(transactionId, update) {
    return this.model.findOneAndUpdate({id:transactionId}, update);
  }
}

module.exports = new TransactionRepo(transactionModel);
