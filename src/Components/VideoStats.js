import React from 'react'
import utils from '../utils'
import List from './List'

export default function VideoStats(props) {
    const videoViewCounts = utils.videosByViewCount(props.data)
    const keyWords = utils.topKeyWords(props.data)
    const trendingWords = utils.trendingKeyWords(props.data)

    return (
        <div id="video-stats">
            <List data={videoViewCounts} title="Most Watched Videos"></List>
            <List data={keyWords} title="Most Common Keywords"></List>
            <List data={trendingWords} title="Up this Month" />
        </div>
    )
}
