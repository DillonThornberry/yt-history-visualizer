const readFile = (file, callback) => {
    var reader = new FileReader();
    reader.onload = () => {
        const result = JSON.parse(reader.result);
        callback(result)
    };
    return reader.readAsText(file);
}

const filterData = (data) => {
    var valid = [...(data.filter(item => item.subtitles))]
    valid.forEach(video => {
        const titleWords = video.title.split(' ')
        if (titleWords[0] === 'Watched'){
            video.title = titleWords.slice(1).join(' ')
        }
    })
    return valid
}

const daysToMs = days => days * 24 * 3600 * 1000

const daysAgo = totalDays => new Date((new Date()) - daysToMs(totalDays))

const getTimePeriod = (data, oldest, newest=0) => {
    const oldestDate = daysAgo(oldest)
    const newestDate = daysAgo(newest)

    const endPoint = data.findIndex(video => Date.parse(video.time) < oldestDate)
    const startPoint = data.findIndex(video => Date.parse(video.time) < newestDate)

    return data.slice(startPoint, endPoint)
}

const getBiggestTrends = (data, param = x => x) => {
    const lastMonthsData = getTimePeriod(data, 60, 30)
    const thisMonthsData = getTimePeriod(data, 30)
    const lastMonthsViewCounts = countByViews(lastMonthsData, param)
    const thisMonthsViewCounts = countByViews(thisMonthsData, param)
    
    const allKeys = [...(new Set(Object.keys(lastMonthsViewCounts).concat(Object.keys(thisMonthsViewCounts))))]

    var trendMap = {}
    for (var key of allKeys){
        trendMap[key] = (thisMonthsViewCounts[key] || 0) - (lastMonthsViewCounts[key] || 0)
    }
    return sortByViewCount(trendMap)

}

const countByViews = (data, getDesiredParam) => {
    let countMap = {}
    for (var video of data){
        const desired = getDesiredParam(video)
        if (countMap[desired]) {
            countMap[desired]++
        } else {
            countMap[desired] = 1
        }
    }
    return countMap
}

const sortByViewCount = countMap => {
    return Object.keys(countMap)
    .sort((key1, key2) => countMap[key1] > countMap[key2] ? -1 : 1).map(key => {
        let output = {}
        output.name = key
        output.count = countMap[key]
        return output
    })
}

const channelsByViewCount = (data) => {
    console.log(channelsByTrend(data))
    const channelViewCounts = countByViews(data, video => video.subtitles[0].name)
    return sortByViewCount(channelViewCounts)
}

const channelsByTrend = data => {
    return getBiggestTrends(data, video => video.subtitles[0].name)
}

const videosByViewCount = data => {
    const videoViewCounts = countByViews(data, video => video.title)
    return sortByViewCount(videoViewCounts)
}

const getKeyWords = data => {
    const keyWords = []
    data.forEach(video => {
        const words = video.title.split(' ').map(word => word.toLowerCase()).filter(word => 
            /[a-z]/gi.test(word) && !shitWords.includes(word))

        keyWords.push(...words)
    })
    return keyWords
}

const topKeyWords = data => {
    return (sortByViewCount(countByViews(getKeyWords(data), (video) => video)))
}

const trendingKeyWords = data => {
    return getBiggestTrends(getKeyWords(data))
}

const shitWords = ['a', 'of', 'the', 'watched', 'to', 'in', 'on', 'with', 'and', 'how', 'for', 'is', 'at',
     'i', 'you', 'my', 'what', 'by', 'from', 'this', 'out', 'up', 'his', 'your', 'an', 'it', 'be', 'as', 'not',
     'me', 'are', 'w/', 'no']

module.exports = {
    readFile,
    filterData,
    channelsByViewCount,
    channelsByTrend,
    videosByViewCount,
    topKeyWords,
    trendingKeyWords,
}