import React,{useState} from 'react';
import Nav from './Nav'
import styled,{keyframes} from 'styled-components'
import umMarket from '../slideImg/umMarket.png'
import {useSpring,animated} from 'react-spring'
import {useLocation,useParams} from 'react-router-dom'
import {data} from '../data'


const clickAni = keyframes`
    from{
        transform: translateX(0.3em);
    }
    to{
        transform:translateX(-0.3em)
    }
`
const appearAni = keyframes`
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
`
const Content = styled.div`
    height:100vh;
    padding:6% 5%;
    display:flex;
    justify-content: center;
    animation: 0.5s linear 0s ${appearAni};
`
const Img = styled.img`
position: absolute;
    width:100%;
    height:100%;
    top:0%;
    left:0%;
    opacity: 0.8;
`
const Text = styled.div`
    flex:1;
    padding-left:7%;
    padding-top:5%;
    font-size:2em;
    h1{
        margin:0px;
    }
    h3{
        opacity: 0.7;
    }
    h4{
        padding-top:10%;
        animation: 1s linear ${clickAni} infinite;
    }
    h2{
        opacity: 0.2;
    }
    div{
        padding-top: 20%;
        font-size:1.5em
    }
`
const Link = styled.a`
    flex:1;
    position: relative;
`
const GoGit = styled.a`
    transition: all 0.5s;
    opacity: 0.8;
    &:hover{
        text-decoration: underline;
    }
`
const UmMarket = (props) => {
    // props던 state던 없으면 null로나옴
    const {state} = useLocation()
    const params = useParams();
    const middle = Object.keys(data).map(item => data[item])
    const filterArray = middle.flat().filter(item => item.title === params.project)[0]
    console.log(filterArray)
    return (
        <div>
            <Nav />
            <Content>
                <Link href={filterArray.url} target="blank">
                    <Img src={filterArray.img}></Img>
                </Link>
                <Text>
                    <h1>{filterArray.title}</h1>
                    <h3>{filterArray.content}</h3>
                    <h2>{`${filterArray.type}-Project`}</h2>
                    <h4>{`<- Click`}</h4>
                    <div>
                        <GoGit href={filterArray.git} target="_blank">Go to Git</GoGit>
                    </div>
                </Text>
            </Content>
        </div>
    );
};

export default UmMarket;