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
import Drag from './component/drag';
import Province from './component/province';
import Calculator from './component/calculator';
import ScaleView from './component/scaleView';
import DataHandle from './component/dataHandle';


const {Sider, Content} = Layout;
const {Item} = Menu;

export default class App extends Component{
  constructor(props){
      super(props);
  }

  componentDidMount(){
    // this.props.history.push({
    //   pathname: '/infinite',
    //   hash: "infinite"
    // })
  }

  render(){
    let {location, match} = this.props;

    let key = location.hash || '#infinite';

    key = key.slice(1);

    return (
      <div>
        <Layout style={{height: '100vh'}}>
          <Sider style={{backgroundColor: '#fff'}}>
            <Menu
              style={{height: '100vh'}}
              {...{
                defaultSelectedKeys: [key]
              }}
            >
              <Item key="infinite">
                <Link to={{pathname:"/infinite",hash:"infinite"}}>无限路由</Link>
              </Item>
              <Item key="rate">
                <Link to={{pathname:"/rate",hash:"rate"}}>评星</Link>
              </Item>
              <Item key="drag">
                <Link to={{pathname:"/drag",hash:"drag"}}>拖拽与运动</Link>
              </Item>

              <Item key="calculator">
                <Link to={{pathname:"/calculator",hash:"calculator"}}>IOS 计算器</Link>
              </Item>
              <Item key="province">
                <Link to={{pathname:"/province",hash:"province"}}>省市区联动</Link>
              </Item>
              <Item key="scaleView">
                <Link to={{pathname:"/scaleView",hash:"scaleView"}}>放大镜</Link>
              </Item>
              <Item key="dataHandle">
                <Link to={{pathname:"/dataHandle",hash:"dataHandle"}}>事件委托</Link>
              </Item>

            </Menu>
          </Sider>
          <Content style={{background: 'white'}}>
            <Row>
              <Col
                style={{marginTop: 100}}
                {...{
                    span: 18,
                    push: 3
                }}
              >
                <Route exact path="/" render={()=><Redirect to="/infinite"/>}/>
                <Route path="/infinite" component={Friends}/>

                <Route path="/rate" component={Rate}/>
                <Route path="/drag" component={Drag}/>

                <Route path="/calculator" component={Calculator}/>

                <Route path="/province" component={Province}/>

                <Route path="/scaleView" component={ScaleView}/>

                <Route path="/dataHandle" component={DataHandle}/>

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
    <Route component={App}/>
  </HashRouter>

  ,
  document.getElementById('root')
);


if(module.hot){
  module.hot.accept();
}
