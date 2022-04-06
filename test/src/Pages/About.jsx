import React from 'react';
import Nav from '../Components/Nav'
import styled from 'styled-components'

const Container = styled.div`
    height:100vh;
    max-height:100vh;
`
const AboutBox = styled.div`
    height:92%;
`
const About = () => {
    return (
        <Container>
            <Nav />
            <AboutBox>
                About
            </AboutBox>
        </Container>
    );
};

export default About;