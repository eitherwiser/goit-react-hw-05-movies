import {Component} from 'react'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {

  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#46285acc"
        height={50}
        width={150}
        timeout={20000}
      />
    );
  }
}