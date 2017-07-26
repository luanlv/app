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

import {Button, Row, Modal, InputNumber, message} from 'antd'
import { Flex, WingBlank } from 'antd-mobile';
import Avatar from '../_components/Avatar'

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
      visible: false,
      data: {
      
      }
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
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleOk = (e) => {

    let that = this;
    agent.LaiXe.chotkm({km: that.state.km, anh: that.state.anh})
      .then(res => {
        message.success("Thành công")
        this.context.router.replace('/laixe')
      })
      .catch(err => {
        message.error("Có lỗi")
        this.context.router.replace('/laixe')
      })
  }
  
  render() {
    return (
    <div className="home-page" style={{marginTop: '1rem'}}>
      <div style={{padding: '0.2em'}}>
        
        <Button
          onClick={this.showModal}
          size={"large"} className="btn" type="primary" style={{width: '100%', height: '2rem', fontSize: '0.5rem'}}>
          Ngày: <b style={{color: 'orange'}}>{moment().format('DD/MM/YYYY')}</b>
        </Button>
    
        <Link to="/laixe/km/lichsu">
          <Button size={"large"} className="btn" type="primary" style={{width: '100%', marginTop: '0.3rem', height: '2rem', fontSize: '1rem'}}>Lịch sử</Button>
        </Link>
        
      </div>
  
      <Modal
        visible={this.state.visible}
        title={""}
        maskClosable={true}
        // onOk={this.handleOk}
        // onCancel={this.handleCancel}
        footer={[
          <Button key="back" size="large" onClick={() => this.handleCancel()}>Đóng</Button>,
          <Button key="submit" type="primary" size="large" onClick={this.handleOk}>Xác nhận</Button>,
        ]}
      >
        <div>
          <b style={{fontSize: '0.7rem'}}>Đầu ngày</b>
          <InputNumber style={{width: '100%'}} size="large"
             defaultValue={0}
             min={0}
             formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
             parser={value => value.replace(/(,*)/g, '')}
             onChange={(value) => {
               this.setState(prev => {
                 return {
                   ...prev,
                   data: {
                     ...prev.data,
                     km: value
                   }
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
                  data: {
                    ...prev.data,
                    anh: url
                  }
                }
              })
            }}
          />
      </Modal>
      
    </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
