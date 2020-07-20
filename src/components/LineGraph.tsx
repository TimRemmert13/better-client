import React, { HtmlHTMLAttributes } from 'react'
import * as d3 from 'd3'
import { blue } from '@material-ui/core/colors'

type Data = {
  total: number
  date: Date
}

class LineGraph extends React.Component {
  private canvas?: SVGElement | null

  private graphWidth: number = 1400

  private graphHeight: number = 400

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
    //window.addEventListener('resize', this.updateDimensions)
    this.update(this.data)
  }

  public componentWillUnmount() {
    //window.removeEventListener('resize', this.updateDimensions)
  }

  initialize = () => {}

  update = (data: Data[]) => {
    const margin = { top: 40, right: 20, bottom: 50, left: 40 }

    this.graphWidth = 1000 - (margin.left + margin.right)
    this.graphHeight = 400 - (margin.top + margin.bottom)

    const svg = d3
      .select(this.canvas!)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 1000 400')
      .attr('display', 'inline-block')
      .attr('postion', 'absolute')
      .attr('top', '0')
      .attr('left', '0')

    const graph = svg
      .append('g')
      .attr('width', this.graphWidth)
      .attr('height', this.graphHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // define scales
    const x = d3.scaleTime().range([0, this.graphWidth])
    const y = d3.scaleLinear().range([this.graphHeight, 0])

    // axis groups
    const xAxisGroup = graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.graphHeight})`)

    const yAxisGroup = graph.append('g').attr('class', 'y-axis')

    // d3 line path generator
    const line = d3
      .line<Data>()
      .x(function (d) {
        return x(d.date)
      })
      .y(function (d) {
        return y(d.total)
      })

    const path = graph.append('path')
    // set scale domains
    const xDomain = d3.extent(data, (d) => d.date)
    const max = d3.max(data, (d) => d.total) as number
    x.domain([xDomain[0]!, xDomain[1]!])
    y.domain([0, max])

    // update path data
    path
      .data([this.data])
      .attr('fill', 'none')
      .attr('stroke', blue[500])
      .attr('stroke-width', 2)
      .attr('d', line)

    const totalLength = path.node()?.getTotalLength()

    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength!)
      .transition()
      .delay(2000)
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0)

    // create circles for objects
    const circles = graph.selectAll('circle').data(data)

    //update existing points
    circles
      .attr('r', 4)
      .attr('cx', (d) => x(d.date))
      .attr('cy', this.graphHeight) // set starting point
      .transition()
      .duration(2000)
      .attr('cy', (d) => y(d.total))

    // add new points
    circles
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('fill', '#000000')
      .attr('cx', (d) => x(d.date))
      .attr('cy', this.graphHeight)
      .transition()
      .duration(2000)
      .attr('cy', (d) => y(d.total))

    // remove deleted points
    circles.exit().remove()

    // create axis
    const xAxis = d3.axisBottom(x).ticks(7)
    //.tickFormat(d3.timeFormat('%b %d'))

    const yAxis = d3.axisLeft(y).ticks(4)

    // call Axis
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    // rotate axis text
    xAxisGroup
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end')
  }

  updateDimensions = (event: UIEvent) => {
    const containerWidth = document.getElementById('graph-container')
      ?.clientWidth
    const margin = { top: 40, right: 20, bottom: 50, left: 40 }
    d3.select(this.canvas!)
      .attr('width', containerWidth!)
      .attr('height', this.graphHeight + margin.top + margin.bottom)
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
