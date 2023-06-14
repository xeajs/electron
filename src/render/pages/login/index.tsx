import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import loginImage from 'src/render/images/stone-bridge-bro.svg'
import styles from './index.module.less'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    navigate('/')
  }

  return (
    <div className={styles.login}>
      <div className={styles.illustration}>
        <img src={loginImage} alt='' />
      </div>
      <div className={styles.form}>
        <div className={styles.content}>
          <p className={styles.name}>Welcome</p>

          <Form
            name='normal_login'
            size='large'
            style={{ width: '100%' }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item name='username' rules={[{ required: true, message: '请输入账号!' }]}>
              <Input prefix={<UserOutlined rev={undefined} />} placeholder='请输入账号' />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码!' }]}>
              <Input prefix={<LockOutlined rev={undefined} />} type='password' placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a style={{ float: 'right' }} href='/'>
                找回密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button type='primary' style={{ width: '100%' }} htmlType='submit' className='login-form-button'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
