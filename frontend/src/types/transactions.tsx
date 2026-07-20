export interface Transaction {

    id:string;

    merchant:string;

    amount:number;

    date:string;

    app:"GPay"|"PhonePe"|"Paytm"|"BHIM";

    type:"credit"|"debit";

    category:string;

    bank:string;

    upiId:string;

    reference:string;

}