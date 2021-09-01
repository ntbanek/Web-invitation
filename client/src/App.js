
import React from "react";
import { Route, Switch, } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import WeddingPage from "./WeddingPage";
import ReceptionPage from "./ReceptionPage";
import Form from "./Form";
import Navigation from "./Navigation";


class App extends React.Component {
  render() {
  return (
    <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/form/:userId' component={Form} />
          <Route exact path='/page/:userId' component={Navigation} />
          <Route exact path='/:userId' component={MainPage} />
          <Route exact path='/wedding/:userId' component={WeddingPage} />
          <Route exact path='/reception/:userId' component={ReceptionPage} />
    </Switch>
  );
}
}
export default App;


