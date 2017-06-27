import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select, message } from 'antd';
import PropTypes from 'prop-types';
import agent from '../../../agent'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends React.Component {
  
  handleSubmit = (e) => {
    let that = this
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        agent.IT.themAutoFill({fieldname: this.props.fieldName, value: values.value})
          .then(res => {
            message.success('Them thanh cong')
            that.props.form.resetFields(['value'])
            // this.context.router.replace('/it');
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
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="groupWr">
    
          <h3 className="header">{this.props.title}</h3>
    
          <FormItem>
            {getFieldDecorator('value', {
              rules: [{ required: true, message: 'Khong duoc de trong' }],
              // initialValue: this.props.defaultValue.username
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Gia tri" />
            )}
          </FormItem>
          
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Them moi
            </Button>
          </FormItem>
          
        </div>
        
      </Form>
    );
  }
}

NormalLoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm
