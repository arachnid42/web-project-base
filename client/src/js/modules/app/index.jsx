import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { red, grey, amber } from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import { withStyles } from 'material-ui/styles';
import { createStore } from 'modules/app/data/redux/store';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
import MainContainer from './component/container';
const development=true;
const {store,history} = createStore(development);
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import SignUpForm from './component/form/sign-up';

// store.dispatch(push("/home"));
// console.log(store);

const muiTheme = createMuiTheme({
    palette: createPalette({
      primary: grey,
      accent: amber,
      error: red,
      type: 'light'
    })
});


class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Provider store = {store}>
          <ConnectedRouter history={history}>
            <MainContainer store={store}></MainContainer>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}


export default App;
