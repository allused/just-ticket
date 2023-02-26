import {AddBasicTaskTypes} from './services/TaskTypeService.mjs';
import {AddBasicPriorityTypes} from './services/TaskPriorityService.mjs';
import {AddBasicTaskStates} from './services/TaskStateService.mjs';
import {AddBasicUserPermissionTypes} from './services/UserPermissionService.mjs';
import express from 'express';
import Joi from 'joi';
import { userRouter } from './routes/UserRoutes.mjs';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));

//AddBasicTaskTypes(pgPool);
//AddBasicPriorityTypes(pgPool);
//AddBasicTaskStates(pgPool);
//AddBasicUserPermissionTypes(pgPool);

// app.get('/', (req, resp) => {
//     req.params
//     resp.send('Wazzup');
// });

// app.post('/api/cards', (req, resp) => {
//     const cardSchema = {
//         name: Joi.string().min(3).required()
//     }
//     const result = Joi.validate(req.body, cardSchema);
//     if (result.error) {
//         resp.status(400).send(result.error.details[0].message)
//     }
// })

export { app }

