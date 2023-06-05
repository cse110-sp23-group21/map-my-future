import FortuneEngine from '../src/engine.js';

//  get_outcomes()

test('get_outcomes() returns the outcomes array', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array:
  const outcomes = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    }
  ];

  engine.outcomes = outcomes;

  expect(engine.get_outcomes()).toBe(outcomes);
});

test('get_outcomes() returns the outcomes array even if empty', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array:
  const outcomes = [];

  engine.outcomes = outcomes;

  expect(engine.get_outcomes()).toBe(outcomes);
});

test('get_outcomes() returns the outcomes array even if null', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  expect(engine.get_outcomes()).toBe(null);
});

//  get_json_contents()

test('get_json_contents() returns the json contents', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set JSON contents
  const jsonContents = {
    'option-result pair': [
      {
        value: 1
      },
      {
        value: 2
      },
      {
        value: 3
      },
      {
        value: 4
      },
      {
        value: 5
      }
    ]
  };

  engine.json_contents = jsonContents;

  expect(engine.get_json_contents()).toBe(jsonContents);
});

test('get_json_contents() returns the json contents even if empty', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set JSON contents
  const jsonContents = {
  };

  engine.json_contents = jsonContents;

  expect(engine.get_json_contents()).toBe(jsonContents);
});

test('get_json_contents() returns the json contents even if null', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  expect(engine.get_json_contents()).toBe(null);
});

//  get_random_subset()

test('get_random_subset(0) returns an empty array', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array
  const outcomes = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    }
  ];

  engine.outcomes = outcomes;

  expect(engine.get_random_subset(0)).toStrictEqual([]);
});

test('get_random_subset(1) returns an array with an element from the outcomes array', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array
  const outcomes = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    }
  ];

  engine.outcomes = outcomes;

  //  Due to randomness, do this multiple times (~ n^2)

  for (let i = 0; i < outcomes.length * outcomes.length; i++) {
    //  Get an array with one random element
    const result = engine.get_random_subset(1);

    //  Check that that element
    expect(outcomes.includes(result[0])).toBe(true);
  }
});

test('get_random_subset() returns an array with an element from the outcomes array (all sizes)', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array
  const outcomes = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    },
    {
      value: 6
    },
    {
      value: 7
    },
    {
      value: 8
    },
    {
      value: 9
    },
    {
      value: 10
    }
  ];

  engine.outcomes = outcomes;

  //  Due to randomness, do this multiple times (~ n^2)

  for (let i = 0; i < outcomes.length * outcomes.length; i++) {
    for (let j = 0; j <= outcomes.length; j++) {
      //  Get an array with j random elements
      const result = engine.get_random_subset(j);

      //  Check that all elements in the result array are in
      //  the outcomes array
      for (let k = 0; k < j; k++) {
        expect(outcomes.includes(result[k])).toBe(true);
      }
    }
  }
});

test('get_random_subset(n) returns entire array when n >= outcomes.length', () => {
  //  Create a FortuneEngine object
  const engine = new FortuneEngine('Test');

  //  Can't test fetch() in Jest - assume read.
  engine.initialized = true;

  //  Set outcomes array
  const outcomes = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    },
    {
      value: 6
    },
    {
      value: 7
    },
    {
      value: 8
    },
    {
      value: 9
    },
    {
      value: 10
    }
  ];

  engine.outcomes = outcomes;

  for (let i = 0; i < outcomes.length; i++) {
    //  Get result
    const result = engine.get_random_subset(outcomes.length + i);

    //  Initialize found array to all false
    const found = [];
    outcomes.forEach(() => {
      found.push(false);
    });

    result.forEach(object => {
      const value = object.value;
      //  Object should be in the outcomes array
      expect(outcomes.includes(object)).toBe(true);
      //  Object shouldn't be found more than once (no duplicates)
      expect(found[value - 1]).toBe(false);

      found[value - 1] = true;
    });

    found.forEach(isFound => {
      //  All objects should have been found
      expect(isFound).toBe(true);
    });
  }
});
