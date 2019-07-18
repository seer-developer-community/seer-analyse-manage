import axios from 'axios'

export const indexInfo = params => {
    var param = new URLSearchParams()
    return axios({
        method: 'post',
        data: param,
        url: '/apis/index/info'
    })
}

export const userConfig = params => {
    var param = new URLSearchParams()
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/config/select'
    })
}

export const updateConfig = params => {
    var param = new URLSearchParams()
    param.append('faucetAccounts', params.faucet)
    param.append('gateways', params.gateways)
    param.append('assets', params.assets)
    param.append('houses', params.houses)
    param.append('seerBots', params.seerBots)
    param.append('defaultAsset', params.defaultAsset)
    param.append('defaultOwner', params.defaultOwner)
    param.append('whiteAccounts', params.whiteAccounts)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/config/update'
    })
}

export const getSync = params => {
    var param = new URLSearchParams()
    return axios({
        method: 'post',
        data: param,
        url: '/apis/index/sync'
    })
}

export const dailyUser = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    param.append('grepBot', params.grepBot)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/account/page'
    })
}

export const exportDailyUser = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('grepBot', params.grepBot)
    param.append('asset', params.asset)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/account/downExcel',
        responseType: 'blob'
    })
}

export const dailyRoom = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('room', params.room)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/room/page'
    })
}

export const exportDailyRoom = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('room', params.room)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/room/downExcel',
        responseType: 'blob'
    })
}

export const totalRoom = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('room', params.room)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/total/room/page'
    })
}

export const block = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('block', params.block)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/block/page'
    })
}

export const updateSync = params => {
    var param = new URLSearchParams()
    param.append('saveBlock', params.saveBlock)
    param.append('saveTx', params.saveTx)
    param.append('syncStatus', params.syncStatus)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/index/update/sync'
    })
}

export const blockTx = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('block', params.block)
    param.append('tx', params.tx)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/block/tx/page'
    })
}

export const authPage = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/account/auth/page'
    })
}

export const basePage = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/account/base/page'
    })
}

export const registerPage = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/account/register/page'
    })
}

export const houseTotalPage = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/account/house/total/page'
    })
}

export const houseTypePage = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('issuer', params.issuer)
    param.append('name', params.name)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/account/house/type/page'
    })
}

export const dailyFaucet = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/faucet/page'
    })
}

export const userTx = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/userTx/page'
    })
}

export const dailyProfit = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/dailyProfit/page'
    })
}

export const dailyHouses = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    param.append('house', params.house)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/house/page'
    })
}

export const houseRoom = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    param.append('house', params.house)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/houseRoom/page'
    })
}

export const typeRoom = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/typeRoom/page'
    })
}

export const exportTypeRoom = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/typeRoom/downExcel',
        responseType: 'blob'
    })
}

export const exportHouseRoom = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    param.append('house', params.house)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/houseRoom/downExcel',
        responseType: 'blob'
    })
}

export const dailyTotal = params => {
    var param = new URLSearchParams()
    param.append('current', params.current)
    param.append('size', params.size)
    param.append('asset', params.asset)
    if (params.times !== "") {
        param.append('beginTime', params.times[0])
        param.append('endTime', params.times[1])
    } else {
        param.append('beginTime', "")
        param.append('endTime', "")
    }
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/total/page'
    })
}

export const exportDailyFaucet = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/faucet/downExcel',
        responseType: 'blob'
    })
}

export const exportUserTx = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/userTx/downExcel',
        responseType: 'blob'
    })
}

export const exportDailyProfit = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/dailyProfit/downExcel',
        responseType: 'blob'
    })
}

export const exportDailyHouses = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    param.append('house', params.house)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/house/downExcel',
        responseType: 'blob'
    })
}

export const exportDailyData = params => {
    var param = new URLSearchParams()
    param.append('beginTime', params.beginTime)
    param.append('endTime', params.endTime)
    param.append('asset', params.asset)
    return axios({
        method: 'post',
        data: param,
        url: '/apis/seer/daily/data/total/downExcel',
        responseType: 'blob'
    })
}