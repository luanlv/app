import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select, message } from 'antd';
import PropTypes from 'prop-types';
import agent from '../../../agent'
const Option = Select.Option;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        agent.IT.themLaiXe(values)
          .then(res => {
            message.success('Them thanh cong')
            this.context.router.replace('/it');
          })
          .catch(err => {
            message.error('Them that bai')
          })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" autoComplete="off">
        <div className="groupWr">
    
          <h3 className="header">Tai khoan dang nhap</h3>
    
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              // initialValue: this.props.defaultValue.username
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Ten dang nhap" />
            )}
          </FormItem>
    
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              // initialValue: this.props.defaultValue.password
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Mat khau"
                     onChange={() => {
                     }}
              />
            )}
          </FormItem>
  
          <FormItem>
            {getFieldDecorator('thauphu', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              // initialValue: this.props.defaultValue.password
            })(
              <Select
                showSearch
                // style={{ width: 200 }}
                placeholder="Chon nha thau phu"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {this.props.thauphu.map((el, index) => {
                  return (<Option value={el._id} key={index}>{el.name}</Option>)
                })}
              </Select>
            )}
          </FormItem>
          
        </div>
  
        <div className="groupWr">
          <h3 className="header">Thong tin lai xe</h3>
    
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              // initialValue: this.props.defaultValue.username
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Ten lai xe" />
            )}
          </FormItem>
  
        </div>
        
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Them moi
          </Button>
        </FormItem>
      </Form>
    );
  }
}

NormalLoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm
