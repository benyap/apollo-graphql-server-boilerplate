const axios = require('axios');
const results = require('../../results.json');

const SRC_FOLDER_NAME = 'app';
const TEST_FOLDER_NAME = 'test';

const reducer = (transformedResults, test) => {
  const newResults = [
    ...test.assertionResults.map(t => ({
      testName: t.fullName,
      testFramework: 'jest',
      fileName: test.name.substring(
        test.name.indexOf(SRC_FOLDER_NAME) ||
          test.name.indexOf(TEST_FOLDER_NAME),
      ),
      outcome: t.status,
      durationMilliseconds: '',
      ErrorMessage: '',
      ErrorStackTrace: test.failureMessages,
    })),
  ];

  // Return combined test results
  return [...transformedResults, ...newResults];
};

const transformed = results.testResults.reduce(reducer, []);

// Post tests to appveyor
// https://www.appveyor.com/docs/build-worker-api/#rest-3
axios.post(`${process.env.APPVEYOR_API_URL}/api/tests/batch`, transformed);
