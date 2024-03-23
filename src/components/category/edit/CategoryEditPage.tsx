import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { ICategoryEdit } from '../types';
import { apiClient } from '../../../utils/api/apiClient';
import { useAppSelector } from '../../../hooks/redux';

const EditCategoryPage = () => {
   const { id } = useParams();

   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);

   const { isAdmin } = useAppSelector(state => state.account);

   useEffect(() => {
      const fetchCategory = async () => {
         setLoading(true);
         try {
            const response = await apiClient.get(`api/categories/${id}`);
            form.setFieldsValue({ name: response.data?.name, description: response.data?.description })
         } catch (error) {
            console.error('Error fetching category:', error);
            message.error('Category fetching error');
         } finally {
            setLoading(false);
         }
      };

      fetchCategory();
   }, [id]);

   const onFinish = async (values: ICategoryEdit) => {
      setLoading(true);
      const data = { ...values, id };

      try {
         await apiClient.put('api/categories', data);
         message.success('Category successfully edited!');
      } catch (error) {
         console.error('Error editing category:', error);
         message.error('Category editing error');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
         {!isAdmin ?
            <p style={{ marginBottom: '20px', textAlign: 'center' }}>You must be an <span style={{ fontWeight: 'bold' }}>admin</span> to edit categories.</p>
            :
            <>
               <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Edit Category</h1>
               <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ remember: true }}
               >
                  <Form.Item
                     label="Name"
                     name="name"
                     rules={[{ required: true, message: 'Please enter the category name!' }]}
                  >
                     <Input placeholder="Enter the category name" />
                  </Form.Item>

                  <Form.Item
                     label="Description"
                     name="description"
                     rules={[{ required: true, message: 'Please enter the category description!' }]}
                  >
                     <Input.TextArea rows={4} placeholder="Enter the category description" />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Save
                     </Button>
                  </Form.Item>
               </Form>
            </>
         }
      </div>
   );
};

export default EditCategoryPage;
