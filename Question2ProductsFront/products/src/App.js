import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, makeStyles } from '@mui/material';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail.js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(3), 
  },
  container: {
    marginTop: theme.spacing(6), 
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            E-Commerce App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

