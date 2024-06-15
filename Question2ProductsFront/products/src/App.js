import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography} from '@mui/material';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';

function App() {

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Product
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

