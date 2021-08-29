const Items = require('../models/items');
const base64Id = require('base64id');

exports.insertItems = async(req,res,next)=>{
    const items = req.body.items;
    // const categoryId = req.body.categoryId;

    const insertedItems = await items.map(async thisData=>{
        const allItem = Items.create({
            uid:base64Id.generateId(),
            name:thisData.name,
            categoryUid:thisData.categoryId
        })
        return allItem;
    })
    Promise.all(insertedItems).then(async result=>{
        return res.status(200).json({status:1,msg:'Items Inserted successfully',data:result});
    }).catch(err=>{
        return res.status(500).json({status:0,msg:'something went wrong'});
    });
}