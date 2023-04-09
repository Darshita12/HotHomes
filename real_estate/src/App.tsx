
import Login from './Login';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar';
import Home from './Home';
import SideBar from './sideBar';
import PropertyDetail from './PropertyDetail';
import About from './About';
import Contact from './Contact';
import SavedProperties from './SavedProperties';
import AddProperty from './addProperty';
import AddBuilder from './addBuilder';


function App() {
  return (
    // <Login />
    <React.Fragment>
      <Router>
        <div className="App">
          <NavBar />
          <SideBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/contact" component={Contact} />
            {/* <Route path="/details" component={PropertyDetail} /> */}
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/saved" component={SavedProperties} />
            <Route path="/addProperty" component={AddProperty} />
            <Route path="/property/:id" component={PropertyDetail} />
            <Route path="/addBuilder" component={AddBuilder} />

          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
