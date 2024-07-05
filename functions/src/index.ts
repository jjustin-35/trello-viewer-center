import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const getTrelloCredentials = functions.https.onRequest(
  async (_, res) => {
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
  }
);

export const setTrelloCredentials = functions.https.onRequest(
  async (req, res) => {
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
  }
);
