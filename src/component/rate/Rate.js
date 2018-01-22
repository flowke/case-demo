import 'antd/lib/rate/style/css';

export default class Rate extends Component{
    constructor(props){
        super(props);

        let {allowHalf, defaultValue, value} = this.props;
        let applyValue = value !== undefined ? value : defaultValue;
        let info = this.getSizeInfoFromeValue(allowHalf, applyValue);

        // fullSize 用来记录目前这个时刻应该填充几个星星
        // rateSize 用来记录之前被点击的星星，也就是被记录下的星值
        this.state = {
            fullSize: info,
            rateSize: info,
        };
    }

    static defaultProps = {
        character: (<i className="anticon anticon-star"></i>),
        allowHalf: false,
        allowClear: false,
        disabled: false,
        count: 5,
        defaultValue: 0,
        className: '',
        value: undefined,
        onChange: f=>f,
    }

    static propTypes = {
        character: PT.oneOfType([
            PT.string,
            PT.number,
            PT.element
        ]),
        allowHalf: PT.bool,
        value: PT.number,
        allowClear: PT.bool,
        disabled: PT.bool,
        count: PT.number,
        defaultValue: PT.number,
        className: PT.string,
        onChange: PT.func
    }

    // 当组件初始化，或组件更新时，它用于提供应当修改成什么评星值
    getSizeInfoFromeValue(allowHalf,value){

        let size = Math.floor(value);
        let isHalf = value - size === 0.5 && allowHalf;

        size = isHalf ? size : size-1;

        return {size, isHalf};
    }


    getStartHandlers=(handlers)=>{
        let {allowHalf, disabled} = this.props;

        return allowHalf || disabled ? undefined : {
            ...handlers
        };

    }
    getHalfHandlers=(handlers)=>{
        let {allowHalf, disabled} = this.props;
        return allowHalf && !disabled ? {...handlers} : undefined;
    }

    // 检测 vale prop 的变化
    componentWillReceiveProps(nP){

        if(
            (nP.value !== undefined && nP.value!==this.props.value)
            || nP.allowHalf !== this.props.allowHalf
        ){

            let {allowHalf, value} = nP;

            let controlValue = value;

            if(nP.value===undefined && this.state.rateSize.isHalf){
                controlValue = this.state.rateSize.size;
            }
            if(nP.value===undefined && !this.state.rateSize.isHalf){
                controlValue = this.state.rateSize.size+1;
            }

            let info = this.getSizeInfoFromeValue(allowHalf, controlValue);

            this.setState({
                fullSize: info,
                rateSize: info,
            });
        }
    }

    // hover 到某个星星
    handleStarHover = (size,isHalf=false)=>{
        this.setState({fullSize: {size,isHalf}});
    }
    // 点击要记录评星
    handleRateSize = (size,isHalf=false)=>{

        let {allowClear, onChange} = this.props;
        let {rateSize} = this.state;

        let sizeInfo = rateSize.size === size
            && rateSize.isHalf === isHalf
            && allowClear ?
            {size:-1,isHalf:false} :
            {size,isHalf} ;

            this.setState({
                rateSize:sizeInfo,
                fullSize:sizeInfo
            });

            let resSize = 0;

            if(isHalf){
                resSize = sizeInfo.size + 0.5;
            }else{
                resSize = sizeInfo.size + 1;
            }

            onChange(resSize);
    }

    render(){

        let {fullSize, rateSize} = this.state;

        let {
            character,
            allowHalf,
            allowClear,
            disabled,
            count,
            className
        } = this.props;

        return (
            <ul
                className={`ant-rate ${disabled ? 'ant-rate-disabled': ''} ${className}`}
            >
                {new Array(Math.floor(count)).fill(character).map((character,i)=>{

                    let fullorHalfClass = '';

                    if(fullSize.size > i){
                        fullorHalfClass = "ant-rate-star-full" ;
                    }else if(fullSize.size===i){
                        fullorHalfClass =
                        fullSize.isHalf ?
                        "ant-rate-star-half" :
                        "ant-rate-star-full" ;
                    }

                    return (
                        <li
                            key={i}
                            className={`ant-rate-star ${
                                fullorHalfClass
                            }`}
                            {...this.getStartHandlers({
                                onMouseEnter: ()=>this.handleStarHover(i),
                                onMouseLeave: ()=>this.handleStarHover(rateSize.size),
                                onClick: ev=>this.handleRateSize(i)
                            })}
                        >
                            <div
                                className="ant-rate-star-first"
                                {...this.getHalfHandlers({
                                    onMouseEnter: ()=>this.handleStarHover(i, true),
                                    onMouseLeave: ()=>this.handleStarHover(rateSize.size, rateSize.isHalf),
                                    onClick: ()=>this.handleRateSize(i,true)
                                })}
                            >{character}</div>
                            <div
                                className="ant-rate-star-second"
                                {...this.getHalfHandlers({
                                    onMouseEnter: ()=>this.handleStarHover(i),
                                    onMouseLeave: ()=>this.handleStarHover(rateSize.size, rateSize.isHalf),
                                    onClick: ()=>this.handleRateSize(i)
                                })}
                            >{character}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
