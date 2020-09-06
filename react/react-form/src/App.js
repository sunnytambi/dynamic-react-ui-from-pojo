import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DynamicForm from './components/dynamic-form';

function App() {
  
  // Declare a new state variable, which we'll call "count"
  const [pojo, setPojo] = useState(null);

  function loadPojo(){
    console.log('loading pojo...');
    fetch("http://localhost:8080/api/employees")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('success');
          console.log(result);
          setPojo(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error');
          console.log(error);
          setPojo(null);
        }
      )
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a href="#" className="App-link" onClick={loadPojo}>Employee Form</a>
        </nav>
        <br/>
        <h1>Dynamic form using Pojo</h1>
        <br/>
        <br/>
        <DynamicForm pojo={pojo} postOn="http://localhost:8080/api/employees" />
      </header>
    </div>
  );
}

export default App;
