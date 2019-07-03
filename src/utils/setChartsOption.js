import { cloneDeeps, sortBys, reverses, groupBys } from '@/utils/lib'
import coords from '@/utils/coord'
/**
 * 生成折线图option
 * @param {array} data 折线图数据
 * ex： [
 *          { name: '通联人数', data: [10, 2, 4, 3, 6, 4, 8, 1, 3, 4, 5, 9, 4, 1, 4] },
 *          { name: '通联次数', data: [5, 6, 2, 9, 4, 5, 7, 1, 0, 5 ,3, 3, 7, 1, 8] }
 *      ]
 * @param {String} type 折线图横轴坐标，默认15天，hour为一小时，day为一天，week为7天
 **/
export const getLineOption = (data, type = 'halfMonth') => {
    let color = 'rgba(255,255,255,0.50)'
    let itemColor = ['#88CA80', '#EC7B8D']
    let { time } = data[0]
    let xData = []
    if (time) {
        xData = cloneDeeps(time)
    }
    switch (type) {
        case 'hour':
            if (!time) {
                for (let i = 0; i <= 60; i += 10) {
                    xData.push(i)
                }
            }
            break
        case 'day':
            if (!time) {
                for (let i = 0; i < 24; i++) {
                    xData.push(i)
                }
            }
            break
        case 'week':
            if (!time) {
                for (let i = 1; i < 8; i++) {
                    let data = new Date(
                        new Date().getTime() - i * 24 * 60 * 60 * 1000
                    )
                    let month = data.getMonth() + 1
                    let day = data.getDate()
                    xData.unshift(month + '/' + day)
                }
            }
            break
        default:
            if (!time) {
                for (let i = 1; i < 16; i++) {
                    let data = new Date(
                        new Date().getTime() - i * 24 * 60 * 60 * 1000
                    )
                    let month = data.getMonth() + 1
                    let day = data.getDate()
                    xData.unshift(month + '/' + day)
                }
            }
            break
    }
    let series = []
    if (data) {
        data.forEach((item, index) => {
            if (item.color) {
                itemColor[index] = item.color
            }
            series.push({
                name: item.name,
                type: 'line',
                showSymbol: false,
                data: item.data
            })
        })
    }
    let option = {
        title: {
            show: false
        },
        color: itemColor,
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '2%',
            right: 16,
            bottom: '8%',
            top: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    // type: 'dashed',
                    color: color
                }
            },
            axisLine: {
                lineStyle: {
                    color: color
                }
            },
            axisLabel: {
                interval: 0,
                show: true,
                textStyle: {
                    color: color
                }
            },
            data: xData
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    // type: 'dashed',
                    color: color
                }
            },
            axisLine: {
                lineStyle: {
                    color: color
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                show: true,
                textStyle: {
                    color: color
                }
            }
        },
        series: series
    }
    return option
}

/**
 * 生成饼图option
 * @param {array} data 饼图
 * ex： [
 *          { name: '在网人员', value: 589 },
            { name: '近三日消失人员', value: 680 },
 *      ]
 * @param {Object} obj 饼图宽高
 * @param {array} colors 饼图颜色，默认['#1BDAC0', '#25ADE5', '#0666D5', '#8FDDFF']
 **/
export const getPieOption = (data, obj, colors) => {
    let { height, width, center } = obj
    // 设置饼图中心点
    let centerPoint = center && center.length > 0 ? center : ['50%', '50%']
    // 颜色
    // let color = ['#1BDAC0', '#25ADE5', '#0666D5', '#8FDDFF'];
    let color = [
        '#49C2D1',
        '#49A0DB',
        '#7884D6',
        '#D790E0',
        '#CCCE8F',
        '#90CE8F'
    ]
    let bool = colors && colors.length
    let resultColor = bool ? colors : color
    let n = 0
    // title数字
    let textData = 0
    // 图例和series
    let legendData = []
    let seriesData = []
    data.map((item, index) => {
        textData += item.value
        if (index !== 0 && index % resultColor.length === 0) {
            n = 0
        }
        legendData.push(item.name)
        seriesData.push({
            name: item.name,
            value: item.value,
            itemStyle: {
                normal: {
                    color: resultColor[n]
                },
                emphasis: {
                    color: resultColor[n]
                }
            }
        })
        n++
    })
    // 给title文字位置定位
    let length = String(textData).length
    let leftX =
        (Number(centerPoint[0].substring(0, centerPoint.length)) * width) / 100
    let topX =
        (Number(centerPoint[1].substring(0, centerPoint.length)) * height) / 100
    let textLeftPotion = leftX - (length - 1) * 5 - 11
    let textTopPotion = topX - 12
    // SERIES赋值
    let option = {
        title: {
            text: textData,
            left: textLeftPotion,
            top: textTopPotion,
            textStyle: {
                color: '#0ff',
                fontSize: 22,
                align: 'center',
                fontFamily: 'lcdd'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} ({d}%)',
            textStyle: {
                fontSize: 12
            }
        },
        legend: {
            selectedMode: true,
            orient: 'vertical',
            x: 'left',
            itemWidth: 14,
            itemHeight: 8,
            align: 'left',
            icon: 'roundRect',
            data: legendData,
            textStyle: {
                fontSize: 12,
                color: '#eee'
            }
        },
        grid: {
            left: '12%',
            top: '40',
            right: '2%',
            bottom: '14%'
        },
        series: [
            {
                type: 'pie',
                clockWise: false,
                radius: ['84%', '88%'],
                center: centerPoint,
                hoverAnimation: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    emphasis: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                tooltip: {
                    show: false
                },
                data: [
                    {
                        value: 1
                    }
                ]
            },
            {
                type: 'pie',
                hoverAnimation: false,
                radius: ['56%', '80%'],
                center: centerPoint,
                label: {
                    normal: {
                        show: false
                    }
                },
                data: seriesData
            },
            {
                type: 'pie',
                clockWise: false,
                radius: ['47%', '52%'],
                center: centerPoint,
                hoverAnimation: false,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    emphasis: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                tooltip: {
                    show: false
                },
                data: [
                    {
                        value: 1
                    }
                ]
            }
        ]
    }
    return option
}

/**
 * 生成市级地图option
 * @param {array} data 地图数据
 * @param {String} name 地图名称
 **/
export const getMapOption = (data, name) => {
    let cityMap = {
        湖南省: 'hunan',
        长沙市: 'changsha',
        株洲市: 'zhuzhou',
        常德市: 'changde',
        郴州市: 'chenzhou',
        衡阳市: 'hengyang',
        怀化市: 'huaihua',
        娄底市: 'loudi',
        邵阳市: 'shaoyang',
        湘潭市: 'xiangtan',
        益阳市: 'yiyang',
        永州市: 'yongzhou',
        岳阳市: 'yueyang',
        张家界市: 'zhangjiajie',
        湘西土家族苗族自治州: 'xiangxi'
    }
    let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        title: {
            text: name,
            left: 20,
            top: 20,
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.data) {
                    let { name, total, msisdn } = params.data
                    if (total) {
                        return `<div style="font-size: 0.42vw;padding: 0.2vw 0.4vw;">区县名称: ${name}</br>人员数量: ${total}人</div>`
                    }
                    return `<div style="font-size: 0.42vw;padding: 0.2vw 0.4vw;">姓名: ${name}</br>手机号码: ${msisdn}</div>`
                }
            }
        },
        legend: {
            show: false
        },
        geo: {
            map: cityMap[name],
            zoom: 1.2,
            label: {
                emphasis: {
                    show: true,
                    color: '#fff'
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(60,232,250,0.50)',
                    borderColor: 'rgba(0,0,0,0.50)',
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: 'rgba(60,232,250,0.70)' // 地图区域划过时的颜色
                }
            }
        },
        series: [
            {
                name: 'point',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: data,
                symbolSize: 15,
                label: {
                    normal: {
                        formatter: function(params) {
                            return params.data.total || params.data.index
                        },
                        position: 'inside',
                        show: true,
                        color: '#fff',
                        fontSize: 12
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(218,65,111, 1)'
                    }
                }
            },
            {
                name: '',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: name === '湖南省' ? data : [],
                symbolSize: 20,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: function(params) {
                            return params.data.total || params.data.index
                        },
                        position: 'inside',
                        show: true,
                        color: '#fff',
                        fontSize: 12
                    }
                },
                itemStyle: {
                    normal: {
                        // color: 'rgba(255,255,255,0.50)',
                        color: 'rgba(218,65,111, 0.7)',
                        shadowBlur: 10,
                        // shadowColor: 'rgba(255,255,255,0.30)'
                        shadowColor: 'rgba(218,65,111,0.5)'
                    }
                },
                zlevel: 1
            }
        ]
        // grid:{
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 0
        // }
    }
    return option
}
/**
 * 生成饼图（移动上网态势分析）option
 * @param {array} data
 * ex： [
 *          { name: '芙蓉区', value: 34 },
            { name: '雨花区', value: 36 }
 *      ]
 **/
export const getMPieOption = scaleData => {
    let color = [
        'rgba(255,103,103,1)',
        'rgba(255,157,107,1)',
        'rgba(211,201,90,1)',
        'rgba(85,202,105,1)',
        'rgba(22,216,184,1)',
        'rgba(103,204,255,1)',
        'rgba(62,120,255,1)',
        'rgba(142,103,255,1)',
        'rgba(176,70,219,1)',
        'rgba(248,79,159,1)'
    ]
    let legendData = []
    for (let i = 0; i < scaleData.length; i++) {
        legendData.push(scaleData[i].name)
    }

    let seriesData = scaleData.map((item, index) => {
        return {
            name: item.name,
            value: item.value,
            dataObj: item
        }
    })

    let seriesObj = [
        {
            type: 'pie',
            center: ['36%', '50%'],
            radius: ['65%', '85%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    lineHeight: 30,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    formatter: function(param) {
                        let name =
                            param.name.length > 8
                                ? param.name.substring(0, 6) + '...'
                                : param.name
                        return (
                            name + '\n{big|' + param.percent.toFixed(0) + '%}'
                        )
                    },
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    },
                    rich: {
                        big: {
                            fontSize: 24,
                            marginTop: 10
                        }
                    }
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 0,
                    shadowBlur: 10,
                    borderColor: color,
                    shadowColor: 'rgba(142,152,241, 0.5)'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: seriesData
        }
    ]
    let option = {
        backgroundColor: 'transparent',
        tooltip: {
            textStyle: {
                align: 'left',
                fontSize: 16,
                fontFamily: 'Microsoft YaHei'
            },
            formatter(source) {
                let { name, value } = source.data
                let { percent } = source
                return `${name}</br>占比：${percent}%</br>访问次数：${value}`
            }
        },
        color: color,
        legend: {
            show: true,
            type: 'scroll',
            orient: 'vertical',
            itemGap: 13,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            right: '10%',
            top: 20,
            bottom: 20,
            zlevel: 10,
            pageTextStyle: {
                color: '#ddd'
            },
            formatter: function(name) {
                return echarts.format.truncateText(
                    name,
                    60,
                    '0.42vw Microsoft Yahei',
                    '…'
                )
            },
            tooltip: {
                show: true
            },
            textStyle: {
                fontSize: 18,
                color: 'rgba(162,238,255,1)'
            },
            data: legendData
        },
        // legend: {
        //     x: 'center',
        //     top: '80%',
        //     icon: 'circle',
        //     itemWidth: 12,
        //     itemHeight: 12,
        //     data: legendData,
        //     textStyle: {
        //         color: 'rgba(162,238,255,1)'
        //     }
        // },
        series: seriesObj
    }
    return option
}
/**
 * 生成横向柱形图（移动上网态势分析）option
 * @param {array} data
 * ex： [
 *          { name: '芙蓉区', value: 34, ordernum: 63, tipsText: '' },
            { name: '雨花区', value: 36, ordernum: 24, tipsText: '' }
 *      ]
 **/
export const getBarOption = (data, textLength = 14) => {
    let originData = data.map(item => {
        return {
            name: item.name,
            value: item.value || 0,
            ordernum: item.ordernum,
            dataObj: item
        }
    })
    let dataArr = reverses(
        sortBys(originData, function(o) {
            return o.ordernum
        })
    )
    dataArr.map(item => {
        item.value = Math.sqrt(item.value)
        return item
    })
    let yRightata = []
    let yData = dataArr.map(it => {
        yRightata.push(it.name)
        let { dataObj } = it
        return dataObj.ordernum
    })
    let rich = {
        red: {
            color: 'rgba(255,80,80,1)',
            fontSize: 20
        },
        orange: {
            color: 'rgba(255,157,107,1)',
            fontSize: 20
        },
        yellow: {
            color: 'rgba(218,210,106,1)',
            fontSize: 20
        },
        normal: {
            color: 'rgba(162,238,255,1)',
            fontSize: 18
        }
    }
    let rightLength = textLength === 14 ? '140' : '240'
    let option = {
        grid: {
            top: '10',
            left: '30',
            right: rightLength,
            bottom: '10'
        },
        tooltip: {
            show: true,
            textStyle: {
                align: 'left',
                fontSize: 16,
                fontFamily: 'Microsoft YaHei'
            },
            position: function(pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 60 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            formatter(source) {
                if (source.data.dataObj) {
                    let { tipsText } = source.data.dataObj
                    return tipsText || source.data.value
                }
                return ''
            }
        },
        textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: '18'
        },
        series: [
            {
                type: 'bar',
                data: dataArr,
                barWidth: 12,
                itemStyle: {
                    barBorderRadius: [0, 20, 20, 0],
                    color: 'rgba(0,118,255,1)'
                },
                label: {
                    normal: {
                        show: false,
                        textBorderColor: '#fff'
                    }
                }
            }
        ],
        xAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: false,
                    interval: 'auto',
                    textStyle: {
                        color: '#fff',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 12
                    }
                },
                axisLine: false,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.3)',
                        width: 0.3
                    }
                },
                axisTick: { show: false },
                boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ],
        yAxis: [
            {
                axisLabel: {
                    interval: 'auto',
                    align: 'right',
                    formatter: function(value) {
                        let str
                        if (value === '1') {
                            str = '{red|' + value + '}'
                        } else if (value === '2') {
                            str = '{orange|' + value + '}'
                        } else if (value === '3') {
                            str = '{yellow|' + value + '}'
                        } else {
                            str = '{normal|' + value + '}'
                        }
                        // let str = value.length > 6 ? value.substring(0, 6) + '...' : value
                        return str
                    },
                    rich: rich
                },
                position: 'left',
                offset: 0,
                data: yData,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(52,71,85,1)'
                    }
                },
                splitLine: false,
                axisTick: { show: false },
                boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            },
            {
                name: '',
                data: yRightata.reverse(),
                nameLocation: 'start',
                nameTextStyle: {
                    fontWeight: 'bold'
                },
                position: 'right',
                offset: 0,
                inverse: true,
                axisLine: {
                    onZero: false,
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        let maxLength = textLength
                        let strlenght = 0
                        let length = 0
                        for (let i = 0; i < value.length; i++) {
                            if (strlenght < maxLength) {
                                length++
                                if (value.charCodeAt(i) > 128) {
                                    strlenght += 2
                                } else {
                                    strlenght += 1
                                }
                            }
                        }
                        let str =
                            value.length > length
                                ? value.substring(0, length) + '...'
                                : value
                        return str
                    },
                    textStyle: {
                        fontSize: 18,
                        color: 'rgba(162,238,255,1)'
                    }
                }
            }
        ]
    }
    return option
}
/**
 * 生成单个折线图option
 * @param {array} data
 * @param {props} data
 * ex： [
 *          { name: '芙蓉区', value: 34, tipsText: '' },
            { name: '雨花区', value: 36, tipsText: '' }
 *      ]
 **/
export const getSingleLineOption = (scaleData, props = {}) => {
    let colors = {
        blue: [
            'rgba(0, 170, 255, 1)',
            'rgba(0, 170, 255, 0.4)',
            'rgba(0, 170, 255, 0.01)'
        ],
        orange: [
            'rgba(255, 157, 107, 1)',
            'rgba(255, 157, 107, 0.4)',
            'rgba(255, 157, 107, 0.01)'
        ],
        yellow: [
            'rgba(236, 172, 89, 1)',
            'rgba(236, 172, 89, 0.4)',
            'rgba(236, 172, 89, 0.01)'
        ],
        red: [
            'rgba(255, 103, 103, 1)',
            'rgba(255, 103, 103, 0.4)',
            'rgba(255, 103, 103, 0.01)'
        ],
        green: [
            'rgba(30, 222, 153, 1)',
            'rgba(30, 222, 153, 0.4)',
            'rgba(30, 222, 153, 0.01)'
        ]
    }
    let {
        smooth,
        colorStyle,
        lineWidth,
        axisLineShow,
        axisLabel,
        showMaxLabel = true,
        max,
        min
    } = props
    let isSmooth = smooth
    let data = []
    let yAxis = []
    if (scaleData) {
        data = scaleData.map(item => {
            yAxis.push({
                value: item.name
            })
            return {
                name: item.name,
                value: item.value,
                dataObj: item
            }
        })
    }
    let itemColor = colors[colorStyle || 'blue'][0]
    let option = {
        grid: {
            containLabel: true,
            left: '10',
            top: '10',
            right: '20',
            bottom: '10'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(60,164,255,0.2)'
                }
            },
            textStyle: {
                align: 'left',
                fontSize: 16,
                fontFamily: 'Microsoft YaHei'
            },
            formatter(params) {
                if (params[0].data.dataObj) {
                    let { tipsText } = params[0].data.dataObj
                    return tipsText || params[0].data.value
                }
            }
        },
        xAxis: [
            {
                axisLabel: {
                    show: axisLabel || false,
                    interval: 'auto',
                    // rotate: 20,
                    textStyle: {
                        color: 'rgba(162,238,255,0.75)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 18
                    }
                },
                offset: 6,
                data: yAxis,
                axisLine: {
                    show: axisLineShow || false,
                    lineStyle: {
                        color: 'rgba(52,71,85,1)',
                        width: 2
                    }
                },
                splitLine: false,
                axisTick: {
                    show: false
                },
                boundaryGap: false,
                // boundaryGap: ['0%', '5%'],
                name: '',
                nameTextStyle: { color: '' }
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: max,
                min: min,
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(52,71,85,1)',
                        width: 2
                    }
                },
                axisLabel: {
                    show: true,
                    formatter: function(value) {
                        let str = value
                        if (value >= 10000 && value < 100000000) {
                            str = value / 10000 + '万'
                        } else if (value >= 100000000) {
                            str = value / 100000000 + '亿'
                        }
                        return str
                    },
                    textStyle: {
                        color: 'rgba(162,238,255,0.75)',
                        fontFamily: 'Microsoft YaHei',
                        fontSize: 18
                    },
                    showMaxLabel: showMaxLabel
                }
            }
        ],
        series: [
            {
                type: 'line',
                smooth: isSmooth,
                data: data,
                symbol: 'circle',
                sampling: 'average',
                itemStyle: {
                    color: itemColor
                },
                lineStyle: {
                    width: lineWidth || 1
                },
                areaStyle: {
                    normal: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: colors[colorStyle || 'blue'][1] // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: colors[colorStyle || 'blue'][2] // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 5
                }
            }
        ]
    }
    return option
}
/**
 * 生成多条折线图option
 * @param {array} data
 * @param {props} data
 * ex： [
 *      ]
 **/
export const getDoubleLineOption = data => {
    let seriesObjs = []
    let categories = data[0].time
    let colors = [
        [
            'rgba(107,161,255,0.39)',
            'rgba(107,161,255,0)',
            'rgba(107,161,255,1)'
        ],
        ['rgba(30,221,153,0.39)', 'rgba(30,221,153,0)', 'rgba(30,221,153,1)'],
        ['rgba(218,67,50,0.39)', 'rgba(218,67,50,0)', 'rgba(255,103,103,1)']
    ]
    data.forEach(item => {
        let yAxisIndex = 0
        let pIndex = 0
        if (item.type === '境外') {
            yAxisIndex = 1
            pIndex = 1
        } else if (item.type === '省外') {
            pIndex = 2
        }
        seriesObjs.push({
            name: item.type,
            smooth: true,
            type: 'line',
            yAxisIndex: yAxisIndex,
            // stack: 'count',
            lineStyle: {
                width: 3
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: colors[pIndex][0] // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: colors[pIndex][1] // 100% 处的颜色
                            }
                        ],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: colors[pIndex][2]
                }
            },
            symbol: 'circle',
            data: item.value
            // barGap: 0,
            // barCategoryGap: 0
        })
    })
    let option = {
        grid: {
            // 是否显示网格
            show: false,
            left: '8%',
            right: '8%',
            bottom: '4%',
            top: '3%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            textStyle: {
                align: 'left',
                fontSize: 16
            }
        },
        xAxis: [
            {
                type: 'category',
                data: categories,
                boundaryGap: false,
                axisLabel: {
                    show: false,
                    color: '#A2EEFF'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(135,135,135,1)',
                        width: 2
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: true,
                    color: '#A2EEFF',
                    fontSize: 18,
                    formatter: function(value) {
                        let str = value
                        if (value > 10000 && value < 10000000) {
                            str = value / 10000 + '万'
                        } else if (value >= 10000000) {
                            str = value / 100000000 + '亿'
                        }
                        return str
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(135,135,135,1)',
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: true,
                    color: 'rgba(30,221,153,1)',
                    fontSize: 18,
                    formatter: function(value) {
                        let str = value
                        if (value > 10000 && value < 10000000) {
                            str = value / 10000 + '万'
                        } else if (value >= 10000000) {
                            str = value / 100000000 + '亿'
                        }
                        return str
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(30,221,153,0.5)',
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        // dataZoom: {
        //     type: 'inside'
        // },
        series: seriesObjs
    }
    option.textStyle = {
        fontFamily: 'Microsoft YaHei',
        fontSize: 18
    }
    return option
}
/**
 * 生成graph关系图option
 * @param {array} nodeData 节点数据
 * @param {array} linkData 关系数据
 * @param {num} type 关系图类型 0通话次数 1通话时长 2短信次数
 **/
export const getGraphOption = (nodeData, linkData, type = 1) => {
    let unit = type === 1 ? 's' : '次'
    const TYPE = ['通话次数', '通话时长', '短信次数']
    const DATA_TYPE = {
        IN: '1', // 内部号码
        OUT: '2' // 外部号码
    }
    // TOP123
    const COLORS = {
        H: '#ff3e0a',
        HB: 'rgba(255, 62, 10, 0.5)',
        M: '#ffa60a',
        MB: 'rgba(255, 166, 10, 0.5)',
        L: '#0b9df0',
        LB: 'rgba(11, 157, 240, 0.5)',
        IN: '#D8FF26',
        INB: 'rgba(215, 255, 38, 0.5)',
        OUT: '#F4467A',
        OUTB: 'rgba(244, 70, 122, 0.5)'
    }
    let ecNode = []
    nodeData.forEach(item => {
        const node = {
            name: item.name,
            value: item.count,
            emphasis: {
                label: {
                    show: true
                }
            },
            Original: item
        }
        if (item.type === DATA_TYPE.IN) {
            node.symbolSize = 8
            node.itemStyle = {
                normal: {
                    color: COLORS.IN,
                    borderColor: COLORS.INB,
                    borderWidth: 7
                }
            }
            ecNode.push(node)
        } else if (item.type === DATA_TYPE.OUT) {
            node.symbolSize = 8
            node.itemStyle = {
                normal: {
                    color: COLORS.OUT,
                    borderColor: COLORS.OUTB,
                    borderWidth: 7
                }
            }
            ecNode.push(node)
        }
    })
    let ecLink = []
    ecLink = linkData.map((item, index) => {
        let obj = {
            source: item.name,
            target: item.targetName,
            value: item.count
        }
        if (index === 0) {
            obj.lineStyle = {
                normal: {
                    color: COLORS.H,
                    width: 2
                }
            }
            return obj
        } else if (index === 1) {
            obj.lineStyle = {
                normal: {
                    color: COLORS.M,
                    width: 2
                }
            }
            return obj
        } else if (index === 2) {
            obj.lineStyle = {
                normal: {
                    color: COLORS.L,
                    width: 2
                }
            }
            return obj
        }
        return obj
    })
    let option = {
        tooltip: {
            show: true,
            textStyle: {
                fontSize: 12
            },
            formatter: function(res) {
                if (res.dataType === 'edge') {
                    if (Array.isArray(res.value)) {
                        return `通联次数：${res.value[0]}次</br>短信次数：${
                            res.value[1]
                        }次</br>通话时长：${res.value[2]}s`
                    }
                    return TYPE[type] + '：' + res.value + unit
                }
                if (res.data.Original.cname !== undefined) {
                    let name = res.data.Original.cname
                    let phone = res.data.Original.name
                    return `姓名：${name}<br/>手机号：${phone}`
                }
            }
        },
        grid: {
            // show: true,
            left: '10',
            top: '10',
            right: '10',
            bottom: '10'
        },
        series: [
            {
                name: 'graph',
                type: 'graph',
                layout: 'force',
                nodes: ecNode,
                links: ecLink,
                // categories: me.categories,
                label: {
                    normal: {
                        // position: 'right',
                        // formatter: function(res) {
                        //     return res.name;
                        // }
                        show: true,
                        color: '#000',
                        fontSize: 10,
                        formatter: function(params) {
                            // 左侧表格中的数据排序在图表中以数字显示
                            if (params.data.Original.number) {
                                return params.data.Original.number
                            }
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 1
                        // curveness: 0.25
                    }
                },
                force: {
                    repulsion: 50,
                    // gravity: 0.05,
                    // edgeLength: 50
                    gravity: 0.1,
                    edgeLength: 30
                },
                symbolSize: 10,
                roam: true,
                draggable: true
            }
        ]
    }
    return option
}

/**
 * 生成高亮地图option
 * @param {array} scaleData 地图数据 ex: [{:count:346258,lat:"38.4834",lon:"106.2889",rank:3}]（必须带上rank分组标记1，2，3）
 * @param {string} mapType 地图名称 ex：'ningxia'
 **/
export const getMapLightOption = (scaleData, mapType) => {
    const scatterCategory = [
        {
            color: 'rgba(211,201,90,0.8)',
            name: '弱',
            size: 2
        },
        {
            color: 'rgba(236, 172, 89, 0.8)',
            // color: 'rgba(255, 157, 107, 0.9)',
            name: '中',
            size: 3
        },
        {
            color: '#f4e925',
            name: '强',
            size: 4
        }
    ]
    let data = cloneDeeps(scaleData)
    // 数据按rank分组
    let ds = groupBys(data, it => {
        return it.rank
    })
    // 按3份创建多组series对象
    let seriesObjs = scatterCategory.map(({ name, size, color }, i) => {
        let index = i + 1
        let curArr = ds[index]
        let data = curArr.map(it => {
            return [Number(it.lon), Number(it.lat), 0, it.count]
        })
        return {
            name,
            type: 'scatterGL',
            coordinateSystem: 'geo',
            symbolSize: size,
            itemStyle: {
                shadowBlur: 10,
                shadowColor: color,
                color
            },
            progressive: 1e6,
            blendMode: 'light',
            data
        }
    })
    let option = {
        tooltip: {
            show: false
        },
        geo: [
            {
                map: mapType,
                zoom: 1.2,
                roam: false,
                label: {
                    normal: {
                        show: false,
                        z: 10,
                        color: '#eee'
                    },
                    emphasis: {
                        show: false,
                        color: '#eee'
                    }
                },
                itemStyle: {
                    normal: {
                        // areaColor: 'transparent',
                        borderColor: '#87D2FF',
                        borderWidth: 3,
                        shadowColor: 'rgba(47, 163, 184, 0.75)',
                        shadowBlur: 40
                    }
                },
                silent: true,
                layoutCenter: ['50%', '50%'],
                layoutSize: '80%'
            },
            {
                map: mapType,
                zoom: 1.2,
                roam: false,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#1e2f6b',
                        borderColor: '#508aa0'
                    }
                },
                silent: true,
                layoutCenter: ['50%', '50%'],
                layoutSize: '80%'
            }
        ],
        series: seriesObjs
    }
    return option
}

/**
 * 生成带点的地图option
 * @param {array} data 地图数据 ex: [{:count:346258,lat:"38.4834",lon:"106.2889",rank:3}]（必须带上rank分组标记1，2，3）
 * @param {string} mapType 地图名称 ex：'china'
 * @param {boolean} mini 是否小地图展示
 * @param {string} color 闪烁点的颜色，默认黄色
 **/
export const getMapPointOption = (data, mapType, mini, color = 'yellow') => {
    let colors = {
        blue: 'rgba(0, 170, 255, 1)',
        orange: 'rgba(255, 157, 107, 1)',
        yellow: 'rgba(221, 185, 38, 1)',
        red: 'rgba(255, 103, 103, 1)'
    }
    let curCoords = coords[mapType]
    let seriesData = data.map(it => {
        let sourceArr = curCoords[it.area || it.source] || []
        if (it.count !== 0) {
            return {
                name: it.area || it.source,
                value: [sourceArr[0], sourceArr[1], it.count],
                time: it.timestamp
            }
        }
    })
    seriesData = seriesData.filter(item => item)
    let max = seriesData.length ? seriesData[0].value[2] : 0
    let itemStyle = {
        normal: {
            areaColor: '#162849',
            borderWidth: 2,
            borderColor: '#3A6386',
            shadowColor: 'rgba(0, 0, 0, 0.7)',
            shadowBlur: 10
        }
    }
    let miniItemStyle = {
        normal: {
            areaColor: '#162849',
            borderWidth: 0
        }
    }
    let option = {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        tooltip: {
            show: true,
            // position: function(pos, params, dom, rect, size) {
            //     // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            //     let obj = { top: 0 };
            //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            //     return obj
            // },
            formatter: function(params) {
                if (params.seriesType !== 'map') {
                    let res = `${params.name}：${params.value[2]}人`
                    if (params.data.time) {
                        res += `</br>时间：${params.data.time}`
                    }
                    return ` <div style="font-size: 12px;margin:0 5px">${res}</div>`
                }
            }
        },
        legend: {
            show: false
        },
        geo: {
            map: mapType,
            zoom: 1.2,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: mini ? miniItemStyle : itemStyle
        },
        series: [
            {
                name: 'point',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: seriesData,
                // symbolSize: mini ? 3 : 10,
                symbolSize: function(val) {
                    let s = (val[2] / max) * 20
                    s = s > 10 ? s : 10
                    return mini ? 5 : s
                },
                roam: false,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        // color: '#ddb926'
                        color: colors[color]
                    }
                }
            },
            {
                type: 'map',
                map: mapType,
                zoom: 1.2,
                geoIndex: 1,
                aspectScale: 0.75, // 长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#1E375F',
                        // borderColor: '#3B5077',
                        // borderWidth: mini ? 0.1 : 1
                        borderColor: mini
                            ? 'rgba(59,80,119,0.2)'
                            : 'rgba(59,80,119,1)',
                        borderWidth: 1
                    },
                    emphasis: {
                        areaColor: '#1E375F' // 地图区域划过时的颜色
                    }
                }
            },
            {
                name: 'Top 6',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: seriesData.slice(0, 6),
                roam: false,
                // symbolSize: mini ? 5 : 15,
                symbolSize: function(val) {
                    let s = (val[2] / max) * 40
                    s = s > 20 ? s : 20
                    return mini ? 10 : s
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        // color: '#f4e925',
                        color: colors[color],
                        shadowBlur: 20,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }
        ],
        grid: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0
        }
    }
    return option
}

/**
 * 生成仪表盘型饼图option
 * @param {array} data 饼图
 * ex： [ { name: '省内', value: 69286308 } ]
 **/
export const getBoardPieOption = data => {
    let color = [
        'rgba(107,161,255,1)',
        'rgba(255,103,103,1)',
        'rgba(30,221,153,1)'
    ]
    let datas = []
    if (data) {
        data.forEach((item, index) => {
            datas.push({
                name: item.name,
                value: item.value || 0,
                dataObj: item,
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: color[index]
                    }
                }
            })
        })
    }
    let seriesObj = [
        {
            name: '',
            type: 'gauge',
            radius: '72%',
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 80,
            hoverAnimation: true,
            axisTick: {
                show: false
            },
            splitLine: {
                length: 40,
                lineStyle: {
                    width: 2,
                    color: '#020B3A'
                }
            },
            axisLabel: {
                show: false
            },
            pointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    opacity: 0
                }
            },
            detail: {
                show: false
            },
            data: [
                {
                    value: 0,
                    name: ''
                }
            ]
        },
        {
            name: '',
            type: 'pie',
            radius: ['75%', '80%'],
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    formatter: '{a}: {b}:{c}',
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            data: datas
        },
        {
            name: '',
            type: 'pie',
            radius: ['58%', '72%'],
            silent: true,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            z: 0,
            zlevel: 0,
            data: datas
        },
        {
            name: '',
            type: 'pie',
            radius: ['54%', '56%'],
            silent: true,
            z: 0,
            zlevel: 0,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                }
            },
            data: datas
        }
    ]
    let maxData = () => {
        let sum = 0
        let max = 0
        let flag = false
        data.forEach(item => {
            sum += item.value
            max = max > item.value ? max : item.value
        })
        data.forEach(item => {
            if (item.value / sum < 0.01) {
                flag = true
            }
        })
        return {
            max: max,
            flag: flag
        }
    }
    let percentData = maxData()
    let option = {
        tooltip: {
            position: function(pos, params, dom, rect, size) {
                // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                let obj = { top: 60 }
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                return obj
            },
            trigger: 'item',
            formatter: function(params) {
                if (
                    percentData.flag === true &&
                    params.value === percentData.max
                ) {
                    params.percent -= 0.01
                    return `${params.name} : ${params.percent.toFixed(2)}%`
                } else if (params.percent <= 0.01) {
                    return `${params.name} : ≤0.01%`
                }
                return `${params.name} : ${params.percent.toFixed(2)}%`
            }
        },
        series: seriesObj
    }
    return option
}
