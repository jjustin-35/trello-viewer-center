import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

const corsPolicy = {
  cors: ["http://localhost:3000"],
};

export const getTrelloCredentials = onRequest(corsPolicy, async (_, res) => {
  try {
    const doc = await db.collection("credentials").doc("trello").get();
    if (!doc.exists) {
      res.status(404).send("No credentials found");
      return;
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

export const setTrelloCredentials = onRequest(corsPolicy, async (req, res) => {
  const { api_key, api_token } = req.body;
  try {
    await db
      .collection("credentials")
      .doc("trello")
      .set({ api_key, api_token });
    res.status(200).send("Credentials saved successfully");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
