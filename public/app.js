"use strict";

import {response} from "express";

/**********************************************************************************************************
* A Function that returns the first DOM element matching a given CSS selector
*
*@param {string} selector The CSS selector you wish to search for
*
*@returns {Element | null} The first DOM element matching the given selector, or null if none are found
**********************************************************************************************************/
const $ = (selector) => {
    return document.querySelector(selector);
}

// cache dom elements
const lookupBtn = $(".lookup")
const userInputEl = $(".word");
const errorEl = $(".error");
const responseErrEl = $(".response-error");
const tableHeaderEl = $(".word-header");
const tableBodyEl = $(".definitions");

/**********************************************************************************************************
* A Function that handles the click event for the "Lookup" button
*
* Attempts to make an API call to the dictionary API to look up the dictionary information of the user's
* entered word and return the results of the response and populate the table with the information
*
*@returns {void}
 **********************************************************************************************************/
const lookupClick = async () => {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    // get user input
    const word = userInputEl.value;

    // if the user didn't enter anything, display an error
    if (word.trim() === "") {
        errorEl.textContent = "Please enter a valid dictionary word";
    }
    //otherwise proceed to try to make an api call with the user's entered word
    else {
        try {
            //call the api using a fetch to the api url with the user's word added to the url
            const response = await fetch(url + word)

            // if the response was rejected throw an error
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch(e) {
            responseErrEl.textContent = "Error finding word information: " + e.message;
        }

        // parse response into a JSON object, create a table row entry, and append to the table
        const data = await response.json();
        const row = document.createElement("tr");
        tableHeaderEl.textContent = data.word;
        row.innerHTML = `
                <td>${data.meanings.partOfSpeech}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
            `;
    }
}

// add click event handler when the DOM is loaded and Enter keypress support
document.addEventListener("DOMContentLoaded", () => {
    lookupBtn.addEventListener("click", lookupClick);
    userInputEl.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            lookupClick();
        }
    });
})


// async function loadStudents() {
//
//     try {
//         status.textContent = "Loading...";
//         studentBody.innerHTML = "";
//
//         const response = await fetch("/students");
//
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//
//         const students = await response.json();
//
//         students.forEach(student => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                 <td>${student.id}</td>
//                 <td>${student.name}</td>
//                 <td>${student.grade}</td>
//             `;
//             studentBody.appendChild(row);
//         });
//
//         status.textContent = `${students.length} students loaded!`;
//
//     } catch (error) {
//         status.textContent = "Error loading students: " + error.message;
//         console.error(error);
//     }
// }