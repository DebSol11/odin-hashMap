import "./styles.css";
import { module1 } from "./module1.js";

console.log(module1);

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  // // Simple hash function to convert key to index
  // _hash(key) {
  //   let hash = 0;
  //   for (let i = 0; i < key.length; i++) {
  //     hash = (hash + key.charCodeAt(i) * i) % this._storage.length;
  //   }
  //   return hash;
  // }


  set(key, value) {
    const index = this._hash(key);
    
    // Initialize bucket if it doesn't exist (chaining for collisions)
    if (!this._storage[index]) {
      this._storage[index] = [];
    }

    // Check if key already exists to update it
    for (let pair of this._storage[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Otherwise, push new key-value pair
    this._storage[index].push([key, value]);
  }
}

// const map = new MyHashMap();
// map.set('user123', 'Alice');


let newHashMap = new HashMap(0.75, 16);
console.log(newHashMap.hash("Smith"));
newHashMap.set("Peter", "Griffin");
console.log(newHashMap);