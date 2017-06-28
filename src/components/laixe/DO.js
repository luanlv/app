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
import {Row, Col, Input, Button, message, Select, AutoComplete, InputNumber, Spin} from 'antd'
import agent from '../../agent';
import { connect } from 'react-redux';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form'

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

class CustomSelect extends React.Component {
  render () {
    return (
      <Select
        showSearch
        style={{ width: "25%", marginLeft: 5, marginTop: 5  }}
        defaultValue={this.props.defaultValue}
        optionFilterProp="children"
        placeholder="Tỉnh thành"
        onChange={this.props.handleChange}
        filterOption={(input, option) => slugify(option.props.children.toLowerCase()).indexOf(slugify(input.toLowerCase())) >= 0}
      >
        <Option value="76">An Giang</Option>
        <Option value="64">	Bà Rịa-Vũng Tàu</Option>
        <Option value="781">Bạc Liêu</Option>
        <Option value="281">Bắc Kạn</Option>
        <Option value="240">Bắc Giang</Option>
        <Option value="241">Bắc Ninh</Option>
        <Option value="75">Bến Tre</Option>
        <Option value="650">Bình Dương</Option>
        <Option value="56">Bình Định</Option>
        <Option value="651">Bình Phước</Option>
        <Option value="62">Bình Thuận</Option>
        <Option value="290">Cà Mau</Option>
        <Option value="206">Cao Bằng</Option>
        <Option value="292">Cần Thơ</Option>
        <Option value="236">Đà Nẵng</Option>
        <Option value="500">Đắk Lắk</Option>
        <Option value="51">Đắk Nông</Option>
        <Option value="23">Điện Biên</Option>
        <Option value="61">Đồng Nai</Option>
        <Option value="67">Đồng Tháp</Option>
        <Option value="59">Gia Lai</Option>
        <Option value="291">Hà Giang</Option>
        <Option value="351">Hà Nam</Option>
        <Option value="4">Hà Nội</Option>
        <Option value="9">Hà Tĩnh</Option>
        <Option value="320">Hải Dương</Option>
        <Option value="225">Hải Phòng</Option>
        <Option value="711">Hậu Giang</Option>
        <Option value="218">Hòa Bình</Option>
        <Option value="82">Thành phố Hồ Chí Minh</Option>
        <Option value="321">Hưng Yên</Option>
        <Option value="258">Khánh Hoà</Option>
        <Option value="77">Kiên Giang</Option>
        <Option value="60">Kon Tum</Option>
        <Option value="213">Lai Châu</Option>
        <Option value="25">Lạng Sơn</Option>
        <Option value="20">Lào Cai</Option>
        <Option value="263">Lâm Đồng</Option>
        <Option value="72">Long An</Option>
        <Option value="350">Nam Định</Option>
        <Option value="38">Nghệ An</Option>
        <Option value="30">Ninh Bình</Option>
        <Option value="68">Ninh Thuận</Option>
        <Option value="211">Phú Thọ</Option>
        <Option value="57">Phú Yên</Option>
        <Option value="52">Quảng Bình</Option>
        <Option value="510">Quảng Nam</Option>
        <Option value="50">Quảng Ngãi</Option>
        <Option value="203">Quảng Ninh</Option>
        <Option value="53">Quảng Trị</Option>
        <Option value="79">Sóc Trăng</Option>
        <Option value="22">Sơn La</Option>
        <Option value="66">Tây Ninh</Option>
        <Option value="36">Thái Bình</Option>
        <Option value="380">Thái Nguyên</Option>
        <Option value="234">Thừa Thiên-Huế</Option>
        <Option value="73">Tiền Giang</Option>
        <Option value="74">Trà Vinh</Option>
        <Option value="27">Tuyên Quang</Option>
        <Option value="70">	Vĩnh Long</Option>
        <Option value="210">Vĩnh Phúc</Option>
        <Option value="29">Yên Bái</Option>
      </Select>
    )
  }
}

class CompleteInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      dataSource: [],
      option : props.option || []
    }
  }

  handleSearch = (value) => {
    let newOption = this.state.option.filter(option => {
      return slugify(option.toLowerCase()).indexOf(slugify(value.toLowerCase())) >= 0
    })

    this.setState({
      dataSource: !value ? [] : newOption.slice(0, 5)
    });

  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: this.props.isSmall ? "70%" : "100%" }}
        onChange={(value) => this.props.onChange(value)}
        onSearch={this.handleSearch}
      />
    );
  }

}

class DOPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data: {},
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
          nguoiyeucau: valueByField('nguoiyeucau', res)
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
            </Row>
            <Row style={{marginTop: 10}}>
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
            </Row>
            <Row style={{marginTop: 10}}>
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
            </Row>
            <Row style={{marginTop: 10}}>
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
              
            </Row>
            <Row style={{marginTop: 10}}>
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
            </Row>
            <Row style={{marginTop: 10, paddingBottom: 50}}>
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
              <Spin tip="Loading..." />
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