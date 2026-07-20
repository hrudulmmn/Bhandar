import { Transaction } from "../types/transactions";

export const transactions: Transaction[] = [

{
id:"1",
merchant:"Sneha Mehta",
amount:2000,
date:"Today",
app:"GPay",
type:"credit",
category:"Transfer",
bank:"SBI",
upiId:"sneha@okaxis",
reference:"BH-2026-001"
},

{
id:"2",
merchant:"BigBasket",
amount:1240,
date:"Today",
app:"PhonePe",
type:"debit",
category:"Groceries",
bank:"SBI",
upiId:"bigbasket@ibl",
reference:"BH-2026-002"
},

{
id:"3",
merchant:"MSEB Bill",
amount:890,
date:"Yesterday",
app:"Paytm",
type:"debit",
category:"Bills",
bank:"SBI",
upiId:"mseb@paytm",
reference:"BH-2026-003"
},

{
id:"4",
merchant:"Rahul Kumar",
amount:500,
date:"Yesterday",
app:"BHIM",
type:"credit",
category:"Transfer",
bank:"SBI",
upiId:"rahul@ybl",
reference:"BH-2026-004"
}

];