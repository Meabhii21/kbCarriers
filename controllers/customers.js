const Orders = require('../models/order');
const base64Id =  require('base64id');
const Items =  require('../models/items');
const Categories = require('../models/category');

exports.cutomerOrder = async(req,res,next)=>{
    if (!req.isAuth) {
        const response = { status: 0, message: "request not authorize." };
        res.status(401).json(response);
        return; 
    }
    const items = req.body.items;
     const OrdersPlaced = await items.map(async thisData=>{
       const allOrder = await Orders.create({
           uid:base64Id.generateId(),
           quantity:thisData.quantity,
           itemUid:thisData.id,
           userUid:req.userId
       });
       return allOrder
     })
     Promise.all(OrdersPlaced).then(async result=>{
         const data= await result.map(async resultData=>{
            const item = await Items.findOne({where:{uid:resultData.itemUid}});
            return item;
         })
         const resultJson = JSON.parse(JSON.stringify(result));
         Promise.all(data).then(async result=>{
            const itemLocation = result.map(async resultData=>{
                const category = await Categories.findOne({where:{uid:resultData.categoryUid},attributes:['address']});
                return category;
            })
            Promise.all(itemLocation).then(result=>{
                const random_location = result[0].address[Math.floor(Math.random() * result[0].address.length)];
                return res.status(200).json({status:1,msg:'Your order has been placed successfully. Your PickUp location is:',data:random_location});
            })
         })
     }).catch(err=>{
         return res.status(500).json({status:0,msg:'something went wrong'});
     });
  }