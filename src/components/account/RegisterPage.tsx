import React from 'react';
import { Button, Image, Divider, Flex, Form, Input, Row, Typography, message, Spin } from 'antd';
import logo from '../../assets/login.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/index.ts';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNotification } from '../../hooks/notification/index.ts';
import { Status } from '../../utils/enums/index.ts';
import { IRegister } from "../../interfaces/account/index.ts";
import { register } from "../../store/accounts/accounts.actions.ts";

const { Title } = Typography;

const Register: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [messageApi, contextHolder] = message.useMessage();
   const { handleError } = useNotification(messageApi);
   const status = useAppSelector(state => state.account.status);

   const onFinish = async (values: IRegister) => {
      console.log("values", values)
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
         <Row gutter={16}>
            {contextHolder}
            <Divider orientation="left" style={{ color: '#8B5CF6' }}>Реєстрація</Divider>
            <Flex vertical style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
               <Image
                  preview={false}
                  width={200}
                  src={logo}
                  style={{ marginBottom: 20 }}
               />
               <Form
                  name="basic"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                  style={{ width: 700 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
               >
                  <Form.Item
                     name="firstName"
                     label="First Name"
                     rules={[
                        {
                           min: 3,
                           message: 'The length of First Name must be at least 3 symbols',
                        },
                        {
                           required: true,
                           message: 'Please, enter your First Name!',
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="lastName"
                     label="Last Name"
                     rules={[
                        {
                           min: 3,
                           message: 'The length of Last Name must be at least 3 symbols',
                        },
                        {
                           required: true,
                           message: 'Please, enter your Last Name!',
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="phone"
                     label="Phone"
                     rules={[
                        {
                           min: 10,
                           message: 'The length of Phone must be at least 10 symbols',
                        },
                        {
                           required: true,
                           message: 'Please, enter your Phone number!',
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="email"
                     label="Email"
                     rules={[
                        {
                           type: 'email',
                           message: 'The input is not valid E-mail!',
                        },
                        {
                           required: true,
                           message: 'Please, enter your e-mail!',
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>

                  <Form.Item
                     label="Password"
                     name="password"
                     rules={[{ required: true, message: 'Please enter a password!' }]}
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item
                     label="Confirm Password"
                     name="confirmPassword"
                     rules={[{ required: true, message: 'Please confirm your password!' }]}
                  >
                     <Input.Password />
                  </Form.Item>

                  <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                     <Button size="large" type="primary" htmlType="submit" style={{ paddingInline: 50, backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' }}>
                        Реєстрація
                     </Button>
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24 }}>
                     <Typography style={{ textAlign: 'center', color: '#8B5CF6' }}>
                        Вже є аккаунт? <Link to="/login" style={{ color: '#8B5CF6' }}>Увійти зараз!</Link>
                     </Typography>
                  </Form.Item>
               </Form>
            </Flex>
         </Row>
      </Spin>
   );
};

export default Register;
