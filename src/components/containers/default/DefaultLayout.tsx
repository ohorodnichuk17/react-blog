import { Breadcrumb, Layout, theme } from "antd";
import DefaultHeader from "./DefaultHeader";
import DefaultSider from "./DefaultSider";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

const DefaultLayout = () => {
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   return (
      <Layout>
         <DefaultHeader />

         <Content style={{ padding: '0 48px' }}>
            <Breadcrumb style={{ margin: '16px 0', color: '#8B5CF6' }}>
               <Breadcrumb.Item>Home</Breadcrumb.Item>
               <Breadcrumb.Item>List</Breadcrumb.Item>
               <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
               style={{ padding: '24px 0', background: '#FFF2E8', borderRadius: '20px' }}
            >
               <DefaultSider />
               <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Outlet />
               </Content>
            </Layout>
         </Content>
         <Footer style={{ textAlign: 'center', backgroundColor: '#FFF2E8', position: "absolute", bottom: "0", right: "0", left: "0" }}></Footer>
      </Layout>
   )
}

export default DefaultLayout;
