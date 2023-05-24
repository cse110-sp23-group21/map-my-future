/*  Place 8Ball Engine Code Here */

/**
 * The FortuneEngine class
 *  contains an array of possible outcomes and can generate a random permutation
 *  of its contents.
 */
class FortuneEngine {
  /**
     * Creates a FortuneEngine object.
     * @param {array} outcomes Array of possible outcomes.
     */
  constructor (outcomes) {
    this.outcomes = outcomes
  }

  /**
     * Randomly selects numObjects objects from the outcome array and returns the
     * subarray.
     * @param {number} numObjects Number of objects to select from the outcomes array.
     * @returns {array} subarray of outcome array that contains numObjects randomly selected objects.
     * @example
     * // outcomes array is [1, 2, 3, 4]
     * engine.getRandomSubset(2);   // e.g., returns [4, 2]
     * engine.getRandomSubset(3);   // e.g., returns [3, 1, 4]
     */
  getRandomSubset (numObjects) {
    //  Clone outcomes array
    const permutation = [...this.outcomes]

    //  Implementation of Randomize-In-Place (Section 5.3 from Introduction to Algorithms by Cormen et al.)
    for (let i = 0; i < this.outcomes.length; i++) {
      //  Get a random index from 0 to this.outcomes.length - 1
      const randomIndex = Math.floor(Math.random() * this.outcomes.length)

      //  Swap permutation[i] with permutation[randomIndex]
      const temp = permutation[i]
      permutation[i] = permutation[randomIndex]
      permutation[randomIndex] = temp
    }

    //  Return subarray of first numObjects objects in the permutation array
    return permutation.slice(0, numObjects)
  }
}

//  Example implementation

//  Create outcome array (list of integers from 1 to 52)
const array = []

for (let i = 0; i < 52; i++) {
  array[i] = i + 1
}

//  Create a FortuneEngine object with this array
const engine = new FortuneEngine(array)

//  Generate 0- to 52- permutations of this array
for (let i = 0; i <= array.length; i++) {
  console.log(`${i}-permutation:`, engine.getRandomSubset(i))
}
