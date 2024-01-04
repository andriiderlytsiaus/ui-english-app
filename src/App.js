import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Words from './pages/Words';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import Lesson from './pages/Lesson';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import CreateLesson from './components/CreateLesson/CreateLesson';
import './App.css'


function App() {
  const [userId, setUserId] = useState(null);
Window.userId = userId;
  const handleSignIn = (id) => {
    setUserId(id);
  };
  useEffect(() => {
    console.log('User ID in Parent Component:', userId);
  }, [userId]);
  return (
    <BrowserRouter>
      <header>
        <h2> EnglishApp</h2> 
        <nav>
        <Link to="/">Home</Link>
        {Window.userId === null ? (
            <Link to="/signIn">Dictionary</Link>
          ) : (
            <Link to="/words">Dictionary</Link>
          )}
       </nav>
       <Link to="/signIn" id='SignInLink' className='SignInButton'>Account</Link>
      </header> 
      <main>  
      <Routes>
          <Route index element ={<Home userId={userId}/>} />
          <Route path="/home" element = {<Home userId={userId} />}/>
          <Route path="/words" element = {<Words userId={userId}/>}/>
          <Route path="/lesson/:lessonId" element = {<Lesson />}/>
          <Route path="/createLesson/:lessonId" element = {<CreateLesson />}/>
          <Route path="/signIn" element = {<SignIn  onSignIn={handleSignIn}/>}/>
          <Route path="/register" element = {<Register />}/>
        </Routes>   
      </main>
      <Footer/>
    </BrowserRouter>  
  );
}

export default App;
