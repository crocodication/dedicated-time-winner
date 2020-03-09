const React = require('react')
const ReactDOM = require('react-dom')

const { BrowserRouter } = require('react-router-dom')

const { register } = require('./serviceWorker')

const { App } = require('./App')

require('./index.css')

ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ),
    document.getElementById('root')
)

register()