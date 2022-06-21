import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import Vote from './Components/Vote/Vote';
import PageNotFound from './Components/PageNotFound/PageNotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/vote/:pollId" element={<Vote/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    <div className='footer'>
    <p>Created by -&nbsp;
      <a href='https://github.com/Abhinraj-ss' >@Abhinraj-ss</a>
    </p>
    </div>
    
  </>
  
);
