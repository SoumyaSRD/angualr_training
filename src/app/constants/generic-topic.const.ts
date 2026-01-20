import { ITopicContent } from "../interfaces/topic";
import { Cors } from "./cors.const";
import { TypeScriptDataTypes } from "./datatypes.const";
import { TypeScriptInterfaces } from "./interfaces.const";
import { RestApi } from "./rest-api.const";
import { TypeScriptClasses } from "./typescript-classes.const";
import { TypeScriptEnums } from "./typescript-enums.const";
import { TypeScriptVsJavaScript } from "./typescriptvsjavascript.const";
import { WebFundamental } from "./web-fundamental.const";

export const GENERIC_TOPIC_DATA: { [key: string]: any } = {
    '/prerequisites/web-fundamentals/rest-apis': RestApi,
    '/prerequisites/web-fundamentals/json': WebFundamental,
    '/prerequisites/web-fundamentals/cors': Cors,
    '/prerequisites/typescript/typescript-vs-javascript': TypeScriptVsJavaScript,
    '/prerequisites/typescript/data-types': TypeScriptDataTypes,
    '/prerequisites/typescript/interfaces': TypeScriptInterfaces,
    '/prerequisites/typescript/enums': TypeScriptEnums,
    '/prerequisites/typescript/classes': TypeScriptClasses
}


export const GenerateContent = (title: string): ITopicContent | any => {
    return {
        title: title,
        tags: ['Angular', 'Tutorial'],
        paragraphs: [
            `This comprehensive topic on "${title}" will be covered in detail in the complete course. This section provides essential knowledge for Angular development.`,
            'Key concepts, best practices, and real-world examples will help you master this topic and apply it effectively in your Angular applications.',
            'Continue exploring other topics in the sidebar to build your complete understanding of Angular development from fundamentals to advanced patterns.'
        ],
        keyPoints: [
            `Understanding ${title} is crucial for Angular development`,
            'Practice with hands-on examples to reinforce learning',
            'Apply these concepts in real-world projects',
            'Refer to official Angular documentation for more details'
        ]
    }
};