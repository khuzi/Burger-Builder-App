import React , { Component }  from 'react';
import { Route , Switch , withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout.component'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.component'
import Checkout from '../src/containers/Checkout/Checkout.component';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onAutoTrySignUp();
  }
  render() { 
    return ( 
      <div>
        <Layout />
        <Switch> 
          <Route path="/checkout" component={Checkout}/> 
          <Route path="/orders"  component={Orders}/>  
          <Route path="/auth"  component={Auth}/>
          <Route path="/logout"  component={Logout}/>    
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      </div>
     ); 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoTrySignUp: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(null ,mapDispatchToProps)(App));




//with exact the order wouldn't matter but without exact the order is matter.
