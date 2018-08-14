import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 214px;
    height: 80px;
    padding: 25px 20px; 
    border-radius: 8.53px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    margin: 10px
`;

const Text = styled.p`
    text-transform: uppercase;
    color: #393636;
    margin: 0 0 0 22px;
    font-size: 12px;
    font-family: "SF Pro Text", "Roboto", sans-serif;
    letter-spacing: 0.37px;
    line-height: 18px;
    font-weight: bold;
`;

const Icon = styled.div`
    min-width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: url('${props => props.thumbnail}') center no-repeat;
    background-size: cover;
`;

export default class ChannelsCard extends Component {

    render() {
        const {inscription, thumbnail, width, height} = this.props;
        return (
            <Card>
                <Icon thumbnail={thumbnail} width={width} height={height}/>
                <Text>
                    {inscription}
                </Text>
            </Card>
        )
    }
}
