import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { IPostItem } from "../types.ts";
import { apiClient } from "../../../utils/api/apiClient.ts";
import { Button, Col, Row, message, Empty } from "antd";
import PostCard from "./PostCard.tsx";
import { useAppSelector } from "../../../hooks/redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const PostListPage = () => {
   const { id } = useParams();
   const [searchParams] = useSearchParams();
   const categoryName = searchParams.get("categoryName");

   const [posts, setPosts] = useState<IPostItem[]>([]);

   const { isLogin } = useAppSelector(state => state.account);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiClient.get<IPostItem[]>(`/api/posts/byCategoryId/${id}`);
            setPosts(response.data);
         } catch (error) {
            console.error('Error fetching categories:', error);
         }
      };

      fetchData();
   }, [id]);

   const handlePostDelete = async (postId: number) => {
      try {
         await apiClient.delete(`api/posts/${postId}`);
         setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
         message.success(`Post successfully deleted!`);
      } catch (error) {
         console.error('Error deleting post:', error);
         message.error(`Post deleting error!`);
      }
   };

   return (
      <>
         <h1>{categoryName}</h1>

         <Row gutter={[16, 16]}>
            <Col span={24}>
               <Row gutter={[16, 16]}>
                  {posts.length === 0 ? (
                     <Empty description="Список пустий" />
                  ) : (
                     posts.map((post) => (
                        <Col key={post.id} xxl={6} lg={8} md={12} sm={24}>
                           <PostCard item={post} />
                           {isLogin && (
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                 <Link to={`../post/edit/${post.id}`}>
                                    <Button icon={<EditOutlined />} style={{ marginRight: '8px' }}>
                                       Edit
                                    </Button>
                                 </Link>
                                 <Button
                                    icon={<DeleteOutlined />}
                                    danger
                                    onClick={() => handlePostDelete(post.id)}
                                 >
                                    Delete
                                 </Button>
                              </div>
                           )}
                        </Col>
                     ))
                  )}
               </Row>
            </Col>
         </Row>
      </>
   );
};

export default PostListPage;
