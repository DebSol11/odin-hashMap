import "./styles.css";

export class HashMap {
  constructor(capacity, loadFactor) {
    // We initialize an array of a specific size to act as our storage "buckets"
    this.hashTable = new Array(capacity).fill(null); // Initialize with null
    this.capacity = capacity;
    this.size = 0; // number of stored unique keys
    this.loadFactor = loadFactor;
  }

  // 1. Hash Function: Converts a string key into an index
  _hash(key) {
    // The underscore naming convention signals the method is for internal use only and should not be accessed directly from outside the class or module
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // charCodeAt gets the Unicode value of each character
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.hashTable.length;
    }
    return hashCode;
  }

  // 2. Set Method: Stores a key-value pair
  set(key, value) {
    const index = this._hash(key);
    // If the hashTable at this index is empty, initialize it as an array (chaining)
    if (!this.hashTable[index]) {
      this.hashTable[index] = [];
    }
    const hashTableVariable = this.hashTable[index];
    // Check if key already exists in the hashTable and update it if so
    for (let i = 0; i < hashTableVariable.length; i++) {
      if (hashTableVariable[i][0] === key) {
        hashTableVariable[i][1] = value;
        return;
      }
    }
    hashTableVariable.push([key, value]);
    this.size++;
    // check the loadFactor and rehash here
    // performance increase if further understood: do not rehash but rather dynamically prolonging the array, safes resources
  }

  // 3. Get Method: Retrieves a value by its key
  get(key) {
    const index = this._hash(key);
    const hashTableVariable = this.hashTable[index];

    if (hashTableVariable) {
      for (let i = 0; i < hashTableVariable.length; i++) {
        if (hashTableVariable[i][0] === key) {
          return hashTableVariable[i][1];
        }
      }
    }
    return null; // Return null if key doesn't exist
  }

  has(key) {
    const index = this._hash(key);
    const hashTableVariable = this.hashTable[index];
    if (hashTableVariable) {
      for (let i = 0; i < hashTableVariable.length; i++) {
        if (hashTableVariable[i][0] === key) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    const index = this._hash(key);
    const hashTableVariable = this.hashTable[index];
    if (hashTableVariable) {
      for (let i = 0; i < hashTableVariable.length; i++) {
        if (hashTableVariable[i][0] === key) {
          hashTableVariable.splice(key, 1);
          return true;
        }
      }
    }
    return false;
  }

  length() {
    let counter = 0;
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] != null) {
        counter++;
      }
    }
    return counter;
  }

  // was probably meant different
  clear() {
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] != null) {
        return this.hashTable[i].splice(i, 1);
      }
    }
  }

  keys() {
    let keysArray = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] && this.hashTable[i] != []) {
        this.hashTable[i].forEach((pair) => keysArray.push(pair[0]));
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] && this.hashTable[i] != []) {
        this.hashTable[i].forEach((pair) => valuesArray.push(pair[1]));
      }
    }
    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable[i] && this.hashTable[i] != []) {
        this.hashTable[i].forEach((pair) =>
          entriesArray.push(this.hashTable[i])
        );
      }
    }
    return entriesArray;
  }
}

// Usage Example
// const myMap = new HashMap(50, 0.75);
// console.log(myMap);
// console.log("The current capacity of the hashMap is: " + myMap.capacity);
// console.log("The current load Factor is: " + myMap.loadFactor);
// console.log(
//   "Extend the capacity of the haspMap when more than " +
//     Math.ceil(myMap.capacity * myMap.loadFactor) +
//     " table rows have been started"
// );
// console.log("The hash value of the name key is: " + myMap._hash("name"));
// myMap.set("name", "Alice");
// myMap.set("fart", "stinky");
// myMap.set("wheel", "awesome");
// console.log(myMap.get("name")); // Output: Alice
// console.log(myMap);
// console.log(myMap.hashTable);
// console.log(myMap.hashTable[7]);
// console.log(myMap.hashTable[7][0]);
// console.log(myMap.hashTable[7][0][0]);
// console.log(myMap.has("name"));
// myMap.remove("name");
// console.log(myMap.hashTable);
// console.log(myMap.length());
// // console.log(myMap.clear());
// console.log(myMap.keys());
// console.log(myMap.values());
// console.log(myMap.entries());
