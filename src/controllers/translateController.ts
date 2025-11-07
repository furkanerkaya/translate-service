import { Request, Response, NextFunction } from "express";
import axios from "axios";
import * as deepl from "deepl-node";

const { DEEPL_API_KEY } = process.env;

if (!DEEPL_API_KEY) {
  throw new Error("DEEPL_API_KEY environment variable is not set.");
}

const deeplClient = new deepl.DeepLClient(DEEPL_API_KEY);

export async function translate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text, target }: { text: string; target: deepl.TargetLanguageCode } =
      req.body;
    if (!text) throw { status: 400, message: "Text field is not empty" };
    if (!target) throw { status: 400, message: "Target field is not empty" };
    const apiResponse = await deeplClient.translateText(text, null, target);
    if (!apiResponse)
      throw { status: 502, message: "Bad response from translation service" };
    console.log(apiResponse);
    return res.json({
      text: (apiResponse as deepl.TextResult).text,
      targetLanguage: (apiResponse as deepl.TextResult).detectedSourceLang,
    });
  } catch (error: any) {
    return next(
      new Error(
        `🚩 TranslateController - Translate Error: ${error.message || error}`
      )
    );
  }
}

export async function translateMultipleLanguages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      text,
      targets,
    }: { text: string; targets: deepl.TargetLanguageCode[] } = req.body;

    if (!text) throw { status: 400, message: "Text field must not be empty." };
    if (!Array.isArray(targets) || targets.length === 0)
      throw { status: 400, message: "Targets must be a non-empty array." };

    const apiResponses: { text: string; targetLanguage: string }[] = [];

    for (const target of targets) {
      const apiResponse = await deeplClient.translateText(text, null, target);

      const result = Array.isArray(apiResponse) ? apiResponse[0] : apiResponse;

      apiResponses.push({
        text: result.text,
        targetLanguage: target,
      });
    }

    console.log(apiResponses);
    return res.json(apiResponses);
  } catch (error: any) {
    return next(
      new Error(
        `🚩 TranslateController - TranslateMultipleLanguages Error: ${
          error.message || error
        }`
      )
    );
  }
}
