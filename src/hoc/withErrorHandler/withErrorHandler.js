import React from "react";
import { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(null, (error) => {
        this.setState({ error: error });
        return error;
      });
    }
    componentWillUnmount() {
     // console.log('Will unmount',this.reqInterceptor,this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
