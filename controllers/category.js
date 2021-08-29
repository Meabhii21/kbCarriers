const Categories = require('../models/category');
const base64Id = require('base64id');

exports.insertCategory = async(req,res,next)=>{
    Categories.create({
        uid:base64Id.generateId(),
        name:req.body.name,
        address:req.body.address,
    }).then(async thisCategory=>{
        return res.status(200).json({status:1,msg:'New Category Added',data:thisCategory});
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({status:1,msg:'Something went wrong'});
    });
}