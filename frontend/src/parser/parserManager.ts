import { SMSMessage } from "./types";

import { detectBank } from "./senderDetector";

import { isTransactionSMS } from "./transactionDetector";

import { SBIParser } from "./banks/sbi";

import { CanaraParser } from "./banks/canara";

import { GenericParser } from "./banks/generic";

const sbi = new SBIParser();

const canara = new CanaraParser();

const generic = new GenericParser();

export function parseSMS(
    message:SMSMessage
){
const parsers = [
    new SBIParser(),
    new CanaraParser(),
    new GenericParser()
];

for (const parser of parsers) {
    if (parser.canParse(message)) {
        return parser.parse(message);
    }
}

return null;

    }

