import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express, { Request, Response } from 'express';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // ensure JSON body is parsed

app.get('/menu', async (req: Request, res: Response) => {
  try {
    const doc = await db.collection('menu').doc('data').get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    res.status(500).send('Error getting menu');
  }
});

app.post('/menu', async (req: Request, res: Response) => {
  try {
    await db.collection('menu').doc('data').set(req.body);
    res.status(200).send('Menu updated');
  } catch (error) {
    res.status(500).send('Error updating menu');
  }
});

exports.api = functions.https.onRequest(app);
