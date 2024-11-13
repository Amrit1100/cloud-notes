import clientPromise from "@/lib/mongodb";
import transporter from "@/lib/email";
import crypto from "crypto"

export default async function handler(req,res){
    let client;
    let db;
    let users;
    if (req.method == "POST"){
        let name = req.body.name
        let email = req.body.email;
        let password = req.body.password
        let cpassword = req.body.cpassword

        if (!name || !email || !password || !cpassword ){
            res.json({"signup" : "allrequired"})
        }else{
            try{
                client = await clientPromise
                db = client.db("CloudData")
                
            }catch{
                res.status(400).json({error : "Error connecting to database"})
            }
            users = db.collection("users")
            let user = await users.findOne({"email" :email})
                if(user){
                res.json({"signup" : "alreadyhaveaccount"})
                }else{
                    if (password != cpassword){
                        res.json({"signup" : "passwordnotmatching"})
                    }else{
                        let token = crypto.randomBytes(32).toString("hex")
                        let verification_link = `https://cloud-notes-one.vercel.app/api/verify-email?token=${token}`
                        await users.insertOne({
                            "name" : name,
                            "email" : email,
                            "password" : password,
                            "token" : token,
                            "isverified" : false
                        })
            
                        try{
                            await transporter.sendMail({
                                from : "cloudnotes65@gmail.com",
                                to : email,
                                subject : "Verify your Cloud Notes Account",
                                html : `<p>Hi ${name}, <p>
                                        <p> Please verify your Cloud Notes account by clicking the click below </p>
                                        <p style = "color : red;"> Please dont click the link below if you are not trying to create an account on Cloud Notes</p>
                                        <a href = ${verification_link}>Verify your email<a> 
                                `
                            })
                            res.status(200).json({"success" : true})
                        }catch(error){
                            console.log(error)
                        }
                    }
                   
                }
        }
        
   
       
    }else{
        res.status(400).json({error : "This type of request is not allowed."})
    }
}
