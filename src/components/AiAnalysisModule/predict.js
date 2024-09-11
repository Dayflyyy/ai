import * as echarts from 'echarts';

export function setOption(chart,records){
    let jsonObject = JSON.parse(jsonString);    
    let keysArray = [];  
    let valuesArray = [];  

    for (let key in jsonObject) {   
        if (jsonObject.hasOwnProperty(key)) {  
            keysArray.push(key);  
            valuesArray.push(jsonObject[key]);  
        }  
    }  
    chart.setOption({
        title: {
            text: '全球新能源汽车销量预测',
            left: 'center', 
          },
        xAxis: {
          type: 'category',
          name:'月份',
          data: keysArray,
        },
        yAxis: {
         name:'销量(单位辆)',
          type: valuesArray,
        },

        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
    })
}