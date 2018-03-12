import {Select, Button, Divider} from 'antd';

import {getProvince,getChildInfo} from './api';

let {Option} = Select;


export default class extends Component{

  state = {
    province: [],
    curtProvince: null,
    curtCity: null,
    curtDistrict: null
  }

  districtChoosen=(district, code)=>{
    let {curtProvince, curtCity, curtDistrict} = this.state;
    this.setState({
      curtCity: district==='curtProvince' ? null :  curtCity,
      curtDistrict: district==='curtProvince' || district=== 'curtCity'? null : curtDistrict,
      [district]:code,
    });

    console.log({
      curtCity: district==='curtProvince' ? null :  curtCity,
      curtDistrict: district==='curtProvince' || district=== 'curtCity'? null : curtDistrict,
      [district]:code,
    });

  }

  componentDidMount(){
    getProvince((err,data)=>{

      this.setState({
        province: data.districts[0].districts
      })
    });
  }

  render(){
    let { province, curtProvince, curtCity, curtDistrict } = this.state;

    let citys = curtProvince ? province.filter(elt=>elt.name===curtProvince)[0].districts : [];

    let districts = curtCity ? citys.filter(elt=>elt.name===curtCity)[0].districts : [];


    return (
      <div>
        <div>
          <Button
            type="primary"
            ghost
          >
            {curtProvince? `${curtProvince} ` :'-- 输入地址 --'}
            {curtCity ? `/ ${curtCity} ` : null}
            {curtDistrict ? `/ ${curtDistrict}` : null}
          </Button>
        </div>
        <Divider></Divider>
        <Select
          placeholder="-- 省份 --"
          showArrow={true}
          style={{width:120, marginRight: 20}}
          value={curtProvince||undefined}
          onSelect={(value)=>this.districtChoosen('curtProvince',value)}
        >
          {province.map(elt=>{

            return (
              <Option
                key={elt.name}
              >{elt.name}</Option>
            )
          })}
        </Select>
        {/* 市区 */}
        {citys.length? (
          <Select
            placeholder="-- 区/市 --"
            showArrow={true}
            style={{width:120, marginRight: 20}}
            value={curtCity|| undefined}
            onSelect={(value)=>this.districtChoosen('curtCity',value)}
          >
            {citys.map(elt=>{
              return (
                <Option
                  key={elt.name}
                >{elt.name}</Option>
              )
            })}
          </Select>
        ) : null}
        {/* 市辖区/县 */}
        {districts.length? (
          <Select
            placeholder="-- 市辖区/县 --"
            showArrow={true}
            style={{width:120}}
            value={curtDistrict||undefined}
            onSelect={(value)=>this.districtChoosen('curtDistrict',value)}
          >
            {districts.map(elt=>{
              return (
                <Option
                  key={elt.name}
                >{elt.name}</Option>
              )
            })}
          </Select>
        ) : null}
      </div>
    )
  }

}
