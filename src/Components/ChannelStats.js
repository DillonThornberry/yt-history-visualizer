import React from 'react'
import utils from '../utils'
import List from './List'

export default function ChannelStats(props) {
    const channelsByViewCount = utils.channelsByViewCount(props.data) 
    const channelsByTrend = utils.channelsByTrend(props.data)
    return (
        <div id="channel-stats">
            <List data={channelsByViewCount} title="Most Watched Channels" />
            <List data={channelsByTrend} title="Up Since Last Month" />
            <List data={[...channelsByTrend].reverse()} title="Down Since Last Month" />      
        </div>
    )
}
