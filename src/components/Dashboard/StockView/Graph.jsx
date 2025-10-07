import React from "react";
import ReactApexChart from "react-apexcharts";
import fetchPrevCloseData from "../../../../pyserver/MakeRequest/getPrevCloseData";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";

class ApexChart extends React.Component {
    constructor({ symbol }) {
        super();
        this.state = {
            symbol,
            series: [{ data: [] }],
            options: {
                chart: {
                    id: "area-datetime",
                    type: "area",
                    height: 500,
                    zoom: {
                        autoScaleYaxis: true,
                    },
                },
                annotations: {
                    yaxis: [
                        {
                            y: 30,
                            borderColor: "#999",
                            label: {
                                show: true,
                                text: "Support",
                                style: {
                                    color: "#fff",
                                    background: "#00E396",
                                },
                            },
                        },
                    ],
                    xaxis: [
                        {
                            x: new Date("14 Sep 2012").getTime(),
                            borderColor: "#999",
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                text: "Rally",
                                style: {
                                    color: "#fff",
                                    background: "#775DD0",
                                },
                            },
                        },
                    ],
                },
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 0,
                    style: "hollow",
                },
                xaxis: {
                    type: "datetime",
                    min: new Date("01 Mar 2012").getTime(),
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: "dd MMM yyyy",
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
                    selection: "one_year",
                    isAllButtonVisible: false,
                    isThreeYearButtonVisible: false,
                    isFiveYearButtonVisible: false,
                },
                yAxisRange: {
                    min: null,
                    max: null,
                },
            },
            selection: "one_year",
            error: null,
        };
    }

    async componentDidMount() {
        try {
            await this.fetchDataAndUpdateState(this.state.selection);
            this.fetchCurrentStockPrice();
            this.refreshDataTimer = setInterval(() => {
                this.fetchDataAndUpdateState(this.state.selection);
                this.fetchCurrentStockPrice();
            }, 15 * 60 * 1000);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    componentWillUnmount() {
        clearInterval(this.refreshDataTimer);
    }

    async fetchDataAndUpdateState(timeline) {
        const { symbol } = this.state;
        try {
            const data = await fetchPrevCloseData(symbol);
            console.log("Data error : ", data);
            if (!data || !data.previous_close) {
                throw new Error(
                    "Data or previous_close array is missing or empty."
                );
            }
            const seriesData = data.previous_close.map((item) => [
                item.timestamp * 1000,
                typeof item.prevclose === "string"
                    ? parseFloat(item.prevclose.replace(",", ""))
                    : item.prevclose,
            ]);
            const minTimestamp =
                Math.min(...data.previous_close.map((item) => item.timestamp)) *
                1000;
            const today = new Date();
            const newState = {
                series: [{ data: seriesData }],
                options: {
                    ...this.state.options,
                    xaxis: {
                        ...this.state.options.xaxis,
                        min: minTimestamp,
                    },
                },
                isFiveYearButtonVisible:
                    today.getFullYear() - new Date(minTimestamp).getFullYear() >
                    4.9,
                isThreeYearButtonVisible:
                    today.getFullYear() - new Date(minTimestamp).getFullYear() >
                    3,
                isAllButtonVisible: true,
                yAxisRange: {
                    min: Math.min(...seriesData.map((item) => item[1])),
                    max: Math.max(...seriesData.map((item) => item[1])),
                },
            };
            this.setState(newState);
            this.updateData(timeline);
        } catch (error) {
            console.error("Error:", error.message);
            // throw error;
        }
    }

    async fetchCurrentStockPrice() {
        try {
            const currentPrice = await fetchCurrentPrice(this.state.symbol);
            this.setState({ currentPrice });
        } catch (error) {
            console.error("Error fetching current price:", error);
            throw error;
        }
    }

    updateChart(startDate, endDate) {
        // Update the x-axis range
        ApexCharts.exec("area-datetime", "zoomX", startDate, endDate);

        // Update the state to trigger re-render and adjust the y-axis range
        this.setState((prevState) => ({
            options: {
                ...prevState.options,
                yaxis: {
                    ...prevState.options.yaxis,
                    min: prevState.yAxisRange.min,
                    max: prevState.yAxisRange.max,
                },
            },
        }));
    }

    updateData(timeline) {
        const today = new Date();
        this.setState({ selection: timeline }); // Update selection state here

        switch (timeline) {
            case "one_month":
                this.updateChart(
                    new Date(
                        today.getFullYear(),
                        today.getMonth() - 1,
                        today.getDate()
                    ).getTime(),
                    today.getTime()
                );
                break;
            case "six_months":
                this.updateChart(
                    new Date(
                        today.getFullYear(),
                        today.getMonth() - 6,
                        today.getDate()
                    ).getTime(),
                    today.getTime()
                );
                break;
            case "one_year":
                this.updateChart(
                    new Date(
                        today.getFullYear() - 1,
                        today.getMonth(),
                        today.getDate()
                    ).getTime(),
                    today.getTime()
                );
                break;
            case "three_year":
                this.updateChart(
                    new Date(
                        today.getFullYear() - 3,
                        today.getMonth(),
                        today.getDate()
                    ).getTime(),
                    today.getTime()
                );
                break;
            case "all":
                this.updateChart(this.state.options.xaxis.min, today.getTime());
                break;
            case "one_week":
                this.updateChart(
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 7
                    ).getTime(),
                    today.getTime()
                );
                break;
            case "one_day":
                this.updateChart(
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    ).getTime() -
                        24 * 60 * 60 * 1000,
                    today.getTime()
                );
                break;
            default:
                break;
        }
    }

    renderButtons() {
        const {
            isAllButtonVisible,
            isThreeYearButtonVisible,
            isFiveYearButtonVisible,
        } = this.state;
        return (
            <div className="toolbar text-sm flex justify-center bg-bgWhite rounded-md w-fit">
                <button
                    className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "one_week" ? "text-blue" : ""}`}
                    onClick={() => this.updateData("one_week")}
                >
                    1W
                </button>
                <button
                    className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "one_month" ? "text-blue" : ""}`}
                    onClick={() => this.updateData("one_month")}
                >
                    1M
                </button>
                <button
                    className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "six_months" ? "text-blue" : ""}`}
                    onClick={() => this.updateData("six_months")}
                >
                    6M
                </button>
                <button
                    className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "one_year" ? "text-blue" : ""}`}
                    onClick={() => this.updateData("one_year")}
                >
                    1Y
                </button>
                {isThreeYearButtonVisible && (
                    <button
                        className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "three_year" ? "text-blue" : ""}`}
                        onClick={() => this.updateData("three_year")}
                    >
                        3Y
                    </button>
                )}
                {isAllButtonVisible && (
                    <button
                        className={`m-1 px-2 text-xs hover:scale-95 ${this.state.selection === "all" ? "text-blue" : ""}`}
                        onClick={() => this.updateData("all")}
                    >
                        {isFiveYearButtonVisible ? "5Y" : "All"}
                    </button>
                )}
            </div>
        );
    }

    render() {
        const { currentPrice, error } = this.state;
        return (
            <div>
                {error && <div className="error-message">{error}</div>}
                {this.renderButtons()}
                {currentPrice && (
                    <div className="flex justify-start ml-5">
                        <div className="text-start">
                            <div className="font-bold">
                                {currentPrice.lastPrice.toFixed(2)}
                            </div>
                            <div className="flex gap-3">
                                <div
                                    className={
                                        currentPrice.pChange < 0
                                            ? "text-red"
                                            : "text-green"
                                    }
                                >
                                    {currentPrice.pChange.toFixed(2)}
                                </div>
                                <div
                                    className={
                                        currentPrice.change < 0
                                            ? "text-red"
                                            : "text-green"
                                    }
                                >
                                    {currentPrice.change.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div id="chart">
                    <div id="chart-timeline">
                        <ReactApexChart
                            options={this.state.options}
                            series={this.state.series}
                            type="area"
                            height={350}
                            width={"100%"}
                        />
                    </div>
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChart;
