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
   * @example
   * // Create a FortuneEngine object
   * const app_name = 'cartomancy';
   * const db_name = 'cartomancy.json';
   *
   * const engine = new FortuneEngine(app_name);
   *
   * // Initialize the FortuneEngine object
   * engine.db_reader(db_name).then(() => {
   *   console.log("3 random cards:", engine.get_random_subset(3));
   * });
   */
  constructor (app_name) {
    /**
     * @property {string} app_name Mini-app name
     */
    this.app_name = app_name;

    /**
     * @property {Array} outcomes Array of outcome objects
     * @private
     */
    this.outcomes = null;

    /**
     * @property {boolean} initialized Whether the FortuneEngine object has been
     *  initialized (must call initialize() method)
     * @private
     */
    this.initialized = false;

    /**
     * @property {Object} json_contents The entire contents of the JSON file read
     * in the db_reader method
     * @private
     */
    this.json_contents = null;
  }

  /**
   * Initializes this FortuneEngine object.
   * Populates the outcomes field with the contents of the JSON file.
   * @param {string} json_file Path to the JSON file that contains the array of
   *    outcomes
   */
  async db_reader (json_file) {
    console.log(json_file);

    await fetch(json_file)
      .then(response => response.json())
      .then(data => {
        //  Fill the json_contents and outcomes fields
        this.json_contents = data;
        this.outcomes = data[JSON_OUTCOMES_FIELD];

        //  Now that this FortuneEngine object has outcomes and json_contents
        //  filled, it can be considered initialized (safe to run
        //  get_random_subset() and other such methods)
        this.initialized = true;

        //  Debug
        this.db_dump();
      })
      .catch(error => console.error(error));
  }

  /**
   * Returns the outcomes array in this FortuneEngine object.
   * @returns {Array} The outcomes array in this FortuneEngine object.
   * @throws Will throw an error if not initialized.
   */
  get_outcomes () {
    if (!this.initialized) {
      throw new Error('Not yet initialized - call the initialize() method first.');
    }
    return this.outcomes;
  }

  /**
   * Prints the outcomes array to the console.
   * @throws Will throw an error if not initialized.
   */
  db_dump () {
    if (!this.initialized) {
      throw new Error('Not yet initialized - call the initialize() method first.');
    }
    console.log(this.outcomes);
  }

  /**
   * Returns the contents of the JSON file that has been read via db_reader()
   * @returns {Object} Object that is the contents of the JSON file that has been
   *    read via db_reader()
   * @throws Will throw an error if not initialized.
   */
  get_json_contents () {
    if (!this.initialized) {
      throw new Error('Not yet initialized - call the initialize() method first.');
    }
    return this.json_contents;
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
   * @throws Will throw an error if not initialized.
   */
  get_random_subset (num_objects) {
    if (!this.initialized) {
      throw new Error('Not yet initialized - call the initialize() method first.');
    }
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

export default FortuneEngine;
