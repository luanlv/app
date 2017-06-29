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
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    // this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <WingBlank>
          <div className="btn-container">
            <Link to="/laixe/do">
              <Button size={"large"} className="btn" type="primary" style={{width: '100%', height: 100, fontSize: '1.5em'}}>Lệnh điều động xe</Button>
            </Link>
            <Link to="/laixe/phucap">
              <Button size={"large"} className="btn" type="primary" style={{width: '100%', height: 100, fontSize: '1.5em'}}>Phụ phí</Button>
            </Link>

            <Link to="/laixe/phucap">
              <Button size={"large"} className="btn" type="primary" style={{width: '100%', height: 100, fontSize: '1.5em'}}>Thông tin</Button>
            </Link>

            <Link to="/laixe/doimatkhau">
              <Button size={"large"} className="btn" type="primary" style={{width: '100%', height: 100, fontSize: '1.5em'}}>Đổi mật khẩu</Button>
            </Link>


          </div>
        </WingBlank>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
