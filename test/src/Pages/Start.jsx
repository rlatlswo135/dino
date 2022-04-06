import React from 'react';
import '../App.css';
import {useEffect,useState,useRef} from 'react'
import anime from 'animejs';
import {Link} from 'react-router-dom'


const Start = () => {
    const animation = useRef(null)
    function clickFun(){
        console.log('click')
    }
    useEffect(()=>{
      animation.current=anime.timeline({loop:false})
      animation.current  .add({
        targets: '.ml5 .line',
        opacity: [0.5,1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700
      }).add({
        targets: '.ml5 .line',
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
      }).add({
        targets: '.ml5 .ampersand',
        opacity: [0,1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
      }).add({
        targets: '.ml5 .letters-left',
        opacity: [0,1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=300'
      }).add({
        targets: '.ml5 .letters-right',
        opacity: [0,1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=600'
      }).add({
        targets: '.ml5',
        opacity: 1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });    
    },[])
    return (
        <div className="test" onClick={()=>clickFun()}>
        <Link to="/home">
            <h1 className="ml5">
              <span className="text-wrapper">
                 <span className="line line1"></span>
                <span className="letters letters-left">Developer</span>
                 <span className="letters ampersand">Kim's</span>
                <span className="letters letters-right">Portfolio</span>
                 <span className="line line2"></span>
                </span>
            </h1>
        </Link>
      </div>
    );
};

export default Start;