const { User } = require('../models/user');
const { Transaction } = require('../models/transaction_model');

const express = require('express');
const router = express.Router();


//check preform transaction
router.post('/', async (req, res) => {
    try{
                             
    const { method, params } = req.body   
        switch(method){
            case 'CheckPerformTransaction' : {
                const checkPrefT = await checkPerformTransaction(params)
                res.json(checkPrefT);
                break;
            }
            case 'CreateTransaction': {
                const createTr= await createTransaction(params)
                res.json(createTr);
                break;
            }
            default: 
              res.json('Method to\'g\'ri kelmadi!!');
              break;
        }      
    }catch(err){
        res.status(500).send(err)
    }
    
});

//CheckPerformTransaction
  async function checkPerformTransaction(params) {
    const user = await User.findOne({tel: params.account.phone})
    if (user) {
        //const appid = params.account.app_id;
        //const paid = user.payment.find(arg => arg == appid);        
        if (params.amount >= 1899000) {
            
            //console.log(`CheckPerformTransaction: ${params.amount }`)
                return {"result" : {
                    "allow" : true
                }}//`to'lov qilinmagan, to'lovni amalga oshirish mumkin: `;
            }else
                return `summa yetarli emas!! : -31001`;
    } else {
         return 'Bunday user topilmadi: -31050';
    }
}
//CreateTransaction
 async function createTransaction(params){
    
    let transaction = await Transaction.findOne({transaction_id: params.id})
    console.log('111')
    if (transaction){//transaction topilsa bajariladi
        console.log('222')
        let state = transaction.status
        if (state != 1){
            return `${-31008} state 1 ga teng emas`
        }else{
            return `${-31008} state 1 ga teng`
        }
    }else{
        console.log('333')
        //transaction topilmasa yangi transaksiya yaratiw
        const check_result = await checkPerformTransaction(params);//tel bazada mavjud bo'lsa va kelayotkan amount bizani narxga teng bo'sa
        console.log('------',check_result)
         if (typeof check_result === 'object' && check_result.result.allow){
            console.log('444')
            transaction = new Transaction({
                "transaction_id" : params.id,
                "time" : params.time,
                "amount" : params.amount,
                "status": 1,
                "account" : {
                    "app_name" : params.account.app_name,
                    "phone" : params.account.phone,
                    "app_id" : params.account.app_id,
                }
            })
            console.log('555')
            await transaction.save();
            return 'success paid'
        }
        console.log('666')
        return check_result;
    }
}


module.exports = router;