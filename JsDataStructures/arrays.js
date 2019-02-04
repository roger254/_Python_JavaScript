function fill_array(n) {
    let max = n;
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * max - 10 + 10));
    }
    return arr
}

function insertToTail(array, element) {
    // has a runtime of O(1)
    array.push(element);
    return array
}

/*
const array = fill_array(4);
console.log(insertToTail(array, 4));*/

function insertToHead(array, element) {
    // has a runtime of O(n)
    array.unshift(element);
    return array
}

/*
const array = fill_array(3);
console.log(insertToHead(array, 0));
*/

function access(array, index) {
    // has runtime of O(1)
    return array[index];
}

/*
const array = [1, 'word', 3.14, {a: 1}];
console.log(access(array, 0));
console.log(access(array, 3));
*/

function search(array, element) {
    // runtime of O(n) coz of the loop
    for (let index = 0; index < array.length; index++) {
        if (element === array[index]) {
            return index;
        }
    }
}

/*
const array = [1, 'word', 3.14, {a: 1}];
console.log(search(array, 'word'));
console.log(search(array, 3.14));
*/

function remove(array, element) {
    // deleting an item has runtime on O(n)
    const index = search(array, element);
    // splice has runtime of O(n)
    array.splice(index, 1);
    return array;
}

const array = [0, 1, 2, 3];
console.log(remove(array, 2));