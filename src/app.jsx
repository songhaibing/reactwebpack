import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Switch,Redirect, Route, Link} from 'react-router-dom';
import Home from 'page/home/index.jsx';

class App extends React.Component{
    render(){
        return(
            <Router>
                {/*router里面只能有一个子节点*/}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    {/*如果没有匹配到/，重定向到/*/}
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        );
    }
}


ReactDom.render(
   <App/>,
    document.getElementById('app')
);