/***
 * Hook for Auth0 to send user information for prisma
 * */

const Registration = async(req,res)=>{
    const {email} = JSON.parse(req.body);
    console.log('Creating User!')
    console.log(email)

    //TODO - CREATE USER

    res.send({received:true});
}

export default Registration
