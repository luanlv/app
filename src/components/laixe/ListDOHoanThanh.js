import React from 'react';
import agent from '../../agent';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LAIXE_DO_LOADED
} from '../../constants/actionTypes';

import {Row, Icon, Spin, message, Button as ButtonWeb} from 'antd'
import { List, Modal, Button } from 'antd-mobile';
import ReactList from 'react-list';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import moment from 'moment'

const Promise = global.Promise;
const Item = List.Item;
const Brief = Item.Brief;
const operation = Modal.operation;

const mapStateToProps = state => ({
  ...state.laixe,
  appName: state.common.appName,
  token: state.common.token,
  xe: state.common.currentUser.xe,
});

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED }),

  onLoad: ( payload) =>
    dispatch({ type: LAIXE_DO_LOADED, payload }),
});

class ListDO extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      init: false,
      listDO: true,
    }
  }

  componentWillMount() {
    this.init()
  }
  
  init() {
    agent.LaiXe.listDOHoanThanh()
      .then(res => {
        this.setState(prev => { return {
          ...prev,
          init: true,
          listDO: res
        }})
      })
  }

  componentWillUnmount() {
    // this.props.onUnload();
  }

  duyet(id, action){
    let that = this
    agent.DieuHanh.duyet(id, action)
      .then(res => {
        message.success("Duyệt thành công")
        that.init()
      })
      .catch(err => {
        message.success("Có lỗi")
      })
  }

  render() {
    let that = this
    return (
      <div className="home-page" style={{marginTop: '1rem'}}>
        <Row className="laixe-listDO-Wr" style={{paddingTop: '0.3rem', paddingBottom: '1rem'}}>
          <h2 className="textCenter" style={{fontSize: '0.8rem', paddingBottom: '0.3rem'}}>Lệnh hoàn thành</h2>
          {this.state.init && (
              <div>
                
                {this.state.listDO.map((el, index) => {
                    console.log(el)
                    return (
                        <Item
                          extra={<div>
                            <Row>
                              <Link to={"/laixe/do/" + el._id}>
                                <Button
                                  type="primary"
                                >Chi tiết</Button>
                              </Link>
                            </Row>
                          </div>}
                          className="list-do"
                          multipleLine
                          platform="android"
                          key={index}
                        >
                          <b style={{color: 'red', fontWeight: 'bold'}}>{"DO" + (el._id + 10000)}</b>
      
                          <Brief>
                            <b style={{color: '#FEC713'}}>{moment(el.time).format('DD/MM/YYYY')}</b> |
                            <b style={{}}> {el.khachhang}</b>
                          </Brief>
                          {/*<Brief><b style={{color: 'blue'}}>{el.laixe[0].name}</b></Brief>*/}
                          {el.tienthu > 0 && <Brief>Thu hộ: <b style={{color: '#FE6A14'}}>{el.tienthu.toLocaleString()} đ</b></Brief>}
                          {el.tienphatsinh > 0 && <Brief>Phí phát sinh: <b style={{color: '#FE6A14'}}>{el.tienphatsinh.toLocaleString()} đ</b></Brief>}
                        </Item>
                      )
                    })
                  }
                
              </div>
          )}
          {!this.state.init && (
            <div style={{textAlign: 'center', paddingTop: 50}}>
              <Spin tip="Loading..." />
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDO);
