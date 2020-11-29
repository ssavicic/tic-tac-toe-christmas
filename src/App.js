import Home from './app/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameScreen from './app/features/GameScreen';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/game">
            <GameScreen />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

