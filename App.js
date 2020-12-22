import React from 'react'
import Providers from './navigation/index.js';
import {Provider as PaperProvider} from 'react-native-paper';



const App = () => {
  return (
    <PaperProvider>
      <Providers />
    </PaperProvider>
  );
}

export default App;