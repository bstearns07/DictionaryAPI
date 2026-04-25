/**********************************************************************************************************************
 * Program............:Dictionary API
 * Programmers........: Ben Stearns
 * Date...............: 4-24-26
 * GitHub Repo........: https://github.com/bstearns07/DictionaryAPI
 * Program Summary....: a JavaScript web application that uses a node express server to serve an application that
 *                      looks up the dictionary information of a word entered by the user. The server utilizes the
 *                      Free Dictionary API to retrieve the dictionary information.
 * File Description...: serves the HTML and CSS files for the application and handles all API requests
 **********************************************************************************************************************/

const express = require("express");
const app = express();

// Serves the public folder automatically + tailwind's output.css file
app.use(express.static("public"));
app.use("/src", express.static("src"));

// define how the server handles requests for the project root + a required word parameter
app.get("/:word", async (req, res) => {

    // try to get the word parameter from the post request and make an api call with that word
    // if the request was rejected return a JSON object of a 404 error and error message
    // otherwise, parse the response into a JSON object for easier functionality
    // finally, return a custom object with only the data information needed
    // catch all errors by returning a 500 error JSON object with the error message
    try {
        const word = req.params.word;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        if (!response.ok) {
            return res.status(404).json({ error: `Word Not Found ${word}` });
        }

        const data = await response.json();
        console.log(data);

        res.json({
            word: data[0].word,
            phonetics: data[0].phonetics,
            meanings: data[0].meanings,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server Error: " + error.message });
    }
})

// log that the server is running when lauched to confirm it's running
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
