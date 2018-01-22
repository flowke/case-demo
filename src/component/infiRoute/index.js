import {Route, Link, HashRouter} from 'react-router-dom';

import data from './data';


class Persion extends Component{

  render(){
    let {match} = this.props;
    let {path, url, params} = match;


    let persion = data[params.id];

    return (
      <div>
        <h3>{`${persion.name}的朋友:`}</h3>
        <ul>
          {
            persion.friends.map(id=>{
              let friend = data[id];
              return (
                <li key={friend.id}>
                  <Link to={`${url}/${friend.id}`}>{friend.name}</Link>
                </li>
              )
            })
          }
        </ul>
        <Route path={`${url}/:id`} component={Persion}/>
      </div>
    )
  }
}

export default ({match})=>{

  let { url} = match;

  let ids = Object.keys(data);

  return (
    <HashRouter>
      <div>
        <h1>无限路由</h1>
        <p>
          有10个人，你可以在朋友列表查看不同的人， <br/>
          不同的人有不同的朋友，你可以无线查看下去。
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
      </div>
    </HashRouter>
  )
}
