import React from 'react';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';
import AddPassword from '../components/AddPassword';
import PasswordsList from '../components/PasswordsList';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container
        sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-around' }}
        className={styles.PasswordsPageWrapper}
      >
        <PasswordsList />
        <AddPassword />
      </Container>
    </>
  );
};

export default HomePage;
