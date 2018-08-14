import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Button from '../golos-ui/Button/Button';
import Icon from '../golos-ui/Icon';

const Wrapper = styled.div`
    padding: 60px;
    background: url('/images/new/faq/header-beck.png') no-repeat right #f9f9f9;
`;

const Title = styled.h1`
    max-width: 600px;
	color: #393636;
	font-family: "SF Pro Display";
	font-size: 34px;
	font-weight: 900;
	letter-spacing: 0.37px;
	line-height: 41px;
`;

const Description = styled.div`
    max-width: 600px;
    margin: 12px 0 37px;
    color: #959595;	
    font-family: "SF Pro Text";	
    font-size: 16px;	
    letter-spacing: -0.26px;	
    line-height: 24px;
`;

const ButtonsBlock = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const BlueButton = Button.extend`
    width: 138px;
    color: #FFFFFF;	
    font-family: "SF Pro Text";	
    font-size: 12px;	
    font-weight: bold;	
    line-height: 18px;	
    text-shadow: 0 2px 4px 0 rgba(0,0,0,0.5), 0 2px 12px 0 rgba(0,0,0,0.15);
    letter-spacing: 1px;
`;

const WhiteButton = Button.extend`
    width: 138px;
    margin-left: 15px;
    background: none;
    border: 1px solid rgba(149, 149, 149, 0.3);
    
    color: #393636;	
    font-family: Roboto;	
    font-size: 12px;	
    font-weight: bold;	
    letter-spacing: 1.2px;	
    line-height: 23px;	
    text-align: center;
    
    &:hover {
        background-color: #fff;
    }
`;

export default class Header extends PureComponent {

    render() {

        return (
            <Wrapper>
                <Title>Часто задаваемые вопросы</Title>
                <Description>На этой странице собраны самые популярные вопросы пользователей, обращавшихся в
                    техподдержку Golos.io
                </Description>
                <ButtonsBlock>
                    <BlueButton>
                        <Icon name="telegram" size="16px"/>Телеграмм
                    </BlueButton>
                    <WhiteButton color="white">
                        <Icon name="envelope" size="16px"/>Почта
                    </WhiteButton>
                </ButtonsBlock>
            </Wrapper>
        );
    }
}
