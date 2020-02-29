import React from 'react'
import ChannelStats from './ChannelStats'
import VideoStats from './VideoStats'
import TimeStats from './TimeStats'

export default function StatsPage(props) {
    console.log(props.statType)
    return (
        <div>
            <div className="tab-div">
                <input id="tab-channels" className="tabs" onChange={props.changeStat} type="radio" 
                name="stat-type" value="channels" checked={props.statType === 'channels'}></input>
                <label for="tab-channels">Channels</label>

                <input id="tab-videos" className="tabs" onChange={props.changeStat} type="radio"
                 name="stat-type" value="videos" checked={props.statType === 'videos'}></input>
                <label for="tab-videos">Videos</label>

                <input id="tab-times" className="tabs" onChange={props.changeStat} type="radio" 
                name="stat-type" value="times" checked={props.statType === 'times'}></input>
                <label for="tab-times">Times</label>
            </div>
            { 
            (props.statType === "channels" && <ChannelStats data={props.data}/>) ||
            (props.statType === "videos" && <VideoStats data={props.data}/>) ||
            (props.statType === "times" && <TimeStats data={props.data}/>)
            }
        </div>
    )
}
