import React from 'react'
import Providers from './navigation/index.js';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';



const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    surface: "white",
    
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Providers />
    </PaperProvider>
  );
}

export default App;