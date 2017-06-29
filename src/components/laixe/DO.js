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
import PropTypes from 'prop-types';
import {Row, Col, Input, Button, message, Select, AutoComplete, InputNumber, Spin, Switch} from 'antd'
import agent from '../../agent';
import { connect } from 'react-redux';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form'

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import CompleteInput  from '../_components/CompleteInput'
import CustomSelect  from '../_components/CustomSelect'
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
        phatsinh: 0,
        tienthu: 0
      },
      init: false,
      khachhang: [],
      diemxuatphat: [],
      diemtrahang: [],
      nguoiyeucau: []
    }
  }

  componentWillMount() {
    let that = this
    agent.LaiXe.autofill()
      .then(res => {
        that.setState(prev => {return {
          ...prev,
          init: true,
          khachhang: valueByField('khachhang', res),
          diemxuatphat: valueByField('diemxuatphat', res),
          diemtrahang: valueByField('diemxuatphat', res),
          nguoiyeucau: valueByField('nguoiyeucau', res),
          phatsinh: false,
        }})
      })
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    let gThis = this
    return (
      <div className="do-page">
        <div className="laixe-doWr">
          <h2 style={{textAlign: 'center'}}>Lệnh điều động xe ô tô</h2>
          {this.state.init && <div>
            <Row>
              <Col span={12}>
                Khách hàng: <br/>
                <CompleteInput
                  option={this.state.khachhang}
                  onChange={(value) => {
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          khachhang: value
                        }
                      }
                    })
                  }}
                />
              </Col>
              <Col span={12}>
                Người yêu cầu: <br/>
                <CompleteInput
                  option={this.state.nguoiyeucau}
                  onChange={(value) => {
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          nguoiyeucau: value
                        }
                      }
                    })
                  }}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              Điểm xuất phát: <br/>
                <CompleteInput
                  isSmall={true}
                  option={this.state.diemxuatphat}
                  onChange={(value) => {
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          diemxuatphat: value
                        }
                      }
                    })
                  }}
                />
                <CustomSelect handleChange={value => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        tinhxuatphat: value
                      }
                    }
                  })
                }
                } />
            </Row>
            <Row style={{marginTop: 10}}>
              Điểm trả hàng: <br/>
              <CompleteInput
                isSmall={true}
                option={this.state.diemtrahang}
                onChange={(value) => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        diemtrahang: value
                      }
                    }
                  })
                }}
              />
              <CustomSelect handleChange={value => {
                this.setState(prev => {
                  return {
                    ...prev,
                    data: {
                      ...prev.data,
                      tinhtrahang: value
                    }
                  }
                })
              }
              } />
            </Row>
            <Row style={{marginTop: 10}}>

              <Col span={12}>
                Trọng tải (tấn): <br/>
                <CompleteInput
                  option={[
                    "1", "1.2", "1.25", "1.3", "1.4", "1.5", "1.6", "1.7", "1.75", "1.8", "1.9", "2", "2.1", "2.2", "2.25", "2.3", "2.4", "2.5",  "2.6",  "2.7", "2.75",  "2.8",  "2.9", "3"
                  ]}
                  onChange={(value) => {
                    if(parseFloat(value).isNaN){
                      value = 0;
                    }
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          trongtai: parseFloat(value)
                        }
                      }
                    })
                  }}
                />
              </Col>

              <Col span={12}>
                Số điểm trả hàng:
                <InputNumber style={{width: '100%'}} size="large" min={1} max={100}

                             onChange={(value) => {
                               this.setState(prev => {
                                 return {
                                   ...prev,
                                   data: {
                                     ...prev.data,
                                     sodiem: value
                                   }
                                 }
                               })
                             }}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col span={12}>
                Quãng đường(km)
                <InputNumber style={{width: '100%'}} size="large" min={1} max={1000}

                             onChange={(value) => {
                               this.setState(prev => {
                                 return {
                                   ...prev,
                                   data: {
                                     ...prev.data,
                                     sokm: value
                                   }
                                 }
                               })
                             }}
                />
              </Col>
              <Col span={12}>
                Tiền thu hộ:
                <InputNumber
                  defaultValue={0}
                  min={0}
                  formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  parser={value => value.replace(/(,*)/g, '')}
                  style={{width: '100%'}}
                  onChange={(value) => {
                    if(parseInt(value).isNaN){
                      value = 0;
                    }
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          tienthu: value
                        }
                      }
                    })
                  }}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              Tiền phát sinh: <Switch defaultChecked={false} onChange={(value) => {
              this.setState(prev => { return {
                ...prev,
                phatsinh: value
              }})}
            } />
              <div style={{display: this.state.phatsinh ? 'block': 'none'}}>
                <InputNumber
                  defaultValue={0}
                  min={0}
                  formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  parser={value => value.replace(/(,*)/g, '')}
                  style={{width: '100%'}}
                  onChange={(value) => {
                    if(parseInt(value).isNaN){
                      value = 0;
                    }
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          phatsinh: value
                        }
                      }
                    })
                  }}
                />
                <Col style={{marginTop: 10}}>
                  Lý do:
                  <Input type="textarea" rows={2}
                         defaultValue={''}
                         style={{width: '100%', minHeight: 120}}
                         onChange={(e) => {
                           let value = e.target.value
                           this.setState(prev => {
                             return {
                               ...prev,
                               data: {
                                 ...prev.data,
                                 lydo: value
                               }
                             }
                           })
                         }}
                  />
                </Col>
              </div>
            </Row>
            <Row style={{marginTop: 20, paddingBottom: 50}}>
              <Button type="primary"
                      style={{height: 56, width: 200, fontSize: 24}}
                      onClick={() => {
                        console.log(gThis.state.data)
                        agent.LaiXe.themDO(gThis.state.data)
                          .then(res => {
                            this.context.router.replace('/laixe/danhsachdo');
                            message.success("Thêm mới thành công")
                          })
                          .catch(err => {
                            message.success("Thêm mới that bai")
                          })
                      }}
              >
                Tạo mới
              </Button>
            </Row>
          </div> }
          
          {!this.state.init && (
            <div style={{textAlign: 'center', paddingTop: 50}}>
              <Spin  size="large" tip="Đang tải..." />
            </div>
          )}
        </div>
      </div>
    )
  }

}

DOPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DOPage);

function valueByField(fieldName, list){
  for(let i= 0; i < list.length; i++){
    if(list[i]._id === fieldName){
      return list[i].value
    }
  }
  return []
}