import React from 'react';
import Nav from '../Components/Nav'
import styled,{keyframes} from 'styled-components'
import Project from '../Components/Project'
import {data} from '../data'

const appearAni = keyframes`
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
`
const Container = styled.div`
    height:100vh;
    max-height: 100vh;
`
const PortBox = styled.div`
    height:100%;
    padding:3% 5%;
    display:flex;
    flex-direction: column;
    animation: 0.5s linear 0s ${appearAni};
`
const PortTop = styled.div`
    flex:1;
    text-align: center;
    div{
        padding-top:2%;
        font-size:6em;
        font-weight: 900;
        letter-spacing:0.3em;
    }
`
const PortBottom = styled.div`
    flex:5;
    display:flex;
    flex-direction: column;
    padding-top:5%;
`


const Port = () => {
    const sortedArray = Object.keys(data).sort((a,b)=>a-b).reverse()
    return (
        <Container>
            <Nav />
            <PortBox>
                <PortTop>
                    <div>PROJECTS</div>
                </PortTop>
                <PortBottom>
                    {sortedArray.map(key => {
                        return(
                            <Project data={{
                                year:key,
                                projects:data[key].reverse()
                        }} />
                        )
                    })}
                </PortBottom>
            </PortBox>
        </Container>
    );
};

export default Port;