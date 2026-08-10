import { SMSMessage } from "./types";



import { SBIParser } from "./banks/sbi";

import { CanaraParser } from "./banks/canara";


const sbi = new SBIParser();

const canara = new CanaraParser();

export function parseSMS(
    message:SMSMessage
){
const parsers = [
    sbi,canara
];

for (const parser of parsers) {
    if (parser.canParse(message)) {
        return parser.parse(message);
    }
}

return null;

    }

