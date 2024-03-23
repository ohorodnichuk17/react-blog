import { useState, useEffect } from 'react';
import { Form, Button, Select, Input, Switch, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategoryItem } from '../../categories/types.ts';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { IPostEdit } from '../types.ts';
import { useAppSelector } from '../../../hooks/redux';

const PostEditPage = () => {
   const { id } = useParams();

   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState<ICategoryItem[]>([]);

   const { isLogin } = useAppSelector(state => state.account);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchPost = async () => {
         setLoading(true);
         try {
            const response = await apiClient.get(`api/posts/${id}`);
            const postData = response.data;

            form.setFieldsValue({
               title: postData.title,
               shortDescription: postData.shortDescription,
               description: postData.description,
               meta: postData.meta,
               published: postData.published,
               categoryId: postData.categoryId,
            });
         } catch (error) {
            console.error('Post fetching error: ', error);
            message.error('Post fetching error!');
         } finally {
            setLoading(false);
         }
      };

      const fetchCategories = async () => {
         try {
            const response = await apiClient.get<ICategoryItem[]>('api/categories');
            setCategories(response.data);
         } catch (error) {
            console.error('Categories fetching error: ', error);
            message.error('Categories fetching error!');
         }
      };

      fetchPost();
      fetchCategories();
   }, [id]);

   const onFinish = async (data: IPostEdit) => {
      setLoading(true);
      try {
         await apiClient.put(`api/posts/${id}`, data);
         message.success('Post successfully edited!');
         navigate(-1);
      } catch (error) {
         console.error('Post editing error: ', error);
         message.error('Post editing error!');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
         <h1>Edit Post</h1>
         {!isLogin ? (
            <p style={{ marginBottom: 20 }}>You must be <span style={{ fontWeight: 'bold' }}>SIGNED IN</span> to edit a post!</p>
         ) : (
            <Form
               form={form}
               layout="vertical"
               onFinish={onFinish}
            >
               <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: 'Please enter the title!' }]}
               >
                  <Input placeholder="Enter title" />
               </Form.Item>

               <Form.Item
                  label="Short Description"
                  name="shortDescription"
                  rules={[{ required: true, message: 'Please enter the short description!' }]}
               >
                  <Input.TextArea rows={4} placeholder="Enter short description" />
               </Form.Item>

               <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please enter the description!' }]}
               >
                  <Input.TextArea rows={8} placeholder="Enter description" />
               </Form.Item>

               <Form.Item
                  label="Meta"
                  name="meta"
               >
                  <Input placeholder="Enter meta" />
               </Form.Item>

               <Form.Item
                  label="Published"
                  name="published"
                  valuePropName="checked"
               >
                  <Switch />
               </Form.Item>

               <Form.Item label="Category" name="categoryId">
                  <Select
                     placeholder="Select a category"
                     loading={loading}
                  >
                     {categories.map((category) => (
                        <Select.Option key={category.id} value={category.id}>
                           {category.name}
                        </Select.Option>
                     ))}
                  </Select>
               </Form.Item>

               <Form.Item style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit" loading={loading}>
                     Save Changes
                  </Button>
               </Form.Item>
            </Form>
         )}
      </div>
   );
};

export default PostEditPage;
