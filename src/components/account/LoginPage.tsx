import React from 'react';
import { Button, Form, Input, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/accounts/accounts.actions.ts';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNotification } from '../../hooks/notification';
import { Status } from '../../utils/enums';
import { ILogin } from '../../interfaces/account/index.ts';

const LoginPage: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [messageApi, contextHolder] = message.useMessage();
   const { handleError } = useNotification(messageApi);
   const status = useAppSelector(state => state.account.status);

   const onFinish = async (values: ILogin) => {
      try {
         const response = await dispatch(login(values));
         unwrapResult(response);
         navigate('/');
      } catch (error) {
         handleError(error);
      }
   };

   return (
      <Spin tip="Loading" size="large" spinning={status === Status.LOADING}>
         {contextHolder}
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
               name="basic"
               initialValues={{ remember: true }}
               onFinish={onFinish}
               style={{ width: 300 }}
            >
               <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Вхід</Typography.Title>
               <Form.Item
                  name="email"
                  rules={[
                     {
                        required: true,
                        message: 'Будь ласка введіть ваш e-mail!',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Email" />
               </Form.Item>

               <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Будь ласка введіть ваш пароль!' }]}
               >
                  <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
               </Form.Item>

               <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                     Вхід
                  </Button>
               </Form.Item>

               <Typography.Text style={{ textAlign: 'center', display: 'block' }}>
                  Немає аккаунта? <Link to="/register">Створити зараз!</Link>
               </Typography.Text>
            </Form>
         </div>
      </Spin>
   );
};

export default LoginPage;
