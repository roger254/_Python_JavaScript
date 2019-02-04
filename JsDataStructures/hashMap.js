/* HashMaps has many names like
 * HashTable, HashMap, Map,
* Dictionary, Associative Arrays
*** https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/
 */


// implementing a hash function
class NaiveHashMap {
    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity)
    }

    set(key, value) {
        const index = this.getIndex(key);
        this.buckets[index] = value;
    }

    get(key) {
        const index = this.getIndex(key);
        return this.buckets[index]
    }

    hash(key) {
        return key.toString().length;
    }

    getIndex(key) {
        const indexHash = this.hash(key);
        return indexHash % this.buckets.length
    }
}

// Usage
const assert = require('assert');
const hashMap = new NaiveHashMap();
hashMap.set('cat', 2);
hashMap.set('rat', 7);
hashMap.set('dog', 1);
hashMap.set('art', 8);
/*
console.log(hashMap.buckets);
assert.strictEqual(hashMap.get('art'), 8); // this one is ok
assert.strictEqual(hashMap.get('cat'), 8); // got overwritten by art 😱
assert.strictEqual(hashMap.get('rat'), 8); // got overwritten by art 😱
assert.strictEqual(hashMap.get('dog'), 8); // got overwritten by art ::o
*/

// implementing a decent hash function
class DecentHashMap {
    constructor(initialCapacity = 2) {
        this.buckets = new Array(initialCapacity);
        this.collisions = 0;
    }

    set(key, value) {
        const index = this.getIndex(key);

        if (this.buckets[index]) {
            this.buckets[index].push({key, value});
            if (this.buckets[index].length > 1) {
                this.collisions++;
            }
        } else {
            this.buckets[index] = [{key, value}]
        }
        return this;
    }


    get(key) {
        const index = this.getIndex(key);
        for (let arrayIndex = 0; arrayIndex < this.buckets[index].length; arrayIndex++) {
            const entry = this.buckets[index][arrayIndex];
            if (entry.key === key) {
                return entry.value
            }
        }
    }

    hash(key) {
        let hashValue = 0;
        const stringKey = `${key}${typeof key}`;

        for (let index = 0; index < stringKey.length; index++) {
            const charCode = stringKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }
        return hashValue;
    }

    getIndex(key) {
        const indexHash = this.hash(key);
        return indexHash % this.buckets.length
    }
}

/*
const decentHashMap = new DecentHashMap(100);
decentHashMap.set('cat', 2);
decentHashMap.set('rat', 7);
decentHashMap.set('dog', 1);
decentHashMap.set('art', 8);
console.log('collisions: ', decentHashMap.collisions);
console.log(decentHashMap.buckets);
*/

class hashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.loadFactor = loadFactor;
        this.size = 0;
        this.collisions = 0;
        this.keys = []
    }

    hash(key) {
        let hashValue = 0;
        const stringKey = `${key}${typeof key}`;

        for (let index = 0; index < stringKey.length; index++) {
            const charCode = stringKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }
        return hashValue;
    }

    _getBucketIndex(key) {
        const hashValue = this.hash(key);
        return hashValue % this.buckets.length;
    }

    set(key, value) {
        const {bucketIndex, entryIndex} = this._getBucketIndex(key);

        if (entryIndex === undefined) {
            //initialize array and save key/value
            const keyIndex = this.keys.push({content: key}) - 1; // keep track of the key index
            this.buckets[bucketIndex] = this.buckets[bucketIndex] || [];
            this.buckets[bucketIndex].push({key, value, keyIndex})
            this.size++;
            // optional keep count of collisions
            if (this.buckets[bucketIndex].length > 1) {
                this.collisions++;
            }
        } else {
            // override existing value
            this.buckets[bucketIndex][entryIndex].value = value;
        }

        //check if a rehash is due
        if (this.loadFactor > 0 && this.getLoadFactor() > this.loadFactor) {
            this.rehash(this.buckets.length * 2);
        }
    }

    get(key) {
        const {bucketIndex, entryIndex} = this._getBucketIndex(key);

        if (entryIndex === undefined) {
            return;
        }
        return this.buckets[bucketIndex][entryIndex].value;
    }

    has(key) {
        return !!this.get(key);
    }

    _getIndexes(key) {
        const bucketIndex = this._getBucketIndex(key);
        const values = this.buckets[bucketIndex] || [];

        for (let entryIndex = 0; entryIndex < values.length; entryIndex++) {
            const entry = values[entryIndex];
            if (entry.key === key) {
                return {bucketIndex, entryIndex};
            }
        }
        return {bucketIndex};
    }


}