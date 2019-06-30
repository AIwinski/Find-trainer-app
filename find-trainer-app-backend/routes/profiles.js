const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const randomstring = require("randomstring");

const ROLES = require("../config/roles");

const User = mongoose.model("User");

const avatar_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/avatars");
    },
    filename: function(req, file, cb) {
        //todo: change to user id
        cb(
            null,
            "user_avatar_" +
                new Date().toISOString().replace(/:|\./g, "_") +
                randomstring.generate({ length: 12, charset: "alphabetic" }) +
                "." +
                file.originalname.split(".")[1]
        );
    }
});

const gallery_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/gallery");
    },
    filename: function(req, file, cb) {
        //todo: change to user id
        cb(
            null,
            "gallery_" +
                new Date().toISOString().replace(/:|\./g, "_") +
                randomstring.generate({ length: 12, charset: "alphabetic" }) +
                "." +
                file.originalname.split(".")[1]
        );
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Wrong file format."), false);
    }
};

// config uploader for multer
const upload_avatar = multer({
    storage: avatar_storage,
    limits: {
        // up to 3 MB
        fileSize: 1028 * 1024 * 3
    },
    fileFilter: fileFilter
}).single("avatar");

const upload_gallery = multer({
    storage: gallery_storage,
    limits: {
        // up to 3 MB
        fileSize: 1028 * 1024 * 3
    },
    fileFilter: fileFilter
}).array("gallery");

router.get("/", (req, res) => {
    const per_page = parseInt(req.query.per_page);
    const already_fetched = parseInt(req.query.already_fetched);

    //filters
    const min_price = parseInt(req.query.min_price);
    const max_price =  parseInt(req.query.max_price);
    const city = req.query.city || "";

    let query = { role: ROLES.PROFESSIONAL };
    // if(!isNaN(min_price)){
    //     query.mi
    // }

    //to do: build query 
    User.find(query)
        .select(
            "first_name last_name _id avatar description popularity rating number_of_ratings"
        )
        .limit(per_page)
        .skip(already_fetched)
        .exec((err, profiles) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                return res.status(200).json({
                    profiles: profiles
                });
            }
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    User.findOne({ role: ROLES.PROFESSIONAL, _id: id })
        .select(
            "first_name last_name _id avatar city country address description popularity rating number_of_ratings"
        )
        .exec((err, profile) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                if (!profile) {
                    return res.status(404).json({
                        message: "Not found proffesional account with such id"
                    });
                } else {
                    return res.status(200).json({
                        profile
                    });
                }
            }
        });
});

router.post("/avatar/:id", (req, res) => {
    const id = req.params.id;

    upload_avatar(req, res, err => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                error: err,
                message: "Upload error"
            });
        } else if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            User.findOne({ role: ROLES.PROFESSIONAL, _id: id }).exec(
                (err, profile) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        if (!profile) {
                            return res.status(404).json({
                                message:
                                    "Not found proffesional account with such id"
                            });
                        } else {
                            console.log(req.file["avatar"]);
                        }
                    }
                }
            );
        }
    });
});

router.patch("/:id", (req, res) => {
    console.log(req.body);
    const fields = req.body.fields; //fields to update
    const id = req.params.id;

    User.findOne({ role: ROLES.PROFESSIONAL, _id: id }).exec((err, profile) => {
        if (err) {
            return res.status(500).json({ error: err });
        } else {
            if (!profile) {
                return res.status(404).json({
                    message: "Not found proffesional account with such id"
                });
            } else {
                for (let key in fields) {
                    if (profile.toObject().hasOwnProperty(key)) {
                        profile[key] = fields[key];
                    } else {
                        return res.status(400).json({
                            message: "Such property doesnt exist in model."
                        });
                    }
                }

                profile
                    .save()
                    .then(result => {
                        return res.status(201).json({
                            profile: result
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: err
                        });
                    });
            }
        }
    });
});

module.exports = router;
