// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Card from "../models/cards";

// Global Config
export const cardsRouter = express.Router();

cardsRouter.use(express.json());

// GET


cardsRouter.get("/alive", async (_req: Request, res: Response) => {
    res.status(200).send("alive");
});

cardsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const cards = (await collections.cards?.find({}).toArray()) as Card[];

        res.status(200).send(cards);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
});

cardsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const card = (await collections.cards?.findOne(query)) as Card;

        if (card) {
            res.status(200).send(card);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST

cardsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newCard = req.body as Card;
        const result = await collections.cards?.insertOne(newCard);

        result
            ? res.status(201).send(`Successfully created a new card with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new card.");
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT

cardsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedCard: Card = req.body as Card;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.cards?.updateOne(query, { $set: updatedCard });

        result
            ? res.status(200).send(`Successfully updated card with id ${id}`)
            : res.status(304).send(`Card with id: ${id} not updated`);
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE

cardsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.cards?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed card with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove card with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Card with id ${id} does not exist`);
        }
    } catch (error:any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});