import * as SecureStore from "expo-secure-store";

import { readInbox } from "./smsReader";

import { parseSMS } from "../../parser/parserManager";

import api from "../api";

const LAST_SYNC="last_sync";

export async function syncTransactions(){

    const messages=await readInbox();

    const lastSync=

    Number(

        await SecureStore.getItemAsync(LAST_SYNC)

    )||0;

    let newest=lastSync;

    let synced=0;

    for(const sms of messages){

        if(sms.date<=lastSync)
            continue;

        const parsed=parseSMS(sms);

        if(!parsed)
            continue;

        try{

            await api.post(

                "/transactions",

                parsed

            );

            synced++;

            if(sms.date>newest)

                newest=sms.date;

        }

        catch(err){

            console.log(err);

        }

    }

    await SecureStore.setItemAsync(

        LAST_SYNC,

        newest.toString()

    );

    return synced;

}