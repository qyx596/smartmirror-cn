import React, {Component} from "react";
import axios from "axios";
import xml2js from "xml2js"
import {CircularProgress, Fade} from "@mui/material";

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            updateTime: new Date(),
            content: [],
            index_num: 0,
            fade: true
        }
        this.getBetweenDays = this.getBetweenDays.bind(this);
        this.enteredNews = this.enteredNews.bind(this);
        this.exitedNews = this.exitedNews.bind(this);
    }

    getBetweenDays(date) {
        let now = new Date();
        let diffms = Math.abs(Date.parse(date) - now);
        let totalDays = Math.floor(diffms / (1000 * 3600 * 24));
        if (totalDays === 0) {
            return "今天"
        } else {
            return totalDays + "天前"
        }
    }

    freshNew(url) {
        let tmp = [];
        let parser = new xml2js.Parser();
        let promise = new Promise((resolve, reject) => {
            axios.get(url, {}).then(
                (res) => {
                    parser.parseString(res.data, function (err, data) {
                        data.rss.channel[0].item.map(item => {
                                if (item.title.length <= 20) {
                                    tmp.push({title: item.title, time: item.pubDate, source: item.author});
                                }
                        });
                    });
                    if (tmp.length !== 0) {
                        resolve(tmp);
                    } else {
                        reject("tmp length is 0");
                    }
                }
            )
        })
        return promise;
    }

    enteredNews() {
        setTimeout(() => {
            this.setState({fade: false});
        }, 15000)
    }

    exitedNews() {
        let t_index;
        if (this.state.index_num >= this.state.content.length - 1) {
            t_index = 0;
        } else {
            t_index = this.state.index_num + 1;
        }
        this.setState({fade: true, index_num: t_index});
    }

    componentDidMount() {
        this.freshNew("/rss/rss/politics.xml").then((data) => {
                this.setState({content: data, success: true});
            }
        )
        this.newID = setInterval(() => {
            this.freshNew("/rss/rss/politics.xml").then((data) => {
                    this.setState({content: data, success: true});
                }
            );
        }, 30 * 60 * 1000);
    }


    componentWillUnmount() {
        clearInterval(this.newID);
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                {!this.state.success ? <div style={{textAlign: "center"}}>
                    <CircularProgress color="inherit"/>
                </div> : <Fade in={this.state.fade} timeout={{enter: 2000, exit: 2000}} onEntered={this.enteredNews} onExited={this.exitedNews}>
                    <div style={{verticalAlign: "middle"}}>
                        <div style={{fontSize: "2.5em"}}>
                            <b>{this.state.content[this.state.index_num].title}</b>
                        </div>
                        <div style={{fontSize: "2em", color: "gray"}}>
                            <b>{this.state.content[this.state.index_num].source} {this.getBetweenDays(this.state.content[this.state.index_num].time)}</b>
                        </div>
                    </div>
                </Fade>
                }
            </div>
        );
    }
}
