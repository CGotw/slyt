$(window).load(function () {
    $(".loading").fadeOut()
})

/****/
$(document).ready(function () {
    var whei = $(window).width()
    $("html").css({fontSize: whei / 20})
    $(window).resize(function () {
        var whei = $(window).width()
        $("html").css({fontSize: whei / 20})
    });
});


function formatDate(inputDate) {
    // 将字符串日期解析为 Date 对象
    const date = new Date(inputDate);

    // 获取年、月、日
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1；使用 padStart 补0
    const day = date.getDate().toString().padStart(2, '0'); // 使用 padStart 补0

    // 构建新的日期格式
    const formattedDate = year + '年' + month + '月' + day + '日';
    return formattedDate;
}


$(window).load(function () {
    $(".loading").fadeOut()
})
$(function () {
    echarts_1()
    echarts_2()
    echarts_3()
    echarts_4()
    echarts_5()
    echarts_6()
    pe01()
    pe02()
    pe03()

    function echarts_1() {
        var myChart = echarts.init(document.getElementById('echarts1'));

        var option = {


            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
            }, "grid": {
                "top": "20%",
                "right": "50",
                "bottom": "20",
                "left": "30",
            },
            legend: {
                data: ['天然气', '药剂', '用电量', '总量', '天然气变化', '药剂变化', '用电量变化', '总量变化'],
                right: 'center', width: '100%',
                textStyle: {
                    color: "#fff"
                },
                itemWidth: 12,
                itemHeight: 10,
            },


            "xAxis": [
                {
                    "type": "category",
                    data: ['6月', '7月', '8月', '9月'],
                    axisLine: {lineStyle: {color: "rgba(255,255,255,.1)"}},
                    axisLabel: {
                        textStyle: {color: "rgba(255,255,255,.7)", fontSize: '14',},
                    },

                },
            ],
            "yAxis": [
                {
                    "type": "value",
                    "name": "单位/万元",
                    "nameTextStyle": {
                        "color": "#FFFFFF", // 设置字体颜色为白色
                        "fontWeight": "bold" // 加粗字体使其更显眼
                    },
                    axisTick: {show: false},
                    splitLine: {
                        show: false,

                    },
                    "axisLabel": {
                        "show": true,
                        fontSize: 14,
                        color: "rgba(255,255,255,.6)"

                    },
                    axisLine: {
                        min: 0,
                        max: 10,
                        lineStyle: {color: 'rgba(255,255,255,.1)'}
                    },//左线色

                },
                {
                    "type": "value",
                    "name": "增速",
                    "nameTextStyle": {
                        "color": "#FFFFFF", // 设置字体颜色为白色
                        "fontWeight": "bold" // 加粗字体使其更显眼
                    },
                    "show": true,
                    "axisLabel": {
                        "show": true,
                        fontSize: 14,
                        formatter: "{value} %",
                        color: "rgba(255,255,255,.6)"
                    },
                    axisTick: {show: false},
                    axisLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},//右线色
                    splitLine: {show: true, lineStyle: {color: 'rgba(255,255,255,.1)'}},//x轴线
                },
            ],
            "series": [

                {
                    "name": "天然气",
                    "type": "bar",
                    "data": [36.6, 38.80, 40.84, 41.60],
                    "barWidth": "15%",
                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#8bd46e'
                            }, {
                                offset: 1,
                                color: '#09bcb7'
                            }]),
                        }
                    },
                    "barGap": "0.2"
                },

                {
                    "name": "药剂",
                    "type": "bar",
                    "data": [14.8, 14.1, 15, 16.30],
                    "barWidth": "15%",
                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#248ff7'
                            }, {
                                offset: 1,
                                color: '#6851f1'
                            }]),
                        }
                    },
                    "barGap": "0.2"
                },
                {
                    "name": "用电量",
                    "type": "bar",
                    "data": [9.2, 9.1, 9.85, 8.9],
                    "barWidth": "15%",
                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fccb05'
                            }, {
                                offset: 1,
                                color: '#f5804d'
                            }]),
                        }
                    },
                    "barGap": "0.2"
                },
                {
                    "name": "总量",
                    "type": "bar",
                    "data": [9.2, 9.1, 9.85, 8.9],
                    "barWidth": "15%",
                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#fccb05'
                            }, {
                                offset: 1,
                                color: '#ff0000'
                            }]),
                        }
                    },
                    "barGap": "0.2"
                },
                {
                    "name": "天然气变化",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": [0, -4.73, 6.38, 8.67],
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#1de9b6",

                        }
                    },
                    "smooth": true
                },
                {
                    "name": "药剂变化",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": [0, -1.09, 8.24, -9.64],
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#3496f8",

                        }
                    },
                    "smooth": true
                },
                {
                    "name": "用电量变化",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": [0, -1.09, 8.24, -9.64],
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#800080",

                        }
                    },
                    "smooth": true
                },
                {
                    "name": "总量变化",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": [0, -1.09, 8.24, -9.64],
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#ff0000",

                        }
                    },
                    "smooth": true
                }
            ]
        };

        fetch('http://127.0.0.1:8081/all_data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                option.series[0].data = data["natural_gas"]
                option.series[1].data = data["carbon_emulsion"]
                option.series[2].data = data["power_consumption"]
                option.series[3].data = data["total"]

                option.series[4].data = data["natural_gas_growth_rate"]
                option.series[5].data = data["growth_rate_of_carbon_emulsion"]
                option.series[6].data = data["growth_rate_of_electricity_consumption"]
                option.series[7].data = data["total_growth_rate"]
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
                // option.xAxis[0].data=data.month
                // option.xAxis[0].data=data.month
                // var xAxisData = option["xAxis"];
                // console.log(xAxisData);
                // myChart.setOption(option);
                // window.addEventListener("resize",function(){
                //     myChart.resize();
                // });
                // console.log()
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

        // myChart.setOption(option);
        // window.addEventListener("resize",function(){
        //     myChart.resize();
        // });


    }

    async function echarts_2() {
        var myChart = echarts.init(document.getElementById('echarts2'));
        const response = await fetch('http://127.0.0.1:8081/data2/');
        const data = await response.json();
        console.log(data);

        let dates = [];
        let sanxiang = [];
        let yiciguan = [];
        let unionStation = [];
        let standardWaterContent = [];

        for (let i = 0; i < data.length; i++) {
            dates.push(formatDate(data[i]['时间'].slice(0, 8)).slice(0, 8));
            sanxiang.push(data[i]['三相分离器出油含水率']);
            yiciguan.push(data[i]['一次罐出油含水率']);
            unionStation.push(data[i]['联合站外输含水率']);
            standardWaterContent.push(data[i]['原油含水率达标值']);
        }


        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
            },
            grid: {
                left: '0',
                top: '30',
                right: '10',
                bottom: '-20',
                containLabel: true
            },
            legend: {
                data: ['三相分离器出油含水率', '一次罐出油含水率', '联合站外输含水率', '原油含水率达标值'],
                right: 'center',
                top: 0,
                textStyle: {
                    color: "#fff"
                },
                itemWidth: 12,
                itemHeight: 10,
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    rotate: -90,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,

                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }

                },

                data: dates

            }, {

                axisPointer: {show: false},
                axisLine: {show: false},
                position: 'bottom',
                offset: 20,


            }],

            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                // splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel: {
                    formatter: "{value} %",
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,
                    },
                },

                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [
                {
                    name: '三相分离器出油含水率',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: 'rgba(228, 228, 126, 1)',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(228, 228, 126, .2)'
                            }, {
                                offset: 1,
                                color: 'rgba(228, 228, 126, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(228, 228, 126, 1)',
                            borderColor: 'rgba(228, 228, 126, .1)',
                            borderWidth: 12
                        }
                    },
                    data: sanxiang

                }, {
                    name: '一次罐出油含水率',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: 'rgba(255, 128, 128, 1)',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255, 128, 128,.2)'
                            }, {
                                offset: 1,
                                color: 'rgba(255, 128, 128, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 128, 128, 1)',
                            borderColor: 'rgba(255, 128, 128, .1)',
                            borderWidth: 12
                        }
                    },
                    data: yiciguan
                },
                {
                    name: '联合站外输含水率',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: 'rgb(0,59,201)',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255, 128, 128,.2)'
                            }, {
                                offset: 1,
                                color: 'rgba(255, 128, 128, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,59,201)',
                            borderColor: 'rgba(255, 128, 128, .1)',
                            borderWidth: 12
                        }
                    },
                    data: unionStation
                },
                {
                    name: '原油含水率达标值',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: 'rgba(255, 0, 0, 1)',  // 红色
                            width: 2
                        }
                    },
                    data: standardWaterContent
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    async function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts3'));

        const response = await fetch('http://127.0.0.1:8081/data1/')
        const data = await response.json();
        console.log(data)

        let dates = []
        let tianranqi = []
        let poruqi = []
        let power = []
        for (let i = 0; i < data.length; i++) {
            dates.push(formatDate(data[i]['时间'].slice(0, 10)))
            tianranqi.push(data[i]['天然气消耗成本'])
            poruqi.push(data[i]['药剂消耗成本'])
            power.push(data[i]['用电消耗成本'])
        }

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['天然气成本', '药剂成本', '用电成本'],
                right: 'center',
                top: 0,
                textStyle: {
                    color: "#fff"
                },
                itemWidth: 12,
                itemHeight: 10,
                // itemGap: 35
            },
            grid: {
                left: '0',
                right: '20',
                bottom: '0',
                top: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLabel: {
                    rotate: -90,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.3)'
                    }
                },
            },

            yAxis: {
                type: 'value',
                "name": "单位/元",
                "nameTextStyle": {
                    "color": "#FFFFFF", // 设置字体颜色为白色
                    "fontWeight": "bold" // 加粗字体使其更显眼
                },
                splitNumber: 4,
                axisTick: {show: false},
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 14,
                    },
                },
                axisLine: {show: false},
            },


            series: [{
                name: '天然气成本',
                type: 'bar',
                stack: 'a',
                barWidth: '30', barGap: 0,
                itemStyle: {
                    normal: {
                        color: '#8bd46e',
                    }
                },
                data: tianranqi
            },
                {
                    name: '药剂成本',
                    type: 'bar',
                    stack: 'a',
                    barWidth: '30', barGap: 0,
                    itemStyle: {
                        normal: {
                            color: '#f5804d',
                            barBorderRadius: 0,
                        }
                    },
                    data: poruqi
                },
                {
                    name: '用电成本',
                    type: 'bar',
                    stack: 'a',
                    barWidth: '30', barGap: 0,
                    itemStyle: {
                        normal: {
                            color: '#248ff7',
                            barBorderRadius: 0,
                        }
                    },
                    data: power
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    async function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts5'));

        const response = await fetch('http://127.0.0.1:8081/data3/')
        const data = await response.json();
        console.log(data)

        let dates = []
        let data1 = []
        let data2 = []
        let data3 = []
        let data4 = []
        let data5=[]
        let data6=[]

        for (let i = 0; i < data.length; i++) {
            dates.push(formatDate(data[i]['时间'].slice(0, 8)).slice(0, 8))
            data1.push(data[i]['含油量'])
            data2.push(data[i]['含油量增加率'])
            data3.push(data[i]['悬浮物量'])
            data4.push(data[i]['悬浮物量减少率'])

        }

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {type: 'shadow'},
            }, "grid": {
                "top": "15%",
                "right": "10%",
                "bottom": "20",
                "left": "10%",
            },
            legend: {
                data: ['含油量', '含油量增加率', '悬浮物量', '悬浮物量减少率'],
                right: 'center',
                top: 0,
                textStyle: {
                    color: "#fff"
                },
                itemWidth: 12,
                itemHeight: 10,
            },
            "xAxis": [
                {
                    "type": "category",

                    data: dates,
                    axisLine: {lineStyle: {color: "rgba(255,255,255,.1)"}},
                    axisLabel: {
                        textStyle: {color: "rgba(255,255,255,.7)", fontSize: '14',},
                    },

                },
            ],
            "yAxis": [
                {
                    "type": "value",
                    "name": "mg/L",
                    "nameTextStyle": {
                        "color": "#FFFFFF", // 设置字体颜色为白色
                        "fontWeight": "bold" // 加粗字体使其更显眼
                    },
                    splitLine: {show: false},
                    axisTick: {show: false},
                    "axisLabel": {
                        "show": true,
                        color: "rgba(255,255,255,.6)"

                    },
                    axisLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},//左线色

                },
                {
                    "type": "value",
                    "name": "变化率",
                    "nameTextStyle": {
                        "color": "#FFFFFF", // 设置字体颜色为白色
                        "fontWeight": "bold" // 加粗字体使其更显眼
                    },
                    "show": true,
                    axisTick: {show: false},
                    "axisLabel": {
                        "show": true,
                        formatter: "{value} %",
                        color: "rgba(255,255,255,.6)"
                    },
                    axisLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},//右线色
                    splitLine: {show: true, lineStyle: {color: 'rgba(255,255,255,.1)'}},//x轴线
                },
            ],
            "series": [
                {
                    "name": "含油量",
                    "type": "bar",
                    "data": data1,
                   "barWidth": "20%",

                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'green'
                            }, {
                                offset: 1,
                                color: 'blue'
                            }]),
                        }
                    },
                },
                {
                    "name": "含油量增加率",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": data2,
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#ff3300",

                        }
                    },
                    "smooth": true
                },
                {
                    "name": "悬浮物量",
                    "type": "bar",
                    "data": data3,
                    "barWidth": "20%",

                    "itemStyle": {
                        "normal": {
                            barBorderRadius: 15,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#f54857'
                            }, {
                                offset: 1,
                                color: '#f5804d'
                            }]),
                        }
                    },
                    "barGap": "0"
                },
                {
                    "name": "悬浮物量减少率",
                    "type": "line",
                    "yAxisIndex": 1,

                    "data": data4,
                    lineStyle: {
                        normal: {
                            width: 2
                        },
                    },
                    "itemStyle": {
                        "normal": {
                            "color": "#00d740",

                        }
                    },
                    "smooth": true
                },


            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    // async function echarts_5() {
    //     // 基于准备好的dom，初始化echarts实例
    //     var myChart = echarts.init(document.getElementById('echarts5'));

    //     const response = await fetch('http://127.0.0.1:8081/data3/')
    //     const data = await response.json();
    //     console.log(data)

    //     let dates = []
    //     let data1 = []
    //     let data2 = []
    //     let data3 = []
    //     let data4 = []
    //     let data5 = []
    //     let data6 = []
    //     for (let i = 0; i < data.length; i++) {
    //         dates.push(formatDate(data[i]['时间'].slice(0, 8)).slice(0,8))
    //         data1.push(data[i]['含油量率'])
    //         data2.push(data[i]['含油量增加率'])
    //         data3.push(data[i]['悬浮物量'])
    //         data4.push(data[i]['悬浮物量减少率'])
    //         data5.push(data[i]['含油量达标值'])
    //         data6.push(data[i]['悬浮物达标值'])
    //     }

    //     option = {
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {type: 'shadow'},
    //         }, "grid": {
    //             "top": "15%",
    //             "right": "10%",
    //             "bottom": "20",
    //             "left": "10%",
    //         },
    //         legend: {
    //             data: ['含油量率', '含油量增加率', '悬浮物量', '悬浮物量减少率','含油量达标值','悬浮物达标值'],
    //             right: 'center',
    //             top: 0,
    //             textStyle: {
    //                 color: "#fff"
    //             },
    //             itemWidth: 12,
    //             itemHeight: 10,
    //         },
    //         "xAxis": [
    //             {
    //                 "type": "category",

    //                 data: dates,
    //                 axisLine: {lineStyle: {color: "rgba(255,255,255,.1)"}},
    //                 axisLabel: {
    //                     textStyle: {color: "rgba(255,255,255,.7)", fontSize: '14',},
    //                 },

    //             },
    //         ],
    //         "yAxis": [
    //             {
    //                 "type": "value",
    //                 "name": "mg/L",
    //                 "nameTextStyle": {
    //                     "color": "#FFFFFF", // 设置字体颜色为白色
    //                     "fontWeight": "bold" // 加粗字体使其更显眼
    //                 },
    //                 splitLine: {show: false},
    //                 axisTick: {show: false},
    //                 "axisLabel": {
    //                     "show": true,
    //                     color: "rgba(255,255,255,.6)"

    //                 },
    //                 axisLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},//左线色

    //             },
    //             {
    //                 "type": "value",
    //                 "name": "变化率",
    //                 "nameTextStyle": {
    //                     "color": "#FFFFFF", // 设置字体颜色为白色
    //                     "fontWeight": "bold" // 加粗字体使其更显眼
    //                 },
    //                 "show": true,
    //                 axisTick: {show: false},
    //                 "axisLabel": {
    //                     "show": true,
    //                     formatter: "{value} %",
    //                     color: "rgba(255,255,255,.6)"
    //                 },
    //                 axisLine: {lineStyle: {color: 'rgba(255,255,255,.1)'}},//右线色
    //                 splitLine: {show: true, lineStyle: {color: 'rgba(255,255,255,.1)'}},//x轴线
    //             },
    //         ],
    //         "series": [
    //             {
    //                 "name": "含油量率",
    //                 "type": "line",
    //                 "data": data1,
    //                 "yAxisIndex": 1,

    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#ffff00",

    //                     }
    //                 },
    //                 "smooth": true
    //             },
    //             {
    //                 "name": "含油量增加率",
    //                 "type": "line",
    //                 "yAxisIndex": 1,

    //                 "data": data2,
    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#ff3300",

    //                     }
    //                 },
    //                 "smooth": true
    //             },
    //             {
    //                 "name": "悬浮物量",
    //                 "type": "bar",
    //                 "data": data3,
    //                 "barWidth": "20%",

    //                 "itemStyle": {
    //                     "normal": {
    //                         barBorderRadius: 15,
    //                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                             offset: 0,
    //                             color: '#f54857'
    //                         }, {
    //                             offset: 1,
    //                             color: '#f5804d'
    //                         }]),
    //                     }
    //                 },
    //                 "barGap": "0"
    //             },
    //             {
    //                 "name": "悬浮物量减少率",
    //                 "type": "line",
    //                 "yAxisIndex": 1,

    //                 "data": data4,
    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#00d740",

    //                     }
    //                 },
    //                 "smooth": true
    //             },
    //             {
    //                 "name": "含油量达标值",
    //                 "type": "line",
    //                 "data": data5,
    //                 "yAxisIndex": 1,

    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#00ff00",

    //                     }
    //                 },
    //                 "smooth": true
    //             },
    //             {
    //                 "name": "悬浮物达标值",
    //                 "type": "line",
    //                 "data": data6,
    //                 "yAxisIndex": 1,

    //                 lineStyle: {
    //                     normal: {
    //                         width: 2
    //                     },
    //                 },
    //                 "itemStyle": {
    //                     "normal": {
    //                         "color": "#0000ff",

    //                     }
    //                 },
    //                 "smooth": true
    //             },
    //         ]
    //     };
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     window.addEventListener("resize", function () {
    //         myChart.resize();
    //     });
    // }

    function echarts_4(selectedValue=0) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts4'));
        var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3'];
        var option = {

            grid: {
                left: '2%',
                top: '1%',
                right: '5%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: [{
                show: false,
            }],
            yAxis: [{
                axisTick: 'none',
                axisLine: 'none',
                offset: '7',
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: '14',
                    }
                },
                data: ['字段1', '字段2', '字段3', '字段4', '字段5', '字段6', '字段7', '字段8', '字段9']

            }, {
                axisTick: 'none',
                axisLine: 'none',
                axisLabel: {
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: '16',
                    }
                },
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9]

            }, {
                name: '单位：件',
                nameGap: '50',
                nameTextStyle: {
                    color: 'rgba(255,255,255,.6)',
                    fontSize: '16',
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [],
            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [25, 30, 34, 40, 43, 48, 52, 56, 70],
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (param) {
                            return param.value + '%';
                        },
                        textStyle: {
                            color: 'rgba(255,255,255,.8)',
                            fontSize: '0',
                        }
                    }
                },
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: '#03c893'
                        },
                            {
                                offset: 1,
                                color: '#0091ff'
                            }
                        ]),
                        barBorderRadius: 15,
                    }
                },
                z: 2
            }, {
                name: '白框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,.2)',
                        barBorderRadius: 15,
                    }
                },
                z: 1
            }]
        };
        fetch('http://127.0.0.1:8081/top-10')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data_new => {
                console.log(data_new)
                // option.yAxis[0].data=data_new["date"]
                // option.yAxis[1].data=data_new["avg_efficiency"]
                // option.series[0].data=data_new["avg_efficiency"]
                // 假设data_new是一个包含date和avg_efficiency的字典
// let data_new = {
//   "date": [...],  // 日期数据，可能是时间戳或其他格式
//   "avg_efficiency": [...]  // 平均效率数据
// };

// 转换日期数据为只有日和月，并保留一位小数
                let formatted_date = data_new["date"].map(date => {
                    // 假设date是时间戳，你可以根据实际的日期格式进行调整
                    let dateObj = new Date(date);
                    let year = dateObj.getFullYear();
                    let month = String(dateObj.getMonth() + 1).padStart(2, '0');  // 月份从0开始，所以+1
                    let day = String(dateObj.getDate()).padStart(2, '0');  // 日期补零
                    return `${year}-${month}-${day}`;  // 返回格式为YYYY-MM-DD
                });

                let formatted_avg_efficiency = data_new["avg_efficiency"].map(val => {
                    // 保留一位小数
                    return val.toFixed(1);
                });

// 设置图表的option
                option.yAxis[0].data = formatted_date;
                option.yAxis[1].data = formatted_avg_efficiency;
                option.series[0].data = formatted_avg_efficiency;
                var unit = '%';

                // 使用 map() 方法为每个元素添加单位
                var formatted_avg_efficiency_with_unit = formatted_avg_efficiency.map(function(value) {
                    return value + unit;
                });
                option.yAxis[1].data = formatted_avg_efficiency_with_unit;
                // console.log(data_new)
                // option.series[0].data[0].value=data.natural_gas
                // option.series[0].data[1].value=data.power_consumption
                // option.series[0].data[0].value=data["carbon_emulsion"]
                // option.series[0].data[2].value=data["power_consumption"]
                // option.series[0].data[2].value=data.carbon_emulsion
                // option.title.text=data["total"]
                // option.xAxis[0].data=data.month
                // option.xAxis[0].data=data.month
                // var xAxisData = option["xAxis"];
                // console.log(xAxisData);
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
                // console.log()
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts6'));


        var option = {
            title: {
                text: '5132',
                subtext: '总消耗量/万元',
                x: 'center',
                y: '40%',
                textStyle: {
                    color: '#fff',
                    fontSize: 22,
                    lineHeight: 10,
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: 12,
                    lineHeight: 10,

                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 500,
                max: 600,
                inRange: {
                    //colorLightness: [0, 1]
                }
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                color: ['rgb(131,249,103)', '#FBFE27', '#FE5050', '#1DB7E5'], //'#FBFE27','rgb(11,228,96)','#FE5050'
                data: [{
                    "value": 1924,
                    "name": "药剂消耗量"
                }, {
                    "value": 1055,
                    "name": "天然气消耗量"
                }, {
                    "value": 1532,
                    "name": "用电量"
                }
                ].sort(function (a, b) {
                    return a.value - b.value
                }),
                roseType: 'radius',

                label: {
                    normal: {
                        formatter: ['{c|{c}万元}', '{b|{b}}'].join('\n'),
                        rich: {
                            c: {
                                color: 'rgb(241,246,104)',
                                fontSize: 20,
                                fontWeight: 'bold',
                                lineHeight: 5
                            },
                            b: {
                                color: 'rgb(98,137,169)',
                                fontSize: 14,
                                height: 44
                            },
                        },
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgb(98,137,169)',
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20,

                    }
                }
            }]
        };
        fetch('http://127.0.0.1:8081/read_excel/3')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                option.series[0].data[0].value = data.natural_gas.toFixed(2)
                option.series[0].data[1].value = data.power_consumption.toFixed(2)
                // option.series[0].data[0].value=data["carbon_emulsion"]
                // option.series[0].data[2].value=data["power_consumption"]
                option.series[0].data[2].value = data.carbon_emulsion.toFixed(2)
                option.title.text = data["total"].toFixed(2)
                // option.xAxis[0].data=data.month
                // option.xAxis[0].data=data.month
                // var xAxisData = option["xAxis"];
                // console.log(xAxisData);
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
                // console.log()
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function pe01() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pe01'));
        var txt = 81
        var option = {
            title: {
                text: txt + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '18'
                }
            },
            color: 'rgba(255,255,255,.3)',

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['65%', '80%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: txt,
                    name: '已使用',
                    itemStyle: {
                        normal: {
                            color: '#eaff00',
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '未使用',
                    value: 100 - txt
                }]
            }]
        };


        fetch('http://127.0.0.1:8081/energy_overview')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                option.series[0].data[0].value = 90;
                option.series[0].data[1].value = 10;
                console.log(option)
                myChart.setOption(option);
                window.addEventListener("resize", function () {
                    myChart.resize();
                });
                // console.log()
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }

    function pe02() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pe02'));
        var txt = 17
        option = {
            title: {
                text: txt + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '18'
                }
            },
            color: 'rgba(255,255,255,.3)',

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['65%', '80%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: txt,
                    name: '已使用',
                    itemStyle: {
                        normal: {
                            color: '#ea4d4d',
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '未使用',
                    value: 100 - txt
                }]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function pe03() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pe03'));
        var txt = 2
        option = {
            title: {
                text: txt + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '18'
                }
            },
            color: 'rgba(255,255,255,.3)',

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['65%', '80%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: txt,
                    name: '已使用',
                    itemStyle: {
                        normal: {
                            color: '#395ee6',
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '未使用',
                    value: 100 - txt
                }
                ]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
})



		
		
		


		



















