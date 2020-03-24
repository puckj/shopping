import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import ShopControl from './containers/ShopControl/ShopControl.jsx';
import FullView from './containers/FullView/FullView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={ShopControl} />
          <Switch>
            <Route path="/:productId" exact component={FullView} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
