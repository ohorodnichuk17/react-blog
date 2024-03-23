import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { ICategoryCreate } from '../types.ts';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const CategoryCreatePage = () => {
   const [loading, setLoading] = useState(false);

   const { isAdmin } = useAppSelector(state => state.account);

   const navigate = useNavigate();

   const onFinish = async (data: ICategoryCreate) => {
      setLoading(true);

      try {
         await apiClient.post('api/categories', data)
         message.success('Category successfully created');
         navigate(-1);
      } catch (error) {
         console.log('Category creating error: ', error);
         message.error('Category creating error');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={{ padding: '20px' }}>
         {!isAdmin ?
            <p>You must be <span style={{ fontWeight: 'bold' }}>admin</span> to create category!</p>
            :
            <>
               <h1>Create Category</h1>
               <Form
                  layout="vertical"
                  onFinish={onFinish}
               >
                  <Form.Item
                     label="Name"
                     name="name"
                     rules={[{ required: true, message: 'Please enter category name!' }]}
                  >
                     <Input placeholder="Enter category name" />
                  </Form.Item>

                  <Form.Item
                     label="Description"
                     name="description"
                     rules={[{ required: true, message: 'Please enter category description!' }]}
                  >
                     <Input.TextArea rows={4} placeholder="Enter category description" />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                     </Button>
                  </Form.Item>
               </Form>
            </>
         }
      </div>
   );
};

export default CategoryCreatePage;
