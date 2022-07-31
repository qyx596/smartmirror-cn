import React, {Component} from "react";
import {CircularProgress, Fade} from "@mui/material";

const jinrishici = require('jinrishici');


export default class Poem extends Component {
    constructor(props) {
        super(props);
        this.state = {success: false, content: null, fade: true};
        this.enteredPoem = this.enteredPoem.bind(this);
        this.exitedPoem = this.exitedPoem.bind(this);
    }

    exitedPoem() {
            jinrishici.load(result => {
                this.setState({
                    success: true,
                    fade: true,
                    content: result.data.content
                })
            });
        }

    enteredPoem() {
        setTimeout(() => {
            this.setState({fade: false})
        }, 10*1000)
    }

    componentDidMount() {
        jinrishici.load(result => {
            this.setState({
                success: true,
                content: result.data.content
            })
        });
    }

    componentWillUnmount() {
        clearInterval(this.contentID);
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                {!this.state.success ? <CircularProgress color="inherit"/> :
                    <div >
                        <Fade in={this.state.fade} timeout={{appear: 20000, enter: 3000, exit: 3000}} onEntered={this.enteredPoem} onExited={this.exitedPoem}>
                            <div style={{fontSize: "5em"}}>{this.state.content}</div>
                        </Fade>
                    </div>
                }
            </div>
        );
    }
}
