import React from 'react';
import { auth } from './firebase'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import { useAuthState } from 'react-firebase-hooks/auth'
const Home = React.lazy(()=> import("./components/Home"))
const Login = React.lazy(()=> import('./components/Login')) ;
const Main = React.lazy(()=> import('./components/Main')) ;
const Create = React.lazy(()=> import('./components/Create')) ;
const Details = React.lazy(()=> import('./components/Details')) ;
const Dashboard = React.lazy(()=> import('./components/Dashboard')) ;



function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return (
    <React.Suspense fallback={<p>Loading..</p>}>
    <Nav />
    <div className="flex flex-col min-h-screen justify-around items-center p-2">
      <p>loading....</p>
    </div>
    </React.Suspense>
  );
  return (
     <Router>
       <Nav />
        <React.Suspense fallback={<p>Loading..</p>}>
        <div>
        
        <div className="pt-20">
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/:code" component={Main} />
        <Route path="/create" render={props => user ? <Create /> : <Redirect to="/login" />} />
        <Route path="/detailed/:code" render={props => user ? <Details /> : <Redirect to="/login" />} />
        <Route path="/login" render={props => !user ? <Login /> : <Redirect to="/" />} />
        <Route path="/dashboard" render={props => user ? <Dashboard /> : <Redirect to="/login" />} />
        </Switch>
        </div>
        </div>
        </React.Suspense>
    </Router>
  );
}

export default App;
