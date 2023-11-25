import React from 'react'

function Alert(props) {
  const capitalize = (word) => {
    const l = word.toLowerCase();
    return l.charAt(0).toUpperCase() + l.slice(1);
  }
  return (
    <div className="con1" style={{height: '40px'}}>
    {props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
             <strong>{props.alert.type==="danger"?"Error":capitalize(props.alert.type)}</strong> : {props.alert.message}
        </div>}
    
     </div>
  )
}

export default Alert