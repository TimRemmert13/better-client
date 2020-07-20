import React from 'react'
import { timeWeek } from 'd3'
import * as d3 from 'd3'
import { blue } from '@material-ui/core/colors'
import moment, { locale } from 'moment'

type Data = {
  date: Date
  value: number
}

class HeatMap extends React.Component {
  private canvas?: SVGElement | null
  private CELL_SIZE: number = 17
  private CELL_PADDING: number = 3
  private MONTH_LABEL_PADDING = 6
  private graphWidth: number = 1000
  private graphHeight: number = 400
  private oneYearAgo: Date = moment()
    .startOf('day')
    .subtract(1, 'year')
    .toDate()
  private now: Date = moment().endOf('day').toDate()
  private width = 1200
  private height = 500
  private weekStartIndex = 1 // 1 for monday 0 for sunday

  data: Data[] = [
    {
      date: new Date('2020-9-1'),
      value: 3,
    },
    {
      date: new Date('2020-9-2'),
      value: 10,
    },
    {
      date: new Date('2020-9-3'),
      value: 1,
    },
    {
      date: new Date('2020-1-4'),
      value: 15,
    },
    {
      date: new Date('2020-1-5'),
      value: 1000,
    },
    {
      date: new Date('2020-1-6'),
      value: 100000,
    },
    {
      date: new Date('2020-1-7'),
      value: 5000,
    },
  ]

  getMaxValue = (data: Data[]): number => {
    return data
      .map((d) => d.value)
      .sort()
      .reverse()[0]
  }

  getDateValue = (d: Date, color: d3.ScaleLinear<string, string>): string => {
    let value = 0
    this.data.forEach((data) => {
      if (moment(data.date).isSame(d)) {
        value = data.value
      }
    })
    return color(value)
  }

  componentDidMount() {
    this.update()
  }

  update = () => {
    const margin = { top: 50, bottom: 40, left: 40, right: 40 }
    const svg = d3
      .select(this.canvas!)
      .attr('width', this.width - margin.left - margin.right)
      .attr('height', this.height - margin.top - margin.bottom)

    const graph = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const dateRange = d3.timeDays(this.oneYearAgo, this.now)
    const monthRange = d3.timeMonths(
      moment(this.oneYearAgo).startOf('month').toDate(),
      this.now
    )
    const firstDate = moment(dateRange[0])

    // create color range
    const color = d3
      .scaleLinear<string>()
      .range([blue[50], blue[900]])
      .domain([0, this.getMaxValue(this.data)])

    // create day rectangles
    const dayRects = graph
      .selectAll('rect')
      .data(dateRange)
      .enter()
      .append('rect')
      .attr('width', this.CELL_SIZE)
      .attr('height', this.CELL_SIZE)
      .attr('fill', (d) => {
        console.log(this.getDateValue(d, color))
        return this.getDateValue(d, color)
      })
      .attr(
        'x',
        (d, i) =>
          timeWeek.count(d3.utcYear(d), d) *
            (this.CELL_SIZE + this.CELL_PADDING) +
          10
      )
      .attr('y', (d, i) => {
        return (
          this.MONTH_LABEL_PADDING +
          d.getUTCDay() * (this.CELL_SIZE + this.CELL_PADDING) +
          0.5
        )
      })

    // remove exit selection of outdated day rects and add new ones
    dayRects.exit().remove()

    // add day labels
    const dayLabels = graph
      .selectAll('text')
      .data(['M', 'W', 'F'])
      .enter()
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', 0)
      .attr('y', (d) => {
        switch (d) {
          case 'M':
            return (
              2 * (this.CELL_SIZE + this.CELL_PADDING) -
              (this.CELL_PADDING + 0.5)
            )
          case 'W':
            return (
              4 * (this.CELL_SIZE + this.CELL_PADDING) -
              (this.CELL_PADDING + 0.5)
            )
          case 'F':
            return (
              6 * (this.CELL_SIZE + this.CELL_PADDING) -
              (this.CELL_PADDING + 0.5)
            )
          default:
            return 0
        }
      })
      .attr('dy', '0.35em')
      .style('font-size', '12px')
      .text((d) => d)

    // add month labels
    const monthLabels = graph
      .selectAll('.month')
      .data(monthRange.slice(1))
      .enter()
      .append('text')
      .text((d) => moment(d.getMonth() + 1, 'MM').format('MMM'))
      .attr('x', (d, i) => {
        let matchIndex = 0
        dateRange.find((element, index) => {
          matchIndex = index
          return (
            moment(d).isSame(element, 'month') &&
            moment(d).isSame(element, 'year')
          )
        })
        return (
          Math.floor(matchIndex / 7) * (this.CELL_SIZE + this.CELL_PADDING) + 10
        )
      })
      .attr('y', 0)
  }

  formatWeekday = (d: number) => {
    if (this.weekStartIndex === 1) {
      if (d === 0) {
        return 6
      } else {
        return d - 1
      }
    }
    return d
  }

  render() {
    return <svg ref={(ref) => (this.canvas = ref)}></svg>
  }
}

export default HeatMap
