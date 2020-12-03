import React from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function BasicTimePicker(props) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          name={props.name}
          inputVariant="outlined"
          style={{ width: 110 }}
          size="small"
          value={props.value}
          helperText={props.helperText}
          error={props.error}
          disabled={props.disabled}
          onChange={(value) => props.onChange(props.name, value)}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default BasicTimePicker;
