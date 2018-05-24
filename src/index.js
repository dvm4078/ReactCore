import React from "react";
import ReactDOM from "react-dom";
import './app.css';

const Index = () => {
    return <div className="test">Hello React! 10</div>;
};

ReactDOM.render(<Index />, document.getElementById("index"));