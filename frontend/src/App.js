import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './App.css';

/**
 * @function App
 * @description 应用的主组件，负责渲染路由
 * @returns {JSX.Element}
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
