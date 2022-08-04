import React, {Component} from "react";
import Ticker from "react-ticker";
import {CircularProgress} from "@mui/material";

class Finance extends Component {

    constructor(props) {
        super(props);
        this.state = {success: false, content: []}
    }

    render() {
        return (
            <div style={{textAlign: "center" }}>
                {!this.state.success ? <CircularProgress color="inherit"/> :
                    <Ticker mode={"chain"}>
                        {({index}) => (
                            <>
                                <h1>This is the test message #{index}!</h1>
                            </>
                        )}
                    </Ticker>
                }
            </div>
        );
    }
}

export default Finance;
