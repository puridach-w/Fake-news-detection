import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import kao from './31.png';
import cpe from './cpe.png';
import kmutt from './kmutt.jpg';



function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(["Enter text first"]);
  const [submit, setSubmit] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    axios.post('http://127.0.0.1:8000/predict/', { text: text })
      .then(response => setPrediction(response.data.prediction))
      .catch(error => console.error(error));
  }

  const handleClear = (event) => {
    event.preventDefault();
    setSubmit(false);
  }

  return (
    <Container className='container'>
      <Row className='top-bar'>
        <Col className="left">
            <h1>Fake news Detection</h1>
        </Col>
        <Col className="right">
            <p>Decision tree algorithm</p>
        </Col>
      </Row>
      <hr />
      <Row className='content'>
        <div>
          <div>
            <div className='topic'>
              <h2 className="my-4">Uncover Deceptive Content with Our AI Detection System</h2>
              <p>We can detect news and distinguish between fake news and real news</p>
            </div>
            <div className='square-frame'>
              <div>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea" 
                      rows={12} 
                      cols={70} 
                      value={text} 
                      onChange={handleChange} 
                      style={{ padding: '5px 15px 5px 15px', fontSize: '20px'}}
                      placeholder="Type in the news you want to check"
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className='button'>
                <button className="button-23" onClick={handleSubmit}>
                  Check Content
                </button>
                <button className="button-40" onClick={handleClear}>
                  Clear Result
                </button>
              </div>
            </div>
          </div>
          {submit? <div>
            <h2 className="prediction">Prediction result:</h2>
            {prediction.map((pred, index) => (
              <h3 key={index}>{pred}</h3>
            ))}
          </div>:
          <div>
          </div>
          }
          
        </div>
      </Row>
      <footer className='footer'>
        <Container >
          {/* <Row className='foorter-img'>
            <Col xs={12} sm={6} md={4}>
              <img src={kao} alt="ก้าวไกล เบอร์31" style={{objectFit: 'cover', width: "300px", height: "200px" }} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <img src={cpe} alt="CPE logo" style={{ width: "200px", height: "200px" }} />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <img src={kmutt} alt="KMUTT logo" style={{objectFit: 'cover', width: "300px", height: "200px" }} />
            </Col>
          </Row> */}
          <hr />
          <Row >
            <Col className='footer-text'>
              <p style={{fontSize: '18px'}}>This is part of the project CPE393 Machine learning 
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
}


// function App() {
//   return (
//     <div>
//       <div className="Header">
//         <div className='Content'>
//           Fake news detection
//         </div>
//       </div>
//       <header className="App-header">
//         <p>
//           Hi this is a part of machine learning project
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;
