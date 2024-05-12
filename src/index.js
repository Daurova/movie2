import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Alert } from 'antd';
import { Online, Offline } from 'react-detect-offline';

import App from './App';

// const Online = () => {
//   return (
//     <div className="online">
//       {/* Render the App component here */}
//       <App className="app" />
//     </div>
//   );
// };

// // Define the Offline component
// const Offline = () => {
//   return (
//     <div className="offline">
//       {/* Render the alert message here */}
//       <Alert type="error" message={`Можно было бы навести суету, но у тебя нет инета :(`} />
//     </div>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Online>
      <App className="app" />
    </Online>
    <Offline>
      <div className="offline">
        <Alert type="error" message={'У Вас нет Интернета. You are offline:('} />
      </div>
    </Offline>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
