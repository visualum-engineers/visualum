const message = (req, res) => {
    res.json({message: "Post request has been sent"})
};

module.exports = {message};