const Orders = require('../models/order');
const Users = require('../models/users');
const Items =  require('../models/items');

exports.customerOrderList = async(req,res,next)=>{
    if (!req.isAuthAdmin) {
        const response = { status: 0, message: "request not authorize." };
        res.status(401).json(response);
        return; 
    }
    Orders.findAll({where:{isActive:true,orderCancelled:false,orderDelivered:false},attributes:['uid','quantity','itemUid','userUid']})
          .then(async thisData=>{
            if(thisData.length>0){
                const allItemList = thisData.map(async item=>{
                    const itemJson = JSON.parse(JSON.stringify(item));
                    const itemList = await Items.findOne({where:{uid:item.itemUid},attributes:['name','categoryUid']});
                    const userName  = await Users.findOne({where:{uid:item.userUid},attributes:['firstName','lastName']});
                    delete itemJson.itemUid;
                    delete itemJson.userUid;
                    itemJson.itemList =  itemList.name
                    itemJson.userName = userName
                    return itemJson;
                })
                Promise.all(allItemList).then(result=>{
                    return res.status(200).json({status:1,msg:'Customers Order List',data:result});
                }).catch(err=>{
                    return res.status(500).json({status:0,msg:'List not found'});
                })
            }else{
                return res.status(400).json({status:0,msg:'somehting went wrong'});
            }
          }).catch(err=>{
              return res.status(500).json({status:1,msg:'Something went wrong'});
          });
}

exports.deliverBoyList = async(req,res,next)=>{
    if (!req.isAuthAdmin) {
        const response = { status: 0, message: "request not authorize." };
        res.status(401).json(response);
        return; 
    }

    Users.findAll({where:{userType:'Delivery Person',status:true},attributes:['uid','firstName','lastName','phoneNo']})
         .then(async thisData=>{
            if(thisData.length>0){
                return res.status(200).json({status:1,msg:'Available Delivery Person list',data:thisData});
            }else{
                return res.status(400).json({status:1,msg:'No data found'});
            }
         }).catch(err=>{
             console.log(err);
             return res.status(200).json({status:0,msg:'something went wrong'});
         });
}

exports.assignDeliveryPersonToOrder = async(req,res,next)=>{
    if (!req.isAuthAdmin) {
        const response = { status: 0, message: "request not authorize." };
        res.status(401).json(response);
        return; 
    }
    const deliverPerId = req.body.Id;
    Orders.findOne({where:{uid:req.body.orderId}})
           .then(async thisData=>{
               if(thisData){
                   const user = await Users.findOne({where:{uid:deliverPerId},attributes:['uid','status']});
                   user.status=false;
                   user.save();
                   thisData.deliveryPersonId = deliverPerId;
                   thisData.save();
                return res.status(200).json({status:1,msg:"Order Assigned",data:thisData});
               }else{
                   return res.status(200).json({status:1,msg:'No available Deliver Person'});
               }
           }).catch(err=>{
               console.log(err);
               return res.status(500).json({status:0,msg:'Something went wrong'});
           });
}