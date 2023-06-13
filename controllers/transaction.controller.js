const transactionService = require("../services/transaction.service");

const { PaymeMethod } = require("../enums/transaction.enum");

class TransactionController {
  constructor(service) {
    this.service2 = transactionService;
  }

  async payme(req, res, next) {
    try {
      const { method, params, id } = req.body;

      //console.log('$$$$$$$$$$$$$$$$$$$$$$$$: ', method)
      switch (method) {
        case PaymeMethod.CheckPerformTransaction: {
          await transactionService.checkPerformTransaction(params, id);

          return res.json({ result: { allow: true } });
        }
        case PaymeMethod.CheckTransaction: {
          const result = await transactionService.checkTransaction(params, id);

          return res.json({ result, id });
        }
        case PaymeMethod.CreateTransaction: {
          const result = await transactionService.createTransaction(params, id);

          return res.json({ result, id });
        }
        case PaymeMethod.PerformTransaction: {
          const result = await transactionService.performTransaction(params, id);

          return res.json({ result, id });
        }
        case PaymeMethod.CancelTransaction: {
          const result = await transactionService.cancelTransaction(params, id);

          return res.json({ result, id });
        }
        case PaymeMethod.GetStatement: {
          const result = await transactionService.getStatement(params, id);

          return res.json({result, id });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TransactionController(transactionService);
