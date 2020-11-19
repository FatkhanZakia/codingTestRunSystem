import React, { Component, Fragment } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";

const url = "https://api.exchangeratesapi.io/latest";

class PublicAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAPI: {},

      isLoading: false,
    };
  }

  componentDidMount() {
    axios.get(url).then((res) => {
      this.setState({ dataAPI: res.data, isLoading: true });
    });
  }

  render() {
    const { dataAPI } = this.state;
    console.log(dataAPI);
    let ratesArr = [];

    for (const rate in dataAPI.rates) {
      ratesArr.push("${dataAPI.rates[rate]}");
    }

    console.log(ratesArr);

    return !this.state.isLoading ? (
      <p>Loading...</p>
    ) : (
      <Fragment>
        <h4>List Gaji di Tiap Negara (dalam {dataAPI.base} )</h4>
        <ListGroup>
          {ratesArr.map((rate, index) => {
            <ListGroup.Item key={index}>{rate}</ListGroup.Item>;
          })}
        </ListGroup>
      </Fragment>
    );
  }
}

export default PublicAPI;
