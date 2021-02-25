import connectDb from '../../../utils/connectDb';
import Note from '../../../models/Note';

connectDb();

/**
  * This method is used to handle get/put/delete request conditionally
  * @param req - request details
  * @param res - response details
  * @returns void
  */
export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const note = await Note.findById(id);

                if(!note) {
                    return res.status(400).send(`Unable to find the note`)
                }
                res.status(200).json({
                    success: true,
                    data: note
                })
            } catch(err) {
                res.status(400).send(`Something went wrong while fetching note`);
            }
            break;
        case 'PUT':
            try {
                const note = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if(!note) {
                    return res.status(400).send(`Unable to update the note`)
                }
                res.status(200).json({
                    success: true,
                    data: note
                })
            } catch(err) {
                res.status(403).send(`Something went wrong while updating`);
            }
            break;
            case 'DELETE':
                try {
                    const deletedNote = await Note.deleteOne({ _id: id });
    
                    if(!deletedNote) {
                        return res.status(400).send(`Unable to delete the note`)
                    }
                    res.status(200).json({
                        success: true,
                        data: {}
                    })
                } catch(err) {
                    res.status(403).send(`Something went wrong while deleting`);
                }
                break;
        default:
            res.status(403).send(`Invalid request Method`);
            break;
    }
}