import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ButtonGroup from "antd/es/button/button-group";
import { logout } from "../../../store/accounts/accounts.slice.ts";

const { Header } = Layout;

const DefaultHeader = () => {
   const dispatch = useAppDispatch();
   const location = useLocation();

   const { isLogin, user } = useAppSelector(state => state.account);

   const handleLogout = () => {
      dispatch(logout());
   };

   return (
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFF2E8', padding: '0 20px' }}>
         <div className="demo-logo" />
         <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[location.pathname.substr(1)]}
            style={{ flex: 1, minWidth: 0 }}
         >
            <Menu.Item key={"products"} style={{ color: '#8B5CF6' }}>
               <Link to={`/product`} style={{ color: 'inherit' }}>Категорії</Link>
            </Menu.Item>
         </Menu>

         {isLogin ? (
            <ButtonGroup size="large">
               <Button
                  type="primary"
                  style={{ display: 'flex', backgroundColor: '#FF7A45', borderColor: '#FF7A45', color: '#FFFFFF' }}
               >
                  {user?.name}
               </Button>
               <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={() => handleLogout()}
                  style={{ backgroundColor: '#FF7A45', borderColor: '#FF7A45' }}
               />
            </ButtonGroup>

         ) : (
            <div style={{ display: 'flex', gap: '1%' }}>
               <Link to="/login" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                  <Button icon={<UserOutlined />} style={{ borderColor: '#8B5CF6', color: '#8B5CF6' }}>
                     Login
                  </Button>
               </Link>
               <Link to="/register" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                  <Button type="primary" icon={<UserAddOutlined />} style={{ backgroundColor: '#FF7A45', borderColor: '#FF7A45' }}>
                     Register
                  </Button>
               </Link>
            </div>
         )}

      </Header>
   );
};

export default DefaultHeader;
