import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { collections } from "../db/database.service";
import Videocamera from "../db/videocamera";
import { retrieve_data } from "../db/retrieve";

export const videocamerasRouter = express.Router();
videocamerasRouter.use(express.json());
// *specify a name for collection

/*
for (let i in collection) {
  let dec_latitude = handling(collection[i].latitude);
} */
dotenv.config();
// This section will help you get a list of all the records.
videocamerasRouter.get("/", async (req: Request, res: Response) => {
  const DMS_coordinates = await retrieve_data();
  console.log("Array of cities: ", DMS_coordinates);
  res.send(DMS_coordinates).status(200);
});

// This section will help you get a single record by id
videocamerasRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const videocamera = (await collections.cities?.findOne(query)) as unknown as Videocamera;
        if (videocamera) {
            res.status(200).send(videocamera);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// This section will help you create a new record.
videocamerasRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newVideocamera = req.body as Videocamera;
        const result = await collections.cities?.insertOne(newVideocamera);

        result
            ? res.status(201).send(`Successfully created a new videocamera with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new videocamera.");
    } catch (error) {
        console.error(error);
        if (error instanceof Error)
            res.status(400).send(error.message);
    }
});

// This section will help you update a record by id.
videocamerasRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedGame: Videocamera = req.body as Videocamera;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.cities?.updateOne(query, { $set: updatedGame });

        result
            ? res.status(200).send(`Successfully updated videocamera with id ${id}`)
            : res.status(304).send(`Videocamera with id: ${id} not updated`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});

// This section will help you delete a record
videocamerasRouter.delete("/:id", async (req, res) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.cities?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed videocamera with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove videocamera with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Videocamera with id ${id} does not exist`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});