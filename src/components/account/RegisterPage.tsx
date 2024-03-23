import React from 'react';
import { Button, Form, Input, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNotification } from '../../hooks/notification';
import { Status } from '../../utils/enums';
import { IRegister } from '../../interfaces/account';
import { register } from '../../store/accounts/accounts.actions.ts';

const RegisterPage: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [messageApi, contextHolder] = message.useMessage();
   const { handleError } = useNotification(messageApi);
   const status = useAppSelector(state => state.account.status);

   const onFinish = async (values: IRegister) => {
      try {
         const response = await dispatch(register(values));
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
               <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Реєстрація</Typography.Title>
               <Form.Item
                  name="firstName"
                  rules={[
                     {
                        required: true,
                        message: 'Будь ласка, введіть ваше ім\'я!',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Ім'я" />
               </Form.Item>

               <Form.Item
                  name="lastName"
                  rules={[
                     {
                        required: true,
                        message: 'Будь ласка, введіть ваше прізвище!',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Прізвище" />
               </Form.Item>

               <Form.Item
                  name="phone"
                  rules={[
                     {
                        required: true,
                        message: 'Будь ласка, введіть ваш номер телефону!',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Номер телефону" />
               </Form.Item>

               <Form.Item
                  name="email"
                  rules={[
                     {
                        type: 'email',
                        message: 'Введіть коректну електронну пошту!',
                     },
                     {
                        required: true,
                        message: 'Будь ласка, введіть вашу електронну пошту!',
                     },
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Електронна пошта" />
               </Form.Item>

               <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Будь ласка, введіть пароль!' }]}
               >
                  <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
               </Form.Item>

               <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                     {
                        required: true,
                        message: 'Будь ласка, підтвердіть пароль!',
                     },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                           }
                           return Promise.reject('Паролі не співпадають!');
                        },
                     }),
                  ]}
               >
                  <Input.Password prefix={<LockOutlined />} placeholder="Підтвердити пароль" />
               </Form.Item>

               <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                     Реєстрація
                  </Button>
               </Form.Item>

               <Typography.Text style={{ textAlign: 'center', display: 'block' }}>
                  Вже є аккаунт? <Link to="/login">Увійти зараз!</Link>
               </Typography.Text>
            </Form>
         </div>
      </Spin>
   );
};

export default RegisterPage;
