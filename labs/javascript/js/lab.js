(function () {
    let phrase = `I like JavaScript more than I like to party.`;

    console.log("I like to party");
    
    let phrase2 = "I love the University of Washington";
    
    console.log(phrase2);
    
    let bigPhrase = phrase + " " + phrase2;
    
    console.log(bigPhrase);

    console.log(sum(5));

    console.log(vowelCount("hello"));

    let arr = [-1, 3.2, 12, 15, -4, 1, -12.5, 1, 8];
    console.log(findMin(arr));

    let wordArr = ["Java", "PHP", "JavaScript", "SML", "C", "Python", "Ruby"];
    console.log(longestWord(wordArr));

    let wordArr2 = ["foo", "bar", "baz", "Foo", "FOO"];
    console.log(removeAll(wordArr2, "foo"));

    let books = [
        {
            name: "Harry Potter and the Goblet of Fire",
            author: "J.K. Rowling",
            read: "yes"
        },
        {
            name: "The Great Gastby",
            author: "F. Scott Fitzgerald",
            read: "yes"
        },
        {
            name: "The Hunger Games",
            author: "Suzanne Collins",
            read: "no"
        }
    ];

    books.push(
        {
            name: "1984",
            author: "George Orwell",
            read: "no"
        }
    );

    readBooks(books);

    function sum(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum = sum + i;
        }
        return sum;
    }

    function vowelCount(word) {
        let vowels = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) === 'a' || 
            word.charAt(i) === 'e' ||
            word.charAt(i) === 'i' || 
            word.charAt(i) === 'o' || 
            word.charAt(i) === 'u') {
                vowels++;
            }
        }
        return vowels;
    }

    function findMin(array) {
        let min = Number.MAX_VALUE;
        for (let i = 0; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }
        return min;
    }

    function longestWord(arr) {
        let longestWord = "";
        if (arr.length != 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].length >= longestWord.length) {
                    longestWord = arr[i];
                }
            }
        }
        return longestWord;
    }

    function removeAll(arr, word) {
        let removeArr = [];
        if (arr.length != 0) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].toLowerCase != word.toLowerCase) {
                    removeArr.push(arr[i]);
                }
            }
        }
        return removeArr;
    }

    function readBooks(books) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].read === "yes") {
                console.log("I have read " + books[i].name + " by " + books[i].author);
            }
            else {
                console.log("I really want to read " + books[i].name + " by " + books[i].author);
            }
        }
    }

})();
