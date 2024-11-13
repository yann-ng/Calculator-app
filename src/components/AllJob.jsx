import React, {useState, useEffect, useRef} from 'react';
import './AllJob.css'
import {motion} from 'framer-motion';

function TheJob (){
    const [screenVal, setScreenVal] = useState('0');
    const [valueSign, setValueSign] = useState(false);
    // result carousel
    const [width, setWidth] = useState('0');
    const carousel = useRef();

    const carouselDragging = () => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    };

    const buttonClicked = (event) => {
        const value = event.target.innerText;
        console.log(value)
        switch(value){
            case 'AC':{
                setScreenVal('0');
                break;
            }
            case '+/-':{
                if (screenVal === '0' || screenVal === 'ERROR!'){break;} // avoid negative 0
                if (valueSign){setScreenVal(screenVal.substring(1)); setValueSign(!valueSign);}
                else {setScreenVal('-'+ screenVal); setValueSign(!valueSign);}
                break;
            }
            case '=':{
                try{
                    if(screenVal === 'ERROR!'){setScreenVal('0');}
                    let result = Function("return " + screenVal);
                    setScreenVal(result);
                }catch(err){
                    setScreenVal("ERROR!");
                }
                break;
            }

            default:{
                if (screenVal === '0' && value !== '.'){
                    setScreenVal(value);
                }
                else if(screenVal === 'ERROR!'){
                    setScreenVal('0');
                }
                else{
                    setScreenVal(screenVal + value);
                }
            }
        }
    }

    return (
        <div className='container'>
            <div className='screen'>
                <motion.div drag="x" ref={carousel} onClick={carouselDragging} dragConstraints={{right: 0, left: -width}} whileTap={{cursor: 'grabbing'}} className='screen-value'>{screenVal}</motion.div>
            </div>
            <div className="buttons">
                <div className="buttons-row">
                    <button onClick={buttonClicked}>AC</button>
                    <button onClick={buttonClicked}>+/-</button>
                    <button onClick={buttonClicked}>%</button>
                    <button onClick={buttonClicked}>/</button>
                </div>
                <div className="buttons-row">
                    <button onClick={buttonClicked}>7</button>
                    <button onClick={buttonClicked}>8</button>
                    <button onClick={buttonClicked}>9</button>
                    <button onClick={buttonClicked}>X</button>
                </div>
                <div className="buttons-row">
                    <button onClick={buttonClicked}>4</button>
                    <button onClick={buttonClicked}>5</button>
                    <button onClick={buttonClicked}>6</button>
                    <button onClick={buttonClicked}>-</button>
                </div>
                <div className="buttons-row">
                    <button onClick={buttonClicked}>1</button>
                    <button onClick={buttonClicked}>2</button>
                    <button onClick={buttonClicked}>3</button>
                    <button onClick={buttonClicked}>+</button>
                </div>
                <div className="buttons-row">
                    <div className='buttons-row-buttons-part1'>
                        <button onClick={buttonClicked} className='buttons-row-button-expand'>0</button>
                    </div>
                    <div className="buttons-row-buttons-part2">
                        <button onClick={buttonClicked}>.</button>
                        <button onClick={buttonClicked}>=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TheJob;