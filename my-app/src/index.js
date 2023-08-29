import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    {/* using redux provider to provide store features to all */}

    <Provider store={store}>
      <App />
    </Provider>
  
  </React.StrictMode>
);

