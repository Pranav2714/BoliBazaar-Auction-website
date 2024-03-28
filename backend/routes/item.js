const express = require('express');
const router = express.Router();
const AuctionItem = require('../models/AuctionItem');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All Auction Items: GET "/api/auctionItems"
router.get('/', async (req, res) => {
    try {
        const auctionItems = await AuctionItem.find();
        res.json(auctionItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Auction Item: POST "/api/auctionItems"
router.post('/', [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('seller', 'Seller ID is required').notEmpty(),
    body('startingBid.amount', 'Starting bid amount is required').notEmpty().isNumeric(),
    body('startingBid.currency', 'Starting bid currency is required').notEmpty(),
    body('endTime', 'End time is required').notEmpty().isISO8601(),
    body('category', 'Category is required').notEmpty(),
    body('condition', 'Condition is required').notEmpty(),
    body('images', 'Images array is required').isArray({ min: 1 }),
    body('location.city', 'City is required').notEmpty(),
    body('location.country', 'Country is required').notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, seller, startingBid, endTime, category, condition, images, location } = req.body;

        const auctionItem = new AuctionItem({
            title,
            description,
            seller,
            startingBid,
            endTime,
            category,
            condition,
            images,
            location
        });

        const savedAuctionItem = await auctionItem.save();
        res.json(savedAuctionItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Auction Item: PUT "/api/auctionItems/:id"
router.put('/:id', async (req, res) => {
    try {
        const { title, description, startingBid, currentBid, endTime, category, condition, images, location, finalBuyer, currentBuyer, dealClosed } = req.body;
        const updatedAuctionItem = await AuctionItem.findByIdAndUpdate(req.params.id, {
            $set: {
                title,
                description,
                startingBid,
                currentBid,
                endTime,
                category,
                condition,
                images,
                location,
                finalBuyer,
                currentBuyer,
                dealClosed
            }
        }, { new: true });

        if (!updatedAuctionItem) {
            return res.status(404).send("Auction item not found");
        }

        res.json(updatedAuctionItem);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete an existing Auction Item: DELETE "/api/auctionItems/:id"
router.delete('/:id', async (req, res) => {
    try {
        const deletedAuctionItem = await AuctionItem.findByIdAndDelete(req.params.id);
        if (!deletedAuctionItem) {
            return res.status(404).send("Auction item not found");
        }
        res.json({ message: "Auction item deleted successfully", deletedAuctionItem });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
