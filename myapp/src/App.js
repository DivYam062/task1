import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostsPage from './components/PostsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PostsPage />} />
      </Routes>
    </div>
  );
}

export default App;
