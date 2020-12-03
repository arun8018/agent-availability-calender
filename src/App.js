import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import FullCalendarPage from "./FullCalendarPage";
const fontSize = 14;
const htmlFontSize = 12;
const coef = fontSize / 14;
const theme = createMuiTheme({
  typography: {
    pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
  },
  overrides: {
    MuiDivider: {
      root: {
        margin: "5px 0px 20px 0px"
      }
    },
    MuiFormLabel:{
    root: {
        paddingTop:"20px"
      }
    }
    
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <FullCalendarPage />
    </MuiThemeProvider>
  );
}

export default App;
