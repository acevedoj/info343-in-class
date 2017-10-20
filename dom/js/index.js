// @ts-check
"use strict";

//how many records to display at a time
const PAGE_SIZE = 100;

//references to the previous/next page <button>s
//the crazy `@type {HTMLButtonElement}` stuff tells vscode
//that the element we get back from querySelector() is not
//just any-old element, but a <button> element specifically.
//This allows us to use button-specific properties,
//like `.disabled`, without vscode showing type errors.'
//this has no effect at runtime, but will help us catch
//errors while coding.
const PREV_PAGE_BUTTON = /** @type {HTMLButtonElement} */(document.querySelector("#prev-page"));
const NEXT_PAGE_BUTTON = /** @type {HTMLButtonElement} */(document.querySelector("#next-page"));

//reference to the <input id="name-filter">
//here we again tell vscode that this is an <input>
//element specifically, so that we don't see errors
//when referring to the input-specific `.value` property.
const NAME_FILTER_INPUT = /** @type {HTMLInputElement} */(document.querySelector("#name-filter"));

//references to the <span id="current-page">
//and <span id="total-pages"> elements.
//these don't require any type declarations because
//there are no span-specific properties we need
//to reference.
const CURRENT_PAGE = document.querySelector("#current-page");
const TOTAL_PAGES = document.querySelector("#total-pages");

//sort records by name ascending
BABYNAMES.sort(function(rec1, rec2) {
    return rec1.name.localeCompare(rec2.name);
});

//our program's state
//At the heart of every program, including
//a web application, is a set of values known
//as the program's state. The UI is rendered
//based on the current value of this state.
//When the state changes, we re-render the UI.
//User actions trigger changes to the state, which
//triggers a re-render of the UI.
let state = {
    records: BABYNAMES, //the records to render (might be filtered)
    currentPage: 0      //the current page we are showing
};

//TODO: implement functions to render the current state
//to the page as new <tr> and <td> elements within the
//<tbody> element that is already in the page.

/**
 * 
 * @param {*} name - name of the dom element
 * @param {*} value - value to put inside the element
 * @param {*} className - classname to give the element
 */
// Creates a specified element, passed in as a string
// ex: "tr", "p", "td". And uses a passed in value
// to set the new element inner text equal to that value
// If a class is specified, it uses that class and sets the class
// of the element to that same class.
function createElem(name, value, className) {
    let element = document.createElement(name);
    element.textContent = value;
    if (className) {
        element.className = className;
    }
    return element;
}

/**
 * Creates a table row that returns the tr element
 * @param {*} record a single record for the table body
 */
// Creates a row for the table, creates a tr element then calls
// the createelem functino that makes 3 more elements. It makes
// 3 td elements and then appends them to the created tr element
// and then returns the row.
function createRow(record) {
    let row = document.createElement("tr");
    row.appendChild(createElem("td", record.name, ""));
    row.appendChild(createElem("td", record.sex, ""));
    row.appendChild(createElem("td", record.count, ""));
    return row
}

// The render function is what displays everything. It takes in the
// state variable which is declared at the top. 
// Its in the form of an object
// let State = {
//    record = BABYNAMES, 
//    currentPage : 0
// }
// Basically its a contructor like in java. THe record is the 
// array of baby name objects and is saved as 'record
// the current page is just gonna be the page we are viewing. 
// The function below makes calls to the record.x and record.currentpage
// 
function render(state) {
    // Creates a variable for the body of the table so easy access
    let tbody = document.querySelector("tbody");
    //Sets the inner text of the table to be empty to clear it
    tbody.textContent = "";

    // Finds total amount of possible pages. Gets max # of entries
    // in baby names and divides by the final constant on top called
    // page size. 
    let totalPages = Math.ceil(state.records.length / PAGE_SIZE);
    // Gets the index of where to start getting the baby name
    // records. So if its page 2, it'll get the entries from 
    // 2 * 100.
    let startingIndex = state.currentPage * PAGE_SIZE;
    // Makes a new array called pagerecords that slices the bigger 
    // baby names array and gets the data from a starting and ending index
    // So for ex, From 200 to 300. So it gets ONLY the data we need
    let pageRecords = state.records.slice(startingIndex, startingIndex + PAGE_SIZE);
    // FOr loop that uses the new array we created that contains only 
    // the needed data (ex: indexes 100-200). It then uses the table body
    // and appends new rows to it by calling the createrow function.
    // The createRow record takes in a single object as a parameter
    // so here we are giving it the object at pageRecords[i]. So we send
    // each object to the createRow function, which returns the row
    // and is appended to the table body.
    for (let i = 0; i < pageRecords.length; i++) {
        tbody.appendChild(createRow(pageRecords[i]));
    }

    // The current page is a variable that is saved using queryselector
    // This saves the element to a variable. The inner text of the element
    // is set to the currrent page of state.
    CURRENT_PAGE.textContent = state.currentPage + 1;
    // The total pages is again a saved element, the inner text
    // is set as the total pages and converted to a string
    TOTAL_PAGES.textContent = totalPages.toString();
    // The prev button is disabled when the current page is 0.
    PREV_PAGE_BUTTON.disabled = state.currentPage === 0;
    // Next button is disabled when there is no more pages, when it's
    // max pages - 1. End of array basically.
    NEXT_PAGE_BUTTON.disabled = state.currentPage === totalPages - 1;
}

// This calls the render function and basically displays everything
// and updates the data. 
render(state);

//TODO: listen for the "click" event raised by the 
//prev/next page buttons, mutate the state.currentPage,
//and re-render

PREV_PAGE_BUTTON.addEventListener("click", function() {
    state.currentPage--;
    render(state);
});

NEXT_PAGE_BUTTON.addEventListener("click", function() {
    state.currentPage++;
    render(state);
});

//TODO: listen for the "input" event raised by the
//name filter <input> element, filter the state.records,
//and re-render
NAME_FILTER_INPUT.addEventListener("input", function() {
    // Gets the value of the stuff that was input into the text
    // field
    let value = NAME_FILTER_INPUT.value.trim().toLowerCase();
    // Sets the records object of the state to the Baby names array
    // that is filtered with a new anonymous function
    // The new function takes a record object and then returns 
    // the names that start with the input text.
    state.records = BABYNAMES.filter(function(record) {
        return record.name.toLowerCase().startsWith(value);
    });
    // Sets the current page to 0
    state.currentPage = 0;
    // Re renders the page
    render(state);
})
