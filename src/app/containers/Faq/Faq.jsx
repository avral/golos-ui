import React, {Component} from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Header from '../../components/faq/Header';
import QuestionsList from '../../components/faq/QuestionsList';
import Channels from '../../components/faq/Channels';
import Footer from '../../components/faq/Footer';

const Wrapper = styled.div`
    min-height: 50px;
    background-color: #ffffff;
`;

const FaqContainer = Container.extend`
    @media (max-width: 1200px) {
        margin: 0;
    }
`;

const QUESTIONS_LIST = [
    {
        title: 'Почему я должен кому-то отправлять СМС при регистрации? А вдруг у меня украдут деньги с баланса?',
        answer: 'Верификация по номеру телефона нужна исключительно для предотвращения автоматических ' +
            'спам-регистраций. Мы не взимаем плату за СМС, сообщение тарифицируется вашим мобильным оператором.'
    }
];

export default class Faq extends Component {

    render() {
        return (
            <Wrapper>
                <FaqContainer column>
                    <Header/>
                    <QuestionsList questions={QUESTIONS_LIST}/>
                    <Channels/>
                    <Footer/>
                </FaqContainer>
            </Wrapper>
        );
    }
}
