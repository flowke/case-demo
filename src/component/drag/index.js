import {
  Motion,
  spring
} from 'react-motion';

import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';
import './index.scss';

export default class Drag extends Component{
  constructor(props){
      super(props);
  }

  render(){
    return (
      <div className="drag">
        <div className="block"></div>

        <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
          {interpolatingStyle => (
            <div style={interpolatingStyle}>
              
            </div>
          )}
        </Motion>
      </div>
    )
  }
}
