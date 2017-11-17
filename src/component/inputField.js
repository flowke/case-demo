import 'style/input.css';


let inputData = [
    {id:Math.random(), value:'1', isEditing: false},
    {id:Math.random(), value:'2', isEditing: false},
];

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputData
        }
    }

    onEdit = (id)=>{
        let {inputData} = this.state;
        let tempVal = '';
        inputData = inputData.map( data=>{
            if(data.id===id){
                data.isEditing = true;
                tempVal = data.value;
            };

            return data;
        } );

        this.setState({inputData},()=>this.editField.value=tempVal);
    }

    onEditDone=(id)=>{
        let {inputData} = this.state;

        inputData = inputData.map( data=>{

            if(data.id===id){
                data.isEditing = false;
                data.value = this.editField.value;
            }

            return data;
        } );

        this.setState({inputData});
    }

    onEditCancel=(id)=>{
        let {inputData} = this.state;

        inputData = inputData.map( data=>{

            if(data.id===id){
                data.isEditing = false;
            }

            return data;
        } );

        this.setState({inputData});
    }

    render(){


        let Comp = inputData.map( ({value, isEditing, id}) => (
            <div
                className="text_i"
                key={id}
            >
                {/* <div>{isEditing.toString()}</div> */}
                { isEditing ? (
                    <div className="alter">
                        <input
                            type="text"
                            ref={elt=>this.editField=elt}
                        />
                        <span
                            className="sure"
                            onClick={()=>this.onEditDone(id)}
                        >确定</span>
                        <span
                            className="cancel"
                            onClick={()=>this.onEditCancel(id)}
                        >取消</span>
                    </div>
                ) : (
                    <div className="show">
                        <p className="info">{value}</p>
                        <a href="javascript:;" className="btn"
                            onClick={()=>this.onEdit(id)}
                        ></a>
                    </div>
                ) }


            </div>
        ) );

        return (
            <div className="wrap">
                <div className="text">
                    {Comp}
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('inputField')
);
