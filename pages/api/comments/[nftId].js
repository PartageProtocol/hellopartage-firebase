import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

async function handler(req, res) {
  const nftId = req.query.nftId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  // post event through API
  if (req.method === "POST") {
    // collect client-side data
    const { email, name, text } = req.body;
    //add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      // status 422 stands for invalid input
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      nftId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  // get comments through API
  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;

/*
import { getNftComments, postComment, validateEmail, validateText, validateName } from "../../../helpers/api-util";
import validator from "validator";

async function handler(req, res) {
  const nftId = req.query.nftId;


  // post event through API
  if (req.method === "POST") {
    // collect client-side data
    const { email, name, text } = req.body;
    //add server-side validation

    const sanitizedName = validateName(name);
    const sanitizedText = validateText(text);
    const validEmail = validateEmail(email);

    if (
      name === "" ||
      text === "" ||
      !validator.isInt(nftId, { min: 0 }) ||
      validEmail === ""
    ) {
      // status 422 stands for invalid input
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email: validEmail,
      name: sanitizedName,
      text: sanitizedText,
      nftId: nftId,
    };
    let result;

    try {
      result = await postComment(newComment);
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  // get comments through API
  if (req.method === "GET") {
    try {
      const documents = await getNftComments(nftId);
      console.log(documents)
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }
}

export default handler;
*/