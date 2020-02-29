import React from 'react'

export default class List extends React.Component {
    constructor(props){
        super(props)
        this.pageSize = 50
        this.state = {
            currentPage: 1,
        }
    }
    
    makeListItem = (item, i) => {
        return (
            <p className="list-item" key={i}>{i+1}. {item.name}: {item.count}</p>
        )
    }

    loadNextPage = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
        })
    }

    render() {
        const page = this.props.data.slice(0, this.state.currentPage * this.pageSize)
        return (
            <div className="list">
                <h1>{this.props.title}</h1>
                { page.map((item, i) => this.makeListItem(item, i)) }
                { page.length < this.props.data.length &&
                <button className="load-more-button" onClick={ this.loadNextPage }>load more</button> }
            </div>
        )
    }
}
