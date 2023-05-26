/*  Place 8Ball Engine Code Here */

/**
 * The FortuneEngine class
 *  contains an array of possible outcomes and can generate a random permutation
 *  of its contents.
 */
class FortuneEngine {
  /** Creates a FortuneEngine object.
   * @param {app_name} string that gives name of fortune teller type
   */
  constructor (app_name) {
    this.app_name = app_name;
    // this.fortune_db = null;
    this.outcomes = null;
  }

  // setter for setting fortune_db based on what we want to read
  // @param {JS_file} string of JSON file in ./mini-apps/${app_name}/${JS_file}
  async db_reader (JS_file) {
    console.log(JS_file);
    // sconsole.log(this.fortune_db);

    await fetch(`./src/mini-apps/${this.app_name}/${JS_file}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // this.fortune_db = data;
        this.outcomes = data[element_name];

        console.log('outcomes:', this.outcomes);
        this.db_dump(); // I want this to run after db_reader is finished, but can not call await correctly
      })
      .catch(error => console.error(error));
  }

  set_outcomes (outcomes) {
    this.outcomes = outcomes;
  }

  // gives all object info to console
  // @returns nothing
  db_dump () {
    console.log(this.outcomes);
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
    console.log('outcomes subset:', this.outcomes);
    const permutation = [...this.outcomes];
    console.log('outcomes:', this.outcomes);

    //  Implementation of Randomize-In-Place (Section 5.3 from Introduction to Algorithms by Cormen et al.)
    for (let i = 0; i < permutation.length; i++) {
      //  Get a random index from 0 to this.outcomes.length - 1
      const randomIndex = Math.floor(Math.random() * this.outcomes.length);

      //  Swap permutation[i] with permutation[randomIndex]
      const temp = permutation[i];
      permutation[i] = permutation[randomIndex];
      permutation[randomIndex] = temp;
    }

    //  Return subarray of first numObjects objects in the permutation array
    return permutation.slice(0, numObjects);
  }
}

//  Example implementation

//  Create outcome array (list of integers from 1 to 52)
const array = [];
const app_name = 'cartomancy';
const db_name = 'cartomancy.json';
const element_name = 'option-result pair';

for (let i = 0; i < 52; i++) {
  array[i] = i + 1;
}

//  Create a FortuneEngine object with this array
const engine = new FortuneEngine(app_name);
engine.db_reader(db_name).then((val) => {
  for (let i = 0; i <= array.length; i++) {
    console.log(`${i}-permutation:`, engine.getRandomSubset(i));
  }
});
// engine.set_outcomes(this.fortune_db);

// TODO: If keeping getRandomSubset make sure 'outcomes' exists
//  Generate 0- to 52- permutations of this array
/* for (let i = 0; i <= array.length; i++) {
  console.log(`${i}-permutation:`, engine.getRandomSubset(i));
} */
