import React, {Component} from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Header from '../../components/faq/Header';
import Questions from '../../components/faq/Questions';
import Channels from '../../components/faq/Channels';
import Footer from '../../components/faq/Footer';

const Wrapper = styled.div`
    min-height: 50px;
    background-color: #ffffff;
`;

export default class Faq extends Component {

    render() {
        return (
            <Wrapper>
                <Container align="center" wrap="wrap">
                    <Header/>
                    <Questions/>
                    <Channels/>
                    <Footer/>
                </Container>
            </Wrapper>
        );
    }
}
