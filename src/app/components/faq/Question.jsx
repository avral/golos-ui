import React, {PureComponent} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 15px 45px 15px 20px;
    border-radius: 6px;	
    background-color: #FFFFFF;	
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5), 0 2px 12px 0 rgba(0,0,0,0.06);
`;

const Title =  styled.div`
    color: #212121;	
    font-family: "SF Pro Display";	
    font-size: 20px;	
    font-weight: bold;	
    line-height: 34px;
`;

const Answer = styled.div`
    height: ${props => props.showAnswer ? 'auto' : '0'};
    margin: ${props => props.showAnswer ? '11px 0 5px' : '0'};
    color: #959595;	
    font-family: "SF Pro Text";	
    font-size: 16px;	
    letter-spacing: -0.26px;	
    line-height: 24px;
    overflow: hidden;
`;

const Switcher = styled.div`
    position: absolute;
    width: 12px;
    height: 7px;
    top: 34px;
    right: 20px;
    cursor: pointer;
    background: url('/images/new/faq/${props => props.showAnswer ? 'chevron-up.png' : 'chevron-down.png'}') no-repeat center;
`;

export default class Question extends PureComponent {
    static propTypes = {
        question: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            showAnswer: true
        };
        this.changeAnswerState = this.changeAnswerState.bind(this);
    }

    changeAnswerState() {
        this.setState({
            showAnswer: !this.state.showAnswer
        })
    }

    render() {
        const {question} = this.props;
        const {showAnswer} = this.state;
        return (
            <Wrapper>
                <Switcher showAnswer={showAnswer} onClick={this.changeAnswerState}/>
                <Title>{question.title}</Title>
                <Answer showAnswer={showAnswer}>{question.answer}</Answer>
            </Wrapper>
        );
    }
}
