import React from 'react';
import agent from '../../agent';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LAIXE_PHUPHI_LOADED,
} from '../../constants/actionTypes';

import {Button, Row, Icon, Spin} from 'antd'
import { List } from 'antd-mobile';
import ReactList from 'react-list';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import moment from 'moment'

const Promise = global.Promise;
const Item = List.Item;
const Brief = Item.Brief;

const mapStateToProps = state => ({
  ...state.laixe,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED }),
  
  onLoad: ( payload) =>
    dispatch({ type: LAIXE_PHUPHI_LOADED, payload }),
});

class ListDO extends React.Component {
  
  constructor(props){
    super(props)
    console.log(this.props)
  }
  
  componentWillMount() {
    const articlesPromise = agent.LaiXe.listPhuPhi
    this.props.onLoad(Promise.all([articlesPromise()]));
  }
  
  componentWillUnmount() {
    // this.props.onUnload();
  }
  
  
  
  render() {
    
    return (
      <div className="listDO-page">
        <Row className="laixe-listDO-Wr">
          <h2 className="mb20 mt10 textCenter">Lệnh điều động xe</h2>
          <div className="updateButton">
            <Link to="/laixe/phuphi">
              <Button type="primary"
                      style={{width: 200, height: 60, fontSize: 30}}
              >Quay lại</Button>
            </Link>
          </div>
          {this.props.status.listPhuPhi && (<div>
            {this.props.listPhuPhi.map((el, index) => {
              return (
                <Link to={"/laixe/phuphi/" + el._id}
                      key={index}
                >
                  <Item
                    className="list-do"
                    arrow="horizontal"
                    multipleLine
                    platform="android"
                  >
                    <b style={{color: 'red', fontWeight: 'bold'}}>{el.sotien.toLocaleString()} đ</b>
                    
                    {!el.trangthai.daduyet && <b style={{color: 'orange'}}> [Đang chờ duyệt]</b> }
                    {el.trangthai.daduyet && (
                      ((el.trangthai.duyet) ?
                          (<b style={{color: 'green'}}> [Xác nhận]</b>) :
                          (<b style={{color: 'red'}}> [Hủy]</b>)
                      )
                    ) }
                    
                    <Brief>
                      <b style={{color: '#FEC713'}}>{moment(el.time).format('DD/MM/YYYY')}</b>
                    </Brief>
                  </Item>
                </Link>
              )
            })
            }
          </div>)}
          
          {!this.props.status.listPhuPhi && (
            <div style={{textAlign: 'center', paddingTop: 50}}>
              <Spin  size="large" tip="Đang tải..." />
            </div>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDO);
