import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    if (req.method == "POST"){
    let id = req.body.id
    let client
    let db
    try {
        client = await clientPromise
        db = client.db("Cloud-Users")
    }catch(error){
        console.log(error)
    }
    
        let notescollection =  db.collection("User-Notes")
        let newid = new ObjectId(id)
        let result  = await notescollection.deleteOne({_id : newid})
        if (result.deletedCount === 1) {
            res.status(200).json({ success: "note deleted" });
          } else {
            res.status(404).json({ error: "Note not found" });
          }
    }else{
        res.status(400).json({"error" : "This type of request is not allowed"})
    }
    
}