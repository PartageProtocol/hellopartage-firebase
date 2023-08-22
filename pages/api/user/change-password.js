import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({message: 'Password updated.'})
}

export default handler;

/*
import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { getUserByEmail, changePassword } from "../../../helpers/api-util";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const usersCollection = await getUserByEmail(userEmail)

  const user = usersCollection[0];

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    return;
  }

  const hashedPassword = hashPassword(newPassword);

  const result = await changePassword(
    { email: userEmail, password: hashedPassword });

  res.status(200).json({message: 'Password updated.'})
}

export default handler;
*/