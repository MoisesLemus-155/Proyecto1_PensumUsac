import { analyze, } from '../Controllers/analyze.controller';
import { Router } from 'express';
const analyzeRouter = Router();


analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;



