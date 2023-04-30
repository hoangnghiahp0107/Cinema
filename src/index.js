import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // xóa 2 cái lớp bọc ngoài cho nhẹ(mục đích 2 lớp đó là để check lỗi sau này á, mà tui thấy nó nặng hơn nên tắt cho nhẹ máy)
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



