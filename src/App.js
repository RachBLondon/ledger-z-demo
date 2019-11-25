import React, { Component } from "react";
import Box from "3box";
import ChatBox from "3box-chatbox-react";

const getThreeBox = async address => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {
  state = {
    needToAWeb3Browser: false
  };
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
      const box = await Box.openBox(this.state.accounts[0], window.ethereum);
      this.setState({ box });
      await this.state.box.syncDone;

      const space = await this.state.box.openSpace("ledger-z-chatbox");
      this.setState({ space });
    }
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <div style={{width : '364px', margin : 'auto', paddingTop : '10%', textAlign : "center"}}>
        <h1>Ledger Z ChatBox</h1>
        {this.state.space && (
          <ChatBox
            spaceName="namespace-chatbox"
            threadName="chatbox-thread"
            box={this.state.box}
            currentUserAddr={this.state.account}
          />
        )}
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
