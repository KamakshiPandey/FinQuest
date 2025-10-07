import React, { Component } from "react";
import Chart from "react-apexcharts";
import industries from "../../../data/industries_data.json";
import { connect } from "react-redux";
class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          width: 700, // Adjust the width as needed
          height: 600, // Adjust the height as needed
          type: "donut",
        },
      },
      series: [],
      labels: [],
      portfolioData: [],
      industryData: {},
      dataProcessed: false, // Flag to track if data processing is complete
    };
  }

  componentDidMount() {
    this.updatePortfolioData(this.props.user);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.updatePortfolioData(this.props.user);
    }
  }

  updatePortfolioData = (user) => {
    if (user && user.portfolio) {
      const formattedData = user.portfolio.map((item) => {
        const industry = industries.find(
          (industry) => industry.symbol === item.stockSymbol
        );
        return {
          ...item,
          industryName: industry ? industry.industry : "",
        };
      });
      this.setState(
        { portfolioData: formattedData },
        this.calculateIndustryData
      );
    }
  };

  calculateIndustryData = () => {
    const { portfolioData } = this.state;
    if (portfolioData.length > 0) {
      const industryStats = portfolioData.reduce((acc, item) => {
        const { industryName, quantity, buy_cost } = item;
        if (!acc[industryName]) {
          acc[industryName] = { totalQuantity: 0, totalBuyCost: 0 };
        }
        acc[industryName].totalQuantity += quantity;
        acc[industryName].totalBuyCost += quantity * buy_cost;
        return acc;
      }, {});
      this.setState(
        { industryData: industryStats },
        this.calculatePieChartData
      );
    }
  };

  calculatePieChartData = () => {
    const { industryData } = this.state;
    const sortedIndustries = Object.entries(industryData).sort(
      ([, a], [, b]) => b.totalBuyCost - a.totalBuyCost
    );
    const topTenIndustries = sortedIndustries.slice(0, 10);
    const otherIndustriesBuyCost = sortedIndustries
      .slice(10)
      .reduce((total, [, { totalBuyCost }]) => total + totalBuyCost, 0);
    const totalBuyCostAllIndustries = sortedIndustries.reduce(
      (total, [, { totalBuyCost }]) => total + totalBuyCost,
      0
    );
    const topTenPercentages = topTenIndustries.map(
      ([industry, { totalBuyCost }]) => ({
        industry,
        percentage: (totalBuyCost / totalBuyCostAllIndustries) * 100,
      })
    );
    const labels = [
      ...topTenPercentages.map(({ industry }) => industry),
      "Others",
    ];
    const series = [
      ...topTenPercentages.map(({ percentage }) => percentage),
      (otherIndustriesBuyCost / totalBuyCostAllIndustries) * 100,
    ];
    this.setState({ labels, series, dataProcessed: true });

    // Update the labels in the options state
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        labels: labels,
      },
    }));
  };

  render() {
    const { options, labels, series, dataProcessed } = this.state;

    return (
      <div>
        <div className="donut" style={{ width: "100%", height: "130%" }}>
          {dataProcessed && (
            <Chart options={options} series={series} type="donut" />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user,
});

export default connect(mapStateToProps)(Donut);
