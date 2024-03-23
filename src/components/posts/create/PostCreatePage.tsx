import { useEffect, useState } from 'react';
import { Form, Input, Button, Switch, Select, message } from 'antd';
import { IPostCreate } from '../types.ts';
import { ICategoryItem } from '../../categories/types.ts';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const PostCreatePage = () => {
   let navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const [categories, setCategories] = useState<ICategoryItem[]>([]);

   const { isLogin } = useAppSelector(state => state.account);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiClient.get<ICategoryItem[]>('api/categories');
            setCategories(response.data);
         } catch (error) {
            console.error('Categories fetching error: ', error);
            message.error('Categories fetching error');
         }
      };

      fetchData();
   }, []);

   const onFinish = async (data: IPostCreate) => {
      setLoading(true);
      try {
         await apiClient.post('api/posts', data);
         message.success('Post successfully created!');
         navigate('/');
      } catch (error) {
         console.error('Error creating post: ', error);
         message.error('Post creating error');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
         {!isLogin ? (
            <p style={{ marginBottom: 20 }}>You must be <span style={{ fontWeight: 'bold' }}>SIGNED IN</span> to create a post!</p>
         ) : (
            <>
               <h1>Create Post</h1>
               <Form
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
                        Create
                     </Button>
                  </Form.Item>
               </Form>
            </>
         )}
      </div>
   );
};

export default PostCreatePage;
