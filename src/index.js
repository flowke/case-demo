import {
  Layout,
  Divider,
  Menu,
  Row,
  Col,
} from 'antd';

import {HashRouter, Link, Redirect} from 'react-router-dom';


import Friends from './component/infiRoute';
import Rate from './component/rate';

const {Sider, Content} = Layout;
const {Item} = Menu;

export default class App extends Component{
  constructor(props){
      super(props);
  }

  render(){
    return (
      <div>
        <Layout style={{height: '100vh'}}>
          <Sider style={{backgroundColor: '#fff'}}>
            <Menu
              style={{height: '100vh'}}
              {...{
                defaultSelectedKeys: ["1"]
              }}
            >
              <Item key="1"><Link to="/infinite">无限路由</Link></Item>
              <Item key="0"><Link to="/rate">评星</Link></Item>
            </Menu>
          </Sider>
          <Content >
            <Row>
              <Col
                style={{marginTop: 100}}
                {...{
                  span: 14,
                  push: 6
                }}
              >
                <Route exact path="/" render={()=><Redirect to="/infinite"/>}/>
                <Route path="/infinite" component={Friends}/>

                <Route path="/rate" component={Rate}/>
              </Col>
            </Row>

          </Content>
        </Layout>

      </div>
    )
  }
}


ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>

  ,
  document.getElementById('root')
);
