const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/download', (req, res) => {
    const videoUrl = req.body.url;
    const format = req.body.format;
    const output = `public/downloads/video.${format}`;

    let command = `youtube-dl -o ${output} ${videoUrl}`;
    if (format === 'mp3') {
        command = `youtube-dl --extract-audio --audio-format mp3 -o ${output} ${videoUrl}`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.json({ success: false });
        }
        res.json({ success: true, file: `/${output}` });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});