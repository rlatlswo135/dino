import React,{useState,useEffect} from 'react';
import Nav from '../Components/Nav'
import styled ,{keyframes}from 'styled-components'
import profile from '../profile1.png'
import profile2 from '../profile.png'
import {FullPage,Slide} from 'react-full-page'
import Carousel from 'react-spring-3d-carousel'
import ohJeju from '../slideImg/ohJeju.png'
import umMarket from '../slideImg/umMarket.png'
import { config,useSpring,animated,useTransition } from 'react-spring';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';


const appearAni = keyframes`
    from{
        opacity: 0;
    }to{
        opacity: 1;
    }
`
const BoxOne = styled.div`
    height:100vh;
    overflow: hidden;
    padding-top: 7%;
    padding-left:2%;
`
const BoxTwo = styled.div`
    height: 100%;
    padding:10%;
`
const ProfileBox = styled.div`
/* 프로필 이미지 박스 */
position: relative;
    left:60%;
    top:5%;
    width:700px;
    height:700px;
    background-color: rgba(121,127,127,0.05);
    border-radius: 100%;
`
const Profile = styled.div`
/* 프로필이미지 */
    position: absolute;
    width:700px;
    height:700px;
    border-radius:100%;
    background-image: url(${profile});
    background-size: cover;
    z-index:50;
`
const Profile2 = styled.div`
/* 프로필이미지 */
    position: absolute;
    width:700px;
    height:700px;
    border-radius:100%;
    background-image: url(${profile2});
    background-size: cover;
    z-index:50;
`
const ProfileContent = styled.div`
/* 글씨부분 */
    position: absolute;
    margin-top: 15%;    
    margin-left: 25%;
    z-index:100;
    font-size:5em;
    text-align: center;
    transform: scaleX(1.3);
`
const First = styled.div`
    font-size:2.4em;
    font-weight: 600;
    letter-spacing: 0.02em;
`
const Second = styled.div`
    text-align: center;
    letter-spacing: 0.63em;
    padding-left:2%;
    font-weight: 600;
    opacity: 0.9;
`
const Third = styled.div`
    margin-top:5%;
    letter-spacing: 0.015em;
    font-size:0.9em;
    font-weight: 100;
    opacity: 0.4;
`
const ProfileContent2 = styled.p`
    font-size:3em;
    position: absolute;
    margin-top: 3%;    
    margin-left: 27%;
    padding-left:1%;
    ${Third}{
        padding-left: 1%;
    }
    ${Second}{
        margin-top: 5%;
        padding-left:0.1em;
        letter-spacing: 0.2em;
    }
`
const BoxThree = styled.div`
    height:100%;
    display:flex;
`
const SmallTitle = styled.div`
    font-size:5em;
    position: relative;
    flex:1;
    letter-spacing: 0.15em;
    text-align: center;
    height:100%;
    font-weight:900;
    padding-top:22%;
    padding-bottom:25%;
    background-color: rgba(50,50,50,1);
    z-index:200;
`
const CarouselBox = styled.div`
    flex:3;
    width:100%;
    height:100%;
    padding:0% 12%;
`
const BoxFour = styled(BoxThree)`
    justify-content: center;
    align-items: center;
    font-size:7em;
    font-weight: 900;
    letter-spacing: 0.2em;
    flex-direction: column;
    text-align: center;
    div{
        margin-top: 3%;
        &:nth-child(1){
            font-size:1em;
            opacity: 0.5;
        }
        &:nth-child(2){
            font-size:1.5em;
            opacity: 0.7;
        }
        &:nth-child(3){
            font-size:2em;
        }
    }
`
const Test = styled.div`
    animation: 1s linear 1s ${appearAni};
`
// position을 static이 이 아닌 다른걸주면 수도셀렉터가 안먹는다;; 왜그러지? (&:hover등)
const Home = () => {
    const [imgSlide,setImgSlide] = useState(0)
    const [sideAni,setSideAni] = useState(true)
    const [loading,setLoading] = useState(true)
    const imgAni = useSpring({
        to:{x:0},
        from:{x:-500},
        loop:false,
        pause:sideAni,
    })
    const lastAni = useSpring({
        from:{opacity:0},
        to:{opacity:1},
        loop:true
    })

    const slides = [
        {
          key: 1,
          content: <img src={ohJeju} alt="1" />
        },
        {
          key: 2,
          content: <img src={umMarket} alt="2" />
        },
        {
            key: 3,
            content: <img src="https://picsum.photos/800/600/?random" alt="3" />
          }
      ].map((slide,index) => {return {...slide,onClick:()=>setImgSlide(index)}})
      
      function scrollFun(obj){
          if(obj.from === 0 && obj.to === 0){
              setSideAni(false)
          }
          if(obj.from ===1 && obj.to === 2){
              setSideAni(false)
          }else{
              setSideAni(true)
          }
      }
      useEffect(()=>{
          setTimeout(()=>setLoading(false),1000)
      },[])
    return (
                <FullPage afterChange={(e)=>scrollFun(e)}>
                    <Slide as={Test}>
                        <Test>
                                {
                                    loading
                                    ?
                                    'Loading..'
                                    :
                                    <>
                                    <Nav/>
                                <BoxOne>
                                    <ProfileContent>
                                        <First>FAITHFUL</First>
                                        <Second>DEVELOPER</Second>
                                        <Third>KEEP ON GETTING BETTER</Third>
                                    </ProfileContent>
                                    <ProfileBox>
                                        <Profile></Profile>
                                    </ProfileBox>
                                </BoxOne>
                                    </>
                                }
                        </Test>
                    </Slide>
                    <Slide>
                        <BoxTwo>
                            <Profile2 />
                            <ProfileContent2>
                                <Third>6년의 유리가공 경력</Third>
                                <First>그 누구보다 뜨거웠고</First>
                                <First>많은 땀을 흘렸습니다.</First>
                                <Second>그래서 누구보다 가장 뜨겁게, 땀흘리며 일합니다.</Second>
                            </ProfileContent2>
                        </BoxTwo>
                    </Slide>
                    <Slide>
                        <BoxThree>
                            <SmallTitle as={animated.div} style={imgAni}>Side ProJect</SmallTitle>
                            <CarouselBox>
                                <Carousel 
                                slides={slides}
                                goToSlide={imgSlide}
                                offsetRadius={1}
                                showNavigation={false}
                                animationConfig={config.slow}
                                />
                            </CarouselBox>
                        </BoxThree>
                        {/* 포폴 이미지슬라이드 밑에 show Project 하고 */}
                    </Slide>
                    <Slide>
                        <BoxFour as={animated.div} style={lastAni}>
                            <div>I'M</div>
                            <div>STILL</div>
                            <div>MOVING FOWORD</div>
                        </BoxFour>
                    </Slide>
                </FullPage>
            // <Container>
            //     <Nav />
            // </Container>
    );
};

export default Home;