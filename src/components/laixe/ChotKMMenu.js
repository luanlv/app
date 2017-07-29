import React from 'react';
import agent from '../../agent';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import moment from 'moment'

import {Button, Row, Modal, InputNumber, message, AutoComplete} from 'antd'
import { Flex, WingBlank } from 'antd-mobile';
import Avatar from '../_components/Avatar'
import {slugify} from '../_function'
const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
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
      init: false,
      visible: false,
      data: {
        kmdau: -1,
        kmcuoi: 0,
        phicauduong: 0
      },
      option: [],
      kmdauInput: 0,
      kmcuoiInput: 0,
      anhdauInput: '',
      anhcuoiInput: '',
      phicauduongInput: 0,
    }
  }

  
  componentWillMount() {
    this.init()
  }

  init() {
    agent.LaiXe.xe()
      .then(res => {
        this.setState(prev => { return {
          ...prev,
          option: res,
        }})
      })
    
    agent.LaiXe.getKM()
      .then(res => {
        if(res){
          this.setState(prev => { return {
            ...prev,
            init: true,
            data: res
          }})
        } else {
          this.setState(prev => { return {
            ...prev,
            init: true,
          }})
        }
      })
    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visible2: false,
      visible3: false,
    });
  }
  handleOk = (e) => {

    let that = this;
    
    
    agent.LaiXe.chotkm({bks: that.state.data.bks})
      .then(res => {
        message.success("Thành công")
        that.setState(prev => {return {
          ...prev,
          data: res
        }})
      })
      .catch(err => {
        message.error("Có lỗi")
        // this.context.router.replace('/laixe')
      })
  }
  
  handleOk2 = (e) => {
    let that = this;
    if(checkChotKMDau(that.state)) {
      agent.LaiXe.chotkmdau({_id: that.state.data._id, kmdau: that.state.kmdauInput, anhdau: that.state.anhdauInput})
        .then(res => {
          message.success("Thành công")
          that.setState(prev => {
            return {
              ...prev,
              data: res
            }
          })
        })
        .catch(err => {
          message.error("Có lỗi")
          // this.context.router.replace('/laixe')
        })
    }
  }
  
  
  
  handleOk3 = (e) => {
    let that = this;
    if(checkChotKMCuoi(that.state)) {
      agent.LaiXe.chotkmcuoi({
          _id: that.state.data._id,
          kmcuoi: that.state.kmcuoiInput,
          anhcuoi: that.state.anhcuoiInput,
          phicauduong: that.state.phicauduongInput
        })
        .then(res => {
          message.success("Thành công")
          that.setState(prev => {
            return {
              ...prev,
              data: res
            }
          })
        })
        .catch(err => {
          message.error("Có lỗi")
          console.log(err)
          // this.context.router.replace('/laixe')
        })
    }
  }
  
  render() {
    const { dataSource } = this.state;
    if(this.state.init){
      return (
        <div className="home-page" style={{marginTop: '0.4rem'}}>
        <h2 style={{textAlign: 'center', fontSize: '0.8rem'}}>Ngày: {moment().format('DD/MM/YYYY')}</h2>
        <div style={{padding: '0.2em'}}>
          
          
          {this.state.data.kmdau < 0 && <Button
            onClick={this.showModal}
            size={"large"} className="btn" type="primary" style={{width: '100%', height: '2rem', fontSize: '0.5rem'}}>
            Chọn xe
          </Button>}
  
          {this.state.data.kmdau === 0 && <Button
            onClick={() => {
              this.setState({
                visible2: true,
              });}
            }
            size={"large"} className="btn" type="primary" style={{width: '100%', height: '2rem', fontSize: '0.5rem'}}>
            KM đầu
          </Button>}
  
          {this.state.data.kmdau > 0 && this.state.data.kmcuoi === 0 && <Button
            onClick={() => {
              this.setState({
                visible3: true,
              });}
            }
            size={"large"} className="btn" type="primary" style={{width: '100%', height: '2rem', fontSize: '0.5rem'}}>
            KM cuối
          </Button>}
          
          {this.state.data.kmdau > 0 && this.state.data.kmcuoi > 0 && <div>
            <div>BKS: <b>{this.state.data.bks}</b></div>
            <div>KM đầu: <b>{this.state.data.kmdau.toLocaleString()}</b></div>
            <div>KM cuối: <b>{this.state.data.kmcuoi.toLocaleString()}</b></div>
            <div>Phí cầu đường: <b>{this.state.data.phicauduong.toLocaleString()} đ</b></div>
          </div>}
        </div>
    
        <Modal
          visible={this.state.visible && this.state.data.kmdau === -1}
          title={""}
          maskClosable={true}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={() => this.setState({visible: false})}>Đóng</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk}>Xác nhận</Button>,
          ]}
        >
          <div>
            <b style={{fontSize: '0.7rem'}}>Biển kiểm soát</b>
            <br/>
            <AutoComplete style={{width: '100%'}}
                          dataSource={this.state.dataSource}
                          onSearch={(value) => {
                            let newOption = this.state.option.filter(option => {
                              return slugify(option.toLowerCase()).indexOf(slugify(value.toLowerCase())) >= 0
                            })
    
                            this.setState({
                              dataSource: newOption.slice(0, 5)
                            });
                          }}
                          onChange={(value) => this.setState(prev => {
                            return {
                              ...prev,
                              data: {
                                ...prev.data,
                                bks: value
                              }
                            }
                          })}
            />
            </div>
        </Modal>
    
        <Modal
          visible={this.state.visible2 && this.state.data.kmdau === 0}
          title={""}
          maskClosable={true}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={() => this.handleCancel()}>Đóng</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk2}>Xác nhận</Button>,
          ]}
        >
          <div>
            <b style={{fontSize: '0.7rem'}}>KM đầu</b>
            <InputNumber style={{width: '100%'}} size="large"
                         defaultValue={0}
                         min={0}
                         formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                         parser={value => value.replace(/(,*)/g, '')}
                         onChange={(value) => {
                           this.setState(prev => {
                             return {
                               ...prev,
                               kmdauInput: value
                             }
                           })
                         }}
            />
          </div>
          <b style={{fontSize: '0.7rem'}}>Ảnh</b>
          <Avatar
            handleChange={(url) => {
              this.setState(prev => {
                return {
                  ...prev,
                  anhdauInput: url
                }
              })
            }}
          />
        </Modal>
    
        <Modal
          visible={this.state.visible3 && this.state.data.kmcuoi === 0}
          title={""}
          maskClosable={true}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={() => this.handleCancel()}>Đóng</Button>,
            <Button key="submit" type="primary" size="large" onClick={this.handleOk3}>Xác nhận</Button>,
          ]}
        >
          <div>
            <b style={{fontSize: '0.7rem'}}>KM cuối <em style={{color: (this.state.kmcuoiInput - this.state.data.kmdau>0?'blue':'red')}}>[{this.state.kmcuoiInput - this.state.data.kmdau} km]</em></b>
            <InputNumber style={{width: '100%'}} size="large"
                         defaultValue={0}
                         min={0}
                         formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                         parser={value => value.replace(/(,*)/g, '')}
                         onChange={(value) => {
                           this.setState(prev => {
                             return {
                               ...prev,
                               kmcuoiInput: value
                             }
                           })
                         }}
            />
          </div>
          <b style={{fontSize: '0.7rem'}}>Ảnh</b>
          <Avatar
            handleChange={(url) => {
              console.log(url)
              this.setState(prev => {
                return {
                  ...prev,
                  anhcuoiInput: url
                }
              })
            }}
          />
  
          <b style={{fontSize: '0.7rem'}}>Phí cầu đường</b>
          <InputNumber style={{width: '100%'}} size="large"
                       defaultValue={0}
                       min={0}
                       formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                       parser={value => value.replace(/(,*)/g, '')}
                       onChange={(value) => {
                         this.setState(prev => {
                           return {
                             ...prev,
                             phicauduongInput: value
                           }
                         })
                       }}
          />
          
        </Modal>
        
      </div>
      )
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

function checkChotKMCuoi(state) {
  if(state.kmcuoiInput - state.data.kmdau < 1){
    alert("Nhập lại KM cuối !!")
    return false
  }
  if(state.anhcuoiInput.length === 0){
    alert("Chưa thêm ảnh !!")
    return false
  }
  return true
}
function checkChotKMDau(state) {
  if(state.data.kmdauInput < 1) {
    alert("Nhập lại km đầu")
    return false
  }
  if(state.anhdauInput.length === 0){
    alert("Chưa thêm ảnh !!")
    return false
  }
  return true
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
