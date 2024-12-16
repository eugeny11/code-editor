# Code Editor

A simple online code editor with syntax highlighting and mock server execution.

## Features
- Syntax highlighting for **JavaScript** and **Python**.
- Mock server to simulate code execution with success and error responses.
- Responsive and user-friendly UI.

## How to Run
1. Clone this repository:
git clone <your-repo-link>

2. Navigate to the project folder:
cd code-editor

3. Install dependencies:
npm install


4. Start the project:
npm start

The project will run on `http://localhost:3000`.

## How it Works
1. **Code Editor**: Write code in the editor with syntax highlighting for the selected language.
2. **Language Selection**: Use the dropdown menu to select between JavaScript and Python.
3. **Run Code**: Click the "Run Code" button to send the code to a mock server for execution.
4. **Output Display**: The result of the code execution (or any errors) will appear in the output section.

## Mock Server Logic
The mock server simulates code execution:
- If the code contains the word "error", it returns a syntax error.
- If the code length exceeds 500 characters, it returns an error indicating that the code is too long.
- If the input is empty, it returns an error indicating no code was provided.
- Otherwise, it simulates successful execution and returns the input code as output.

## Future Improvements
- Integration with a real backend for actual code execution.
- Adding support for additional programming languages.
- Implementing real-time syntax checking.

## Author
Created by Eugeny Iakovlev - 2024