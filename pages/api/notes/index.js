import connectDb from '../../../utils/connectDb';
import Note from '../../../models/Note';

connectDb();

/**
  * This method is used to handle get/post request conditionally
  * @param req - request details
  * @param res - response details
  * @returns void
  */
export default async (req, res) => {
    const {method} = req;

    switch(method) {
        case 'GET':
            try {
                const notes = await Note.find({});

                res.status(200).json({
                    success: true,
                    data: notes
                })
            } catch(err) {
                res.status(403).send(`Invalid token`);
            }
            break;
        case 'POST':
            try {
                const notes = await Note.create(req.body);

                res.status(201).json({
                    success: true,
                    data: notes
                })
            } catch(err) {
                res.status(403).send(`Invalid token`);
            }
            break;
        default:
            res.status(403).send(`Invalid token`);
            break;
    }
}