import React from 'react'
 
 export default function InfoBox({title,cases,total}){
     return (
        <> 
<div className="card" >
  <div className="card-body">
    <h5 className="card-title text-secondary"> {title}</h5>
   <h3 className="text-dark"> {cases}</h3>
   <h6 className="text-secondary">{total}</h6>
  </div>
</div>
 </>
     )
 }
 