import React, {Component} from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            date: ['天', '一', '二', '三', '四', '五', '六']
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date(),
        })
    }

    render() {
        return (
            <div style={{width: "20em"}}>
                <div style={{textAlign: "center"}}>
                    <b style={{fontSize: "2em"}}>{this.state.time.getFullYear()}年{this.state.time.getMonth()+1}月{this.state.time.getDate()}日 星期{this.state.date.at(this.state.time.getDay())}</b>
                </div>
                <div style={{textAlign: "center"}}>
                    <b style={{fontSize: "3em"}}>{this.state.time.toLocaleTimeString('en-GB')}</b>
                </div>
            </div>
        );
    }
}
