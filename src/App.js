import Admin from './component/admin_ui';
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
