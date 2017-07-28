import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import '../style/style.scss';
import {Provider} from 'react-redux';
import { BrowserRouter, Router, Route, NavLink, Link, Switch, HashRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';


import Stopwatch from './Stopwatch';
import Countdown from './Countdown';
import Time from './Time';
import {store} from '../store';

const history = createBrowserHistory();

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      bg:'#4b4e4e'
      //hLocation:window.location.href.split('8080')[1] //does not get updated if the url changes; same using history.location.pathname
    };
    this.handleColor = this.handleColor.bind(this);
    this.handleHistory = this.handleHistory.bind(this);
  }

  componentDidMount() {
    let a = this.nv.children[0];
    let b = this.nv.children[1];
    let c = this.nv.children[2];

    // console.log(this.nv.children[0].style.color);
    //========================= If user refreshes the page, keep nav color for the selected element ================
    if (a.style.color=='ivory') {
      this.handleColor('#4b4e4e');
    } else if (b.style.color=='ivory') {
      this.handleColor('#455A64');
    } else if (c.style.color=='ivory') {
      this.handleColor('#A6ABAE');
    }

    //================== update nav color if user goes back/forward using browser instead of app ========================
    window.addEventListener('popstate', this.handleHistory);
  }

  handleHistory() {
    //history.location.pathname or
    //window.location.href.split('8080')[1]  //in development
    //window.location.href.split('.com')[1]  (or .io .net whatever you registered your domain as) //for production
    switch (history.location.pathname) {
      case '/':
        this.handleColor('#4b4e4e'); //21b5b2
      break;
      case '/countdown':
        this.handleColor('#455A64'); //4b4e4e
      break;
      case '/time':
        this.handleColor('#A6ABAE');
      break;
    }
  }

  handleColor (x) {
    this.setState({
      bg: x
    });
  }

  render() {

    return(
      <Router history={history}>
        <div className='root-Div'>
          <nav className='nav' style={{backgroundColor:this.state.bg}} ref={(nv) => { this.nv = nv }}>
            <NavLink
              exact to='/'
              // activeClassName="selected"
              activeStyle={{color:'ivory'}}
              onClick={()=>this.handleColor('#4b4e4e')}> {/*to not call the function during render, but on click only*/}
              Stopwatch
            </NavLink>
            <NavLink
              to='/countdown'
              // activeClassName="selected"
              /*using activeClassName gives no css value when trying to acces them in componentDidMount;
              using activeStyle allows the elements to return desired values needed to check for in the lifecycle method*/
              activeStyle={{color:'ivory'}}
              onClick={()=>this.handleColor('#455A64')}>
              Countdown
            </NavLink>
            <NavLink
              to='/time'
              // activeClassName="selected"
              activeStyle={{color:'ivory'}}
              onClick={()=>this.handleColor('#A6ABAE')}>
              Time
            </NavLink>
          </nav>
          <Route exact path='/' component={Stopwatch} />
          <Route path='/countdown' component={Countdown} />
          <Route path='/time' component={Time} />
        </div>
    </Router>
    )
  }
}



ReactDOM.render(
  <Provider store={store}>

    {/* <Router history={history}>
      <div className='root-Div'> */}
        {/* <nav className='nav'>
          <NavLink exact to='/' activeClassName="selected">Stopwatch</NavLink>
          <NavLink to='/countdown' activeClassName="selected">Countdown</NavLink>
          <NavLink to='/time' activeClassName="selected" activeStyle={{backgroundColor:''}} >Time</NavLink>
        </nav> */}
          <App/>
          {/* <Route exact path='/' component={Stopwatch} />
          <Route path='/countdown' component={Countdown} />
          <Route path='/time' component={Time} />
      </div>
  </Router> */}
  </Provider>,
  document.getElementById('app'));
