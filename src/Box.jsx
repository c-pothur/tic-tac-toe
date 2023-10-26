const Box = (props) => {
    return (<div 
        className="cell"
        onClick={props.clickHandler}
      ><p>{props.symbol}</p>
        
      </div>)
}

export default Box;