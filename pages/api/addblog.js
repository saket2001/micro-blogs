import { MongoClient } from "mongodb";

export async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // getting data
      const data = req.body;

      console.log(data);

      // connecting to db
      const client = await MongoClient.connect(
        "mongodb+srv://saket:U2Gtn89hElJqtddM@cluster0.4vwbi.mongodb.net/allblogs?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      const db = client.db("microblogs");

      // creating a table/collection
      const blogsCollections = db.collection("blogs");

      // adding to table
      const result = blogsCollections.insertOne(data);
      console.log(result);

      client.close();

      res.status(200).json({ result: "Blog added " });
    } catch (err) {
      alert(err);
    }
  }
}
