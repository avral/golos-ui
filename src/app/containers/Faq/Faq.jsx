import React, { Component } from 'react';
import styled from 'styled-components';
import Header from '../../components/faq/Header';
import QuestionsList from '../../components/faq/QuestionsList';
import Channels from '../../components/faq/Channels';
import Footer from '../../components/faq/Footer';

const Wrapper = styled.div`
    background-color: #ffffff;
`;

export default class Faq extends Component {
    constructor() {
        super();
        this.questions = require('./questions.json');
        this.channels = require('./channels.json');
    }

    render() {
        return (
            <Wrapper>
                <Header />
                <QuestionsList questions={this.questions} />
                <Channels channels={this.channels} />
                <Footer />
            </Wrapper>
        );
    }
}
