import React from "react";
import { Chat as ChatAgent } from "../agent";
import { Formik, Field, Form } from "formik";
import SpinLoader from "./SpinLoader";
import { connect } from "react-redux";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeConversationId: props.match.params.id,
            conversations: null,
            activeConversationMessages: [],
            activeConversationInfo: {}
        };
    }

    startNewConversation = id => {
        console.log("start new")
        const newConversation = {
            participants: [id, this.props.current_user],
            lastModified: Date.now(),
            createdAt: Date.now(),
            _id: Math.random().toString()
        };

        const conversations = this.state.conversations || [];
        conversations.push(newConversation);

        this.setState({ conversations: conversations }, () => {
            console.log(this.state.conversations)
        });
    };

    onConversationClick = id => {
        this.setState({ activeConversationId: id });
        this.props.history.push("/chat/" + id);
        ChatAgent.getInfo(id).then(res => {
            this.setState({ activeConversationInfo: res.data });
        });
        ChatAgent.getMessages(id, this.state.activeConversationMessages.length).then(res => {
            const activeConversationMessages = this.state.activeConversationMessages;
            activeConversationMessages.push(res.data.messages);
            this.setState(
                {
                    activeConversationMessages: activeConversationMessages
                },
                () => {
                    this.scrollToBottomOfChatWindow();
                }
            );
        });
    };

    scrollToBottomOfChatWindow = () => {
        let chatWindow = document.getElementsByClassName("chat__window")[0];
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    };

    componentDidMount() {
        ChatAgent.getInfo(this.state.activeConversationId)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            });
        ChatAgent.getConversations()
            .then(res => {
                const conversations = res.data.conversations;
                console.log(res);
                console.log(this.state.activeConversationId)

                if (this.state.activeConversationId && conversations.indexOf(this.state.activeConversationId) === -1) {
                    this.startNewConversation(this.state.activeConversationId);
                } else if (this.state.activeConversationId && conversations.indexOf(this.state.activeConversationId) !== -1) {
                    ChatAgent.getMessages(this.state.activeConversationId, this.state.activeConversationMessages.length).then(
                        res => {
                            const activeConversationMessages = this.state.activeConversationMessages;
                            activeConversationMessages.push(res.data.messages);
                            this.setState(
                                {
                                    activeConversationMessages: activeConversationMessages
                                },
                                () => {
                                    this.scrollToBottomOfChatWindow();
                                }
                            );
                        }
                    );
                } else {
                }

                this.setState({ conversations: conversations });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="chat">
                <div className="chat__conversations-list">
                    {this.state.conversations != null ? (
                        this.state.conversations.length === 0 ? (
                            <p>nie masz jeszcze zadnych konwersacji</p>
                        ) : (
                            this.state.conversations.map((element, index) => (
                                <div
                                    className={
                                        "chat__conversations-list-element " +
                                        (element._id == this.state.activeConversationId
                                            ? "chat__conversations-list-element--active"
                                            : "")
                                    }
                                    key={element._id}
                                    onClick={() => {
                                        this.onConversationClick(element._id);
                                    }}
                                >
                                    name: {element.name}, id: {element.id}
                                </div>
                            ))
                        )
                    ) : (
                        <SpinLoader />
                    )}
                </div>
                <div className="chat__conversation">
                    <div className="chat__window">
                        {this.state.activeConversationMessages.map((msg, index) => (
                            <div className="chat__message-wrapper" key={index}>
                                <div className={"chat__message " + (msg.sender == 1 ? "chat__message--primary" : "")}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat__form">
                        <Formik
                            initialValues={{ content: "" }}
                            onSubmit={values => {
                                if (!values.content.replace(/\s/g, "").length) {
                                    return;
                                }
                                console.log(values.content);
                                // let data = {
                                //     password: values.password,
                                //     username: values.email,
                                //     rememberMe: false
                                // };
                                // props.login(data);
                            }}
                        >
                            <Form>
                                <Field
                                    name="content"
                                    className="chat__textarea"
                                    placeholder="Message content"
                                    component="textarea"
                                />
                                <button type="submit" className="chat__submit">
                                    &#8250;
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="chat__info">
                    <img src={this.state.activeConversationInfo.image} alt="user" className="chat__user-image" />
                    <span className="chat__user-name">{this.state.activeConversationInfo.name}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { current_user: state.auth.current_user._id };
};

export default connect(
    mapStateToProps,
    null
)(Chat);
