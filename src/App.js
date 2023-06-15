import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import Dashboard from './pages/Dashboard';
import TC_details from './pages/TC_details';
import TC from './pages/TC';
import AC from './pages/AC';
import AC_details from './pages/AC_details';
import VCU from './pages/VCU';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignInSignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tc-details' element={<TC />} />
          <Route path='/tc-details/converter/:converter_no' element={<TC_details />} />
          <Route path='/ac-details' element={<AC />} />
          <Route path='/ac-details/converter/:converter_no' element={<AC_details />} />
          <Route path='/vcu-details' element={<VCU />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
