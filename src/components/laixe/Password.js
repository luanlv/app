/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Row, Col, Input, Button, message, Select, AutoComplete, InputNumber} from 'antd'

import PropTypes from 'prop-types';

import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
// import CompleteInput  from './component/Complete'

import {slugify} from '../_function'
const Option = Select.Option;
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


class DOPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data: {
        password: '',
        rePassword: ''
      },
      match: false
    }
  }

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
    let gThis = this
    return (
      <div className="do-page">
        <div className="laixe-doWr">
          <h2 style={{textAlign: 'center'}}>Đổi mật khẩu</h2>
  
          <Row>
            Mật khẩu cũ:
            <Input
              type="password"
              onChange={(e) => {
                let value = e.target.value
                this.setState(prev => {
                  return {
                    ...prev,
                    data: {
                      ...prev.data,
                      oldPassword: value
                    }
                  }
                })
              }}
            />
          </Row>

          <Row>
            Mật khẩu mới:
            <Input
              type="password"
              onChange={(e) => {
                let value = e.target.value
                this.setState(prev => {
                  return {
                    ...prev,
                    data: {
                      ...prev.data,
                      password: value
                    }
                  }
                })
              }}
            />
          </Row>
  
          <Row>
            Nhập lại mật khẩu:
            <Input
              type="password"
              onChange={(e) => {
                let value = e.target.value
                this.setState(prev => {
                  return {
                    ...prev,
                    data: {
                      ...prev.data,
                      rePassword: value
                    }
                  }
                })
              }}
            />
          </Row>
          
          <Row style={{marginTop: 10}}>
            <Button type="primary" style={{width: 200, height: 60, fontSize: 30}}
                    onClick={() => {
                      if(this.state.data.password !== this.state.data.rePassword){
                        message.error("Mật khẩu không trùng khớp")
                      } else {
                        agent.LaiXe.changePass({old: this.state.data.oldPassword, new: this.state.data.password})
                          .then(res => {
                            message.success("Đổi mật khẩu thành công")
                          })
                          .catch(err => {
                            message.error("Mật khẩu cũ không đúng")
                          })
                      }
                    }}
            >
              Đổi mật khẩu
            </Button>
          </Row>
        </div>
      </div>
    )
  }

}

DOPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DOPage);

