import { Row, Col, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../utils/api/apiClient.ts";
import { IPostItem } from "../types.ts";

const { Title, Paragraph } = Typography;

const PostPage = () => {
   const { id } = useParams();

   const [post, setPost] = useState<IPostItem | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await apiClient.get<IPostItem>(`/api/posts/${id}`);
            setPost(response.data);
         } catch (error) {
            console.error('Post fetching error: ', error);
            message.error('Post fetching error!');
         }
      };

      fetchData();
   }, []);

   const formatDate = (dateString: string | undefined) => dateString?.replace('T', ' ').replace(/\.\d+/, '');

   return (
      <Row gutter={[24, 24]}>
         <Col span={24}>
            <Title level={1}>{post?.title}</Title>
            <p className="date">Posted: {formatDate(post?.postedOn)}</p>
            <p className="date">Edited: {formatDate(post?.modified)}</p>

            <Paragraph>{post?.description}</Paragraph>
         </Col>
      </Row>
   );
}

export default PostPage;
