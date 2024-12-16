import './App.css';
import React, {useState, useEffect} from 'react';
import Editor from '@monaco-editor/react'

function App() {

  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');

  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [fontSize, setFontSize] = useState(getFontSize());

  // Function of font size calculation, depending on screen size
  function getFontSize() {
      if (window.innerWidth < 320) return 10; // Small size for small screen
      return Math.max(10, Math.min(16, window.innerWidth / 40)); // Dynamic font
  }

  useEffect(() => {

    // Обновляем размер шрифта при изменении размеров экрана
    const handleResize = () => {
      setFontSize(getFontSize());
  };
  window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
        setCode('// Write your code here');
    };
}, []);

  const mockServer = async (language, code) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!code.trim()) {
                reject({
                    status: 'error',
                    error: 'Error: No code provided.',
                });
            } else if (code.includes('error')) {
                reject({
                    status: 'error',
                    error: `SyntaxError: Unexpected token in ${language}`,
                });
            } else if (code.length > 500) {
                reject({
                    status: 'error',
                    error: 'Error: Code is too long to execute.',
                });
            } else {
                resolve({
                    status: 'success',
                    output: `Code executed successfully in ${language}.\nOutput:\n${code}`,
                });
            }
        }, 1000);
    });
};


  return (
    <div className="app_container">
      <header className="header">
        <h1>Code Editor</h1>
        <p>Choose a programming language, write your code, and run it!</p>
    </header>
      <select
      className="language-selector"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
      </select>
      <div className="monaco-editor-container">
    <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(newValue) => setCode(newValue || '')}
        options={{ 
          fontSize: fontSize,
          minimap: { enabled: false },
          automaticLayout: true }}
    />
</div>
      <button
    className="app_button"
    onClick={async () => {
        setOutput('Running...');
        setIsLoading(true); // Turn on the loading indicator
        try {
            const response = await mockServer(language, code);
            setOutput(response.output);
        } catch (error) {
            setOutput(error.error);
        } finally {
            setIsLoading(false); // Turn off the loading indicator
        }
    }}
    disabled={isLoading} // Block the button while performing
>
    {isLoading ? 'Running...' : 'Run Code'}
      </button>
      <div className="output_container">
        <h3>Output:</h3>
        <pre className="output">
          {output ? output : 'Your output will appear here.'}
        </pre>
      </div>
      <footer className="footer">
       <p>Created by Eugeny Iakovlev - 2024</p>
      </footer>
    </div>
  );
}

export default App;
