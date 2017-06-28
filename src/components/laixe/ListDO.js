import React from 'react';
import agent from '../../agent';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LAIXE_DO_LOADED
} from '../../constants/actionTypes';

import {Button, Row, Icon} from 'antd'
import ReactList from 'react-list';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import moment from 'moment'

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.laixe,
  appName: state.common.appName,
  token: state.common.token
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
    console.log(this.props)
  }

  componentWillMount() {
    const articlesPromise = agent.LaiXe.listDO
    this.props.onLoad(Promise.all([articlesPromise()]));
  }

  componentWillUnmount() {
    // this.props.onUnload();
  }



  render() {

    return (
      <div className="listDO-page">
        <Row className="laixe-listDO-Wr">
          <h2 className="mb20 mt10 textCenter">Danh sach DO</h2>
          {this.props.status.listDO && (
              <div style={{overflow: 'auto', maxHeight: '80vh'}}>
                <Table>
                  <Thead>
                  <Tr>
                    <Th/>
                    <Th>Mã DO: </Th>
                    <Th>Điểm xuất phát: </Th>
                    <Th>Điểm trả hàng:</Th>
                    <Th>Số điểm trả hàng: </Th>
                    {/*<Th>Xac Nhan</Th>*/}
                  </Tr>
                  </Thead>
                  <Tbody>
                  {this.props.listDO.map((el, index) => {
                    return (
                      <Tr key={index}>
                        <Td>
                          {
                            !el.trangthai.daduyet && ((moment.utc(el.timeEdit).diff(moment(Date.now())) > 0) ?
                              (<Link to={"/laixe/do/" + el._id}><Icon type="edit" style={{ fontSize: 32, color: '#08c' }} /></Link>) :
                              (<Link to={"/laixe/do/" + el._id}><Icon type="edit" style={{ fontSize: 32, color: 'red' }} /></Link>)
                            )
                          }
                          {el.trangthai.daduyet &&
                            ((el.trangthai.duyet) ?
                                (<Link to={"/laixe/do/" + el._id}><Icon type="check" style={{ fontSize: 32, color: '#08c' }} /></Link>) :
                                (<Link to={"/laixe/do/" + el._id}><Icon type="close" style={{ fontSize: 32, color: 'red' }} /></Link>)
                            )
                          }
                        </Td>
                        <Td>{"DO" + (el._id + 10000)}</Td>
                        <Td>{el.diemxuatphat}</Td>
                        <Td>{el.diemtrahang}</Td>
                        <Td>{el.sodiem}</Td>
                        {/*<Td />*/}
                      </Tr>
                    )
                    })
                  }
                  </Tbody>
                </Table>
              </div>
          )}
          {!this.props.status.listDO && (
            <div>Loading !!!</div>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDO);
