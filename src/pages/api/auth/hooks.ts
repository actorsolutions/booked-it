module.exports = async (req, res) => {
    const { email } = JSON.parse(req.body);
    console.log(JSON.parse(req.body))
    // create user in prisma
    console.log("created user");
    res.send({ received: true });
};
