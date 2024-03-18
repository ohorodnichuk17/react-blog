import { Layout, Menu, theme } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const DefaultSider = () => {
   const {
      token: { colorBgContainer, colorTextSecondary },
   } = theme.useToken();

   const menuItems = [{
      key: '1',
      icon: <UnorderedListOutlined />,
      label: 'Categories list'
   }];

   return (
      <Sider style={{ background: '#FFF2E8' }} width={200}>
         <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            style={{ height: '100%', backgroundColor: '#FFF2E8' }}
         >
            {menuItems.map(item => (
               <Menu.Item key={item.key} icon={item.icon} style={{ color: colorTextSecondary }}>
                  {item.label}
               </Menu.Item>
            ))}
         </Menu>
      </Sider>
   )
}

export default DefaultSider;
