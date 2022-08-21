import Layout from '../components/layout';

export default function Page({countries}) {
    return (
    <div>
        <a>Main Page</a>
    </div> )
    
  }
  
  Page.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }
