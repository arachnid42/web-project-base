import React from 'react';
import PropTypes from 'prop-types';
import Component from 'modules/common/base/react/component';


class InputBase extends Component{

  constructor(props){
    super(props);
    this.state = {
      value:this.props.value
    };
  }


  propagateValue=(value)=>{
    this.props.onChange({name:this.props.name,value});
    this.setState({value});
  }

  componentWillReceiveProps(props){
    this.state.value = this.props.value;
  }

  static defaultProps = {
    onChange(event){
      console.warn(`Warning: Default onChange callback in [${event.name}] input!`);
      console.log(event);
    },
    value:null,
    name:"noname",
    label:"no label",
    disabled:false,
    required:false
  }

  static propTypes = {
    onChange:PropTypes.func.isRequired,
    value:PropTypes.any.isRequired,
    name:PropTypes.string.isRequired,
    disabled:PropTypes.bool.isRequired,
    label:PropTypes.oneOfType([PropTypes.string,PropTypes.node])
  }

}

export default InputBase;