import AppContainerBase from 'modules/app/component/container/base';
import LoginForm from 'modules/app/component/form/auth/login';
import Grid from 'material-ui/Grid';
import React from 'react';
import Routing from 'modules/app/component/container/routing';
import { push } from 'react-router-redux';
import { login } from 'modules/app/data/network/ajax/auth';
import {
  setUserVariable
} from 'modules/app/data/redux/reducer/user/action';
import { Facebook,Google } from 'modules/common/base/data/api';

class LoginContainer extends AppContainerBase{
  constructor(props){
    super(props);
  }
  container({render}){
    return (
      <Grid container justify="center">
        <LoginForm
          onChange={this.props.onChange}
          onSubmit={this.props.onSubmit}
          onFacebookLogin={this.props.onFacebookLogin}
          onGoogleLogin={this.props.onGoogleLogin}
        >
        </LoginForm>
      </Grid>
    );
  }
}

const actionLogin=data=>(dispatch,getState)=>{
  const {email,password,rememberMe:permanent}=data;
  login({native:{email,password},permanent}).then(
    data=>console.log(data),
    error=>console.log(error)
  )
}

const actionFacebookLogin=()=>(dispatch,getState)=>{
  Facebook.login({scope:'public_profile,email',response_type:'code'}).then(
    facebook=>login({facebook:facebook.authResponse}).then(
      data=>console.log(data),
      error=>console.log(error)
    ),
    error=>console.log(error)
  );
}

const actionGoogleLogin=()=>(dispatch,getState)=>{
  // console.log({auth2:Google.auth2});
  Google.grantOfflineAccess().then(
    google=>{
      console.log(google);
      // const {Zi:{access_token:accessToken,id_token:idToken}} = google;
      login({google}).then(
        data=>{
          console.log(data);
        },
        error=>{
          console.log(data);
        }
      )
    },
    error=>{
      console.log(error);
    }
  );
}

LoginContainer.updateMapDispatchToProps((dispatch,ownProps)=>{
  return {
    onSubmit(event){
      dispatch(actionLogin(event.values));
    },
    onFacebookLogin(){
      dispatch(actionFacebookLogin());
    },
    onGoogleLogin(){
      // Google.signOut().then(
      //   data=>console.log(data),
      // )
      dispatch(actionGoogleLogin());
    }
  }
});

export default LoginContainer.connect();
