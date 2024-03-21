import React from "react";
import { Card, Col, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { ICategoryItem } from "../types";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ICategoryCardProps {
   item: ICategoryItem
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
   const { item } = props;
   const { name, description } = item;

   return (
      <Col xs={24} sm={12} md={12} lg={8} xl={6} style={{ marginBottom: 20 }}>
         <Card
            hoverable
            style={{ borderRadius: 20, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', transition: '0.3s', backgroundColor: '#FFF2E8' }}
            actions={[
               <SettingOutlined key="setting" style={{ color: '#FF7A45' }} />,
               <EditOutlined key="edit" style={{ color: '#8B5CF6' }} />,
               <EllipsisOutlined key="ellipsis" style={{ color: '#52c41a' }} />,
            ]}
         >
            <Meta
               title={<Title level={3} style={{ color: '#FF7A45' }}>{name}</Title>}
               description={<Title level={4} type="secondary" style={{ color: '#595959' }}>{description.substring(0, 80)}...</Title>}
            />
         </Card>
      </Col>
   )
}

export default CategoryCard;
