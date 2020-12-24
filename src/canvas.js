import React, {useRef, useEffect} from 'react';
import Stage from './script.js';
import source from './snowflake1.png';
const Canvas = props => {
    const canvasRef = useRef(null)

    var stage = null;



    useEffect(() => {
        document.title = "ok";
        const canvas = canvasRef.current;
        var img = new Image();
        img.src = source;
        stage = new Stage(canvas, img);
        setInterval(function(){stage.step(); stage.draw();}, 10);
    }, [])
    return <canvas ref={canvasRef} {...props}/>
}
export default Canvas