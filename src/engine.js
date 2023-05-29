/* eslint-disable camelcase */

/**
 * Expected field name in the mini-app's JSON file that contains
 * the array of outcome objects for that mini-app.
 */
const JSON_OUTCOMES_FIELD = 'option-result pair';

/**
 * The FortuneEngine class
 *  contains an array of possible outcomes and can generate a random permutation
 *  of its contents.
 */
class FortuneEngine {
  /**
   * Creates a FortuneEngine object.
   * @param {string} app_name Name of the mini-app.
   */
  constructor (app_name) {
    /**
     * @property {string} app_name Mini-app name
     */
    this.app_name = app_name;

    /**
     * @property {Array} outcomes Array of outcome objects
     */
    this.outcomes = null;
  }

  /**
   * Populates the outcomes field with the contents of the JSON file
   * @param {string} json_file Path to the JSON file that contains the array of
   *    outcomes (in ./src/mini-apps/${this.app_name}/${json_file})
   */
  async db_reader (json_file) {
    console.log(json_file);

    await fetch(`./src/mini-apps/${this.app_name}/${json_file}`)
      .then(response => response.json())
      .then(data => {
        this.outcomes = data[JSON_OUTCOMES_FIELD];

        // I want this to run after db_reader is finished, but can not call await correctly
        this.db_dump();
      })
      .catch(error => console.error(error));
  }

  /**
   * Sets the outcomes array to the input array.
   * @param {Array} outcomes Input array of outcome objects.
   */
  set_outcomes (outcomes) {
    this.outcomes = outcomes;
  }

  /**
   * Prints the outcomes array to the console.
   */
  db_dump () {
    console.log(this.outcomes);
  }

  /**
   * Randomly selects num_objects objects from the outcome array and returns the
   * subarray.
   * @param {number} num_objects Number of objects to select from the outcomes array.
   * @returns {Array} Subarray of outcome array that contains num_objects randomly selected objects.
   * @example
   * // outcomes array is [1, 2, 3, 4]
   * engine.get_random_subset(2);   // e.g., returns [4, 2]
   * engine.get_random_subset(3);   // e.g., returns [3, 1, 4]
   */
  get_random_subset (num_objects) {
    //  Clone outcomes array
    const permutation = [...this.outcomes];

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
    return permutation.slice(0, num_objects);
  }
}

//  Example implementation

//  Create outcome array (list of integers from 1 to 52)
const app_name = 'cartomancy';
const db_name = 'cartomancy.json';

//  Create a FortuneEngine object with this array
const engine = new FortuneEngine(app_name);
engine.db_reader(db_name).then(() => {
  for (let i = 0; i <= 8; i++) {
    console.log(`${i}-permutation:`, engine.get_random_subset(i));
  }
});
