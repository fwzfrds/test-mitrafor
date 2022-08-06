import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PhoneOutlined,
    HomeOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useState } from 'react'
import TableComp from '../../components/module/table/table'
const { Header, Sider, Content } = Layout

const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className='home_page'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: 'Home',
                        },
                        {
                            key: '2',
                            icon: <InfoCircleOutlined />,
                            label: 'About',
                        },
                        {
                            key: '3',
                            icon: <PhoneOutlined />,
                            label: 'Contact',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <TableComp />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home;