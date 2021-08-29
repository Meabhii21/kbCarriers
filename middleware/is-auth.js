const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    req.forbidden = true;
    if (!authHeader) {
        req.isAuth = false;
        req.isAuthAdmin = false;

        return next();
    }
    const token = authHeader.split(" ")[1]; // Authorization: Bearer asdmaklsda

    if (!token || token === "") {
        req.isAuth = false;
        req.isAuthAdmin = false;
        return next();
    }

    let decodedToken;
    let decodedAdminToken;
    let decodedDeliverToken;
    try {
        var CustomerKey = process.env.CUSTOMERKEY;
        decodedToken = jwt.verify(token, CustomerKey);
    } catch (err) {
        try {
            var adminKEY = process.env.ADMINKEY;
            decodedAdminToken = jwt.verify(token, adminKEY);

            if (!decodedAdminToken) {
                req.isAuth = false;
                return next();
            }

            if (decodedAdminToken.adminId) {
                req.isAuthAdmin = true;
                req.adminId = decodedAdminToken.adminId;
                return next();
            }
        } catch (err) {
            try{
                var deliverKEY = process.env.DELIVERYKEY;
                decodedDeliverToken = jwt.verify(token, deliverKEY);

            if (!decodedDeliverToken) {
                req.isAuth = false;
                return next();
            }

            if (decodedDeliverToken.deliverId) {
                req.isAuthDeliver = true;
                req.deliverId = decodedDeliverToken.deliverId;
                return next();
            }

            }catch(err){
                req.isAuth = false;
                req.isAuthAdmin = false;
                req.isAuthDeliver = false;
                return next();
            }
        }
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    if (decodedToken.userId) {
        req.isAuth = true;
        req.userId = decodedToken.userId;

        return next();
    }
};