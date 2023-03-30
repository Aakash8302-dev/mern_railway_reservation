import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import userReducer from './features/user'
import trainReducer from './features/train'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore({
  reducer:{
    user: userReducer,
    train: trainReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);