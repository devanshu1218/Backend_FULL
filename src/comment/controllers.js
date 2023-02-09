const { Comment } = require("./models");

const createNewComment = async (req, res) => {
    console.log(req.body);
    //var blog_id = req.body.blog_id;
    var newComment = await Comment.create(req.body);

    var allComment = await Comment.find().populate("user_id"); //Object Id
    return res.json({ status: "Created", newComment }); //newcomment
};

const getCommentbyUser = async (req, res) => {
    if(req.body.user_id_declared)
    {
    var displayComments = await Comment.find({ user_id: req.body.user_id_declared });

    return res.json({ status: "Comments FOUND !!", displayComments })
    }
    else{
        return res.json({status:"Please Enter User Id"});
    }
};


const getCommentbyId = async (req, res) => {

    var displayComment = await Comment.find({ _id: req.body.id });

    return res.json({ status: "Comment FOUND !!", displayComment })

};

const editComment = async (req, res) => {
    var updatedComment = await Comment.findOne({ _id: req.body.id });
    updatedComment.comment = req.body.newComment;
    await updatedComment.save();

    return res.json({ status: "Comment edited successfully", updatedComment })
};

const deleteCommentbyId = async (req, res) => {
    var _id = req.body.id;
    var displayComment = await Comment.findById(_id);
    await Comment.findByIdAndDelete(_id)
    return res.json({ status: "Comment DELETED !!", displayComment })

};

module.exports = { createNewComment, getCommentbyUser, getCommentbyId, editComment, deleteCommentbyId };