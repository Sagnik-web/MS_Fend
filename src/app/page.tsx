"use client"

import axios from "axios";
import { AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";

// import Image from "next/image";

export default function Home() {

  const [msg,setMsg] = useState('')
  
  const [allMsg,setAllMsg] = useState<any>([])

  useEffect(()=>{
    axios.get('/search/api/v1/todo')
    .then(res=>{
      setAllMsg(res.data.todo)
    })
    .catch(err=>{
      console.log(err);
      
    })
  },[])

  const onSubmit=()=>{
    console.log(msg);
    
    axios.post('/api/v1/todo',{title:msg})
    .then(res=>{
      console.log(res);
      
      setAllMsg([...allMsg,{title:msg}])
    })
    .catch(err=>{
      console.log(err);
      
    })
  }

  return (
   <div>
      <div>Todo List</div>
      <div>
        <input value={msg} onChange={e=>setMsg(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
      </div>

      {allMsg.map((el: { _id:any,title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; })=>
        <h2 key={el._id}>{el.title}</h2>
      )}
   </div>
  );
}
