const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(cors());// Enable CORS for all routes
app.use(express.static('public')); // Serve static files from the "public" directory


app.get('/answers', (req, res) => { // Serve the answers.json file
    res.sendFile(path.join(__dirname,'api','answers.json'));
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
// Don't forget to copy your "api" directory and contents as well