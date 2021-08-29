const Orders = require('../models/order');

exports.deliverStatus = async(req,res,next)=>{
    if (!req.isAuthDeliver) {
        const response = { status: 0, message: "request not authorize." };
        res.status(401).json(response);
        return; 
    }
    const Reached_Store = req.body.Reached_Store;
    const Items_Picked = req.body.Items_Picked;
    const Enroute = req.body.Enroute;
    const Delivered = req.body.Delivered;
    Orders.findOne({where:{deliveryPersonId:req.deliverId}})
          .then(async thisData=>{
                thisData.Reached_Store=(thisData.Reached_Store!=null)?thisData.Reached_Store:Reached_Store;
                thisData.Items_Picked = (thisData.Items_Picked!=null)?thisData.Items_Picked:Items_Picked;
                thisData.Enroute = (thisData.Enroute!=null)?thisData.Enroute:Enroute;
                thisData.orderDelivered = (thisData.orderDelivered!=null)?thisData.orderDelivered:Delivered;
                thisData.isActive = (thisData.orderDelivered==true)?false:true;
                thisData.save();
                return res.status(200).json({status:1,msg:'status updated',data:thisData});
          }).catch(err=>{
              return res.status(500).json({status:1,msg:'Something went wrong'});
          })
}