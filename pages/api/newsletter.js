import { connectDatabase, insertDocument } from '../../helpers/db-util';

// will allow to send request to https://domainname.com/api/emails
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // check email ipput
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;

    try {
      // connect to mongoDB database
      client = await connectDatabase();
    } catch (error) {
      // status 500 indicates smth went wrong w/ server
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      //disconnect from db client
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // status 201 means success
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
