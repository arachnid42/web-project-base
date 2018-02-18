import React from 'react';
import BaseInput from 'modules/common/base/input/base';
import PropTypes from 'prop-types';
import moment from 'moment';

class DateInput extends BaseInput{}

DateInput.updateDefaultProps({
  value:moment()
});

DateInput.updatePropTypes({
  value:PropTypes.oneOfType([Date,PropTypes.string,moment]),
});

export default DateInput;