/**********************************************************************************************************************
 * Program............:Dictionary API
 * Programmers........: Ben Stearns
 * Date...............: 4-24-26
 * GitHub Repo........: https://github.com/bstearns07/DictionaryAPI
 * Program Summary....: a JavaScript web application that uses a node express server to serve an application that
 *                      looks up the dictionary information of a word entered by the user. The server utilizes the
 *                      Free Dictionary API to retrieve the dictionary information.
 * File Description...: defines the logic and functionality for running the application interface
 **********************************************************************************************************************/

"use strict";

/**********************************************************************************************************
* A Function that returns the first DOM element matching a given CSS selector
*
*@param {string} selector The CSS selector you wish to search for
*
*@returns {Element | null} The first DOM element matching the given selector, or null if none are found
**********************************************************************************************************/
const $ = selector => document.querySelector(selector);

// cache dom elements
const lookupBtn = $("#lookup")
const userInputEl = $("#word");
const errorEl = $("#error");
const responseErrEl = $("#response-error");
const tableHeaderEl = $("#word-header");
const tableBodyEl = $("#definitions");
const pronunciationText = document.getElementById("pronunciation-text");
const playBtn = document.getElementById("play-audio");

/**********************************************************************************************************
* A Function that handles the click event for the "Lookup" button
*
* Attempts to make an API call to the dictionary API to look up the dictionary information of the user's
* entered word and return the results of the response and populate the table with the information
*
*@returns {void}
 **********************************************************************************************************/
const lookupClick = async () => {
    const url = "/";    // url for the server in the root of the project directory to handle api requests
    let currentAudio = null;

    // clear the screen of previous information and errors and get user input
    ClearScreen();
    const word = userInputEl.value;

    // if the user didn't enter anything, display an error
    if (word.trim() === "") {
        errorEl.textContent = "Please enter a valid dictionary word";
    }
    //otherwise proceed to try to make an api call with the user's entered word
    else {
        try {
            //call the api using a fetch to the api url with the user's word added to the url
            const response = await fetch(url + word);

            /* if the request was rejected throw an error and break from the function
               otherwise parse the response into a JSON object for easier functionality*/
            if (!response.ok) {
                throw new Error("Word not found");
            }
            const data = await response.json();

            // get the pronunciation text and url for the audio file if found
            const phoneticText = data.phonetics?.find(p => p.text)?.text;
            const audioURL = data.phonetics?.find(p => p.audio)?.audio;

            // if an audio url was found, reveal the play button and create a click event for it
            if (audioURL) {
                playBtn.classList.remove("hidden");
                playBtn.onclick = () => {
                    // if audio is still playing, pause it and rewind to the beginning
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                    //create an audio object from the url and play it
                    currentAudio = new Audio(audioURL);
                    currentAudio.play();
                };
            } else {
                playBtn.classList.add("hidden");
            }

            // Define the content of headers with the response data returned
            tableHeaderEl.textContent = "Word: " + data.word;
            pronunciationText.textContent = `Pronunciation: ${phoneticText|| "None Found"}`;

            // loop through each definition meaning returned, create a table row for each entry, and append to table
            data.meanings.forEach(meaning => {
                meaning.definitions.forEach(def => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                    <td>${meaning.partOfSpeech}</td>
                    <td>${def.definition}</td>
                    <td>${def.example || "—"}</td>
                `;

                    tableBodyEl.appendChild(row);
                });
            });
        // catch any errors that may occur by displaying to the interface
        } catch (e) {
            responseErrEl.textContent = "Error: " + e.message;
        }
    }
    userInputEl.focus(); // shift focus back to user input element
    userInputEl.select();// select all text for easier reuse
}

/**********************************************************************************************************
 * A Function that clears the interface of any previous information and errors each time the Lookup
 * button is pressed
 *
 * @returns {void}
 **********************************************************************************************************/
const ClearScreen = () => {
    errorEl.textContent = "";
    responseErrEl.textContent = "";
    tableBodyEl.innerHTML = "";
    pronunciationText.textContent = "Pronunciation: -";
}

// add click event handler when the DOM is loaded and Enter keypress support
document.addEventListener("DOMContentLoaded", () => {
    userInputEl.focus();
    lookupBtn.addEventListener("click", lookupClick);
    userInputEl.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            lookupClick();
        }
    });
})
