import clientPromise from "@/lib/mongodb";
var jwt = require('jsonwebtoken');


export default async function handler(req,res){
    
    if (req.method == "POST"){
        let email = req.body.email;
        let password = req.body.password
    try{
        let client = await clientPromise
        let db = client.db("CloudData")
        let users = db.collection("users")
        let user = await users.findOne({"email" :email})
        if(user){
            let savedpassword = user.password
            if (password === savedpassword){
                
                if (user.isverified){
                    res.status(200).json({"login" : "success", "email" : user.email, "name" : user.name})
                }else{
                    res.json({"login" : "accountNotVerified"})
                }

            }else{
                res.json({"login" : "incorrectpassword"})
            }
        }else{
            res.json({"login" : "noaccount"})
        }
        
    }catch{
        res.status(400).json({error : "error"})
    }
}else{
    res.status(400).json({error : "This type of request is not allowed"})
}
}
    
