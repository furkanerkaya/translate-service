import { Request, Response, NextFunction } from "express";
import axios from "axios";

export class TranslateController {
    static async translate(req: Request, res: Response, next: NextFunction) {
        try {
            const { text, source, target, format } = req.body;
            if(!text) throw { status: 400, message: "Text field is not empty" }
            const apiResponse = await axios.post("http://localhost:5000/translate", {q: text, source, target, format})
            if(!apiResponse.data) throw { status: 502, message: "Bad response from translation service" }
            const translated = {...apiResponse.data, source, target, format}
            return res.json(translated)
        } catch (error: any) {
           return next(new Error(`🚩 TranslateController - Translate Error: ${error.message || error}`));
        }
    }

    static async translateMultipleLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            const { q, source, targets, format } = req.body;
            if(!q) throw { status: 400, message: "Missing  'q' field" }
            // targets.forEach((target: String) => {
            //     const apiResponse = axios.post("http://localhost:5000/translate", {q, source, target, format})
            //     if(!apiResponse.data) throw { status: 502, message: "Bad response from translation service" }
            // });
        } catch (error: any) {
            return next(new Error(`🚩 TranslateController - TranslateMultipleLanguages Error: ${error.message || error}`));
        }
    }
}