import "./styles.css";
import * as generalFunctions from "./generalFunctions";

// // Source for guidance
// // https://ithy.com/article/hashmap-in-javascript-2ml2bf26

export class ResizableHashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.size = 0;
    this.loadFactor = loadFactor;
  }

  #hash(key) {
    let hashCode = 0;
    for (let char of key.toString()) {
      hashCode += char.charCodeAt(0);
      hashCode = hashCode * generalFunctions.nextPrime(this.buckets.length); // multiply by a prime number close to this.buckets.length was stated by unknown to help avoid collisions 
    }
    return hashCode % this.buckets.length;
  }

  set(key, value) {
    if ((this.size + 1) / this.buckets.length > this.loadFactor) {
      this.resize();
    }
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this.size++;
  }

  resize() {
    const oldBuckets = this.buckets;
    const newCapacity = oldBuckets.length * 2;
    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    for (const bucket of oldBuckets)
      for (const [key, value] of bucket)
        this.buckets[this.#hash(key)].push([key, value]);
  }

  // Delete key-value pair
  delete(key) {
    const index = this.#hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  // the clear function needs to be populated manually with the hashMap which you wish to delete by now
  clear(hashMap) {
    resizableHashMap = new ResizableHashMap();
  }

  keys() {
    let keysArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        this.buckets[i].forEach((pair) => keysArray.push(pair[0]));
      }
    }
    return keysArray;
  }

  values() {
    let valuesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] && this.buckets[i] != []) {
        this.buckets[i].forEach((pair) => valuesArray.push(pair[1]));
      }
    }
    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] && this.buckets[i] != []) {
        this.buckets[i].forEach((pair) =>
          entriesArray.push(this.buckets[i])
        );
      }
    }
    return entriesArray;
  }

}


// // Usage Example
// let resizableHashMap = new ResizableHashMap();
// resizableHashMap.set("key1", "value1");
// resizableHashMap.set("key2", "value2");
// resizableHashMap.set("key3", "value3");
// resizableHashMap.set("key4", "value4");
// resizableHashMap.set("key5", "value5");
// resizableHashMap.set("key6", "value6");
// resizableHashMap.set("key7", "value7");
// resizableHashMap.set("key8", "value8");
// resizableHashMap.set("key9", "value9");
// resizableHashMap.set("key10", "value10");
// resizableHashMap.set("key11", "value11");
// resizableHashMap.set("key12", "value12");
// resizableHashMap.set("key13", "value13");
// resizableHashMap.set("key14", "value14");
// resizableHashMap.set("key15", "value15");
// resizableHashMap.set("key1", "updatedValue1");
// console.log(resizableHashMap);
// resizableHashMap.delete("key2");
// console.log(resizableHashMap);
// console.log(resizableHashMap.size);
// console.log(
//   "The current length of the hashMap is: " + resizableHashMap.length()
// );
// console.log(resizableHashMap.keys());
// console.log(resizableHashMap.values());
// console.log(resizableHashMap.entries());
