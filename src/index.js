import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import posthog from 'posthog-js';

// Setup analytics/session tracking in prod
// routes.js also has tracking code
if (['prod', 'stg'].includes(process.env.REACT_APP_ENV)) {
  posthog.init(
    process.env.REACT_APP_POSTHOG_KEY, { 
      api_host: "https://us.i.posthog.com"
    }
  )
  console.log("PostHog initialized")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
