const router = require('express').Router();
const { User, Thought, Reaction } = require('../../models');

router.get('/', async (req,res)=>{
    try{
        const thoughts = await Thought.find({});
        res.json(thoughts)
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const thought = await Thought.findByid(req.params.id);
        res.json(thought)
    } catch(err){
        res.status(500).json(err)
    }
})

router.post('/',async(req,res)=>{
    try{
        await Thought.create(req.body).then((newThought)=>{
           return User.findOneAndUpdate(
            {_id: req.body.userId},
            { $push:{thoughts: newThought._id}},
            {new:true}
           )
        })
        res.json({message:`New Thought has been added to User ${req.body.userId}`});
    } catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        await Thought.findOneAndUpdate(req.params.id,req.body)
        res.status(200).json({ message: `Thought for ${req.params.id} has been updated!` })
    }catch (err){
        res.status(500).json(err) 
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        await Thought.findOneAndDelete(req.params.id).then(
            (deleteThought)=>{
                return User.findOneAndUpdate(
                    {username:deleteThought.userName},
                    { $pull:{thoughts: req.params.id}}
                )
            }
        )
        res.status(200).json({ message: `Thought for ${req.params.id} has been deleted!` })
    }catch (err){
        res.status(500).json(err) 
    }
})

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(req.params.thoughtId, {
            $push: { reactions: req.body }
        });
        res.status(200).json({ message: 'Reaction added to thought!' })
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

// Delete a reaction
router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(req.params.thoughtId, {
            $pull: { reactions: { reactionId: req.body.reactionId } }
        });
        res.status(200).json({ message: 'Reaction deleted!' })
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;