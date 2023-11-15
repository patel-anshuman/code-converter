import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CodeEditor from './components/CodeEditor';
import MessageDisplay from './components/MessageDisplay';

function App() {
  useEffect(() => {
    document.title = 'Convert Code, Debug, Quality Check';
  }, []);

  const [userInput, setUserInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [message, setMessage] = useState('');

  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value);
  };


  const handleConvert = async () => {
    // Your code to call OpenAI API for code conversion
    if (selectedLanguage === '') {
      toast.warning('Select a language to convert!');
      return;
    }
    setMessage(`Converting your code to ${selectedLanguage}...`);
    try {
      const response = await fetch('https://wild-red-donkey-wear.cyclic.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Convert the given code to ${selectedLanguage}:\n${userInput}`
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setMessage(`Conversion to ${selectedLanguage}:\n\n${data.data}`);
    }
    catch (err) {
      console.log(err)
      setMessage(`Error converting code. Please try again.`);
      toast.error('Error converting code. Please try again.');
    }
  };

  const handleDebug = async () => {
    // Your code to call OpenAI API for code conversion
    setMessage('Debugging your code...');
    try {
      const response = await fetch('https://wild-red-donkey-wear.cyclic.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Debug this code:\n${userInput}`
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setMessage(`${data.data}`);
    } catch (error) {
      console.error('Error converting code:', error);
      setMessage(`Error debugging code. Please try again.`);
      toast.error('Error debugging code. Please try again.');
    }
  };

  const handleQualityCheck = async () => {
    // Your code to call OpenAI API for code conversion
    setMessage('Performing quality check...');
    try {
      const response = await fetch('https://wild-red-donkey-wear.cyclic.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Check the quality of this code:\n${userInput}\n\n Grade the code quality in various parameters`
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setMessage(`${data.data}`);
    } catch (error) {
      console.error('Error converting code:', error);
      setMessage(`An error occured. Please try again.`);
      toast.error('An error occured. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Code Converter App</h1>
      <Row className='row'>
        <Col md={6} className='col'>
          <CodeEditor onCodeChange={setUserInput} />
          <div className="actions">
            <select value={selectedLanguage} onChange={handleLanguageSelect}>
              <option value="">Select Language</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="Ruby">Ruby</option>
            </select>
            <Button variant="primary" onClick={handleConvert}>
              Convert
            </Button>
            <Button variant="primary" onClick={handleDebug}>
              Debug
            </Button>
            <Button variant="primary" onClick={handleQualityCheck}>
              Quality Check
            </Button>
          </div>
        </Col>

        <Col md={6} className='col'>
          <MessageDisplay message={message} />
        </Col>
      </Row>
      <ToastContainer position="bottom-right" />
    </Container>
  );
}

export default App;
