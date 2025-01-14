import { Layout as AntLayout, Menu, Dropdown, Button, Avatar } from "antd"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react"
import { HddOutlined, UserOutlined } from "@ant-design/icons"

const { Header, Sider, Content } = AntLayout

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const user = Cookies.get("nama") || "{}"
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("username")
    Cookies.remove("nama")
    Cookies.remove("id_user")
    localStorage.clear()
    navigate("/login")
  }

  const profileMenu = {
    items: [
      {
        key: "logout",
        label: "Logout",
        onClick: handleLogout,
      },
    ],
  }

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          mode="inline"
          activeKey="packages"
          items={[
            {
              key: "packages",
              label: "Packages",
              icon: <HddOutlined />,
              onClick: () => navigate("/"),
            },
          ]}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: "0 16px", background: "#fff" }}>
          <div style={{ float: "right" }}>
            <Dropdown
              menu={profileMenu}
              placement="bottomRight"
            >
              <Button type="text">
                {user}{" "}
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
