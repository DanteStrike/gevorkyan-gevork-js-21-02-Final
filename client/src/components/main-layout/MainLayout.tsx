import React from 'react';
import './MainLayout.scss';
import Header from '../header/Header';
import Routes from '../routes/Routes';
import Footer from '../footer/Footer';

function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-layout__header">
        <Header />
      </div>
      <div className="main-layout__content">
        <Routes />
      </div>
      <div className="main-layout__footer">
        <Footer />
      </div>
    </div>
  );
}

export default React.memo(MainLayout);
