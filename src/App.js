import "./App.css";
import NavBar from "./components/NavBar";
import TaskWall from "./components/TaskWall";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import WelcomScreen from "./components/WelcomScreen";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen md:flex">
        <MobileNav />
        <NavBar />
        <Route exact path="/">
          <WelcomScreen />
        </Route>
        <Route path="/project/:name">
          <TaskWall />
        </Route>
      </div>
    </Router>
  );
}

export default App;
