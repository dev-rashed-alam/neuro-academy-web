import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
function LineChart({weeklyData}) {
    const [data, setData] = useState({
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: "Sales",
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: ["#01cf6b"],
                backgroundColor: ["transparent"],
                pointBorderColor: "#01cf6b",
                pointBackgroundColor: "#fff",
            },
        ],
    })

    useEffect(() => {
        if(Object.keys(weeklyData).length > 0){
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const dataSet = []
            for (let item of weekdays) {
                if (!weeklyData[item]) {
                    dataSet.push(0)
                } else {
                    dataSet.push(weeklyData[item].length)
                }
            }
            const cloneDataSet = {...data}
            cloneDataSet.datasets[0].data = dataSet
            setData(cloneDataSet)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weeklyData]);

    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        stepSize: 50,
                        fontColor: "#000",
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: "#000",
                    },
                },
            ],
        },
    };

    return <Line data={data} options={options}/>;
}

export default LineChart;
