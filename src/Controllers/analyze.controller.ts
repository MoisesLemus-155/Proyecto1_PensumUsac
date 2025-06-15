import { Request, Response } from 'express'
import { LexicalAnalyze } from '../Analyzer/LexicalAnalyzer';
import { parsePensum } from '../Analyzer/ProcessToken';

export const analyze = (req: Request, res: Response) => {
    const data = req.body;
    const lexicalAnalyzer = new LexicalAnalyze();
    const tokenList = lexicalAnalyzer.scanner(data);
    const errorList = lexicalAnalyzer.getErrorList();
    const carreras = parsePensum(tokenList);
    res.json({
        tokens: tokenList,
        errors: errorList,
        carreras: carreras
    });
};