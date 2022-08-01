import React, {Component} from "react";
import axios from "axios";
import {
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableRow
} from "@mui/material";

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
    }

    render() {
        return (
            <div>
                <div style={{borderBottomStyle: "solid", borderBottomColor: "gray", borderBottomWidth: "1px"}}>
                    <b style={{fontSize: "1.3em"}}>微博热搜</b>
                </div>
                <div style={{textAlign: "center", marginTop: "0.6em"}}>
                    {!this.state.success ? <CircularProgress color="inherit"/> :
                        <TableContainer>
                            <Table size="small">
                                    <TableBody>
                                        {this.state.data.map((item) => (
                                            <TableRow>
                                                <TableCell align={"center"} sx={{color: "white"}}>
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
