import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from "dotenv"
import { stockSchema } from "./zod/zodTypes.js";
import prisma from "./db/prisma.js";
import { ZodError } from 'zod';
config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


// Health check endpoint
app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
})


// adding stock into the watchlist 
app.post("/api/stock", async (req: Request, res: Response) => {
    try {
        const parsedData = stockSchema.parse(req.body);

        let stock = await prisma.stock.findUnique({
            where: {
                name: parsedData.name
            }
        });

        if (!stock) {
            stock = await prisma.stock.create({
                data: {
                    name: parsedData.name
                }
            });
            res.status(200).json({
                message: "Stock added to watchlist",
                data: stock
            });

            return;
        }

        res.status(200).json({
            message: "Stock already in watchlist",
            data: stock
        });

    } catch (e) {
        if (e instanceof ZodError) {

            const { fieldErrors, formErrors } = e.flatten();
            return res.status(400).json({
                message: "Validation error",
                fieldErrors,
                formErrors
            });
            return;
        }
        res.status(500).json({
            message: "Internal server error",
            error: e
        });

    }
})

// getting all stocks in the watchlist
app.get("/api/stock", async (req: Request, res: Response) => {
    try {
        const stocks = await prisma.stock.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.status(200).json({
            message: "Stocks retrieved successfully",
            data: stocks
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e
        });
    }
});

// deleting stocks from the watchlist
app.delete("/api/stock/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const stock = await prisma.stock.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!stock) {
            return res.status(404).json({
                message: "Stock not found"
            });
        }

        await prisma.stock.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({
            message: "Stock removed from watchlist",
            data: stock
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

