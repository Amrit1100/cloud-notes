import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method == "POST"){
        let client;
        let db;
        let email = req.body.email
        if (email == null){
            res.json({error : "null"})
        }else{
            try {
                client = await clientPromise
                db = client.db("Cloud-Users")
            }catch(error){
                console.log(error)
            }
            let notesCollection = db.collection("User-Notes")
            let usernotes = await notesCollection.find({email}).toArray()
            res.status(200).json({usernotes})
        }
        
    }else{
        res.status(400).json({"error" : "This type of request is not allowed"})
    }
  }