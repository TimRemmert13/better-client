import React, { HtmlHTMLAttributes } from 'react'
import * as d3 from 'd3'
import { blue } from '@material-ui/core/colors'
import { line, xml } from 'd3'

type Data = {
  total: number
  date: Date
}

class LineGraph extends React.Component {
  private canvas?: SVGElement | null
  private line: d3.Selection<
    SVGPathElement,
    Data[],
    null,
    undefined
  > | null = null
  private dot: d3.Selection<
    SVGCircleElement,
    Data,
    SVGGElement,
    unknown
  > | null = null
  private x: d3.ScaleTime<number, number> | null = null
  private y: d3.ScaleLinear<number, number> | null = null

  public data: Data[] = [
    {
      date: new Date('2020-01-13'),
      total: 3,
    },
    {
      date: new Date('2020-01-14'),
      total: 3,
    },
    {
      date: new Date('2020-01-15'),
      total: 1,
    },
    {
      date: new Date('2020-01-16'),
      total: 5,
    },
    {
      date: new Date('2020-01-17'),
      total: 5,
    },
    {
      date: new Date('2020-01-18'),
      total: 7,
    },
    {
      date: new Date('2020-01-19'),
      total: 2,
    },
  ]

  public initData: Data[] = [
    {
      date: new Date('2020-01-13'),
      total: 0,
    },
    {
      date: new Date('2020-01-14'),
      total: 0,
    },
    {
      date: new Date('2020-01-15'),
      total: 0,
    },
    {
      date: new Date('2020-01-16'),
      total: 0,
    },
    {
      date: new Date('2020-01-17'),
      total: 0,
    },
    {
      date: new Date('2020-01-18'),
      total: 0,
    },
    {
      date: new Date('2020-01-19'),
      total: 0,
    },
  ]

  public componentDidMount() {
    this.initialize(this.initData)
    this.update(this.data)
  }

  initialize = (data: Data[]) => {
    const margin = { top: 40, right: 20, bottom: 50, left: 40 }

    const graphWidth = 560 - (margin.left + margin.right)
    const graphHeight = 400 - (margin.top + margin.bottom)

    const svg = d3
      .select(this.canvas!)
      .attr('width', graphWidth + margin.left + margin.right)
      .attr('height', graphHeight + margin.top + margin.bottom)

    const graph = svg
      .append('g')
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // define scales
    this.x = d3.scaleTime().range([0, graphWidth])
    this.y = d3.scaleLinear().range([graphHeight, 0])

    // axis groups
    const xAxisGroup = graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${graphHeight})`)

    const yAxisGroup = graph.append('g').attr('class', 'y-axis')

    // initialize line
    this.line = graph
      .append('g')
      .append('path')
      .datum(this.initData)
      .attr(
        'd',
        d3
          .line<Data>()
          .x((d) => this.x!(d.date))
          .y((d) => this.y!(d.total))
      )
      .attr('stroke', 'black')
      .style('stroke-width', 4)
      .style('fill', 'none')

    // initialize dots
    this.dot = graph
      .selectAll('circle')
      .data(this.initData)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.x!(d.date))
      .attr('cy', (d) => this.y!(d.total))
      .attr('r', 7)
      .style('fill', blue[500])

    // create axis
    const xAxis = d3.axisBottom(this.x).ticks(7)
    //.tickFormat(d3.timeFormat('%b %d'))

    const yAxis = d3.axisLeft(this.y).ticks(4)

    // call Axis
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    // rotate axis text
    xAxisGroup
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end')
  }

  update = (data: Data[]) => {
    this.line!.datum(data)
      .transition()
      .duration(2000)
      .attr(
        'd',
        d3
          .line<Data>()
          .x((d) => this.x!(d.date))
          .y((d) => this.y!(d.total))
      )
    this.dot!.data(data)
      .transition()
      .duration(2000)
      .attr('cx', (d) => this.x!(d.date))
      .attr('cy', (d) => this.y!(d.total))
  }

  lineTween = (d: Data) => {
    let i = d3.interpolate(0, d.total)
    return function (t: any) {
      return i(t)
    }
  }

  render() {
    return <svg ref={(ref) => (this.canvas = ref)}></svg>
  }
}

export default LineGraph
