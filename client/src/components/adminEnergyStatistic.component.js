import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';




export default class AdminEnergyStatics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meterReading: []
        }
    };

    componentDidMount() {

        ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip,
            Legend
        );

        fetch('http://localhost:4000/getenergystatistics')
            .then(res => res.json())
            .then(json => {
                this.setState.meterReading = json;
                console.log("hi", this.setState.meterReading);

                const dayMeterReadingTotal = this.setState.meterReading.data.reduce((acc, cur) => acc + cur.daymeterreading, 0);
                const nightMeterReadingTotal = this.setState.meterReading.data.reduce((acc, cur) => acc + cur.nightmeterreading, 0);
                const gasMeterReadingTotal = this.setState.meterReading.data.reduce((acc, cur) => acc + cur.gasmeterreading, 0);

                const total = this.setState.meterReading.data.length;

                const dayMeterReadingAverage = (dayMeterReadingTotal / total);
                const nightMeterReadingAverage = (nightMeterReadingTotal / total);
                const gasMeterReadingAverage = (gasMeterReadingTotal / total) / 30;
                const ElectricityAverage = (((nightMeterReadingAverage + dayMeterReadingAverage) / 2) / 30);

                console.log(ElectricityAverage);
                //console.log(nightMeterReadingAverage);
                console.log(gasMeterReadingAverage);
                var chart = [ElectricityAverage, gasMeterReadingAverage];
                this.setState({ chart });




            }
            );





    }




    labels = ['Average Eletricity Usage ', 'Average Gas'];



    render() {



        const data = {
            labels: ['Average Eletricity consumption per Day', 'Average Gas consumption per day'],
            datasets: [
                {
                    label: 'Usage (kWh)',
                    data: this.state.chart,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        return (
            <div>
                <h2>Usage Chart</h2>
                <Bar data={data} options={options} />
                <p className="text-right">
                    <a href="/admin">Go back </a>
                </p>
            </div>



        );
    }
}


