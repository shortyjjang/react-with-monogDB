import React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function Layouts(props) {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          {props.children}
        </div>
      </Content>
      <Footer>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}
export default Layouts;