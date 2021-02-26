import React,{createRef, useEffect, useState} from 'react';
import * as d3 from "d3";
import {Button, Form} from 'semantic-ui-react';

const barGraph = () => {
    const [form, setForm] = useState({
        data: []
    });
    useEffect(() => {
        const isNote = Object.values(form).every(elm => Boolean(elm));
        setDisabled(!isNote);
      }, [form]);
      const [disabled, setDisabled] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    drawChart(form)
    setIsSubmitting(false);
    
}
const handleChange = (e) => {
  let val;
  if(e.target.name === 'data') {
    let str = e.target.value
    val = str.replace(/,\s*$/, "").split(',').map(e => Number(e));
  }
  setForm({
      ...form,
      [e.target.name]: e.target.name === 'data'? val : e.target.value
  });
}
  return (
      <>
      <div className="form__container">
    {
        <Form onSubmit={handleSubmit} loading={isSubmitting}>
            <Form.Input
            fluid
            label="Data"
            placeholder="Data separated by ,"
            name="data"
            onChange={handleChange}/>
            <Button color="orange" type="submit" disabled={disabled}>Create</Button>
        </Form>
    }
    </div>
    <div id="chart">
      <svg/>
    </div>
    </>
  );
}
function drawChart(form) {
    d3.select("svg").remove();
    const data = form.data;
    const h = 300;
    const w = 600;
    const svg = d3.select("#chart")
    .append("svg");

    svg
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 100);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")

  svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text((d) => d)
  .attr("x", (d, i) => i * 70)
  .attr("y", (d, i) => h - (10 * d) - 3)
  }
export default barGraph;
