function isPrime(n) {
  if (n <= 1) return false; // 1 and below are not prime
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false; // Found a divisor, not prime
  }
  return true; // No divisors found, it's prime
}

function nextPrime(n) {
  let currentNumber = n;
  while (isPrime(currentNumber) === false) {
    currentNumber += 1;
    if (isPrime(currentNumber) === true) {
      return currentNumber
    }
  } 
}

function safeFirstNprimesInArray(n) {
  let arrayPrime = [];
  let counter = 0;
  while (arrayPrime.length < n) {
    if (isPrime(counter)) {
      arrayPrime.push(counter);
    }
    counter++;
  }
  return arrayPrime;
}

export { isPrime, nextPrime, safeFirstNprimesInArray };
