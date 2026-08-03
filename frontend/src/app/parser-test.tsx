import { View, Text } from "react-native";
import { useEffect } from "react";

import { parseSMS } from "../../src/parser/parserManager";

export default function ParserTest() {

  useEffect(() => {

    const messages = [

      {
        id: "1",
        address: "VK-SBIINB",
        body: "Dear SBI User, your A/c X4471- credited by Rs.107 on 03Aug26 from ANIRUDDH V KISHOR Ref No 667474646464673636-SBI",
        date: Date.now(),
      },

      {
        id: "2",
        address: "VK-CANBNK",
        body: "Dear Customer Acct XXXXX66414 credited with INR 1,800.00 on 03/08/26 from HRUDUL; UPI:676565747; Bal INR 2,272.58-CanaraBank",
        date: Date.now(),
      },

    ];

    messages.forEach((sms) => {
      console.log("========================");
      console.log("INPUT");
      console.log(sms.body);

      const parsed = parseSMS(sms);

      console.log("OUTPUT");
      console.log(parsed);
    });

  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Parser Test</Text>
    </View>
  );
}