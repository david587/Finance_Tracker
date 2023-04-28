
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from './components/Navbar';

function App() {
  const { authIsReady } = useAuthContext()

  return (
    <div className="App">
      only load this three when we get back user state response from backend,
      {authIsReady && (
         <BrowserRouter>
         <Navbar/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
          </Switch>
         </BrowserRouter>
      )}
    </div>
  );
}

export default App;
