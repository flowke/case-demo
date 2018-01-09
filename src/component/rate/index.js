import 'antd/lib/rate/style/css';

export default class Rate extends Component{
    constructor(props){
        super(props);

        let {allowHalf, defaultValue, value} = this.props;
        let applyValue = value !== undefined ? value : defaultValue;
        let info = this.getSizeInfoFromeValue(allowHalf, applyValue);

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
        onHoverChange: f=>f,
    }

    static propTypes = {
        allowHalf: PT.bool
    }

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

    componentWillReceiveProps(nP){

        if(nP.value!==this.props.value){

            let {allowHalf, value} = nP;
            let info = this.getSizeInfoFromeValue(allowHalf, value);

            this.setState({
                fullSize: info,
                rateSize: info,
            });
        }
    }

    handleStarHover = (size,isHalf=false)=>{
        this.setState({fullSize: {size,isHalf}});
    }

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

            onChange(sizeInfo.size+1);
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
