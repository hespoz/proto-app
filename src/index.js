import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import store from './store'


ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));
registerServiceWorker();
