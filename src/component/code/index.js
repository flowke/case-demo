import {
  Divider,
  Button,
  Icon
} from 'antd';

import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/prism-light";
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import prism from 'react-syntax-highlighter/styles/prism/prism';

registerLanguage('jsx', jsx);

export default class extends Component{

  state={codeShow: false}

  static defaultProps = {
    children: `

      `
  }

  render(){
    let {data} = this.props;
    let {codeShow} = this.state;

    return (
      <div>
        <Divider>
          <Button
            type="dashed"
            onClick={()=>this.setState({codeShow: !codeShow})}
          >
            点击{codeShow ? '收起' : '查看'}代码
            {codeShow ? <Icon type="shrink" /> : <Icon type="arrows-alt" />}

          </Button>
        </Divider>
        <div style={{display: codeShow? 'block': 'none'}}>
          {data.map((item,i)=>{
            return (
              <div key={i} style={{
                border:'1px solid #ddd',
                padding: 10,
                backgroundColor: '#fff',
                marginBottom: 20
              }}>

                {item.file}
                <SyntaxHighlighter
                  language="jsx"
                  style={prism}
                >
                  {item.codeString}
                </SyntaxHighlighter>
              </div>
            )
          })}
        </div>


      </div>
    )
  }
}
