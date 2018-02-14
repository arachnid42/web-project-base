import 'css/app.scss';
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import {red,grey, amber} from 'material-ui/colors';
import createPalette from 'material-ui/styles/createPalette';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const muiTheme = createMuiTheme({
    palette: createPalette({
      primary: grey,
      accent: amber,
      error: red,
      type: 'light'
    })
});


import { TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {text:""};
  }

  onChange(event){
    console.log(event.target.value);
    // this.setState({text:event.value});
  }

  render(){
    return (

      <MuiThemeProvider theme={muiTheme}>
        <Reboot/>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <TextField fullWidth label="First Name" name="value"></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Last Name" name="value"></TextField>
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={this.state.age}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'Gender',
                    value:null,
                    label:"Gender"
                  }}
                >
                  <MenuItem value={null}></MenuItem>
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                  <MenuItem value={30}>Other</MenuItem>
                </Select>
              </Grid>
          </Grid>
        </Grid>


      </MuiThemeProvider>
    );
  }
}


App.defaultProps = {
  onChange:(value)=>{console.log(value)},
  value:""
}

// {/* <TextField floatingLabelText="Text Input" name="value"></TextField>
// <Button color="primary" >  Primary </Button>
// <Button variant="raised" color="primary" >  Primary </Button>
// <DatePicker openToYearSelection disableFuture></DatePicker>
// <TimePicker></TimePicker> */}

export default App;
