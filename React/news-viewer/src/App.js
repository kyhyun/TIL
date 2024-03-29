import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewsPage from './pages/newsPage/index';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
};

export default App;
