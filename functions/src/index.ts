import { onRequest } from "firebase-functions/v2/https";
import { defineString } from "firebase-functions/params";
import axios from "axios";
import config from "./config";
import apiPath from "./constants/apiPath";
import cors from "./constants/cors";

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  labels: { name: string }[];
  due: string | null;
  dueComplete: boolean;
}

const apiKey = defineString("TRELLO_API_KEY");
const apiToken = defineString("TRELLO_API_TOKEN");

export const getTrelloCards = onRequest({
  cors,
}, async (_, res) => {
  try {
    const { data } = await axios.get<TrelloCard[]>(
      `${config.TRELLO}${apiPath.GET_BOARD_CARDS}`,
      {
        params: {
          key: apiKey,
          token: apiToken,
          fields: "name,desc,due,dueComplete,labels",
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
