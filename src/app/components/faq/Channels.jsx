import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ChannelsCard from '../common/ChannelsCard';
import Flex from '../Flex/Flex';

const dataArr = [{inscription: 'основной сайт', thumbnail: '/images/officialChannels/ic_monitor.png', width: 34, height: 31},
                 {inscription: 'канал техподдержки', thumbnail: '/images/officialChannels/ic_support_ru.png', width: 30, height: 33},
                 {inscription: 'Новости и анонсы Golos.io', thumbnail: '/images/officialChannels/ic_newspaper.png', width: 26, height: 26},
                 {inscription: 'Основной сайт', thumbnail: '/images/officialChannels/ic_facebook_normal.png', width: 14, height: 30},
                 {inscription: 'github', thumbnail: '/images/officialChannels/ic_newspaper.png', width: 32, height: 31},
                 {inscription: 'Официальное зеркало', thumbnail: '/images/officialChannels/ic_mirror.png', width: 29, height: 30},
                 {inscription: 'ENG support channel', thumbnail: '/images/officialChannels/ic_support_eng.png', width: 30, height: 31},
                 {inscription: 'Лучшее на Golos.io', thumbnail: '/images/officialChannels/ic_like.png', width: 28, height: 28},
                 {inscription: 'Вконтакте', thumbnail: '/images/officialChannels/ic_vk_normal.png', width: 30, height: 20},
                 {inscription: 'контакты для СМИ: pr@golos.io', thumbnail: '/images/officialChannels/ic_envelope.png', width: 28, height: 19}];

const ChannelsCards = styled.div`
    background-color: #f8f8f8; 
    width: 100%;
    padding: 60px 64px;
`;

const Title = styled.p`
    color: #2d2d2d;
    font-family: "SF Pro Display", "Roboto", sans-serif;	
    font-size: 34px;	
    font-weight: bold;	
    letter-spacing: 0.37px;	
    line-height: 41px;
    margin-bottom: 40px;
`;

const CardsWrapper = Flex.extend`
    margin: -10px;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

export default class Channels extends PureComponent {

    renderCard() {
        return dataArr.map(card => {
            return <ChannelsCard inscription={card.inscription}
                                 thumbnail={card.thumbnail}
                                 width={card.width}
                                 height={card.height}/>
        });
    }

    render() {
        return (
            <ChannelsCards>
                <Title>
                    Официальные каналы
                </Title>
                <CardsWrapper justify="space-between">
                    {this.renderCard()}
                </CardsWrapper>
            </ChannelsCards>
        );
    }
}
