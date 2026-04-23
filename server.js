const express = require("express");
const app = express();

// Serves the public folder automatically + tailwind's output.css file
app.use(express.static("public"));
app.use("/src", express.static("src"));

app.get("/:word", async (req, res) => {

    try {
        const word = req.params.word;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (!response.ok) {
            return res.status(404).json({ error: `Word Not Found ${word}` });
        }

        const data = await response.json();

        res.json({
            word: data[0].word,
            origin: data[0].origin,
            meanings: data[0].meanings,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server Error: " + error.message });
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
