import * as React from 'react'

export default function Carousel({ imgList }) {
    const [state, setState] = React.useState({
        idx: 0
    })

    function handleClick() {
        state.idx === imgList.length - 1 ? setState({ idx: 0 }) : setState({ idx: state.idx + 1 })
    }

    return (
        <div className="overflow-hidden object-fit" style={{ height: '25vw', width: '25vw', margin: '1vw' }}>
            <h3>Click the image!</h3>
            <img src={imgList[state.idx]} onClick={() => { handleClick() }} alt="" />
        </div>
    );
}