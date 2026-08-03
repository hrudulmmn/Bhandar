export function normalizeMerchant(merchant: string): string {

    if (!merchant)
        return "UNKNOWN";

    merchant = merchant.trim();

    merchant = merchant.replace(/\s+/g, " ");

    merchant = merchant.replace(/\.$/, "");

    merchant = merchant.replace(/limited/i, "");

    merchant = merchant.replace(/ltd/i, "");

    merchant = merchant.replace(/private/i, "");

    merchant = merchant.replace(/pvt/i, "");

    merchant = merchant.trim();

    return merchant;

}

export function normalizeAccount(account: string): string {

    if (!account)
        return "";

    const digits = account.replace(/\D/g, "");

    return digits.slice(-4);

}

export function normalizeReference(ref?: string) {

    if (!ref)
        return undefined;

    return ref.trim();

}

export function normalizeAmount(amount: number) {

    return Number(amount.toFixed(2));

}