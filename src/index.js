import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';

document.getElementById('loader').style.display = 'none';
document.getElementById('app').style.display = 'block';

ReactDOM.render(<App/>, document.querySelector(".app")
);

registerServiceWorker();
