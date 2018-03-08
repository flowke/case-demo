import {Route, Link, HashRouter} from 'react-router-dom';

import Code from '../code';
import data from './data';
import indexCode from './indexCodeString.txt';
import dataCode from './dataCode.txt';
import './index.css';

import {List, Avatar} from 'antd';

class Persion extends Component{

  render(){
    let {match} = this.props;
    let {path, url, params} = match;


    let persion = data[params.id];

    return (
      <div>
        <h3>{`${persion.name}的朋友:`}</h3>
        <List
          itemLayout="horizontal"
          dataSource={persion.friends}
          renderItem={id=>{
            let friend = data[id];
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Link to={`${url}/${friend.id}`}><Avatar src={friend.avatar}/></Link>}
                  title={<Link to={`${url}/${friend.id}`}>{friend.name}</Link>}
                  description={
                    <div>
                      <span>我还有其它 <b>{friend.friends.length}</b> 位朋友:</span>&nbsp;
                      {
                        friend.friends.map(id=>{
                          let friend = data[id];
                          return (
                            <Link
                              key={id}
                              style={{marginRight: 10}}
                              to={`${url}/${friend.id}`}>{friend.name}</Link>
                          )
                        })
                      }

                    </div>
                  }
                />
              </List.Item>
            )
          }}
        >
          {/* {
            persion.friends.map(id=>{
              let friend = data[id];
              return (
            <li key={friend.id}>
            <Link to={`${url}/${friend.id}`}>{friend.name}</Link>
            </li>
              )
            })
          } */}
        </List>
        <Route path={`${url}/:id`} component={Persion}/>
      </div>
    )
  }
}

export default ({match})=>{

  let { url} = match;

  let ids = Object.keys(data);

  return (
    <div className="inifiRoute">
      <h1>无限路由</h1>
      <p>
        有10个人，你可以在朋友列表查看不同的人， <br/>
        不同的人有不同的朋友，你可以无限查看下去。
      </p>

      <h2>朋友列表</h2>

      <ul>
        {
          ids.map(id=>{
            let persion = data[id];
            return (
              <li key={persion.id}>
                <Link to={`${url}/${persion.id}`}>{persion.name}</Link>
              </li>
            )
          })
        }
      </ul>
      <Route path={`${url}/:id`} component={Persion}/>
      <Code data={[
        {file: 'index.js', codeString: indexCode},
        {file: 'data.js', codeString: dataCode}
      ]}/>
    </div>
  )
}
