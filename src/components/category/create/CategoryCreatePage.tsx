import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { apiClient } from "../../../utils/api/apiClient";
import { ICategoryCreate } from "../types";

const CategoryCreatePage = () => {
   const [loading, setLoading] = useState(false);

   const onFinish = async (values: ICategoryCreate) => {
      setLoading(true);
      try {
         await apiClient.post('api/categories', values);
         message.success('Category created successfully');
      } catch (error) {
         console.error('Error creating category:', error);
         message.error('Failed to create category');
      } finally {
         setLoading(false);
      }
   };

   const onFinishFailed = (errorInfo: any) => {
      console.error('Failed:', errorInfo);
      message.error('Failed to create category');
   };

   return (
      <div style={{ maxWidth: 600, margin: 'auto' }}>
         <h1 style={{ textAlign: 'center', color: '#8B5CF6' }}>Створення категорії</h1>
         <Form
            name="category_create_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item
               label="Назва"
               name="name"
               rules={[{ required: true, message: 'Будь ласка, введіть назву категорії!' }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label="Опис"
               name="description"
               rules={[{ required: true, message: 'Будь ласка, введіть опис категорії!' }]}
            >
               <Input.TextArea />
            </Form.Item>

            <Form.Item
               label="URL Slug"
               name="urlSlug"
               rules={[{ required: true, message: 'Будь ласка, введіть URL Slug категорії!' }]}
            >
               <Input />
            </Form.Item>


            <Form.Item>
               <Button type="primary" htmlType="submit" loading={loading}>
                  Створити категорію
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
}

export default CategoryCreatePage;
