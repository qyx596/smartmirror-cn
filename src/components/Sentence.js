import React, {Component} from "react";
import {CircularProgress, Fade} from "@mui/material";
import axios from "axios";
import configData from "../config.json"

export default class Sentence extends Component {
    constructor(props) {
        super(props);
        this.state = {success: false, content: null, fade: true};
        this.enteredSen = this.enteredSen.bind(this);
        this.exitedSen = this.exitedSen.bind(this);
    }

    exitedSen() {
        axios.get("/sentence/", {params: {c: configData.sentence.type}}).then(
            res => {
                this.setState({fade: true, success: true, content: res.data.hitokoto})
            }
        ).catch(
            err => {
                console.log(err)
                this.forceUpdate();
            }
    )
        }

    enteredSen() {
        setTimeout(() => {
            this.setState({fade: false})
        }, 10*1000)
    }

    componentDidMount() {
        axios.get("/sentence/", {params: {c: "k"}}).then(
            res => {
                this.setState({success: true, content: res.data.hitokoto})
            }
        ).catch(
            err => console.log(err)
        )
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                {!this.state.success ? <CircularProgress color="inherit"/> :
                    <div >
                        <Fade in={this.state.fade} timeout={{appear: 20000, enter: 3000, exit: 3000}} onEntered={this.enteredSen} onExited={this.exitedSen}>
                            <div style={{fontSize: "4em"}}>{this.state.content}</div>
                        </Fade>
                    </div>
                }
            </div>
        );
    }
}
