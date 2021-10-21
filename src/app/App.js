import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import '../App.css';
import Posts from '../features/posts/posts';
import Post from '../features/posts/post';
import NavBar from '../components/nav';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path='/post'component={Post} />
        </Switch>
      </div>
    </Router>
  )  
}

export default App;
