const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');

// get all users
router.get('/', async(req,res)=>{
    try{
        const users = await User.find({})
        .populate('friends')
        .populate('thoughts');
        res.json(users);
    } catch (err){
        res.status(500).json(err);
        // console.log(err);
    }
})

// get 1 user by id
router.get('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        .populate('friends')
        .populate('thoughts');
        res.json(user);
    } catch (err){
        res.status(500).json(err);
        // console.log(err);
    }
})

// create new user
router.post('/', async(req,res)=>{
    try{
        const newUser = await User.create(req.body).then((newUser)=>{
            res.json(newUser);
        })
    } catch (err){
        res.status(500).json(err);
        console.log(err);
    }
})


//update single user by id
router.put('/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200)
           .json({message:'Update successfully!'});
    } catch (err){
        res.status(500).json(err);
        // console.log(err);
    }
})

//delete function
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
            .then((deletedUser) => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'No user found!' });
                  }
          
                return Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
            });
        res.status(200).json({ message: 'User data has been deleted!' })
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// now is about friends list for add and delete function
router.post('/:userId/friends/:friendId', async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.userId, {
            $push: { friends: req.params.friendId }
        });
        res.status(200).json({ message: 'This user has been added to friends list!' }) 
    }catch (err){
        res.status(500).json(err);
        console.log(err);
    }
})
// delete from friends list
router.delete('/:userId/friends/:friendId', async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.userId, {
            $pull: { friends: req.params.friendId }
        });
        res.status(200).json({ message: 'This user has been deleted to friends list!' }) 
    }catch (err){
        res.status(500).json(err);
        console.log(err);
    }
})


module.exports = router;
