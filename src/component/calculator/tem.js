import './index.scss';

export default class Calculator extends Component{
  constructor(props){
      super(props);
  }

  render(){
    return (
      <div className="calc">
        {/* 计算结果 */}
        <div className="rultArea">
          fds
        </div>


        {/* 键盘区域 */}
        <div className="keypad">
          {/* 左边的输入键 */}
          <div className="iptKeys">
            {/* 功能键 */}
            <div className="fnKeys">
              <button>AC</button>
              <button>±</button>
              <button>%</button>
            </div>
            {/* 数字键 */}
            <div className="digitKeys">
              <button className="key-7">7</button>
              <button className="key-8">8</button>
              <button className="key-9">9</button>
              <button className="key-4">4</button>
              <button className="key-5">5</button>
              <button className="key-6">6</button>
              <button className="key-1">1</button>
              <button className="key-2">2</button>
              <button className="key-3">3</button>
              <button className="key-0">0</button>
              <button className="keyDot">.</button>
            </div>
          </div>

          {/* 右边的操作键 */}
          <div className="operatorKeys">
            <button className="keyDivide">÷</button>
            <button className="keyMultiply">×</button>
            <button className="keySub">-</button>
            <button className="keyPlus">+</button>
            <button className="keyEquals">=</button>
          </div>
        </div>
      </div>
    )
  }
}
