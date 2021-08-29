const Users = require('../models/users');
const bcrypt = require('bcrypt');
const base64Id = require('base64id');
const jwt = require('jsonwebtoken');
const Orders =  require('../models/order');

exports.signUp = async(req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    const userType = req.body.userType;

    const existingUser = await Users.findOne({where:{phoneNo:phoneNo}})
    if(existingUser) return res.status(200).json({status:1,msg:'This user is already registered with us'});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    if(userType=='Delivery Person'){
        Users.create({
            uid:base64Id.generateId(),
            firstName:firstName,
            lastName:lastName,
            phoneNo:phoneNo,
            password:hashPassword,
            userType:userType,
            status:true
        })
        .then(async thisUser=>{
            return res.status(200).json({status:1,msg:'User created successfully'})
        }).catch(err=>{
            console.log(err);
            return res.status(500).json({status:0,msg:'something went wrong'});
        });
    }else{
        Users.create({
            uid:base64Id.generateId(),
            firstName:firstName,
            lastName:lastName,
            phoneNo:phoneNo,
            password:hashPassword,
            userType:userType,
        })
        .then(async thisUser=>{
            return res.status(200).json({status:1,msg:'User created successfully'})
        }).catch(err=>{
            console.log(err);
            return res.status(500).json({status:0,msg:'something went wrong'});
        });
    }
}

exports.logIn = async(req,res,next)=>{
    const phoneNo =  req.body.phoneNo;
    const password = req.body.password;

    Users.findOne({where:{phoneNo:phoneNo,isActive:true}})
         .then(async thisUser=>{
             if(thisUser){
                if(thisUser.userType=='Customer'){
                    let passwordIsValid = bcrypt.compareSync(password,thisUser.password);
                    if(passwordIsValid){
                        let CustomerKey = process.env.CUSTOMERKEY;
                        let token = jwt.sign(
                            {
                                userId:thisUser.uid,
                            },
                            CustomerKey,
                            {
                                expiresIn: "720h",
                            }
                        )
                        return res.status(200).json({status:1,msg:'Customer logged in successfully',authToken:token});
                    }else{
                        return res.status(400).json({status:1,msg:'Password didn\'t matched'});
                    }
                }else if(thisUser.userType=='Admin'){
                    const comparePassword = await bcrypt.compareSync(password,thisUser.password);
                    if(comparePassword){
                        let AdminKey = process.env.ADMINKEY
                        let token = jwt.sign(
                            {
                                adminId:thisUser.uid,
                            },
                            AdminKey,
                            {
                                expiresIn:'720h'
                            }
                        )
                        return res.status(200).json({status:1,msg:'Admin logged in successfully',authToken:token});
                    }else{
                        return res.status(400).json({status:1,msg:'Password didn\'t matched'});
                    }
                }else{
                    const comparePassword = await bcrypt.compareSync(password,thisUser.password);
                    if(comparePassword){
                        let DeliveryKey = process.env.DELIVERYKEY;
                        let token = jwt.sign(
                            {
                                deliverId:thisUser.uid,
                            },
                            DeliveryKey,
                            {
                                expiresIn:'720h'
                            }   
                        )
                        return res.status(200).json({status:1,msg:'Delivery Person logged in successfully',authToken:token});
                    }else{
                        return res.status(400).json({status:1,msg:'Password didn\'t matched'});
                    }
                }
             }else{
                 return res.status(200).json({status:1,msg:'User not found'});
             }
         })
}