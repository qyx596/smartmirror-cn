import React, {Component} from "react";
import axios from "axios";
import {Badge, CircularProgress, Fade, Grid, Icon} from "@mui/material";


class Covid19Status extends Component {
    constructor(props) {
        super(props);
        this.state = {success: false, result: null, updateTime: null, inLocal: 0};
        this.refreshData = this.refreshData.bind(this);
        this.inLocal = this.inLocal.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.refreshID);
        clearInterval(this.inLocalID);
    }

    inLocal() {
        axios({
            url: "/covid/nCoV/api/area",
            params: {
                latest: 1,
                province: "福建省"
            },
            method: 'get'
        }).then(
            res => {
                this.setState({inLocal: res.data.results[0].currentConfirmedCount})
            }
        ).catch(error => console.log(error))
    }

    refreshData() {
        this.setState({success: false});
        axios({
            url: "/covid/nCoV/api/overall",
            params: {},
            method: 'get'
        }).then(
            res => {
                this.setState({
                    success: true, result: {
                        currentConfirmedCount: res.data.results[0].currentConfirmedCount,
                        currentConfirmedIncr: res.data.results[0].currentConfirmedIncr ? res.data.results[0].currentConfirmedIncr : 0,
                        suspectedCount: res.data.results[0].suspectedCount,
                        suspectedIncr: res.data.results[0].suspectedIncr ? res.data.results[0].suspectedIncr : 0,
                        deadCount: res.data.results[0].deadCount,
                        deadIncr: res.data.results[0].deadIncr ? res.data.results[0].deadIncr : 0,
                        curedCount: res.data.results[0].curedCount,
                        curedIncr: res.data.results[0].curedIncr ? res.data.results[0].curedIncr : 0,
                    }, updateTime: new Date(res.data.results[0].updateTime), refresh: false
                });
            }
        ).catch(
            reason => {
                this.setState({success: false});
                console.log(reason);
            }
        )
    }

    componentDidMount() {
        this.refreshData();
        setTimeout(this.inLocal, 1000*3);
        this.refreshID = setInterval(
            () => this.refreshData(), 1000 * 60 * 60
        );
        this.inLocalID = setInterval(
            () => this.inLocal(), 1000 * 60 * 60
        );
    }

    render() {
        return (
            <div>
                <div style={{marginBottom: "6px", borderBottomStyle: "solid", borderBottomColor: "gray", borderBottomWidth: "1px", paddingBottom: "4px"}}>
                    <b style={{fontSize: "1.3em"}}>全国疫情数据</b>
                </div>
                {this.state.inLocal === 0 ? null
                    :
                    <Fade in={true} timeout={2000}>
                        <div style={{borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "gray", marginBottom: "3px"}}>
                            <div style={{display: "inline-block"}}>
                                <Icon style={{color: "#FFC300", float: "left"}}>warning</Icon>
                                <b style={{float: "left"}}>福建现存确诊: {this.state.inLocal}</b>
                            </div>
                        </div>
                    </Fade>
                    }
                <div>
                    {!this.state.success ?
                        <div style={{textAlign: "center"}}>
                            <CircularProgress color="inherit"/>
                        </div>
                        :
                        <Fade in={true} timeout={2000}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <div style={{textAlign: "center"}}>
                                        <div style={{marginBottom: "0.3em"}}>
                                            <b>现存确诊</b>
                                        </div>
                                        <div style={{color: "rgb(247, 76, 49)", fontSize: "1.5em"}}>
                                            <b>{this.state.result.currentConfirmedCount}</b>
                                        </div>
                                        <div>
                                            <b style={{
                                                color: "rgb(247, 76, 49)",
                                                fontSize: "1.3em"
                                            }}>+{this.state.result.currentConfirmedIncr}</b>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{textAlign: "center"}}>
                                        <div style={{marginBottom: "0.3em"}}>
                                                <b>现存无症状</b>
                                        </div>
                                        <div style={{color: "rgb(162, 90, 78)", fontSize: "1.5em"}}>
                                            <b>{this.state.result.suspectedCount}</b>
                                        </div>
                                        <div>
                                            <b style={{color: "rgb(162, 90, 78)", fontSize: "1.3em"}}>+{this.state.result.suspectedIncr}</b>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={3}>
                                    <div style={{textAlign: "center"}}>
                                        <div style={{marginBottom: "0.3em"}}>
                                            <b>累计治愈</b>
                                        </div>
                                        <div style={{color: "rgb(40, 183, 163)", fontSize: "1.5em"}}>
                                            <b>{this.state.result.curedCount}</b>
                                        </div>
                                        <div><b style={{
                                                color: "rgb(40, 183, 163)",
                                            fontSize: "1.3em"
                                            }}>+{this.state.result.curedIncr}</b>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Fade>
                    }
                </div>

                {/*<div style={{*/}
                {/*    textAlign: "right",*/}
                {/*    borderTopStyle: "solid",*/}
                {/*    borderTopWidth: "1px",*/}
                {/*    marginTop: "0.5em",*/}
                {/*    borderColor: "gray"*/}
                {/*}}>*/}
                {/*    <span style={{*/}
                {/*        color: "gray",*/}
                {/*        fontSize: "0.9em"*/}
                {/*    }}>更新时间: {this.state.success ? this.state.updateTime.toLocaleString() : "未知"}</span>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Covid19Status
