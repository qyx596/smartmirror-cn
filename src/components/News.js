import React, {Component} from "react";
import xml2js from "xml2js"

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            updateTime: new Date(),
            rss_sources: [],
            content: []
        }

    }

    freshNew() {
        let parser = new xml2js.Parser()
        parser.parseString(`<email>
       <to>Test</to>
       <from>Test1</from>
       <heading>Test email</heading>
       <body>Email regards to xml data parsing in React</body>
       </email>`,
            function (err, result) {
                console.log(result);
            }
        );
    }

    componentDidMount() {
        this.freshNew();
    }

    render() {
        return (
            <>
            </>
        )
    }
}
