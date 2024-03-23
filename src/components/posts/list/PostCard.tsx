import { Card, Col, Typography } from "antd";
import { IPostItem } from "../types.ts";

const { Title } = Typography;
const { Meta } = Card;

interface IPostCardProps {
   item: IPostItem;
}

const PostCard: React.FC<IPostCardProps> = ({ item }) => {
   const { title, description } = item;

   return (
      <Col className="card" style={{ padding: 10 }} xxl={4} lg={8} md={8} sm={12}>
         <Card
            bodyStyle={{ padding: '10px 16px', height: '100%' }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
            hoverable
         >
            <Meta
               title={<Title level={5} type="success" ellipsis={{ rows: 1, tooltip: title }}>{title}</Title>}
               description={description.substring(0, 50) + ' ...'}
            />
         </Card>
      </Col>
   );
};

export default PostCard;
