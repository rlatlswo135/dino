import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Container = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    height:5%;
    border-bottom: 6px solid rgba(121,127,127,0.5);
    width:100%;
    position: fixed;
    z-index:100;
`
const NavLeft = styled.div`
    font-size:1.9em;
    padding-left:5%;
    font-weight: 900;
`
const NavRight = styled.div`
    flex:0.3;
    display:flex;
    justify-content: space-around;
    font-size:1.2em;
    font-weight: 500;
`
const NavContent = styled.div`
    
`

const Nav = () => {
    return (
        <Container>
            <NavLeft>
                <Link to="/">
                    CJ KIM
                </Link>
            </NavLeft>
            <NavRight>
                <Link to='/home'>
                    <NavContent>HOME</NavContent>
                </Link>
                <Link to="/about">
                    <NavContent>ABOUT</NavContent>
                </Link>
                <Link to="/port">
                    <NavContent>PROJECTS</NavContent>
                </Link>
                <Link to="/contact">
                    <NavContent>CONTACT</NavContent>
                </Link>
            </NavRight>
        </Container>
    );
};

export default Nav;