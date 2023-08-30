import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";

function BarChart({yearlyData}) {
    const [data, setData] = useState({
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: ["#01cf6b"],
                backgroundColor: [
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                    "#01cf6b",
                ],
            },
        ],
    })

    useEffect(() => {
        if (Object.keys(yearlyData).length > 0) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const dataSet = []
            for (let item of months) {
                if (!yearlyData[item]) {
                    dataSet.push(0)
                } else {
                    dataSet.push(yearlyData[item].length)
                }
            }
            const cloneDataSet = {...data}
            cloneDataSet.datasets[0].data = dataSet
            setData(cloneDataSet)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearlyData]);


    const options = {
        legend: {
            display: false,
        },
        scales: {
            yAxes: [
                {
                    display: false,
                },
            ],
            xAxes: [
                {
                    display: false,
                },
            ],
        },
    };

    return <Bar data={data} options={options}/>;
}

export default BarChart;
