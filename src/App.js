import React, { Component } from "react";
import Box from "3box";
import ChatBox from '3box-chatbox-react';

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {

  state = {
    needToAWeb3Browser : false,
  }
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      //Demo goes here


    }
  }
  render() {

    if(this.state.needToAWeb3Browser){
      return <h1>Please install metamask</h1>
    }

    return (
        <div>

        </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

class Profile extends Component {
  render() {
    return <h2>Profile </h2>;
  }
}
