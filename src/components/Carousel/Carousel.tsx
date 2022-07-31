import * as React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
export default function Carousel({ imgList }) {
    const [state, setState] = React.useState({
        idx: 0
    })

    function handleClick( num) {
        if(num>0){
            if(state.idx === imgList.length - 1 ){
                setState({
                    ...state,
                    idx:0
                })
            }else{
                setState({
                    ...state,
                    idx:state.idx+1
                })
            }
        }else{
            if(state.idx === 0){
                setState({
                    ...state,
                    idx:imgList.length-1
                })
            }else{
                setState({
                    ...state,
                    idx:state.idx-1
                })
            }
        }
    }

    const bgWStyle = `bg-[url('${imgList[state.idx]}')] overflow-hidden bg-cover flex flex-row justify-between items-center m-10`

    return (
        <div className="flex flex-row nowrap">
            <div className="min-h-full flex flex-col justify-center" onClick={()=>{handleClick(-1)}}><div className="hover:bg-red-100 rounded-full"><AiOutlineArrowLeft size={70} /></div></div>
            <div className={bgWStyle} style={{ height:'25vw' , width:'25vw'}}onClick={()=>{handleClick(-1)}}></div>
            <div className="min-h-full flex flex-col justify-center" onClick={()=>{handleClick(1)}}><div className="hover:bg-green-100 rounded-full"><AiOutlineArrowRight size={70} /></div></div>
        </div>

    );
}