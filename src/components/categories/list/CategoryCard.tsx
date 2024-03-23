import { Card, Col, Typography } from 'antd';
import { ICategoryItem } from '../types.ts';

const { Title } = Typography;

interface ICategoryCardProps {
   item: ICategoryItem;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ item }) => {
   const { name, description } = item;

   return (
      <Col className="card" xxl={4} lg={8} md={8} sm={12}>
         <Card
            bodyStyle={{ flex: '1', paddingBlock: '10px' }}
            style={{ height: 180, display: 'flex', flexDirection: 'column', paddingTop: '40px' }}
            hoverable
         >
            <Card.Meta
               title={name}
               description={<Title level={5} type="success">{description.substring(0, 35)} ...</Title>}
            />
         </Card>
      </Col>
   );
};

export default CategoryCard;
