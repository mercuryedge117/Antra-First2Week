// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
function reverseNum(number) {
    return Number(number.toString().split("").reverse().join(""));
}

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.
function palindrome(arg) {
    let reversed = arg.split("").reverse().join("");
    return arg === reversed;
}

// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 
function allCombines(arg) {
    let set = new Set();
    for (let i = 0; i < arg.length; i++) {
        for (let j = i + 1; j <= arg.length; j++) {
            set.add(arg.substring(i,j));
        }
    }

    return [...set];
}

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function sortString(arg) {
    return arg.split("").sort().join("");
}

// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function upperCaseAllWords(arg) {
    let arr = arg.split(" ");
    return arr.map((word) => word[0].toUpperCase() + word.substring(1)).join(" ");
}

// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function longerstWord(arg) {
    let arr = arg.split(" ");
    arr.sort((a, b) => b.length - a.length);
    return arr[0];
}

// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function longerstWord(arg) {
    let count = 0;
    let arr = arg.toLowerCase().split("");
    const vowels = ["a", "e", "i", "o", "u"];
    arr.forEach((word) => {if(vowels.includes(word)) {count++;}})
    return count;
}

// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
function isPrime(num) {
    if (num <= 1) { return false; }
    if (num % 1 !== 0) { return false; }
    for (let c = 2; c <= Math.sqrt(num); c++) {
        if (num % c === 0) {
            return false;
        } 
    }
    return true;
}

// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.
function myTypeOf(arg) {
    return typeof(arg);
}

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix. 
function generateMatrix(n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(0)
        }
        result.push(row);
    }
    return result;
}

// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 
function highlow(arr) {
    arr.sort();
    return [arr[1], arr[arr.length-2]];
}

// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1 + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 + 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the perfect numbers 496 and 8128.
function isPerfectNumber(num) {
    let factors = computeFactors(num);
    let sum = 0;
    for (let factor of factors) {
        sum += factor;
    }
    return num === (sum/2);
}

// 13. Write a JavaScript function to compute the factors of a positive integer. 
function computeFactors(num) {
    let res = [];

    for (let i = 1; i <= num; i++) {
        if(num % i === 0) {
            res.push(i); 
        }
    }

    return res;
}

// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function amountToCoins(num, coins) {
    let res = [];
    coins.sort((a,b) => b - a);
    atcHelper(coins, num, 0, 0, res, []);
    return res[0];
}

function atcHelper(coins, num, index, sum, res, curr) {
    if (sum > num) return
    if (sum === num) {
        res.push([...curr]);
        return;
    }
    for (let i = index; i < coins.length; i++) {
        let currCoin = coins[i];
        curr.push(currCoin);
        atcHelper(coins, num, i, sum + currCoin, res, curr);
        curr.pop();
    }
}

// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result. 
function myPowMath(b, n) {
    if (n < 0) {
        b = 1 / b;
        n = -n;
    }
    return myPow(b, n);
}

function myPow(b, n) {
    if (n === 0) return 1;
    let half = myPow(b, Math.floor(n / 2));
    if (n % 2 === 0) {
        return half * half;
    } else {
        return half * half * x;
    }
}

// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function filterUnique(arg) {
    let set = new Set();
    let arr = arg.split("");
    let res = arr.filter((char) => {
            if(!set.has(char)) {
                set.add(char); 
                return true;
            }
            else return false;
        })
    return res.join("");
}

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function letterCounter(arg) {
    let map = new Map();
    for (let char of arg) {
        if (char.toLowerCase() !== char.toUpperCase()) {
            map.has(char) ? map.set(char, map.get(char)+1) : map.set(char, 1);
        }
    }
    return map;
}

// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.
function binarySearch(arr) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) { return mid; }
        else if (target < arr[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return right === left ? (arr[left] === target ? arr[left] : -1) : -1;
}

// 19. Write a JavaScript function that returns array elements larger than a number. 
function filterLarger(arr, n) {
    return arr.filter((e) => e > n);
}

// 20. Write a JavaScript function that generates a string id (specified length) of random characters. 
// Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function generateId(len) {
    if(len < 0) return;
    let arr = [];
    const charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) {
        arr.push(charList[Math.floor(Math.random() * charList.length)])
    }
    return arr.join("");
}

// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function lengthedCombinations(arr, len) {
    let res = [];
    lcHelper(arr, len, 0, res, []);
    return res;
}

function lcHelper(arr, len, index, res, curr) {
    if (len === 0) {
        res.push([...curr]);
        return;
    }
    for (let i = index; i < arr.length; i++) {
        curr.push(arr[i]);
        lcHelper(arr, len - 1, i + 1, res, curr);
        curr.pop();
    }
}


// 22. Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string. 
// Sample arguments: 'microsoft.com', 'o' 
// Expected output: 3 
function letterCounts(arg, target) {
    let res = 0;
    for (let char of arg) {
        res += (char === target ? 1 : 0);
    }
    return res;
}

// 23. Write a JavaScript function to find the first not repeated character. 
// Sample arguments: 'abacddbec' 
// Expected output: 'e' 
function findNonRepeated (arg) {
    let map = new Map();
    for (let char of arg) {
        if (char.toLowerCase() !== char.toUpperCase()) {
            map.has(char) ? map.set(char, map.get(char)+1) : map.set(char, 1);
        }
    }
    for (let item of map.keys()) {
        if (map.get(item) === 1) {
            return item;
        }
    }
    return "";
}

// 24. Write a JavaScript function to apply Bubble Sort algorithm. 
// Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order". 
// Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
// Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
function bubbleSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j >= 1 && arr[j] > arr[j - 1]) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            j--;
        }
    }
    return arr;
}

// 25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as output. 
// Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
// Expected output: "United States of America"
function longestCountryName(arr) {
    let maxlen = -1
    let maxIndex = -1
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > maxlen) {
            maxIndex = i;
            maxlen = arr[i].length;
        }
    }
    return arr[maxIndex];
}

// 26. Write a JavaScript function to find longest substring in a given a string without repeating characters. 
function longestNoRepeating(arg) {
    // TODO
}


// 27. Write a JavaScript function that returns the longest palindrome in a given string. 
// Note: According to Wikipedia "In computer science, the longest palindromic substring or longest symmetric factor problem is the problem of finding a maximum-length contiguous substring of a given string that is also a palindrome. For example, the longest palindromic substring of "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for example, in the string "abracadabra", there is no palindromic substring with length greater than three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
// In some applications it may be necessary to return all maximal palindromic substrings (that is, all substrings that are themselves palindromes and cannot be extended to larger palindromic substrings) rather than returning only one substring or returning the maximum length of a palindromic substring.
function longestPalindrome(arg) {
    // TODO
}


// 28. Write a JavaScript program to pass a 'JavaScript function' as parameter. 
function takeFunc(func) {
    return func;
}


// 29. Write a JavaScript function to get the function name. 
function nameOfFunc(func) {
    return func.name;
}