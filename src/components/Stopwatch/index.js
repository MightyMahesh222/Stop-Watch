// Write your code here
import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  constructor(props) {
    super(props)
    this.state = {minutes: 0, seconds: 0, isStart: false}
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  onStart = () => {
    this.intervalId = setInterval(this.addSeconds, 1000)
    this.setState({isStart: true})
  }

  onStop = () => {
    clearInterval(this.intervalId)
    this.setState({isStart: false})
  }

  onReset = () => {
    this.setState({minutes: 0, seconds: 0, isStart: false})
    clearInterval(this.intervalId)
  }

  addSeconds = () => {
    const {seconds} = this.state
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
    }))
    if (seconds === 59) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        seconds: 0,
      }))
    }
  }

  realTimerWithZeros = () => {
    const {minutes, seconds} = this.state
    const finalMinutes = minutes > 9 ? minutes : `0${minutes}`
    const finalSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${finalMinutes}:${finalSeconds}`
  }

  render() {
    const {isStart} = this.state
    return (
      <div className="mainDiv">
        <h1 className="stopWatch">Stopwatch</h1>
        <div className="timerDiv">
          <div className="timersDiv">
            <img
              alt="stopwatch"
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            />
            <p className="timer">Timer</p>
          </div>
          <h1 className="time">{this.realTimerWithZeros()}</h1>
          <div className="btnContainer">
            <div>
              <button
                disabled={isStart}
                className="start"
                type="button"
                onClick={this.onStart}
              >
                Start
              </button>
            </div>
            <div>
              <button className="stop" type="button" onClick={this.onStop}>
                Stop
              </button>
            </div>
            <div>
              <button className="reset" type="button" onClick={this.onReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
