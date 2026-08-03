const BANK_SENDERS = {

  SBI: [

    "SBI",

    "SBIINB",

    "SBIUPI",

  ],

  CANARA: [

    "CANBNK",

    "CANARA",

  ],

};

export function detectBank(sender: string) {

  sender = sender.toUpperCase();

  for (const [bank, ids] of Object.entries(BANK_SENDERS)) {

    if (
      ids.some(id => sender.includes(id))
    ) {
      return bank;
    }

  }

  return "UNKNOWN";
}