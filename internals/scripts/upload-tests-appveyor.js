/*
Sample output:
{
  "numFailedTestSuites": 0,
  "numFailedTests": 0,
  "numPassedTestSuites": 77,
  "numPassedTests": 288,
  "numPendingTestSuites": 0,
  "numPendingTests": 0,
  "numRuntimeErrorTestSuites": 0,
  "numTotalTestSuites": 77,
  "numTotalTests": 288,
  "openHandles": [...],
  "snapshot": {...},
  "startTime": 1547710134751,
  "success": true,
  "testResults": [
    {
      "assertionResults":[
        {
          "ancestorTitles":[
            "<FeaturePage />"
          ],
          "failureMessages":[

          ],
          "fullName":"<FeaturePage /> should render its heading",
          "location":null,
          "status":"passed",
          "title":"should render its heading"
        },
        ...
      ],
      "endTime":1547710137461,
      "message":"",
      "name":"/Users/Benjamin/Documents/Code/bwyap/react-boilerplate-typescript-apollo/app/containers/FeaturePage/tests/index.test.js",
      "startTime":1547710136039,
      "status":"passed",
      "summary":""
    },
  ],
  "wasInterrupte": false,
  "coverageMap": {...},
}
*/

/*
Expected format:
[{
  "testName": "Test A",
  "testFramework": "NUnit",
  "fileName": "tests.dll",
  "outcome": "Passed",
  "durationMilliseconds": "1200",
  "ErrorMessage": "",
  "ErrorStackTrace": "",
  "StdOut": "",
  "StdErr": ""
}]
*/

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
