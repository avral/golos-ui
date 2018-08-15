import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from '../Flex/Flex';
import ChannelsCard from './ChannelsCard';

const dataArr = [
    {
        inscription: 'основной сайт',
        thumbnail: 'ic_monitor',
        link: '/',
        width: 34,
        height: 31,
    },
    {
        inscription: 'канал техподдержки',
        thumbnail: 'ic_support_ru',
        link: 'https://t.me/golos_support',
        width: 30,
        height: 33,
    },
    {
        inscription: 'Новости и анонсы Golos.io',
        thumbnail: 'ic_newspaper',
        link: '/@golosio',
        width: 26,
        height: 26,
    },
    {
        inscription: 'Основной сайт',
        thumbnail: 'ic_facebook',
        link: 'https://www.facebook.com/www.golos.io/\n',
        width: 14,
        height: 30,
    },
    {
        inscription: 'github',
        thumbnail: 'ic_github',
        link: 'https://github.com/GolosChain/tolstoy',
        width: 32,
        height: 31,
    },
    {
        inscription: 'Официальное зеркало',
        thumbnail: 'ic_mirror',
        link: 'https://www.golos.blog',
        width: 30,
        height: 30,
    },
    {
        inscription: 'ENG support channel',
        thumbnail: 'ic_support_eng',
        link: 'https://t.me/golos_eng',
        width: 30,
        height: 31,
    },
    {
        inscription: 'Лучшее на Golos.io',
        thumbnail: 'ic_like',
        link: 'https://t.me/golos_best',
        width: 28,
        height: 28,
    },
    {
        inscription: 'Вконтакте',
        thumbnail: 'ic_vk',
        link: 'ic_vk',
        width: 30,
        height: 20,
    },
    {
        inscription: 'контакты для СМИ: pr@golos.io',
        thumbnail: 'ic_mail',
        link: '/',
        width: 28,
        height: 19,
    },
];

const ChannelsList = styled.div`
    background-color: #f8f8f8;
    width: 100%;
    padding: 60px 24px;
`;

const Title = styled.p`
    color: #2d2d2d;
    font-family: 'Open Sans', sans-serif;
    font-size: 34px;
    font-weight: bold;
    letter-spacing: 0.37px;
    line-height: 41px;
    margin-bottom: 40px;
`;

const CardsWrapper = Flex.extend.attrs({
    wrap: 'wrap',
    justify: 'flex-start',
})`
    margin: -10px;
`;

export default class Channels extends PureComponent {
    render() {
        return (
            <ChannelsList>
                <Title>Официальные каналы</Title>
                <CardsWrapper justify="space-between">
                    {dataArr.map((card, index) => (
                        <ChannelsCard key={index} card={card} />
                    ))}
                </CardsWrapper>
            </ChannelsList>
        );
    }
}
