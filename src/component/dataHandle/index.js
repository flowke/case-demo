
import './index.scss';

export default class extends Component{
  constructor(props){
      super(props);

      this.state = {
        currentVal: '',
        dataList: []
      }

  }

  handleInput=(ev)=>{
    this.setState({
      currentVal: ev.target.value
    })
  }

  submitData=()=>{
    let {currentVal, dataList} = this.state;

    if(currentVal.trim() !== ''){

      this.setState({
        dataList:[
          {
            id: Math.random().toString(),
            content: currentVal.trim()
          },
          ...dataList
        ],
        currentVal: ''
      })

    }
  }

  deleteOneData=(id)=>{
    let { dataList} = this.state;

    this.setState({
      dataList: dataList.filter(elt=>{
        return elt.id !== id
      })
    })

  }

  render(){

    let {
      currentVal,
      dataList
    } = this.state;

    return (
      <div className="dataHandle">
        <textarea
          rows="7"
          outline="none"
          className="inputArea"
          value={currentVal}
          onChange={this.handleInput}
        />
        <button
          className="submitButton"
          onClick={this.submitData}
        >
          提交
        </button>
        <ul>
          {dataList.map(elt=>{
            return (
              <li key={elt.id}>
                <span>{elt.content}</span>
                <button
                  onClick={()=>this.deleteOneData(elt.id)}
                >删除</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
