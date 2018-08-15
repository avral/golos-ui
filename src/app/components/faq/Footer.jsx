import React, {PureComponent} from 'react';
import Flex from '../Flex/Flex';
import styled from 'styled-components';

const Text = styled.p`
    color: #393636;	
    font-family: "SF Pro Text", "Roboto", sans-serif;	
    font-size: 16px;	
    font-weight: 500;	
    letter-spacing: -0.26px;	
    line-height: 24px;
`;

const Img = styled.div`
    background: url('/images/faq-footer.png') center no-repeat;
    background-size: cover;
`;

export default class Footer extends PureComponent {

    render() {
        return (
            <Flex justify="space-between"
                  align="center"
                  wrap="wrap">
                <Text>
                    Мы НИКОГДА не попросим ваши приватные ключи или деньги. Если кто-то представляется членами команды
                    Golos.io и просит такую информацию, напишите нам на почту pr@golos.io.
                </Text>
            </Flex>
        );
    }
}
