import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from "react-dom"
import React from "react"
import * as serviceWorker from './serviceWorker'
import MainApp from "./App"


        ReactDOM.render(
            <MainApp/>,
        document.getElementById('root')
    );

serviceWorker.unregister();

