import {
    ParsedTransaction,
    SMSMessage,
    TransactionType,
    BankParser,
} from "../types";

import {

    extractAmount,

    extractMerchant,

    extractAccount,

    extractReference,

    detectPaymentApp,

    isDebit,

    isCredit,

    hasUPI,

} from "../parserUtils";

import {

    normalizeMerchant,

    normalizeAccount,

    normalizeReference,

    normalizeAmount,

} from "../normaliser";

export class GenericParser
implements BankParser{

    canParse(message:SMSMessage){

        return hasUPI(message.body);

    }

    parse(
        message:SMSMessage
    ):ParsedTransaction|null{

        const amount =
            extractAmount(message.body);

        if(!amount)
            return null;

        return{

            amount:
                normalizeAmount(amount),

            merchant:
                normalizeMerchant(
                    extractMerchant(message.body)
                ),

            transaction_type:
                isDebit(message.body)
                ?TransactionType.DEBIT
                :TransactionType.CREDIT,

            bank:"UNKNOWN",

            account_last4:
                normalizeAccount(
                    extractAccount(message.body)
                ),

            transaction_time:
                new Date(message.date),

            upi_ref_no:
                normalizeReference(
                    extractReference(message.body)
                ),

            payment_app:
                detectPaymentApp(message.body),

        };

    }

}