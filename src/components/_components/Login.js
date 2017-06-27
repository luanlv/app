import React from 'react'
import {Link} from 'react-router'
import { Tabs, Row, Col, Input, Icon, Button  } from 'antd';

import { List, InputItem, WhiteSpace, Picker, Radio, Flex,  SegmentedControl, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';

import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';

const TabPane = Tabs.TabPane;
const RadioItem = Radio.RadioItem;

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password, type) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password, type) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});



class Component extends React.Component {
  constructor(){
    super();
    this.state={
      selectedIndex: 0,
      type: 'laixe',
      username: '',
      password: '',
    }

    this.submitForm = (username, password) => {
      let that = this;
      this.props.onSubmit(username, password, that.state.type);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
  
    const username = this.state.username;
    const password = this.state.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <form action="" autoComplete="off">
            <div className="row">

            <div className="loginWr">
              <h1 className="textCenter">Đăng nhập</h1>

              <ListErrors errors={this.props.errors} />

              <Row className="mt10 textCenter">
                {/*<RadioGroup defaultValue={this.state.type} size="large"*/}
                  {/*onChange={(e) => {*/}
                    {/*let value = e.target.value*/}
                    {/*this.setState(prev => { return {*/}
                      {/*...prev,*/}
                      {/*type: value*/}
                    {/*}})*/}
                  {/*}}*/}
                {/*>*/}
                  {/*<RadioButton value="laixe">Lai Xe</RadioButton>*/}
                  {/*<RadioButton value="thauphu">Thau Phu</RadioButton>*/}
                  {/*<RadioButton value="dieuhanh">Dieu Hanh</RadioButton>*/}
                  {/*<RadioButton value="it">IT</RadioButton>*/}
                {/*</RadioGroup>*/}
                <SegmentedControl
                  selectedIndex={this.state.selectedIndex}
                  values={['Lái xe', 'Thầu phụ', 'Điều hành', 'IT']}
                  onValueChange={(value) => {
                    let index = 0;
                    let type = 'laixe'
                    if(value === 'Lái xe'){
                      index = 0
                      type = 'laixe'
                    } else if (value === 'Thầu phụ'){
                      index = 1
                      type = 'thauphu'
                    } else if (value === 'Điều hành'){
                      index = 2
                      type = 'dieuhanh'
                    } else if (value === 'IT'){
                      index = 3
                      type = 'it'
                    }
                    this.setState(prev => { return {
                      ...prev,
                      selectedIndex: index,
                      type: type
                    }})
                    
                  }}
                />
              </Row>
              
              {/*<Row className="mt20">*/}
                {/*<Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>}*/}
                       {/*type="text"*/}
                       {/*value={username}*/}
                       {/*onChange={(e) => {*/}
                         {/*let value = e.target.value*/}
                         {/*this.setState(prev => {return {*/}
                           {/*...prev,*/}
                           {/*username: value.toLowerCase()*/}
                         {/*}})*/}
                       {/*}}*/}
                       {/*placeholder="Ten Dang Nhap"*/}
                {/*/>*/}
              {/*</Row>*/}
              
              {/*<Row className="mt10">*/}
                {/*<Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>}*/}
                       {/*type="password"*/}
                       {/*value={password}*/}
                       {/*onChange={(e) => {*/}
                         {/*let value = e.target.value*/}
                         {/*this.setState(prev => {return {*/}
                           {/*...prev,*/}
                           {/*password: value*/}
                         {/*}})*/}
                       {/*}}*/}
                       {/*placeholder="Mat Khau"*/}
                {/*/>*/}
              {/*</Row>*/}
  
              <List>
                <InputItem
                  // placeholder="Hello World"
                  type="text"
                  value={username}
                  onChange={(value) => {
                    this.setState(prev => {return {
                      ...prev,
                      username: value.toLowerCase()
                    }})
                  }}
                >Tài khoản: </InputItem>
                <InputItem
                  // placeholder="please input content"
                  // data-seed="logId"
                  type="password"
                  value={password}
                  onChange={(value) => {
                    this.setState(prev => {return {
                      ...prev,
                      password: value
                    }})
                  }}
                >Mật khẩu: </InputItem>
              </List>
              
              <Row className="mt10">
                <Button
                  style={{height: 80, width: 250, fontSize: 20, marginLeft: 20}}
                  type="primary"
                  disabled={this.props.inProgress}
                  onClick={() => {
                    this.submitForm(username, password)
                  }}
                >
                  Đăng nhập
                </Button>
              </Row>

            </div>

          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
