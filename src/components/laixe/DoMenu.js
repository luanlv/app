import React from 'react';
import agent from '../../agent';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

import {Button, Row} from 'antd'
import { Flex, WingBlank } from 'antd-mobile';


const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  // onLoad: (tab, pager, payload) =>
  //   dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dangchoStatus: false,
      dangcho: 0,
      danhanStatus: false,
      danhan: 0
    }
  }
  componentWillMount() {
    this.init()
  }

  init(){
    agent.LaiXe.listDOChuaNhan()
      .then(res => {
        this.setState(prev => { return {
          ...prev,
          dangchoStatus: true,
          dangcho: res.length
        }})
      })

    agent.LaiXe.listDODaNhan()
      .then(res => {
        this.setState(prev => { return {
          ...prev,
          danhanStatus: true,
          danhan: res.length
        }})
      })
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    let dangchoStatus = this.state.dangchoStatus
    let dangcho = this.state.dangcho
    let danhanStatus = this.state.danhanStatus
    let danhan = this.state.danhan
    return (
      <div className="home-page" style={{marginTop: '1rem'}}>
        <div style={{padding: '0.2em'}}>

          <Link to="/laixe/do/chuanhan">
            <Button size={"large"} className="btn" type="primary" style={{width: '100%', height: '2rem', fontSize: '1rem'}}>{!dangchoStatus?"[..]":("[" + dangcho + "]")} Đang chờ nhận</Button>
          </Link>

          <Link to="/laixe/do/danhan">
            <Button size={"large"} className="btn" type="primary" style={{width: '100%', marginTop: '0.3rem', height: '2rem', fontSize: '1rem'}}>{!danhanStatus?"[..]":("[" + danhan + "]")} Đã nhận</Button>
          </Link>

          <Link to="/laixe/do/lichsu">
            <Button size={"large"} className="btn" type="primary" style={{width: '100%', marginTop: '0.3rem', height: '2rem', fontSize: '1rem'}}>Lịch sử</Button>
          </Link>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);