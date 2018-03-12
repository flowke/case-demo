import './index.scss';

export default class Calculator extends Component{
  constructor(props){
      super(props);
  }

  state = {
    result: null,
    tempResult: null,
    showValue: '0',
    operator: '',
    isWattingNewVal: false
  }

  calcResult(operator, v1,v2){
    switch (operator) {
      case '*':
        return v1 * v2 ;
      case '/':
        return v1 / v2 ;
      case '+':
        return v1 + v2 ;
      case '-':
        return v1 - v2 ;
    }
  }

  // 输入数字
  inputNumber=(value)=>{
    value = value.toString();

    let {showValue, operator, tempResult} = this.state;
    let out = showValue;

    if(tempResult){
      out = '0';
    }

    if(showValue.length===1 && showValue==='0'){
      out = value;
    }else{
      out+=value;
    }

    this.setState({
      showValue: out
    });

  }

  // 输入操作符
  calc=(operator)=>{
    let {operator: preOperator, result, showValue} = this.state;

    if(result===null){
      this.setState({
        operator,
        tempResult: showValue,
      });
    }else{

    }
  }

  render(){
    let {result, showValue} = this.state;
    return (
      <div className="calc">
        {/* 计算结果 */}
        <div className="rultArea">
          {showValue}
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
              <button className="key-7"
                onClick={()=>this.inputNumber(7)}
              >7</button>
              <button className="key-8"
                onClick={()=>this.inputNumber(8)}
              >8</button>
              <button className="key-9"
                onClick={()=>this.inputNumber(9)}
              >9</button>
              <button className="key-4"
                onClick={()=>this.inputNumber(4)}
              >4</button>
              <button className="key-5"
                onClick={()=>this.inputNumber(5)}
              >5</button>
              <button className="key-6"
                onClick={()=>this.inputNumber(6)}
              >6</button>
              <button className="key-1"
                onClick={()=>this.inputNumber(1)}
              >1</button>
              <button className="key-2"
                onClick={()=>this.inputNumber(2)}
              >2</button>
              <button className="key-3"
                onClick={()=>this.inputNumber(3)}
              >3</button>
              <button className="key-0"
                onClick={()=>this.inputNumber(0)}
              >0</button>
              <button className="keyDot"
                onClick={()=>this.inputNumber('.')}
              >.</button>
            </div>
          </div>

          {/* 右边的操作键 */}
          <div className="operatorKeys">
            <button className="keyDivide"
              onClick={()=>this.calc('/')}
            >÷</button>
            <button className="keyMultiply"
              onClick={()=>this.calc('*')}
            >×</button>
            <button className="keySub"
              onClick={()=>this.calc('+')}
            >-</button>
            <button className="keyPlus"
              onClick={()=>this.calc('+')}
            >+</button>
            <button className="keyEquals"
              onClick={()=>this.calc('=')}
            >=</button>
          </div>
        </div>
      </div>
    )
  }
}
