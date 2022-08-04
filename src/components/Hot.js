import React, {Component} from "react";
import axios from "axios";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableRow
} from "@mui/material";
import {Weibo} from "@icon-park/react";

class Hot extends Component {
    constructor(props) {
        super(props);
        this.state = {success: false, updateTime: new Date(), data: null};
        this.freshHot = this.freshHot.bind(this);
    }

    freshHot() {
        axios.get("/ten/resou", {}).then(
            res => {
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
        this.hotID = setInterval(() => {
            this.freshHot();
        }, 1000 * 60 * 10);
    }

    componentWillUnmount() {
        clearInterval(this.hotID);
    }

    render() {
        return (
            <div>
                <div style={{borderBottomStyle: "solid", borderBottomColor: "gray", borderBottomWidth: "1px"}}>
                    <Weibo theme="outline" size="26" fill="#ffffff" style={{verticalAlign: "-35%"}} />
                    <b style={{fontSize: "1.3em"}}> 微博热搜</b>
                </div>
                <div style={{textAlign: "center", marginTop: "0.2em"}}>
                    {!this.state.success ? <CircularProgress color="inherit"/> :
                        <TableContainer>
                            <Table size="small">
                                    <TableBody>
                                        {this.state.data.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell align={"center"} sx={{color: "white", borderBottomColor: "gray", fontSize: "1em"}}>
                                                    {"#" + item.name + "#"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                            </Table>
                        </TableContainer>
                    }

                </div>
            </div>
        )
    }
}

export default Hot;
