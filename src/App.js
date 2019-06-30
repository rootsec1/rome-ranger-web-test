import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './app/pages/Homepage';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
    </Switch>
  );
}

export default App;
