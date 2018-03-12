import Rate from './Rate';
import {Radio, Input, InputNumber } from 'antd';

const RadioGroup = Radio.Group;

import indexCode from './indexCode.txt';
import RateCode from './RateCode.txt';

import Code from '../code';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            allowClear: false,
            allowHalf: true,
            character: undefined,
            count: 5,
            defaultValue: 3.5,
            value: '',
        }
    }

    onChange=(ctrl, value)=>{
        this.setState({
            [ctrl]:value
        })
    }

    render(){
        let {
            allowClear,
            allowHalf,
            character,
            count,
            defaultValue,
            value,
        } = this.state;
        return (
            <div style={{
                border: '1px solid #D8DFE3',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <h1>评星</h1>
                <div>
                    allowClear：是否能点击清除: &nbsp;&nbsp;
                    <RadioGroup onChange={(e)=>this.onChange('allowClear',e.target.value)} value={allowClear}>
                        <Radio value={false}>false</Radio>
                        <Radio value={true}>true</Radio>
                    </RadioGroup>
                </div>
                <br/>
                <div>
                    allowHalf：是否允许评半星: &nbsp;&nbsp;
                    <RadioGroup onChange={(e)=>this.onChange('allowHalf',e.target.value)} value={allowHalf}>
                        <Radio value={false}>false</Radio>
                        <Radio value={true}>true</Radio>
                    </RadioGroup>
                </div>
                <br/>
                <div>
                    character：星星替换为其它字符: &nbsp;&nbsp;
                    <Input
                        value={character}
                        onChange={(e)=>this.onChange('character',e.target.value)}
                        style={{width:150}}
                        size="small"
                    />
                </div>
                <br/>
                <div>
                    count：星星数量: &nbsp;&nbsp;
                    <InputNumber
                        value={count}
                        onChange={(value)=>this.onChange('count',value)}
                        style={{width:150}}
                        size="small"
                        min={1}
                        max={10}
                    />
                </div>
                <br/>
                <div>
                    defaultValue：默认值分值，调整它将不会更新: &nbsp;&nbsp;
                    <InputNumber
                        value={defaultValue}
                        onChange={(value)=>this.onChange('defaultValue',value)}
                        style={{width:150}}
                        size="small"
                        min={0}
                        max={10}
                    />
                </div>
                <br/>
                <div>
                    value：分值, 受控,调整它会更新: &nbsp;&nbsp;
                    <InputNumber
                        value={value}
                        onChange={(value)=>this.onChange('value',value)}
                        style={{width:150}}
                        size="small"
                        min={0}
                        max={10}
                    />
                </div>
                <br/>
                <div style={{borderTop:'1px solid rgb(221, 221, 221)',marginTop:20}}></div>
                <Rate
                    {...{
                        allowClear,
                        allowHalf,
                        count,
                        defaultValue: defaultValue === ''? undefined : defaultValue,
                        value: value === ''? undefined : value,
                        character: character === ''? undefined : character,
                    }}
                    onChange={(value)=>this.onChange('value', value)}
                />
                <Code data={[
                    {file: 'Rate.js', codeString: RateCode},
                    {file: 'index.js', codeString: indexCode},

                ]}/>
            </div>
        )
    }
}
