/** Constant Time O(1) **/

// ODD or EVEN
function isEvenOrOdd(n) {
    return n % 2 ? 'Odd' : 'Even'
}

/*
console.log(isEvenOrOdd(10));
console.log(isEvenOrOdd(10001));
*/

// Look-up Table
const dictionary = {the: 22038615, be: 12545825, and: 10741073, of: 10343885, a: 10144200, in: 6996437, to: 6332195};

function getWordFrequency(dict, word) {
    return dict[word]
}

/*
console.log(getWordFrequency(dictionary, 'the'));
console.log(getWordFrequency(dictionary, 'in'));
*/

/* O(n) Linear time
*  ==> algorithm grows at same rate as input(n)
* */

//largest item in a sorted array
function findMax(n) {
    let max;
    let counter = 0;

    for (let i = 0; i < n.length; i++) {
        counter++;
        if (max === undefined || max < n[i]) {
            max = n[i];
        }
    }
    console.log(`n: ${n.length}, counter: ${counter}`);
    return max;
}

function fill_array(n) {
    let max = n;
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * max - 10 + 10));
    }
    return arr
}

/*
findMax([3, 4, 6]);
findMax([4, 5, 6, 1, 9, 2, 8, 3, 7]);
findMax(fill_array(1000));
*/

/* O(n^2) Quadratic time */

//Has duplicates
function hasDuplicates(n) {
    const duplicates = [];
    let counter = 0;
    for (let outer = 0; outer < n.length; outer++) {
        for (let inner = 0; inner < n.length; inner++) {
            counter++;

            if (outer === inner) continue;

            if (n[outer] === n[inner]) {
                return true;
            }
        }
    }
    console.log(`n: ${n.length}, counter: ${counter}`);
    return false;
}

/*
hasDuplicates(fill_array(4));
hasDuplicates(fill_array(10));
*/

// bobble sort
function sort(n) {
    console.log("Starting n = " + n);
    for (let outer = 0; outer < n.length; outer++) {
        let outerElement = n[outer];

        for (let inner = outer + 1; inner < n.length; inner++) {
            let innerElement = n[inner];

            if (outerElement > innerElement) {
                //swap
                n[outer] = innerElement;
                n[inner] = outerElement;
                // update references
                outerElement = n[outer];
                innerElement = n[inner];
            }
        }
    }
    console.log(`Sorted n = ${n}`);
    return n;
}

// sort(fill_array(100));

/*
* O(n^c) - Polynomial time
*/

/* Triple Nested loops
3x + 9y + 8z = 79
 */

function findXYZ(n) {
    const solutions = [];

    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            for (let z = 0; z < n; z++) {
                if (3 * x + 9 * y + 8 * z === 79) {
                    solutions.push({x, y, z})
                }
            }
        }
    }
    return solutions;
}

// console.log(findXYZ(10));

/*
* O(log n) - Logarithmic time
*   time taken by the recursive part and f(n) part
*   are the same
*/
function indexOf(array, element, offset = 0) {
    // split array in half
    const half = parseInt(array.length / 2);
    const current = array[half];

    if (current === element) {
        return offset + half;
    } else if (element > current) {
        const right = array.slice(half);
        return indexOf(right, element, offset + half)
    } else {
        const left = array.slice(0, half);
        return indexOf(left, element, offset);
    }
}

/*
const directory = ["Adrian", "Bella", "Charlotte", "Daniel", "Emma", "Hanna", "Isabella", "Jayden", "Kaylee", "Luke", "Mia", "Nora", "Olivia", "Paisley", "Riley", "Thomas", "Wyatt", "Xander", "Zoe"];
console.log(indexOf(directory, 'Hanna'));
console.log(indexOf(directory, 'Emma'));
console.log(indexOf(directory, 'Zoe'));
*/

/*
*  O(n log n) - Linearithmic
* */
function m_sort(n) {
    const length = n.length;
    // base case
    if (length === 1) {
        return n;
    }
    if (length === 2) {
        return n[0] > n [1] ? [n[1], n[0]] : [n[0], n[1]];
    }
    // split and merge
    const mid = length / 2;
    return merge(m_sort(n.slice(0, mid)), m_sort(n.slice(mid)))
}

function merge(a = [], b = []) {
    const merged = [];
    // merge elements on a and b in asc order. Run-time O(a + b)
    for (let ai = 0, bi = 0; ai < a.length, bi < b.length;) {
        if (ai >= a.length || a[ai] > b[bi]) {
            merged.push(b[bi++]);
        } else {
            merged.push(a[ai++])
        }
    }
    return merged;
}

/*
arr = fill_array(100);
console.log(arr);
console.log(m_sort(arr));
*/

/*
*O(2^n) - Exponential Time
* calc performed double by the times of the input growth
* */

function getSubsets(n = '') {
    const array = Array.from(n);
    const base = [''];

    const results = array.reduce((previous, element) => {
        const previousPlusElement = previous.map(el => {
            return `${el}${element}`;
        });
        return previous.concat(previousPlusElement);
    }, base);

    console.log(`getSubsets(${n} // ${results.slice(0, 15).join(', ')}... `);
    console.log(`n: ${array.length}, counter: ${results.length}`);
    return results;
}

/*
getSubsets('');
getSubsets('a');
getSubsets('ab');
getSubsets('abc');
getSubsets('abcd');
getSubsets('abcde');
*/

/*
* 0(n!) Factorial time
*/

// Permutations

function getPermutations(string, prefix = '') {
    if (string.length <= 1) {
        return [prefix + string];
    }

    return Array.from(string).reduce((result, char, index) => {
        const reminder = string.slice(0, index) + string.slice(index + 1);
        result = result.concat(getPermutations(reminder, prefix + char));
        return result;
    }, []);
}

/*
console.log(getPermutations('ab',['']));
console.log(getPermutations('abcd',['']));
*/

// Poorly execute Separation of concerns
// Helper Functions
function double(arrIn) {
    let arrOut = [];
    for (let i = 0; i < arrIn.length; i++) {
        arrOut[i] = arrIn[i] * 2;
    }
    return arrOut
}

function increment(arrIn) {
    let arrOut = [];
    for (let i = 0; i < arrIn.length; i++) {
        arrOut[i] = arrIn[i] + 1;
    }
    return arrOut
}

function foo(arrIn) {
    return increment(double(arrIn))
}

// Apply DRY principle and use higher order functions
// well executed separation of concerns and DRY cod
const double_1 = elem => elem * 2;
const increment_1 = elem => elem + 1;

function foo2(arrIn) {
    return arrIn.map(elem => increment_1(double_1(elem)))
}

/*
*  Recursive function basic logic structure
*
*       function recursiveFun(input, output){
*           if we hit a base case, updated output as necessary and return
*           the final output
*
*           otherwise, simplify the input. Update the output, then
*           return recursive
*       }
*
* */

// Write a function sum that takes an array of numbers
// and returns the sum of all the numbers.
// Recursive Function
function sum(arr) {
    function add(arr, sum) {
        // Base Case
        if (arr.length === 0) return sum;
        // Recursive Step
        return add(arr.slice(1), sum + arr[0])
    }

    return add(arr, 0) // initial values
}

// Mutable Data Structure
function sum_2(arr) {
    // Initial Values
    let result = 0;
    let elems = arr; // <-- mutable data structures

    while (elems.length > 0) { // <-- Base Case
        result += elems.pop() // <-- Recursive Step
    }
    return result
}

/*

array = fill_array(10000);
// Functional Programming and one-liners
const sum_3 = array.reduce((res, elem) => res + elem, 0);
console.log(sum(array));
console.log(sum_2(array));
console.log(sum_3);
*/

// Parentheses Tally
const newOpenCnt = (c, openCnt) => {
    if (c === '(') return openCnt + 1;
    if (c === ')') return openCnt - 1;
    return openCnt;
};

function isBalanced(str, openCnt) {
    // Continue or Stop?
    if (typeof str !== 'string') return false;
    if (openCnt < 0) return false;
    if (str.length === 0) return openCnt === 0;

    // What to look at next?
    const fst = str[0];
    const rst = str.slice(1);
    return isBalanced(rst, newOpenCnt(fst, openCnt))
}

function hasBalancedParen(str) {
    return isBalanced(str, 0)
}

// console.log(hasBalancedParen('ROg()er'));
/*
* Always test Your Code
*   *KISS-> Create a unit test function that is called test(fun, testCases)
*/

// SOC - separation of concern
let testCases = [
    {test: '(', shouldBe: false},
    {test: '())', shouldBe: false},
    {test: '())', shouldBe: false},
    {test: null, shouldBe: false},
    {test: undefined, shouldBe: false},
    {test: 22, shouldBe: false},
    {test: ')(', shouldBe: false},
    {test: '', shouldBe: true},
    {test: '()', shouldBe: true},
    {test: '()()', shouldBe: true},
    {test: '(())', shouldBe: true},
    {test: 'hi', shouldBe: true},
    {test: '(hi)', shouldBe: true},
    {test: '(((())(())', shouldBe: false}
];

// DRY --> using high order function map
const test = (fun, testCases) => {
    testCases.map(t => {
        const shouldBe = t.shouldBe;
        const is = fun(t.test);
        const res = (shouldBe === is) ? 'passed' : 'failed';
        const moreInfo = (res === 'failed' ? `testing ${t.test}. Should be ${shouldBe} but got ${is}` : '');
        console.log(`${res} ${moreInfo}`)
    })
};
// run the test
let fun = (str) => hasBalancedParen(str);
test(fun, testCases);