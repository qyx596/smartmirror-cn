import React, {Component} from "react";
import axios from "axios";
import {List} from "@mui/material";

class Hot extends Component {
    constructor(props) {
        super(props);
        this.state = {success: false, updateTime: new Date(), data: null};
        this.freshHot = this.freshHot.bind(this);
    }

    freshHot() {
        axios.get("/ten/resou", {}).then(
            res => {
                console.log(res)
                this.setState({
                    success: true,
                    updateTime: new Date(),
                    data: res.data.list
                })
            }
        )
    }

    componentDidMount() {
        this.freshHot();
    }

    render() {
        return (
            <div>
                <div style={{borderBottomStyle: "solid", borderBottomColor: "gray", borderBottomWidth: "1px"}}>
                    <b style={{fontSize: "1.3em"}}>微博热搜</b>
                </div>
                <div>
                    <List disablePadding>

                    </List>
                </div>
            </div>
        )
    }
}

export default Hot;
