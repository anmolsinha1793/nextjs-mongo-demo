import React, {useEffect} from 'react';
import * as d3 from "d3";

const staticBarGraph = () => {
    const DUMMY_DATA = [
        {id: 'd1', value: 12, region: 'USA'},
        {id: 'd2', value: 10, region: 'China'},
        {id: 'd3', value: 15, region: 'India'},
        {id: 'd4', value: 9, region: 'France'},
        {id: 'd5', value: 13, region: 'Germany'},
    ];
    const MARGINS = {
        top: 20,
        bottom: 10
    }
    const CHART_WIDTH = 600;
    const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;
    const xScale = d3.scaleBand().domain(DUMMY_DATA.map((dataPoint) => dataPoint.region)).rangeRound([0, CHART_WIDTH]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(DUMMY_DATA, d => d.value) + 3]).range([CHART_HEIGHT, 0])
    useEffect(() => {
        renderChartData();
    },[])
    const renderChartData = () => {
    let selectedData = DUMMY_DATA;
    const chartContainer = d3
    .select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGINS.top + MARGINS.bottom);

    const chart = chartContainer.append('g');

    chart.append('g').call(d3.axisBottom(xScale).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`).attr('color', '#4f009e');

    renderChart(chart, selectedData);

    let unselectedIds = [];
    const listItems = d3
        .select('#data')
        .select('ul')
        .selectAll('li')
        .data(DUMMY_DATA)
        .enter()
        .append('li');

    listItems
    .append('span')
    .text((data) => data.region);

    listItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', (e,data) => {
        console.log(e,data);
        if(unselectedIds.indexOf(data.id) === -1) {
            unselectedIds.push(data.id);
        } else {
            unselectedIds = unselectedIds.filter(id => id !== data.id);
        }
        selectedData = DUMMY_DATA.filter(data => unselectedIds.indexOf(data.id) === -1)
        renderChart(chart,selectedData);
    });
    }
    const renderChart = (chart, selectedData) => {
        chart
        .selectAll('.bar')
        .data(selectedData, data => data.id)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', xScale.bandwidth())
        .attr('height', data => CHART_HEIGHT - yScale(data.value))
        .attr('x', data => xScale(data.region))
        .attr('y', data => yScale(data.value));
    
        chart.selectAll('.bar').data(selectedData, data => data.id).exit().remove();

        chart.selectAll('.label').data(selectedData, data => data.id).enter()
        .append('text')
        .text(data => data.value)
        .attr('x', data => xScale(data.region) + xScale.bandwidth() / 2)
        .attr('y', data => yScale(data.value) - 20)
        .attr('text-anchor', 'middle')
        .classed('label', true);

        chart.selectAll('.label').data(selectedData, data => data.id).exit().remove();
    }
    return (
        <div id="app">
            <div id="chart">
            <svg>
        </svg>
            </div>
            <div id="data">
                <ul></ul>
            </div>
        </div>
        
    )
}

export default staticBarGraph;
