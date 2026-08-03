import { parseSMS } from "../parserManager";
import { SMSMessage } from "../types";

const testMessages: SMSMessage[] = [
  {
    id: "1",
    address: "VK-SBIINB",
    body: "Dear SBI User, your A/c X4471- credited by Rs.107 on 03Aug26 from ANIRUDDH V KISHOR Ref No 667474646464673636-SBI",
    date: Date.now(),
  },

  {
    id: "2",
    address: "VK-SBIINB",
    body: "Rs.1200 credited to A/C XXXX1234 by UPI from JOHN. Ref No 987654321",
    date: Date.now(),
  },

  {
    id: "3",
    address: "VK-CANBNK",
    body: "Dear Customer Acct XXXXX66414 credited with INR 1,800.00 on 03/08/26 from HRUDUL; UPI:676565747; Bal INR 2,272.58-CanaraBank",
    date: Date.now(),
  },

  {
    id: "4",
    address: "VM-OTP",
    body: "Your OTP is 123456. Do not share it.",
    date: Date.now(),
  },

  {
    id: "5",
    address: "AD-OFFER",
    body: "Get ₹500 cashback on shopping today!",
    date: Date.now(),
  },
];

console.log("===============");
console.log("PARSER TEST");
console.log("===============");

for (const sms of testMessages) {

  console.log("\n--------------------------------");

  console.log("Sender :", sms.address);

  console.log("SMS :", sms.body);

  const result = parseSMS(sms);

  if (result) {

    console.log("✅ Parsed");

    console.log(result);

  } else {

    console.log("❌ Ignored");

  }

}