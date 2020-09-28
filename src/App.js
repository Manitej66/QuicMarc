import React from 'react';
import './App.css';
import { auth } from './firebase'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Home from "./components/Home"
import Login from './components/Login';
import Main from './components/Main';



function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <h1>Loading...</h1>;
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/room/:code" component={Main} />
      <Route path="/login" render={props => !user ? <Login /> : <Redirect to="/" />} />
    </Router>
  );
}

export default App;
