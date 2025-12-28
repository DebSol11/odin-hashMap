import "./styles.css";
import { module1 } from "./module1.js";

class HashMap {
  constructor(capacity, loadFactor) {
    // We initialize an array of a specific size to act as our storage "buckets"
    this.hashTable = new Array(capacity).fill(null); // Initialize with null
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
    if (!this.hashTable[index]) {
      this.hashTable[index] = [];
    }

    // Check if key already exists in the bucket to update it 
    for (let entry of this.hashTable[index]) {
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }
    // Otherwise, push new key-value pair into the bucket
    this.hashTable[index].push([key, value]);
  }

  // 3. Get Method: Retrieves a value by its key
  get(key) {
    const index = this._hash(key);
    const hashTable = this.hashTable[index];

    if (hashTable) {
      for (let entry of hashTable) {
        if (entry[0] === key) return entry[1];
      }
    }
    return null; // Return undefined if key doesn't exist
  }

  has(key) {
    for (let i = 0; i < this.hashTable.length; i++) {
      if (this.hashTable === 7) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// Usage Example
const myMap = new HashMap(50, 0.75);
console.log(myMap);
console.log("The current capacity of the hashMap is: " + myMap.capacity);
console.log("The current load capacity is: " + myMap.loadFactor);
console.log("Extend the capacity of the haspMap when more than " + (Math.ceil(myMap.capacity * myMap.loadFactor)) + " table rows have been started");
console.log("The hash value of the name key is: " + myMap._hash("name"));
myMap.set("name", "Alice");
console.log(myMap.get("name")); // Output: Alice
console.log(myMap.hashTable);
console.log(myMap.hashTable[7]);
console.log(myMap.hashTable[7][0]);
console.log(myMap.hashTable[7][0][0]);
console.log(myMap.has("name"));
