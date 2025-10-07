import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";
import { graphEndpoints } from "../../../api/api";
import { current } from "@reduxjs/toolkit";

class ApexChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: "Bought Value",
					data: [],
					type: "line", // Set type to 'line' for the first series
				},
				{
					name: "Current Value",
					data: [],
					type: "line", // Set type to 'line' for the second series
				},
				{
					name: "Markdown Points", // Renamed from 'Markdown Line'
					data: [], // Placeholder for markdown points data
					type: "scatter", // Set type to 'scatter' for the third series
					color: "#FFFF00", // Yellow color for markdown points
				},
			],
			markdownSeries: [],
			options: {
				chart: {
					id: "area-datetime",
					height: 350,
					zoom: {
						autoScaleYaxis: true,
					},
				},
				xaxis: {
					type: "datetime",
				},
				dataLabels: {
					enabled: false,
				},
				markers: {
					size: 8,
				},
				tooltip: {
					x: {
						format: "dd MMM yyyy",
					},
				},
				fill: {
					type: "solid",
				},
			},
			selection: "one_year",
			priceData: {},
			isPromptOpen: false,
			error: null,
		};
	}

	componentDidMount() {
		this.fetchChartData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user) {
			this.fetchChartData();
		}
	}

	fetchChartData = async () => {
		try {
			const { user } = this.props;
			console.log("User",user);

			if (!user || !user.transactions || !user.portfolioGraph) {
				throw new Error(
					"User data or transactions or portfolio graph data not available"
				);
			}

			const { transactions, portfolioGraph } = user;
			console.log(transactions);
			console.log(portfolioGraph);

			const boughtValueData = this.calculateBoughtValueOverTime(transactions);
			const currentValueData = await this.calculateCurrentValueOverTime(
				transactions,
				boughtValueData
			);

			console.log("Current value data ",boughtValueData);
			const markdownValue = this.calculateMarkdownValue(portfolioGraph);
			console.log("abc");
			const markdownLineData = [
				[boughtValueData[0][0], markdownValue],
				[currentValueData[currentValueData.length - 1][0], markdownValue],
			];
			
			console.log("def");
			this.setState({
				series: [
					{ ...this.state.series[0], data: boughtValueData },
					{ ...this.state.series[1], data: currentValueData },
					{ ...this.state.series[2], data: markdownLineData },
				],
				markdownSeries: portfolioGraph,
				error: null,
			});
		} catch (error) {
			console.error("Error:hjl", error);
			this.setState({ error: error.message });
		}
	};

	calculateBoughtValueOverTime = (transactions) => {
		const boughtValues = [];
		let totalBoughtValue = 0;

		for (const transaction of transactions) {
			const timestamp = new Date(transaction.orderDate).getTime();
			if (transaction.orderType === "Buy") {
				totalBoughtValue += transaction.tradeValue;
			} else if (transaction.orderType === "Sell") {
				totalBoughtValue -= transaction.tradeValue;
			}
			boughtValues.push([timestamp, totalBoughtValue]);
		}

		return boughtValues;
	};

	calculateCurrentValueOverTime = async (transactions, boughtValues) => {
		const currentValueData = [];

		for (const [timestamp, boughtValue] of boughtValues) {
			let totalCurrentValue = 0;

			for (const transaction of transactions) {
				if (new Date(transaction.orderDate).getTime() <= timestamp) {
					const { stockSymbol } = transaction;
					let currentPrice = this.state.priceData[stockSymbol];

					if (!currentPrice) {
						const currentPriceData = await fetchCurrentPrice(stockSymbol);
						currentPrice = currentPriceData.lastPrice;
						this.setState((prevState) => ({
							priceData: {
								...prevState.priceData,
								[stockSymbol]: currentPrice,
							},
						}));
					}

					totalCurrentValue += currentPrice * transaction.quantity;
				}
			}

			currentValueData.push([timestamp, totalCurrentValue]);
		}

		return currentValueData;
	};

	calculateMarkdownValue = (portfolioGraph) => {
		const latestEntry = portfolioGraph[0]; // Get the latest entry from portfolioGraph

		if (!latestEntry) {
			// If no entry is found, return 0
			return 0;
		}

		// Get curr_value and buy_value from the latest entry
		const { curr_value, buy_value } = latestEntry;

		// Calculate markdown value
		const markdownValue = (curr_value + buy_value) / 2;
		return markdownValue;
	};

	handleChartClick = (event, chartContext, config) => {
		// Extract the timestamp of the clicked point
		const timestamp = config.dataPointIndex;

		// Open a prompt or modal asking the user if they want to mark this date
		if (window.confirm("Do you want to mark this date?")) {
			// Handle marking the date
			this.handleMarkDate(timestamp);
		}
	};

	handleMarkDate = async (timestamp) => {
		const { token, user } = this.props;
		const { series } = this.state;

		// Get the current and bought values at the marked timestamp
		const curr_value = series[1].data[timestamp][1];
		const buy_value = series[0].data[timestamp][1];

		try {
			// Make API call to add the marked point
			const response = await fetch(graphEndpoints.GRAPH_POINT_ADDITION_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ curr_value, buy_value, timestamp }),
			});

			if (!response.ok) {
				throw new Error("Failed to add to graph");
			}

			const responseData = await response.json();

			// Create a new graph point object
			const newGraphPoint = {
				createdAt: responseData.createdAt,
				timestamp,
				curr_value,
				buy_value,
			};

			// Update the portfolioGraph in user data
			const updatedPortfolioGraph = [newGraphPoint, ...user.portfolioGraph];
			const slicedPortfolioGraph = updatedPortfolioGraph.slice(0, 10);
			const updatedUser = {
				...user,
				portfolioGraph: slicedPortfolioGraph,
			};

			// Update the user data in localStorage
			localStorage.setItem("StockVoyager_user", JSON.stringify(updatedUser));

			console.log("Date marked successfully");
		} catch (error) {
			console.error("Error marking date:", error);
		}
	};

	openMarkdownPrompt = () => {
		this.setState({ isPromptOpen: true });
	};

	handleMarkdownYes = async () => {
		const { token, user } = this.props;
		const { series } = this.state;

		const curr_value = series[1].data[series[1].data.length - 1][1];
		const buy_value = series[0].data[series[0].data.length - 1][1];
		const timestamp = Date.parse(new Date());

		try {
			const response = await fetch(graphEndpoints.GRAPH_POINT_ADDITION_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ curr_value, buy_value, timestamp }),
			});

			if (!response.ok) {
				throw new Error("Failed to add to graph");
			}

			const responseData = await response.json();

			const newGraphPoint = {
				createdAt: responseData.createdAt,
				timestamp,
				curr_value,
				buy_value,
			};

			const updatedPortfolioGraph = [newGraphPoint, ...user.portfolioGraph];
			const slicedPortfolioGraph = updatedPortfolioGraph.slice(0, 10);
			const updatedUser = {
				...user,
				portfolioGraph: slicedPortfolioGraph,
			};

			localStorage.setItem("StockVoyager_user", JSON.stringify(updatedUser));

			console.log("Added to graph successfully");
		} catch (error) {
			console.error("Error adding to graph:", error);
		}

		this.setState({ isPromptOpen: false });
	};

	handleMarkdownNo = () => {
		this.setState({ isPromptOpen: false });
	};

	render() {
		const { error, isPromptOpen } = this.state;

		if (error) {
			return <div>Error: {error}</div>;
		}

		return (
			<div>
				<h2 className="text-2xl text-center font-bold">
					Portfolio Performance
				</h2>
				<div
					className="chart-container"
					style={{ width: "100%", height: "120%", margin: "auto" }}
				>
					<ReactApexChart
						options={this.state.options}
						series={this.state.series}
						type="area"
						height={350}
						events={{
							click: this.handleChartClick,
						}}
					/>
				</div>
				<button
					onClick={this.openMarkdownPrompt}
					className="mt-4 bg-theme hover:opacity-70 text-white font-bold py-2 px-4 rounded"
				>
					Markdown Today
				</button>
				{isPromptOpen && (
					<div className="markdown-prompt">
						<div className="markdown-prompt-content">
							<p>Do you want to markdown today?</p>
							<div>
								<button
									onClick={this.handleMarkdownYes}
									className="mr-2 bg-theme hover:opacity-70 text-white font-bold py-2 px-4 rounded"
								>
									Yes
								</button>
								<button
									onClick={this.handleMarkdownNo}
									className="bg-red hover:opacity-70 text-white font-bold py-2 px-4 rounded"
								>
									No
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.profile.user,
	token: state.auth.token,
});

export default connect(mapStateToProps)(ApexChart);
