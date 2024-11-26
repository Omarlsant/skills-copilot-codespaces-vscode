// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            res.send(data);
        }
    });
});

// Add a comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Server error');
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Server error');
                } else {
                    res.send('Comment added');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});