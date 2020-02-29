import React, { Component } from 'react'
import utils from '../utils'
import Nav from './Nav'
import StatsPage from './StatsPage'
import Tutorial from './Tutorial'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      historyJson : null,
      statType: 'channels',
    }

    this.dillonWatchHistory = utils.filterData(require('../dillon-watch-history.json'))

  }
  
    checkFile = (target) => {
        const file = target.files[0]

        if (file.type !== 'application/json'){
            target.value = null
            return alert('Incorrect File Type')
        }

        return utils.readFile(file, result => {
            if (!Array.isArray(result) || utils.filterData(result).length === 0){
                target.value = null
                alert('contains no YouTube history')
            } else {
                this.setHistoryJson(utils.filterData(result))
            }
        })
    }

    setHistoryJson = json => {
        this.setState({ historyJson : json })
    }

    setStatType = (e) => {
        this.setState({
            statType: e.currentTarget.value
        })
    }

  render() {
    return (
      <div id="main">
        <Nav onUpload={e => this.checkFile(e.target)}/>

        { !this.state.historyJson ? 
            <Tutorial creepHistory={() => this.setHistoryJson(this.dillonWatchHistory)} /> :
            <StatsPage data={this.state.historyJson} statType={this.state.statType} changeStat={this.setStatType}/>
        }
      </div>
    )
  }
}