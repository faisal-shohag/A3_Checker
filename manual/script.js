const testCases = {
  problem1: {
    title: "Problem 01 - Divide the Asset",
    tests: [
      { input: { area: 800 }, expected: "400", description: "area = 800" },
      { input: { area: 4 }, expected: "2", description: "area = 4" },
      { input: { area: 100 }, expected: "50", description: "area = 100" },
      { input: { area: 15 }, expected: "7.5", description: "area = 15" },
      { input: { area: 2060 }, expected: "1030", description: "area = 2060" },
    ],
  },
  problem2: {
    title: "Problem 02 - Cycle or Laptop",
    tests: [
      {
        input: { money: 45000 },
        expected: "Laptop",
        description: "money = 45000",
      },
      {
        input: { money: 10000 },
        expected: "Cycle",
        description: "money = 10000",
      },
      {
        input: { money: 9999 },
        expected: "Chocolate",
        description: "money = 9999",
      },
      {
        input: { money: 5 },
        expected: "Chocolate",
        description: "money = 5",
      },
      {
        input: { money: 91929 },
        expected: "Laptop",
        description: "money = 91929",
      },
    ],
  },
  problem3: {
    title: "Problem 03 - Medicine Planner",
    tests: [
      {
        input: { lastDay: 4 },
        expected: ["1 - rest", "2 - rest", "3 - medicine", "4 - rest"],
        description: "lastDay = 4",
      },
      {
        input: { lastDay: 6 },
        expected: [
          "1 - rest",
          "2 - rest",
          "3 - medicine",
          "4 - rest",
          "5 - rest",
          "6 - medicine",
        ],
        description: "lastDay = 6",
      },
      {
        input: { lastDay: 11 },
        expected: [
          "1 - rest",
          "2 - rest",
          "3 - medicine",
          "4 - rest",
          "5 - rest",
          "6 - medicine",
          "7 - rest",
          "8 - rest",
          "9 - medicine",
          "10 - rest",
          "11 - rest",
        ],
        description: "lastDay = 11",
      },
       {
        input: { lastDay: 9 },
        expected: [
          "1 - rest",
          "2 - rest",
          "3 - medicine",
          "4 - rest",
          "5 - rest",
          "6 - medicine",
          "7 - rest",
          "8 - rest",
          "9 - medicine",
        ],
        description: "lastDay = 9",
      },
    ],
  },
  problem4: {
    title: "Problem 04 - Delete/Store",
    tests: [
      {
        input: { fileName: "result.pdf" },
        expected: "Store",
        description: 'fileName = "result.pdf"',
      },
      {
        input: { fileName: "data.docx" },
        expected: "Store",
        description: 'fileName = "data.docx"',
      },
      {
        input: { fileName: "pdfData.jpg" },
        expected: "Delete",
        description: 'fileName = "pdfData.jpg"',
      },
      {
        input: { fileName: "#exp.mp4" },
        expected: "Store",
        description: 'fileName = "#exp.mp4"',
      },
      {
        input: { fileName: "docx.txt" },
        expected: "Delete",
        description: 'fileName = "docx.txt"',
      },
      {
        input: { fileName: "docx.xpdf" },
        expected: "Delete",
        description: 'fileName = "docx.xpdf"',
      },
      {
        input: { fileName: "slipdf.txt" },
        expected: "Delete",
        description: 'fileName = "slipdf.txt"',
      },
    ],
  },
  problem5: {
    title: "Problem 05 - PH Email Generator",
    tests: [
      {
        input: { student: { name: "jhankar", roll: 1014, department: "cse" } },
        expected: "jhankar1014.cse@ph.ac.bd",
        description:
          'student = { name: "jhankar", roll: 1014, department: "cse" }',
      },
      {
        input: { student: { name: "monu", roll: 99, department: "eee" } },
        expected: "monu99.eee@ph.ac.bd",
        description: 'student = { name: "monu", roll: 99, department: "eee" }',
      },
      {
        input: { student: { name: "mewo", roll: 96, department: "cse" } },
        expected: "mewo96.cse@ph.ac.bd",
        description: 'student = { name: "mewo", roll: 96, department: "cse" }',
      },
    ],
  },
  problem6: {
    title: "Problem 06 - Current Salary",
    tests: [
      {
        input: { startingSalary: 45000, experience: 30 },
        expected: "194487.41",
        description: "startingSalary = 45000, experience = 30",
      },
      {
        input: { startingSalary: 15000, experience: 3 },
        expected: "17364.38",
        description: "startingSalary = 15000, experience = 3",
      },
      {
        input: { startingSalary: 30000, experience: 40 },
        expected: "211199.66",
        description: "startingSalary = 30000, experience = 40",
      },
    ],
  },
};

function extractProblems(source) {
  // First, let's split the source by problem indicators more effectively
  const lines = source.split('\n');
  const problems = [];
  let currentProblemNumber = null;
  let currentCodeLines = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const originalLine = line;
    
    // Check if this line contains a problem header
    const problemHeaderRegex = /Problem\s*-?\s*0?(\d+)/i;
    const match = line.match(problemHeaderRegex);
    
    if (match) {
      // Save the previous problem if it exists
      if (currentProblemNumber !== null && currentCodeLines.length > 0) {
        const cleanedCode = cleanCodeBlock(currentCodeLines.join('\n'));
        if (cleanedCode.trim()) {
          const problemObj = {};
          problemObj[`problem${currentProblemNumber}`] = cleanedCode;
          problems.push(problemObj);
        }
      }
      
      // Start tracking new problem
      currentProblemNumber = parseInt(match[1]);
      currentCodeLines = [];
      inCodeBlock = true;
      continue;
    }
    
    // If we're tracking a problem, collect non-comment lines
    if (inCodeBlock && currentProblemNumber !== null) {
      // Skip lines that are purely comments or separators
      const trimmedLine = line.trim();
      
      // Skip comment-only lines and separators
      if (trimmedLine.startsWith('//') || 
          trimmedLine.startsWith('/*') || 
          trimmedLine.startsWith('*') ||
          trimmedLine === '' ||
          /^\/\*-+.*-+\*\/$/.test(trimmedLine)) {
        continue;
      }
      
      // Remove inline comments but keep the code
      line = removeInlineComments(line);
      
      // Add non-empty lines
      if (line.trim()) {
        currentCodeLines.push(line);
      }
    }
  }
  
  // Don't forget the last problem
  if (currentProblemNumber !== null && currentCodeLines.length > 0) {
    const cleanedCode = cleanCodeBlock(currentCodeLines.join('\n'));
    if (cleanedCode.trim()) {
      const problemObj = {};
      problemObj[`problem${currentProblemNumber}`] = cleanedCode;
      problems.push(problemObj);
    }
  }
  
 // Sort by problem number and convert to single object
  const sortedProblems = problems.sort((a, b) => {
    const aNum = parseInt(Object.keys(a)[0].replace('problem', ''));
    const bNum = parseInt(Object.keys(b)[0].replace('problem', ''));
    return aNum - bNum;
  });
  
  // Merge all problems into a single object
  const result = {};
  sortedProblems.forEach(problemObj => {
    const key = Object.keys(problemObj)[0];
    result[key] = problemObj[key];
  });
  
  return result;
}

function removeInlineComments(line) {
  // Remove inline comments but be careful with strings
  let result = '';
  let inString = false;
  let stringChar = '';
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    // Handle string detection
    if ((char === '"' || char === "'") && !inString) {
      inString = true;
      stringChar = char;
      result += char;
    } else if (char === stringChar && inString) {
      inString = false;
      stringChar = '';
      result += char;
    } else if (inString) {
      result += char;
    } else if (char === '/' && nextChar === '/' && !inString) {
      // Found inline comment, stop here
      break;
    } else {
      result += char;
    }
  }
  
  return result;
}

function cleanCodeBlock(code) {
  return code
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s*\n/, '')
    .replace(/\n\s*$/, '')
    .trim();
}


function runSingleProblem(problemKey, code, tests) {
  const results = [];

  // Helper function to remove all spaces from a string
  function removeAllSpaces(str) {
    return String(str).replace(/[\s-]/g, '');
  }

  // Helper function to normalize output for comparison
  function normalizeForComparison(value) {
    if (Array.isArray(value)) {
      return value.map(item => removeAllSpaces(item));
    }
    return removeAllSpaces(value);
  }

  // console.log({ problemKey, code, tests });

  // Collect all test variables
  const testVariables = new Set();
  tests.forEach((test) => {
    Object.keys(test.input).forEach((varName) => {
      testVariables.add(varName);
    });
  });

  // console.log("Required variables from tests:", Array.from(testVariables));

  // Check if all required variables are used in the code
  const missingVariables = [];
  const foundVariables = [];

  testVariables.forEach((varName) => {
    const varUsageRegex = new RegExp(`\\b${varName}\\b`, "g");
    if (varUsageRegex.test(code)) {
      foundVariables.push(varName);
    } else {
      missingVariables.push(varName);
    }
  });

  if (missingVariables.length > 0) {
    const errorMessage = `Variable(s) not found: [${missingVariables.join(
      ", "
    )}]. Please make sure to use these variable(s) in your code.`;

    return tests.map((test) => ({
      passed: false,
      expected: test.expected,
      actual: "Variable not found error",
      description: test.description,
      error: errorMessage,
    }));
  }

  // console.log("Found variables:", foundVariables);

  // Remove variable declarations from code (handles multiline objects)
  let cleanedCode = removeVariableDeclarations(code, testVariables);

  // console.log("Cleaned code:", cleanedCode);

  // Run tests
  for (const test of tests) {
    try {
      const outputs = [];
      const mockConsole = {
        log: function (...args) {
          outputs.push(args.join(" "));
        },
      };

      const executionCode = `
                const console = mockConsole;
                ${Object.entries(test.input)
                  .map(
                    ([key, value]) => `var ${key} = ${JSON.stringify(value)};`
                  )
                  .join("\n")}
                ${cleanedCode}
            `;

      // console.log("Execution code for test:", test.description);
      // console.log(executionCode);

      const func = new Function("mockConsole", executionCode);
      func(mockConsole);

      let passed = false;
      let actualOutput = outputs;

      if (Array.isArray(test.expected)) {
        // Normalize both arrays for comparison
        const normalizedActual = normalizeForComparison(actualOutput);
        const normalizedExpected = normalizeForComparison(test.expected);
        passed = JSON.stringify(normalizedActual) === JSON.stringify(normalizedExpected);
      } else {
        const lastOutput =
          actualOutput.length > 0
            ? actualOutput[actualOutput.length - 1]
            : null;
        
        // Normalize both values for comparison
        const normalizedActual = normalizeForComparison(lastOutput || "");
        const normalizedExpected = normalizeForComparison(test.expected || "");
        passed = normalizedActual === normalizedExpected;
      }

      results.push({
        passed,
        expected: test.expected,
        actual:
          actualOutput.length > 0
            ? Array.isArray(test.expected)
              ? actualOutput
              : actualOutput[actualOutput.length - 1]
            : "No output",
        description: test.description,
        error: null,
      });
    } catch (error) {
      results.push({
        passed: false,
        expected: test.expected,
        actual: null,
        description: test.description,
        error: error.message,
      });
    }
  }

  return results;
}

function removeVariableDeclarations(code, variableNames) {
  const lines = code.split("\n");
  const result = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line contains a variable declaration we want to remove
    let shouldRemove = false;
    let targetVariable = null;

    for (const varName of variableNames) {
      const varDeclarationRegex = new RegExp(
        `^\\s*(var|let|const)\\s+${varName}\\s*=`,
        "i"
      );
      const varOnlyRegex = new RegExp(
        `^\\s*(var|let|const)\\s+${varName}\\s*;\\s*$`,
        "i"
      );

      if (varDeclarationRegex.test(line) || varOnlyRegex.test(line)) {
        shouldRemove = true;
        targetVariable = varName;
        break;
      }
    }

    if (shouldRemove) {
      // Handle variable declaration without assignment (e.g., "var student;")
      const varOnlyRegex = new RegExp(
        `^\\s*(var|let|const)\\s+${targetVariable}\\s*;\\s*$`,
        "i"
      );
      if (varOnlyRegex.test(line)) {
        i++; // Skip this line and continue
        continue;
      }

      // Handle variable declaration with assignment - need to find where it ends
      const endIndex = findDeclarationEnd(lines, i);
      i = endIndex + 1; // Skip all lines of this declaration
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join("\n");
}

function findDeclarationEnd(lines, startIndex) {
  let braceCount = 0;
  let bracketCount = 0;
  let parenCount = 0;
  let inString = false;
  let stringChar = "";
  let inComment = false;
  let inMultiLineComment = false;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const nextChar = j < line.length - 1 ? line[j + 1] : "";
      const prevChar = j > 0 ? line[j - 1] : "";

      // Handle single line comments
      if (
        !inString &&
        !inMultiLineComment &&
        char === "/" &&
        nextChar === "/"
      ) {
        inComment = true;
        break; // Rest of line is comment
      }

      // Handle multi-line comments
      if (!inString && !inComment && char === "/" && nextChar === "*") {
        inMultiLineComment = true;
        j++; // Skip the '*'
        continue;
      }

      if (inMultiLineComment && char === "*" && nextChar === "/") {
        inMultiLineComment = false;
        j++; // Skip the '/'
        continue;
      }

      if (inComment || inMultiLineComment) {
        continue;
      }

      // Handle string literals
      if ((char === '"' || char === "'" || char === "`") && !inString) {
        inString = true;
        stringChar = char;
        continue;
      }

      if (char === stringChar && inString) {
        // Check if it's escaped
        let backslashCount = 0;
        for (let k = j - 1; k >= 0 && line[k] === "\\"; k--) {
          backslashCount++;
        }
        if (backslashCount % 2 === 0) {
          inString = false;
          stringChar = "";
        }
        continue;
      }

      if (inString) {
        continue;
      }

      // Count brackets, braces, parentheses
      if (char === "{") {
        braceCount++;
      } else if (char === "}") {
        braceCount--;
      } else if (char === "[") {
        bracketCount++;
      } else if (char === "]") {
        bracketCount--;
      } else if (char === "(") {
        parenCount++;
      } else if (char === ")") {
        parenCount--;
      } else if (
        char === ";" &&
        braceCount === 0 &&
        bracketCount === 0 &&
        parenCount === 0
      ) {
        // Found the end of the statement
        return i;
      }
    }

    // Reset comment flag at end of line
    inComment = false;

    // If we've closed all brackets and braces at the end of a line,
    // and there's no semicolon, this might be the end
    if (
      braceCount === 0 &&
      bracketCount === 0 &&
      parenCount === 0 &&
      !inString &&
      !inMultiLineComment
    ) {
      const trimmed = line.trim();
      if (
        trimmed.endsWith(";") ||
        trimmed.endsWith("}") ||
        trimmed.endsWith("]") ||
        trimmed.endsWith(")")
      ) {
        return i;
      }
    }
  }

  // If we reach here, return the last line
  return lines.length - 1;
}

function createTestCaseHTML(result) {
  const statusColor = result.passed ? "text-green-600" : "text-red-600";
  const statusIcon = result.passed ? "✅" : "❌";
  const statusText = result.passed ? "PASS" : "FAIL";

  return `
                <div class="bg-white/50 rounded-lg p-4 border-l-4 ${
                  result.passed ? "border-green-500" : "border-red-500"
                }">
                    <div class="space-y-2 text-sm">
                        <div><span class="font-semibold text-gray-700">Test:</span> <span class="font-mono">${
                          result.description
                        }</span></div>
                        <div><span class="font-semibold text-gray-700">Expected:</span> <span class="font-mono text-blue-600">${JSON.stringify(
                          result.expected
                        )}</span></div>
                        <div><span class="font-semibold text-gray-700">Actual:</span> <span class="font-mono text-purple-600">${JSON.stringify(
                          result.actual
                        )}</span></div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-gray-700">Status:</span> 
                            <span class="${statusColor} font-bold">${statusIcon} ${statusText}</span>
                        </div>
                        ${
                          result.error
                            ? `<div><span class="font-semibold text-gray-700">Error:</span> <span class="text-red-500 font-mono">${result.error}</span></div>`
                            : ""
                        }
                    </div>
                </div>
            `;
}
function runTests() {
  const code = document.getElementById("studentCode").value;
  const problems = extractProblems(code);
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  let totalTests = 0;
  let passedTests = 0;
  let feedbacks = ""; // Initialize feedbacks as a string to store HTML feedback

  resultsDiv.innerHTML = `
                <div class="text-center py-8">
                    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p class="text-gray-600 text-lg">Running tests...</p>
                </div>
            `;

  setTimeout(() => {
    resultsDiv.innerHTML = "";
    let marks = 0;

    for (const [problemKey, testConfig] of Object.entries(testCases)) {
      const problemCode = problems[problemKey];
      const resultDiv = document.createElement("div");

      // Generate feedback HTML for the current problem
     let problemFeedback = `<h3 class="text-lg font-bold">${testConfig.title}</h3>  `;

      if (!problemCode) {
        resultDiv.className =
          "bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300";
        resultDiv.innerHTML = `
                            <div class="flex items-center gap-3 text-xl font-bold mb-2">
                                <span class="text-2xl">⚠️</span>
                                ${testConfig.title}
                            </div>
                            <p class="text-white/90">Problem not found in submission</p>
                        `;
        problemFeedback += `<strong class="text-yellow-600">⚠️ Problem not found in submission</strong><br><br>  `;
        feedbacks += problemFeedback;
        resultsDiv.appendChild(resultDiv);
        continue;
      }

      const testResults = runSingleProblem(
        problemKey,
        problemCode,
        testConfig.tests
      );
      
      // console.log(testResults)
      const problemPassed = testResults.every((result) => result.passed);
      const problemPassedCount = testResults.filter(
        (result) => result.passed
      ).length;

      totalTests += testConfig.tests.length;
      passedTests += problemPassedCount;

      const acceptanceRate = (problemPassedCount / testConfig.tests.length) * 100;
      marks += Math.ceil(10 * (acceptanceRate / 100));

      const gradientClass = problemPassed
        ? "bg-gradient-to-r from-green-400 to-emerald-500"
        : "bg-gradient-to-r from-red-400 to-pink-500";

      resultDiv.className = `${gradientClass} text-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300`;

      const testDetailsHtml = testResults.map(createTestCaseHTML).join("");

      // Append feedback for each test case
     problemFeedback += `<b>Test Cases: ${problemPassedCount}/${testConfig.tests.length} passed</b>\n `;

      testResults.forEach((result, index) => {
        const status = result.passed ? "✅ Passed" : "❌ Failed";
        const errorInfo = result.passed
          ? ""
          : `\n${result.description}\nExpected: ${JSON.stringify(result.expected) || "N/A"}, Got: ${JSON.stringify(result.actual) || "N/A"}` +
            (result.error ? `\nError: ${result.error}` : "");
        problemFeedback += `\nTest ${index + 1}: ${status}${errorInfo}\n`;
      });
      problemFeedback += `  \n${acceptanceRate == 100 ?"<b>🏆 You got full marks for this solution.</b>": ""}${acceptanceRate > 0 && acceptanceRate != 100 ? "<b>❌ Not all test cases passed. ✔️ However, you’ve earned marks for the correctly passed test cases.</b>" : "" } ${acceptanceRate === 0 ? "<b>❌😞 No marks!</b>" : ""}  `;
    feedbacks += problemFeedback;
    feedbacks += '\n----------------------------------------\n  '

      resultDiv.innerHTML = `
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <span class="text-2xl">${
                                  problemPassed ? "✅" : "❌"
                                }</span>
                                <h3 class="text-xl font-bold">${
                                  testConfig.title
                                }</h3>
                            </div>
                            <div class="bg-white/20 px-4 py-2 rounded-full">
                                <span class="font-bold">${problemPassedCount}/${
        testConfig.tests.length
      }</span>
                            </div>
                        </div>
                        
                        <div class="space-y-3 mb-4">
                            ${testDetailsHtml}
                        </div>
                        
                        <details class="group">
                            <summary class="cursor-pointer bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors duration-200">
                                <span class="font-semibold">📋 View Code</span>
                            </summary>
                            <div class="mt-3 bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                <pre>${problemCode
                                  .replace(/</g, "&lt;")
                                  .replace(/>/g, "&gt;")}</pre>
                            </div>
                        </details>
                    `;

      resultsDiv.appendChild(resultDiv);
    }

      const submitedNum = document.getElementById("submitted_at").value;

  feedbacks += `\n<h4 class="font-bold">Examiner Feedback:</h4> ${getFeedBack(submitedNum, marks)}\n
<strong>Important Instructions:</strong>
  → Don't post any marks-related issues on Facebook.
  → Make sure to read all the feedback carefully.
<br/>
<strong>Let's Code_ Your Career</strong>`;

 const final_marks = getFinalMark(60, marks, parseInt(submitedNum))

    console.log("Obtained Marks:", marks);
    console.log("final_marks", final_marks);
    console.log("Feedbacks:", feedbacks); // Log feedbacks for debugging
  const textArea = document.querySelector(".ql-editor p");
  textArea.innerHTML = `<p>${feedbacks}</p>`;

    const summaryDiv = document.createElement("div");
    const percentage =
      totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
    const summaryGradient =
      percentage >= 80
        ? "bg-gradient-to-r from-blue-500 to-indigo-600"
        : percentage >= 60
        ? "bg-gradient-to-r from-yellow-500 to-orange-600"
        : "bg-gradient-to-r from-gray-500 to-gray-700";

    summaryDiv.className = `${summaryGradient} text-white rounded-2xl p-8 shadow-lg text-center mt-6`;
    summaryDiv.innerHTML = `
                    <h3 class="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        📊 Test Summary
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div class="bg-white/20 rounded-lg p-4">
                            <div class="text-2xl font-bold">${totalTests}</div>
                            <div class="text-sm opacity-90">Total Tests</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-4">
                            <div class="text-2xl font-bold text-green-300">${passedTests}</div>
                            <div class="text-sm opacity-90">Passed</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-4">
                            <div class="text-2xl font-bold text-red-300">${
                              totalTests - passedTests
                            }</div>
                            <div class="text-sm opacity-90">Failed</div>
                        </div>
                        <div class="bg-white/20 rounded-lg p-4">
                            <div class="text-2xl font-bold text-yellow-300">${percentage}%</div>
                            <div class="text-sm opacity-90">Success Rate</div>
                        </div>
                    </div>
                `;
    resultsDiv.appendChild(summaryDiv);
  }, 1000);
}
function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("studentCode").value = "";
}

function getFinalMark(totalMarks, obtainedMarks, submittedAt) {
  const maxScale = submittedAt;
  const ratio = maxScale / totalMarks;
  return Math.ceil(obtainedMarks * ratio);
}





// Examiner feedbacks
const defaultMessage = {
  BEST: [
    "Awesome work!🌟 Keep it up! 💪",
    "Wow! 👏 You did very well! It must have been your dedication and hard work behind it. Keep up the fantastic effort! 🚀",
    "Congratulations 🎉 on achieving a perfect score! You should be very proud! 🏆",
  ],
  GOOD: [
    "Good job! 👏 Keep working hard! 💪",
    "Solid effort!📈 Keep practicing, and you'll reach your goals! 🎯",
    "You're on the right track!📈 Keep up the good work! 👏",
  ],
  AVERAGE: [
    "There's always room for improvement. Keep practicing, and you'll see results! 💪",
    "It looks like you could use some extra practice. Don’t give up—keep at it! 🚀",
    "Remember, progress takes time ⏳. Keep working hard, and you'll improve! 🌟",
  ],
  BAD: [
    "Stay focused and keep pushing forward—wishing you the best of luck! 💪",
    "It looks like you faced some challenges this time. Don't be discouraged; keep at it! 💪",
    "Remember, everyone makes mistakes. Keep learning and growing! 🌟",
  ],
};

function getFeedBack(submittedMarks, obtainedMarks) {
  switch (submittedMarks) {
    case "60":
      // console.log("60");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //54-60
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //42-53
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 30-41
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-29
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    case "50":
      console.log("50");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //45-50
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //35-44
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 25-34
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-24
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    case "30":
      console.log("30");
      if (obtainedMarks >= submittedMarks * 0.9) {
        //27-30
        return defaultMessage["BEST"][
          Math.floor(Math.random() * defaultMessage["BEST"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.7) {
        //21-26
        return defaultMessage["GOOD"][
          Math.floor(Math.random() * defaultMessage["GOOD"].length)
        ];
      } else if (obtainedMarks >= submittedMarks * 0.5) {
        // 15-20
        return defaultMessage["AVERAGE"][
          Math.floor(Math.random() * defaultMessage["AVERAGE"].length)
        ];
      } else {
        //0-14
        return defaultMessage["BAD"][
          Math.floor(Math.random() * defaultMessage["BAD"].length)
        ];
      }

    default:
      return "Invalid marks.";
  }
}
