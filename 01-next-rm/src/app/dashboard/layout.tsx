import { Layout } from 'antd';
import AdminSider from '@/components/adminLayout/admin.sider';
import AdminContent from '@/components/adminLayout/admin.content';
import AdminFooter from '@/components/adminLayout/admin.footer';
import AdminHeader from '@/components/adminLayout/admin.header';

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Layout>
      <AdminSider />
      <Layout>
        <AdminHeader />
        <AdminContent>{children}</AdminContent>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default layout;
