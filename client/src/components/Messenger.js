import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  updateMessages,
  handlTextChange,
  submitMessage
} from '../redux/actions/messageActions';
import '../style/Messenger.css';

import { PROXY_URL } from '../config';

const Message = ({ data }) => <div>{data}</div>;

class Messenger extends Component {
  componentDidMount() {
    axios
      .get(`/messanger/getMessages`)
      // .get(`${PROXY_URL}/messanger/getMessages`)
      .then((res) => {
        this.props.updateMessages(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.submitMessage();
  };

  onChange = (e) => {
    this.props.insertMessage();
  };

  handleTextChange = (e) => {
    this.props.handlTextChange(e.target.value);
  };

  render() {
    return (
      <div className="Messenger">
        <div>
          <div className="message-area">
            {this.props.messages.map((message, i) => (
              <Message key={i} data={message} />
            ))}
          </div>
        </div>

        <div>
          <input
            type="text"
            value={this.props.text}
            onChange={this.handleTextChange}
          />
        </div>

        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageReducer.messages,
    text: state.messageReducer.text
  };
};

const mapDispatchToProps = {
  updateMessages,
  handlTextChange,
  submitMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger);
