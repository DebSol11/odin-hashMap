import "./styles.css";
import { module1 } from "./module1.js";

console.log(module1);

class HashMap {
  constructor(capacity, loadFactor) {
    // We initialize an array of a specific size to act as our storage "buckets"
    this.table = new Array(capacity);
    this.capacity = capacity; // also called buckets
    this.loadFactor = loadFactor;
  }

  // 1. Hash Function: Converts a string key into an index
  _hash(key) {
    // The underscore naming convention signals the method is for internal use only and should not be accessed directly from outside the class or module
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // charCodeAt gets the Unicode value of each character
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // 2. Set Method: Stores a key-value pair
  set(key, value) {
    const index = this._hash(key);

    // If the bucket at this index is empty, initialize it as an array (chaining)
    if (!this.table[index]) {
      this.table[index] = [];
    }

    // Check if key already exists in the bucket to update it
    for (let entry of this.table[index]) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    // Otherwise, push new key-value pair into the bucket
    this.table[index].push([key, value]);
  }

  // 3. Get Method: Retrieves a value by its key
  get(key) {
    const index = this._hash(key);
    const table = this.table[index];

    if (table) {
      for (let entry of table) {
        if (entry[0] === key) return entry[1];
      }
    }
    return undefined; // Return undefined if key doesn't exist
  }
}

// Usage Example
const myMap = new HashMap(50, 0.75);
console.log(myMap._hash("Smith"));
myMap.set("name", "Alice");
console.log(myMap.get("name")); // Output: Alice
