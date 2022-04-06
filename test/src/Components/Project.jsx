import React from 'react';
import styled from 'styled-components'
import umMarket from '../slideImg/umMarket.png'
import {Link,useNavigate} from 'react-router-dom'

const Container = styled.div`
    margin-bottom:7%;
`
const Title = styled.div`
    font-size:2em;
    font-weight:900;
    padding-left:0.7%;
`
const ProjectBox = styled.div`
    display:flex;
    padding-left:0.5%;
    padding-top:0.5%;
`
const Img = styled.img`
    background-size: cover;
    width:100%;
    height:100%;
`
const Cover = styled.div`
    position: absolute;
    width:100%;
    height:100%;
    top:100%;
    background-color: rgba(140,159,159,0.9);
    transition: 0.5s all;
    text-align: center;
    &:hover{
        cursor: pointer;
    }
    h1{
        font-size:2.5em;
        font-weight:900;
    }
    h4{
        font-size:1.2em;
    }
`

const ImgWrap = styled.div`
    position: relative;
    margin-right:1.5%;
    margin-top:1%;
    width:250px;
    height:250px;
    overflow: hidden;
    &:hover{
        ${Cover}{
            top:0%;
        }
    }
`
const Project = (props) => {
    const navigate = useNavigate();

    function clickFun(data){
        navigate(`/port/${data.title}`)
    }
    return (
        <Container>
            <Title>{props.data.year}</Title>
            <ProjectBox>
                {props.data.projects.map(project => {
                    return(
                        <ImgWrap>
                            <Cover onClick={()=>clickFun(project,project.img)}>
                                <h1>{project.title}</h1>
                                <h2>{project.content}</h2>
                                <h4>{`${props.data.year}-${project.month}월`}</h4>
                            </Cover>
                            <Img src={project.img} data={project}></Img>
                        </ImgWrap>
                    )
                })}
            </ProjectBox>
        </Container>
    );
};

export default Project;