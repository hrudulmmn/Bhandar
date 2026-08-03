import SmsAndroid from "react-native-get-sms-android";

import { SMSMessage } from "../../parser/types";

export async function readInbox():Promise<SMSMessage[]>{

    return new Promise((resolve,reject)=>{

        SmsAndroid.list(

            JSON.stringify({

                box:"inbox",

                maxCount:5000,

            }),

            (error:string)=>{

                reject(error);

            },

            (_count:number,smsList:string)=>{

                const parsed=JSON.parse(smsList);

                const messages:SMSMessage[]=parsed.map((sms:any)=>({

                    id:sms._id,

                    address:sms.address,

                    body:sms.body,

                    date:Number(sms.date),

                }));

                resolve(messages);

            }

        );

    });

}