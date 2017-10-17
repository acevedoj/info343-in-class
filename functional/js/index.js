//tell vscode to do simple type checking
//while we are coding (has no effect at runtime)
// @ts-check

//put runtime interpreter into strict mode
"use strict";

/* FUNCTIONAL PROGRAMMING
Functional programming is a style of programming
based not on objects and methods, but on small,
generic, and reusable "pure" functions. A pure
function has these properties:
- they operate only on their inputs, and make no 
    reference to other data (e.g., variables at a 
    higher scope)
- they never modify their inputs—instead, they 
    always return new data or a reference to
    unmodified inputs
- they have no side effects outside of their outputs 
    (e.g., they never modify variables at a higher scope)
- because of these previous rules, they always return 
    the same outputs for the same inputs

Functional programming is possible in languages
like JavaScript that treat functions as values.
We can pass functions to other functions as
parameters, and even return functions from other
functions as the function's return value.
*/

/* THE DATA
The babynames_2016.js file defines one global
variable named BABYNAMES, which is set to an
array containing 32,868 objects. Each object
is a record reporting how many babies were
registered with the Social Security Administration
in 2016 with a particular name and biological sex.

Each object has the same 3 properties:
 - name: a first name
 - sex: the biological sex reported to the SSA
 - count: the number of babies registered with
          the SSA with that name and sex.
*/
console.log("there are %s records in the BABYNAMES array", 
    numeral(BABYNAMES.length).format("0,0"));

/* FILTERING
Every array has a .filter() method which takes a
predicate function as the first parameter. The 
.filter() function returns a new array containing
only those elements for which the predicate function
returned a truthy value
*/

//TODO: create predicate functions that we can
//use to filter the BABYNAMES array based on the
//value in the `sex` property of each object in
//the array


// This takes the Babynames array found in the babynames file
// and then uses the filter name and passes it a function that 
// it uses to filter. The array is then split into two array
// one for females and one for males.
/*
function isMale(record) {
    return record.sex === 'M';
}

function isFemale(record) {
    return record.sex === 'F';
}

let females = BABYNAMES.filter(isFemale);
let males = BABYNAMES.filter(isMale);
*/

/************As one function only, no redundancy*****************/
// Takes a character 'm' or 'f' and then returns a function
// that lets you filter.
// Makes the inputs lowercase so there is no errors. 
function isSex(sex) {
    let sexLower = sex.toLowerCase();
    return function(record) {
        return record.sex.toLowerCase() === sexLower;
    };
}

// Sends m or f to isSex which then returns a function
// that lets you filter. The function is then stored inside
// the variables. 
let isMale = isSex('M');
let isFemale = isSex('F');

// Uses the functions stored inside the above variables
// to pass to the filter function which then splits the 
// array into 2. 
let female = BABYNAMES.filter(isFemale);
let male = BABYNAMES.filter(isMale);


/**********************Count Under N for babies**********************************/
function countUnder(amount) {
    return function(record) {
        return record.count < amount;
    }
}

/******************************************************************* */
// A predicate is a smaller function, you can combine predicated to 
// make functions even nicer.
// Combininig 2 predicate functions

// Takes 2 functions, then returns a new predicate that
// says both predicate 1 and predicate 2 have to be true. 
function and(predicate1, predicate2) {
    return function(record) {
        return predicate1(record) && predicate2(record);
    }
}

// Uses the predicate functions to filter.
// Sends it then gets back a new filter predicate that it uses
// Here its isMale and count less than 100

let isMaleUnder100 = and(isMale, countUnder);
let isFemaleUnder100 = and(isFemale, countUnder);


/* SORTING
Every array also has a .sort() method, which takes
a comparator function as the first parameter.
The comparator function is passed two elements
at a time, and must return a negative number if
the first element is less than the second, 
a zero if they are equal to each other, or
a positive number if the first is greater than
the second.
*/

//TODO: create comparator functions we can use
//to sort the BABYNAMES array based on count
//and name

// Sort by count
function byCount(record1, record2) {
    return record1.count - record2.count;
}

// Sort by name 
function byName(record1, record2) {
    return record1.name.localeCompare(record2.name);
}

// Sort by count and by name
// You can tag sort() to the end of filter because
// filter just returns a new array and sort can be used on arrays

let sortedMales = BABYNAMES.filter(isMale).sort(byCount);
let sortedFemales = BABYNAMES.filter(isFemale).sort(byName);


//TODO: create a descending() function that
//wraps a comparator function to perform a
//descending sort instead of an ascending sort

function descending(comparator) {
    return function(record1, record2) {
        // comparator is a sorting comparator function
        // returns a new one that negates the result of
        // a comparator
        return -comparator(record1, record2);
    }
}

let byCountDescending = descending(byCount);
sortedMales = BABYNAMES.filter(isMale).sort(byCountDescending);

// Sort by count and then if the counts for something is the same
// we sort by name. 

function multiKey(comparator1, comparator2) {
    return function(record1, record2) {
        let result = comparator1(record1, record2);
        // If you sort and record 1 and 2 have the same 
        // values for the first comparison, aka if they're 
        // equal, then compare by the second comparator
        // else just return the first comparator result
        if (result === 0) {
            return comparator2(record1, record2);
        } else {
            return result;
        }
    }
}

byCountDescending = descending(byCount);
let byNameWithinCount = multiKey(byCountDescending, byName);
let malesByNameWithinCount = BABYNAMES.filter(isMale).sort(byNameWithinCount);


/* SLICING 
Every array has a .slice() method, which returns
a new array containing only a segment of the elements.
You provide the starting index, and the index to go
up to but not include.
*/

//TODO: use .slice() to get the top 10 female baby 
//name records

let top10Females = BABYNAMES.filter(isFemale)
    .sort(byCountDescending).slice(0, 10);

/* MAPPING
Every arrays also has a .map() method, which
accepts a transformer function. The .map() method
returns a new array of the same length as the source
array. It passes each element from the source array
into your transformer function as the first parameter.
Whatever you transformer function returns is put into
the output array.
*/

// A map transforms an array by giving it a function
// like adding +1 to each element for example
// Returns a new element and then map uses that 
// to do the task on the entire array

//TODO: use .map() to transform the top 10 female
//baby name records array into an array of strings
//containing just the names themselves

/* 
function getNames(record) {
    return record.name;
}

Better version
*/

function pluck(property) {
    return function(record) {
        return record[property];
    }
}

let pluckName = pluck("name");
let pluckCount = pluck("count");

//TODO: use .map() to transform those top 10
//names into all lower case

function getLowercase(record) {
    return record.name.toLowerCase();
}

//console.log(top10Females.map(getNames));

/* REDUCING
Every array also has a .reduce() method, which
allows you to reduce an array of elements down
to a single value. For example, you can reduce
an array of numbers down to their sum, or down
to the maximum value in the array.
*/

/**
 * Generates `amount` random integers between
 * 0  and `max` and returns them as a new array.
 * @param {number} amount 
 * @param {number} max 
 * @returns {number[]}
 */
function randomIntegers(amount, max) {
    let randoms = [];
    for (let i = 0; i < amount; i++) {
        randoms.push(Math.round(Math.random() * max))
    }
    return randoms;
}

/**
 * A reducer function to calculate the sum of
 * an array of numbers. This will be called once
 * for each number in the source array. It should
 * add `num` to `accumulator` and return `accumulator`.
 * @param {number} accumulator - the accumulator value
 * @param {number} num - the next number in the array
 * @returns {number} - the updated accumulator
 */
function sum(accumulator, num) {
    return accumulator + num;
}

//TODO: use randomIntegers() to generate an array of 
//random integers and use .reduce() with sum*() to
//calculate the sum of those integers.

let randoms = randomIntegers(10, 100);
console.log(randoms.reduce(sum, 0));

//TODO: now define a max() reducer that reduces
//an array of numbers to their maximum value.
//Then use that with .reduce() to find the 
//maximum value in an array of random integers.

// Takes n1, n2. Returns n2 if its > n1, else n1.
// Basically, it gets passed to reduce. Compares which is bigger
// and then passes the bigger value as the new number aka accumalator
function max(n1, n2) {
    return n2 > n1 ? n2 : n1;
}

console.log(randoms.reduce(max, randoms[0]));

//TODO: given that a JavaScript object is really
//just a map from strings to values, and given
//that the keys in such a map act like a distinct
//set (e.g., you can't add the same key twice),
//create a reducer that calculates how many times
//a given baby name appears in the BABYNAMES array.
//Some names are used for both males and females, so
//those names will have a count of 2, while names
//used exclusively for males or females will have
//a count of 1. Use a JavaScript object as the
//accumulator value. Use .hasOwnProperty() on the
//accumulator object to test whether it has the
//`name` property from the current record as a 
//key already. If not, add it to the object with
//an associate value of 0. Then increment the value
//and return the accumulator.

/**
 * Reducer for counting how many times a name
 * appears in the array of baby name records
 * @param {Object} nameMap 
 * @param {BabyNameRecord} record 
 * @returns {Object}
 */
function countNames(nameMap, record) {
    if (!nameMap.hasOwnProperty(record.name)) {
        nameMap[record.name] = 0;
    }
    nameMap[record.name]++;
    return nameMap;
}

//TODO: use the countNames reducer to generate
//an object containing all the distinct names 
//as keys, with values representing the number of
//times that name appeared in the array.

// Pass it an array of objects.
BABYNAMES.reduce(countNames, {});

//TODO: use Object.keys() to get all of the distinct
//names as an array of strings

let nameArray = Object.keys(BABYNAMES.reduce(countNames, {}));

//TODO: filter that array of keys so that you end
//up with only the names that appeared twice,
//which will be all the names that were used for
//both male *and* female babies.

function only2(record) {
    return record == 2;
}

let repeatedNames = nameArray.filter(only2);
console.log(repeatedNames);