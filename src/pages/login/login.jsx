import React, { Component } from 'react'
import './login.less'
import icon from './images/icon.jpeg'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils';

// http://124.222.167.196:5000
// 密码是admin 123


export default class Login extends Component {

  formRef = React.createRef()

  onFinish = async (event) => {
    const {username, password} = event
    const response = await reqLogin(username, password)
    console.log('success', response.data);
    const result = response.data
    if(result.status===0) {
      message.success('success')
      this.props.history.replace('/')
    } else {
      message.error(result.msg)
    }
  }

  onFinishFailed = (event) => {
    console.log('failed');
    console.log(event);
    console.log(this.formRef);
  }

  validatePwd = async (rule, value) => {
    if (!value) {
      throw new Error('密码不能为空');
    } else if (value.length < 4) {
      throw new Error('密码至少4位');
    } else if (value.length > 12) {
      throw new Error('密码至多12位');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      throw new Error('密码必须需是英文，数字或下划线组成');
    }
  }

  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={icon} alt="" />
          <h1>后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h2>用户登录</h2>
          <Form
            name="basic"
            initialValues={{
              remember: true,
              username:'admin',
              password:'admin'
            }}
            autoComplete="off"
            className='login-form'
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, whitespace: true, message: '请输入用户名!' },
              { min: 4, message: '用户名至少4位' },
              { max: 12, message: '用户名最多12位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是数字字母下划线' }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ validator: this.validatePwd }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
