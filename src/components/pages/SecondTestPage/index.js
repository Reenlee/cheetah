import React from "react";
function SecondTestPage() {
    const style = { backgroundColor: "red", color: "white", fontSize: "20px" }
    function handleClick() {
        alert("hello")
    }
    return <div style={style} onClick={handleClick}>hello</div>
}
export default SecondTestPage