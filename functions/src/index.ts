import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";
import axios from "axios";
import config from "./config";
import apiPath from "./constants/apiPath";

interface TrelloCredentials {
  api_key: string;
  api_token: string;
}

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  labels: { name: string }[];
  due: string | null;
  dueComplete: boolean;
}

admin.initializeApp();

const db = admin.firestore();

const corsPolicy = {
  cors: [config.LOCALHOST],
};

export const getTrelloCards = onRequest(corsPolicy, async (_, res) => {
  try {
    const doc = await db.collection("credentials").doc("trello").get();
    if (!doc.exists) {
      res.status(404).send("No credentials found");
      return;
    }

    const { api_key, api_token } = doc.data() as TrelloCredentials;

    const { data } = await axios.get<TrelloCard[]>(
      `${config.TRELLO}${apiPath.GET_BOARD_CARDS}`,
      {
        params: {
          key: api_key,
          token: api_token,
          fields: "name,desc,due,dueComplete,labels",
        },
      }
    );

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
