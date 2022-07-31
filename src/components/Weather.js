import React, {Component} from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {CircularProgress, Fade, Icon, List, ListItem, ListItemText} from "@mui/material";
import "../assets/font/qweather-icons.css"

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentsuccess: false, foresuccess: false,
            updateTime: null, iconID: null,
            temp: null, wdesc: null, aqi: null, airLevel: null, forecast: null,
            date: ['天', '一', '二', '三', '四', '五', '六']
        }
        this.refreshCurrent = this.refreshCurrent.bind(this);
        this.refreshForecast = this.refreshForecast.bind(this);
    }

    refreshCurrent() {
        axios.all([
            axios.get("/weather/v7/weather/now", {
                params: {
                    key: "22f37fd5c5d348c9945b21840ff22023",
                    location: "101230901"
                }
            }),
            axios.get("/weather/v7/air/now", {
                params: {
                    key: "22f37fd5c5d348c9945b21840ff22023",
                    location: "101230901"
                }
            })
        ]).then(
            axios.spread((weather, air) => {
                this.setState({
                    currentsuccess: true,
                    temp: weather.data.now.temp,
                    wdesc: weather.data.now.text,
                    iconID: weather.data.now.icon,
                    aqi: air.data.now.aqi,
                    airLevel: air.data.now.category,
                });
            })
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    refreshForecast() {
        axios.get("/weather/v7/weather/3d", {
            params: {
                key: "22f37fd5c5d348c9945b21840ff22023",
                location: "101230901"
            }
        }).then(
            res => {
                this.setState({
                    forecast: res.data.daily,
                    foresuccess: true,
                    updateTime: new Date()
                })
            }
        ).catch(
            error => console.log(error)
        )
    }

    componentDidMount() {
        this.refreshCurrent();
        this.refreshForecast();
    }

    aqiBadge() {
        if (this.state.aqi <= 50) {
            return '#58d68d'
        } else if (this.state.aqi <= 100) {
            return '#5dade2'
        } else if (this.state.aqi <= 150) {
            return '#ecf0f1'
        } else if (this.state.aqi <= 200) {
            return '#a6acaf'
        } else if (this.state.aqi <= 300) {
            return '#f4d03f'
        } else {
            return '#e74c3c'
        }
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div style={{
                    textAlign: "center",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1px",
                    borderBottomColor: "gray",
                    paddingBottom: "0.5em"
                }}>
                    {!this.state.currentsuccess ? <CircularProgress color="inherit"/> :
                        <Fade in={true} timeout={2000}>
                            <Grid container spacing={0}>
                                <Grid item xs>
                                    <div style={{textAlign: "center"}}>
                                        <div style={{textAlign: "center"}}>
                                            <i className={"qi-" + this.state.iconID} style={{fontSize: "3em"}}></i>
                                        </div>
                                        <div>
                                            <b style={{fontSize: "1.5em"}}>{this.state.wdesc}</b>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <div style={{textAlign: "center"}}>
                                        <Icon sx={{color: this.aqiBadge(), fontSize: "3.5em"}}>eco</Icon>
                                        <div style={{marginTop: "0.4em"}}>
                                            <b style={{fontSize: "1.4em"}}>AQI: {this.state.aqi}</b>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <div style={{textAlign: "center"}}>
                                        <div style={{
                                            fontSize: "2em",
                                            marginTop: "0.4em",
                                            marginBottom: "0.26em"
                                        }}>{this.state.temp}℃
                                        </div>
                                        <b style={{fontSize: "1.4em"}}>气温</b>
                                    </div>
                                </Grid>
                            </Grid>
                        </Fade>
                    }
                </div>
                <div>
                    {!this.state.foresuccess ? <CircularProgress color="inherit"/> :
                        <div>
                            <List disablePadding>
                                {this.state.forecast.map(item => (
                                    <ListItem disablePadding disableGutters>
                                        <ListItemText
                                            sx={{textAlign: "center"}}>{"周" + this.state.date.at(new Date(item.fxDate).getDay())}</ListItemText>
                                        <ListItemText sx={{textAlign: "center"}}>
                                            <i className={"qi-" + item.iconDay} style={{fontSize: "1.5em"}}></i>
                                        </ListItemText>
                                        <ListItemText sx={{textAlign: "center"}}>
                                            <i className={"qi-" + item.iconNight} style={{fontSize: "1.5em"}}></i>
                                        </ListItemText>
                                        <ListItemText sx={{textAlign: "center"}}>
                                            {item.tempMin + "℃ — " + item.tempMax + "℃"}
                                        </ListItemText>
                                        <ListItemText sx={{textAlign: "center"}}>
                                            <i className={"qi-" + item.moonPhaseIcon} style={{fontSize: "1.5em"}}></i>
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                    {/*        <div style={{*/}
                    {/*            textAlign: "right",*/}
                    {/*            borderTopStyle: "solid",*/}
                    {/*            borderTopWidth: "1px",*/}
                    {/*            borderColor: "gray"*/}
                    {/*        }}>*/}
                    {/*<span style={{*/}
                    {/*    color: "gray",*/}
                    {/*    fontSize: "0.9em"*/}
                    {/*}}>更新时间: {this.state.foresuccess ? this.state.updateTime.toLocaleString() : "未知"}</span>*/}
                    {/*        </div>*/}
                        </div>

                    }
                </div>
            </div>
        );
    }
}

export default Weather;

