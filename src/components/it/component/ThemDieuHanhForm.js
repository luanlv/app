import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import PropTypes from 'prop-types';
import agent from '../../../agent'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        agent.IT.themDieuHanh(values)
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
              initialValue: this.props.defaultValue.username
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Ten dang nhap" />
            )}
          </FormItem>
          
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              initialValue: this.props.defaultValue.password
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Mat khau"
                onChange={() => {
                  console.log(this.state)
                }}
              />
            )}
          </FormItem>
        </div>
  
        <div className="groupWr">
          <h3 className="header">Thong tin dieu hanh</h3>
  
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              initialValue: this.props.defaultValue.username
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Ten dieu hanh" />
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
