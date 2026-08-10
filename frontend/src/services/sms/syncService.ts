import * as SecureStore from "expo-secure-store";

import { parseSMS } from "../../parser/parserManager";
import { readSMS } from "./smsReader";

import api from "../api";

const LAST_SYNC_PREFIX = "last_sync_";

export async function syncTransactions(
  userId: number
) {
  // Each logged-in user gets their own SecureStore key
  const lastSyncKey = `${LAST_SYNC_PREFIX}${userId}`;

  const messages = await readSMS(500);

  const lastSync =
    Number(
      await SecureStore.getItemAsync(lastSyncKey)
    ) || 0;

  console.log("========== SYNC DEBUG ==========");
  console.log("USER ID:", userId);
  console.log("LAST SYNC KEY:", lastSyncKey);
  console.log("SMS READ:", messages.length);
  console.log("LAST SYNC:", lastSync);

  console.log(
    "LAST SYNC DATE:",
    lastSync
      ? new Date(lastSync).toString()
      : "NEVER"
  );

  let newest = lastSync;

  let parsedCount = 0;
  let skippedOld = 0;
  let apiSuccess = 0;
  let apiFailed = 0;

  for (const sms of messages) {
    // Ignore messages that were already synced
    if (sms.date <= lastSync) {
      skippedOld++;
      continue;
    }

    // Parse SMS
    const parsed = parseSMS(sms);

    // ==============================
    // SMS PARSER DEBUG
    // ==============================

    console.log(
      "========== SMS PARSER DEBUG =========="
    );

    console.log("SENDER:", sms.address);
    console.log("RAW SMS:", sms.body);

    console.log(
      "PARSED:",
      parsed
    );

    console.log(
      "PARSED MERCHANT:",
      parsed?.merchant
    );

    console.log(
      "PARSED BANK:",
      parsed?.bank
    );

    console.log(
      "PARSED AMOUNT:",
      parsed?.amount
    );

    console.log(
      "PARSED TYPE:",
      parsed?.transaction_type
    );

    console.log(
      "PARSED UPI REF:",
      parsed?.upi_ref_no
    );

    console.log(
      "======================================="
    );

    // Not a transaction / parser rejected it
    if (!parsed) {
      continue;
    }

    parsedCount++;

    try {
      // Send parsed transaction to backend
      const response = await api.post(
        "/transactions",
        parsed
      );

      console.log(
        "API SUCCESS:",
        response.status
      );

      apiSuccess++;

      /*
       * Only move last_sync forward after
       * successful backend insertion.
       */
      if (sms.date > newest) {
        newest = sms.date;
      }

    } catch (err: any) {
      apiFailed++;

      console.log(
        "API FAILED:",
        err?.response?.status,
        err?.response?.data ?? err
      );
    }
  }

  // ==============================
  // SYNC RESULT
  // ==============================

  console.log(
    "========== SYNC RESULT =========="
  );

  console.log(
    "USER ID:",
    userId
  );

  console.log(
    "SMS READ:",
    messages.length
  );

  console.log(
    "SKIPPED OLD:",
    skippedOld
  );

  console.log(
    "PARSED:",
    parsedCount
  );

  console.log(
    "API SUCCESS:",
    apiSuccess
  );

  console.log(
    "API FAILED:",
    apiFailed
  );

  console.log(
    "NEW LAST SYNC:",
    newest
  );

  console.log(
    "NEW LAST SYNC DATE:",
    newest
      ? new Date(newest).toString()
      : "NEVER"
  );

  // Save user-specific last sync
  await SecureStore.setItemAsync(
    lastSyncKey,
    newest.toString()
  );

  console.log(
    "LAST SYNC SAVED:",
    lastSyncKey
  );

  return apiSuccess;
}


// ==========================================
// RESET SYNC FOR A SPECIFIC USER
// ==========================================

export async function resetSync(
  userId: number
) {
  const lastSyncKey =
    `${LAST_SYNC_PREFIX}${userId}`;

  await SecureStore.deleteItemAsync(
    lastSyncKey
  );

  console.log(
    "LAST SYNC CLEARED FOR USER:",
    userId
  );

  console.log(
    "DELETED KEY:",
    lastSyncKey
  );
}