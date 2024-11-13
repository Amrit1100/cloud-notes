import clientPromise from "@/lib/mongodb"


export default async function handler(req, res) {
    if (req.method == "POST"){
        let title = req.body.title
        let hastags = req.body.hastags
        let description = req.body.description
        let name = req.body.name
        let email = req.body.email
        let client;
        let db;
        if (!title){
            res.json({"res" : "titleRequired"})
        }else{
            try{
                client = await clientPromise
                db = client.db("CloudData")
              }catch(error){
                  console.log(error)
              }
        
            let notes = db.collection("User-Notes")
            await notes.insertOne({
              "title" : title,
              "hastags" : hastags,
              "description" : description,
              "email" : email,
              "name" : name
            })
    
            res.status(200).json({"res" : "success"})
        }
        
    }else{
        res.status(400).json({error : "This type of request is not allowed."})
    }
    
  }
  
