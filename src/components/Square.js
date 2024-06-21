import "./Square.css";

function Square({index, updateSquares, clsName }){
    function handleClick(){
        updateSquares(index);
    }
    return(
        <>
            <div className="square" onClick={handleClick}>
                 {clsName && <span className={clsName}></span>}
            </div>
        </>
    )
}

export default Square;