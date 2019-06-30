const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const isAuthenticated = require("../middleware/isAuthenticated");

const Message = mongoose.model("Message");
const Conversation = mongoose.model("Conversation");
const User = mongoose.model("User");

router.post("/send", isAuthenticated, (req, res) => {
    const sender = req.user_id; //pobrane z tokena
    const receiver = req.body.receiver;
    const content = req.body.content;

    Conversation.findOne(
        {
            participants: sender,
            participants: receiver
        },
        (err, conversation) => {
            if (err) {
                console.log(err);
            } else {
                if (!conversation) {
                    console.log("no conversation with sender and receiver");
                    let participants = [];
                    participants.push(sender, receiver);
                    newConversation = new Conversation({
                        _id: new mongoose.Types.ObjectId(),
                        participants: participants
                    });

                    newConversation.save().then(c => {
                        console.log("created conversation");
                        console.log(c);

                        newMessage = new Message({
                            _id: new mongoose.Types.ObjectId(),
                            author: sender,
                            content: content,
                            conversation: c._id
                        });

                        newMessage
                            .save()
                            .then(m => {
                                return res.status(201).json({
                                    message: m,
                                    conversation: c
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                });
                            });
                    });
                } else {
                    console.log("conversation exists");
                    console.log(conversation);

                    conversation.lastModified = Date.now();

                    conversation
                        .save()
                        .then(c => {
                            newMessage = new Message({
                                _id: new mongoose.Types.ObjectId(),
                                author: sender,
                                content: content,
                                conversation: c._id
                            });

                            newMessage
                                .save()
                                .then(m => {
                                    return res.status(201).json({
                                        message: m,
                                        conversation: c
                                    });
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        error: err
                                    });
                                });
                        })
                        .catch(err => {
                            return res.status(500).json({ error: err });
                        });
                }
            }
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    });
});


router.get("/conversations", isAuthenticated, (req, res) => {
    const owner = req.user_id;//pobrane z tokena

    Conversation.find({ participants: owner })
        .then(conversations => {
            return res.status(200).json({
                conversations: conversations
            });
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
});



router.get("/info/:id", isAuthenticated, (req, res) => {
    const user_id = req.params.id;

    User.findById(user_id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            } else {
                return res.status(200).json({
                    user_info: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        role: user.role,
                        avatar: user.avatar
                    }
                });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
});

router.get("/messages", isAuthenticated, (req, res) => {
    const per_page = req.body.per_page;
    const page = req.body.page;
    const conversation = req.body.conversation;
    const user_id = req.user_id;

    Conversation.findOne(
        { _id: conversation, participants: user_id },
        (err, c) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                if (!c) {
                    return res.status(404).json({
                        message:
                            "User with such id doesnt participate in any conversation with such id"
                    });
                } else {
                    Message.find({ conversation: conversation })
                        .sort({ date: asc })
                        .limit(per_page)
                        .skip(page * per_page)
                        .exec((err, messages) => {
                            if (err) {
                                return res.status(500).json({
                                    error: err
                                });
                            } else {
                                return res.status(200).json({
                                    messages: messages
                                });
                            }
                        });
                }
            }
        }
    );
});

module.exports = router;
