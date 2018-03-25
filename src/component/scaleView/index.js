
import './index.css';

export default class ScaleView extends Component{
  constructor(props){
      super(props);

      this.state = {
        isInArea: false,
        left: 0,
        top: 0,
      };

      this.pointerR = 0;
      this.previewSize = {}
  }

  handlePointerMove = (e)=>{
    let {left, top} = this.moveArea.getBoundingClientRect();
    this.setState({
      left: e.clientX - left,
      top: e.clientY - top,
    })
  }

  handlePointerOut=(e)=>{
    this.setState({isInArea: false});
  }
  handlePointerEnter=()=>{

    this.setState({isInArea: true}, ()=>{
      this.defineBaseInfo();
    });
  }

  defineBaseInfo=()=>{
    this.pointerR = this.pointer.offsetHeight/2;
    this.previewSize = {
      width: this.previewImg.clientWidth,
      height: this.previewImg.clientHeight,
    }
  }

  defineMoveArea=(e)=>{
    this.moveArea = e;
  }
  definePointer=(e)=>{
    this.pointer = e;
  }
  definePreviewImg=(e)=>{
    this.previewImg = e;
  }
  definePreviewArea=(e)=>{
    this.previewArea = e;
  }

  componentDidMount(){

  }

  render(){

    let {left, top, isInArea} = this.state;

    if(isInArea){
      console.log(-this.previewArea.clientWidth * left/this.moveArea.offsetWidth);
    }

    // let previewActualLeft = ;

    return (
      <div id="box">
        <div id="left"
          ref={this.defineMoveArea}
          onMouseMove={this.handlePointerMove}
          onMouseOut={this.handlePointerOut}
          onMouseOver={this.handlePointerEnter}
        >
    			<img src={require("./img/img.png")} id="imgs1"/>
          <div
            style={{
              left: left - this.pointerR,
              top: top - this.pointerR,
              display: isInArea? 'block': 'none'
            }}
            id="mask" ref={this.definePointer}></div>
        </div>

        <div id="right"
          style={{display: isInArea? 'block': 'none'}}
        >
          <div id="border"
            ref={this.definePreviewArea}
          >
            <img
              ref={this.definePreviewImg}
              style={isInArea ? {
                left:(-this.previewImg.clientWidth * left/this.moveArea.offsetWidth) + this.previewArea.clientWidth/2,
                top: (-this.previewImg.clientHeight * top/this.moveArea.offsetHeight) + this.previewArea.clientHeight/2
              }: undefined}
              src={require("./img/img.png")} id="img2"
            />
          </div>
        </div>
      </div>
    )
  }
}
