import {
    Bank,
    identifyBank,
    isTransactionSMS,
} from "./bankFilter";
import { SMSMessage } from "./smsReader";

export interface FilteredSMS {
  sms: SMSMessage;
  bank: Bank;
}

export function filterBankSMS(
  messages: SMSMessage[]
): FilteredSMS[] {
  return messages
    .filter(isTransactionSMS)
    .map((sms) => {
      const bank = identifyBank(sms);

      if (!bank) {
        return null;
      }

      return {
        sms,
        bank,
      };
    })
    .filter(
      (item): item is FilteredSMS => item !== null
    );
}