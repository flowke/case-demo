import {
  Motion,
  spring
} from 'react-motion';
import range from 'lodash/range';

import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';
import './index.scss';

let moveSpringConfig = {
  stiffness: 500,
  damping: 26
}

export default class Drag extends Component{
  constructor(props){
      super(props);
      this.state = {
        offsetVal: {x:0,y:0}
      };
      this.oldVal = {x:0,y:0};
      this.tempPressPos = {x:0,y:0};
      this.isPressed = false;
  }

  itemMouseDown = ({pageX,pageY})=>{
    this.isPressed = true;
    let {oldVal} = this;
    this.tempPressPos = {
      x: pageX,
      y: pageY
    }
  }

  itemMouseMove = ({pageX, pageY})=>{
    if(!this.isPressed) return;

    let {oldVal, tempPressPos} = this;

    this.setState({
      offsetVal: {
        x: pageX-tempPressPos.x+oldVal.x,
        y: pageY-tempPressPos.y+oldVal.y
      }
    })
  }

  itemMouseUp = ({pageX, pageY})=>{
    this.isPressed = false;
    this.oldVal = {...this.state.offsetVal};
  }
  componentDidMount(){
    window.addEventListener('mousemove',this.itemMouseMove);
    window.addEventListener('mouseup',this.itemMouseUp);
  }

  render(){
    let {offsetVal} = this.state;
    return (
      <div className="drag">
        {
          range(1,5).map((n,i)=>{
            return (
              <Motion
                key={i}
                defaultStyle={{x: 0, y: 0}}
                style={{
                  x: spring(offsetVal.x, moveSpringConfig),
                  y: spring(offsetVal.y, moveSpringConfig)
                }}
              >
                {ipl => (
                  <div
                    className="block"
                    style={{
                      transform: `translate(${ipl.x}px,${ipl.y}px)`,
                    }}
                    onMouseDown={this.itemMouseDown}
                  >
                    {n}
                  </div>
                )}
              </Motion>
            )
          })
        }
      </div>
    )
  }
}
