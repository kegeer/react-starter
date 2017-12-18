import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { PageHeader } from 'components'

const {
  Header,
  Content,
  Footer,
} = Layout


const DefaultLayout = ({
  children, footer,
}) => {
  return (
    <Layout>
      <Layout>
        <Header style={{
 position: 'fixed', width: '100%', padding: '0px 100px',
}}
        >
          <PageHeader />
        </Header>

        <Content style={{ marginTop: 64 }}>
          { children }
        </Content>
        {
          footer &&
          <Footer>
            { footer }
          </Footer>
        }
      </Layout>
    </Layout>
  )
}

DefaultLayout.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.any,
}

export default DefaultLayout
