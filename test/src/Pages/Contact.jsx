import React from 'react';
import Nav from '../Components/Nav'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import styled,{keyframes} from 'styled-components'


const Container = styled.div`
    height: 100vh;
    max-height: 100vh;
`
const tesAni = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`

const ContactBox = styled.div`
    padding:10%;
    overflow: hidden;
    height:92%;
`
const ContactItem = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 5%;
    animation: ${tesAni} 1s 0s linear;
`
const ContactText = styled.p`
    font-size:4em;
    font-weight: 600;
    letter-spacing: 0.15em;
`

// 각 아이템에 애니메이션 주기

const Contact = () => {
    const data = {
        mail:{
            icons:faEnvelope,
            content:'rlatlswo13@gmail.com'
        },
        github:{
            icons:faGithub,
            content:'github.com/rlatlswo135'
        }
    }
    return (
        <Container>
            <Nav />
            <ContactBox>
                {
                    Object.keys(data).map((item,index) => {
                        return(
                            <ContactItem key={`contact-${index}`}>
                                <FontAwesomeIcon icon={data[item].icons} size="10x" />
                                <ContactText>{data[item].content}</ContactText>
                            </ContactItem>
                        )
                    })
                }
            </ContactBox>
        </Container>
    );
};

export default Contact;