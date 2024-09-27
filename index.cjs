const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

async function connectdb() {
    try {
        await mongoose.connect('mongodb+srv://Dheena:dheena123@cluster0.ser6ewc.mongodb.net/Placement?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to DB");
    } catch (e) {
        console.log("Error in connecting to DB: " + e);
    }
}

const hexSchema = new mongoose.Schema({
    id: Number,
    name: String,
    mailid: String,  // Correct field name in schema
    college: String,
    cluster: String,
    Date: String,
    Mode: String
});

const Hexaware = mongoose.model('Hexaware', hexSchema);
connectdb();

// Define the /getdet route
app.get('/getdet', async (req, res) => {
    const { mailid } = req.query; // Get the mailid from query parameters
    try {
        const details = await Hexaware.findOne({ mailid: mailid }); // Find the document by mailid
        if (details) {
            res.status(200).json(details); // Send back the found details
        } else {
            res.status(404).json({ message: 'No details found for this mailid' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
