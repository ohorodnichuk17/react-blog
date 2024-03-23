import { Button, Col, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard.tsx';
import { ICategoryItem } from '../types.ts';
import { apiClient } from '../../../utils/api/apiClient.ts';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CategoryListPage = () => {
   const [categories, setCategories] = useState<ICategoryItem[]>([]);
   const { isAdmin } = useAppSelector(state => state.account);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiClient.get<ICategoryItem[]>('api/categories');
            setCategories(response.data);
         } catch (error) {
            console.error('Categories fetching error:', error);
            message.error('Categories fetching error');
         }
      };

      fetchData();
   }, []);

   const handleCategoryDelete = async (categoryId: number) => {
      try {
         await apiClient.delete(`api/categories/${categoryId}`);
         setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
      } catch (error) {
         console.error('Category deleting error:', error);
         message.error('Category deleting error');
      }
   };

   return (
      <>
         <h1>Categories list</h1>

         <Row gutter={16}>
            {categories.map((category) => (
               <Col key={category.id} span={24}>
                  <Link to={`category/${category.id}/${category.urlSlug}?categoryName=${category.name}`}>
                     <CategoryCard item={category} />
                  </Link>
                  {isAdmin && (
                     <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <Link to={`category/edit/${category.id}`}>
                           <Button
                              icon={<EditOutlined />}
                              style={{ borderColor: 'orange', color: 'orange', marginRight: '10px' }}
                           >
                              Edit
                           </Button>
                        </Link>
                        <Button
                           onClick={() => handleCategoryDelete(category.id)}
                           icon={<DeleteOutlined />}
                           danger
                        >
                           Delete
                        </Button>
                     </div>
                  )}
               </Col>
            ))}
            {categories.length === 0 && <h2>Список пустий</h2>}
         </Row>
      </>
   );
};

export default CategoryListPage;
