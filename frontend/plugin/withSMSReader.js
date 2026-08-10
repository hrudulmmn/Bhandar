const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");

const fs = require("fs");
const path = require("path");

const PACKAGE_NAME = "com.hrudulmmn.frontend";

function getPackagePath() {
  return PACKAGE_NAME.replace(/\./g, "/");
}

function getModuleCode() {
  return `package ${PACKAGE_NAME}

import android.Manifest
import android.content.pm.PackageManager
import android.provider.Telephony
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SMSReaderModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SMSReader"
    }

    @ReactMethod
    fun hasPermission(promise: Promise) {
        try {
            val granted =
                ContextCompat.checkSelfPermission(
                    reactApplicationContext,
                    Manifest.permission.READ_SMS
                ) == PackageManager.PERMISSION_GRANTED

            promise.resolve(granted)

        } catch (e: Exception) {
            promise.reject(
                "PERMISSION_CHECK_ERROR",
                e.message,
                e
            )
        }
    }

    @ReactMethod
    fun getMessages(
        maxCount: Int,
        promise: Promise
    ) {
        try {
            val context = reactApplicationContext

            val permission =
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.READ_SMS
                )

            if (permission != PackageManager.PERMISSION_GRANTED) {
                promise.reject(
                    "READ_SMS_PERMISSION_DENIED",
                    "READ_SMS permission has not been granted."
                )
                return
            }

            val messages = Arguments.createArray()

            val cursor = context.contentResolver.query(
                Telephony.Sms.Inbox.CONTENT_URI,
                arrayOf(
                    Telephony.Sms._ID,
                    Telephony.Sms.ADDRESS,
                    Telephony.Sms.BODY,
                    Telephony.Sms.DATE
                ),
                null,
                null,
                "\${Telephony.Sms.DATE} DESC"
            )

            cursor?.use {
                val idIndex =
                    it.getColumnIndexOrThrow(
                        Telephony.Sms._ID
                    )

                val addressIndex =
                    it.getColumnIndexOrThrow(
                        Telephony.Sms.ADDRESS
                    )

                val bodyIndex =
                    it.getColumnIndexOrThrow(
                        Telephony.Sms.BODY
                    )

                val dateIndex =
                    it.getColumnIndexOrThrow(
                        Telephony.Sms.DATE
                    )

                var count = 0

                while (it.moveToNext() && count < maxCount) {
                    val message = Arguments.createMap()

                    message.putString(
                        "id",
                        it.getString(idIndex)
                    )

                    message.putString(
                        "address",
                        it.getString(addressIndex)
                    )

                    message.putString(
                        "body",
                        it.getString(bodyIndex)
                    )

                    message.putDouble(
                        "date",
                        it.getLong(dateIndex).toDouble()
                    )

                    messages.pushMap(message)

                    count++
                }
            }

            promise.resolve(messages)

        } catch (e: SecurityException) {
            promise.reject(
                "READ_SMS_SECURITY_ERROR",
                "SMS permission was not granted.",
                e
            )

        } catch (e: Exception) {
            promise.reject(
                "SMS_READ_ERROR",
                e.message,
                e
            )
        }
    }
}
`;
}

function getPackageCode() {
  return `package ${PACKAGE_NAME}

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class SMSReaderPackage : ReactPackage {

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        return listOf(
            SMSReaderModule(reactContext)
        )
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> {
        return emptyList()
    }
}
`;
}

function withSMSReader(config) {
  // Add READ_SMS to AndroidManifest
  config = withAndroidManifest(config, (config) => {
    const permissions =
      config.modResults.manifest["uses-permission"] ?? [];

    const alreadyExists = permissions.some(
      (permission) =>
        permission.$?.["android:name"] ===
        "android.permission.READ_SMS"
    );

    if (!alreadyExists) {
      permissions.push({
        $: {
          "android:name":
            "android.permission.READ_SMS",
        },
      });
    }

    config.modResults.manifest["uses-permission"] =
      permissions;

    return config;
  });

  // Create/register the native Kotlin module
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      const androidRoot = config.modRequest.platformProjectRoot;

      const javaRoot = path.join(
        androidRoot,
        "app",
        "src",
        "main",
        "java",
        getPackagePath()
      );

      fs.mkdirSync(javaRoot, {
        recursive: true,
      });

      // Create SMSReaderModule.kt
      fs.writeFileSync(
        path.join(
          javaRoot,
          "SMSReaderModule.kt"
        ),
        getModuleCode()
      );

      // Create SMSReaderPackage.kt
      fs.writeFileSync(
        path.join(
          javaRoot,
          "SMSReaderPackage.kt"
        ),
        getPackageCode()
      );

      // Register package in MainApplication.kt
      const mainApplicationPath = path.join(
        javaRoot,
        "MainApplication.kt"
      );

      if (fs.existsSync(mainApplicationPath)) {
        let content = fs.readFileSync(
          mainApplicationPath,
          "utf8"
        );

        if (
          !content.includes(
            "add(SMSReaderPackage())"
          )
        ) {
          const marker =
            "PackageList(this).packages.apply {";

          if (content.includes(marker)) {
            content = content.replace(
              marker,
              `${marker}
          add(SMSReaderPackage())`
            );

            fs.writeFileSync(
              mainApplicationPath,
              content
            );
          } else {
            throw new Error(
              "Could not find PackageList in MainApplication.kt"
            );
          }
        }
      } else {
        throw new Error(
          "MainApplication.kt was not found at " +
            mainApplicationPath
        );
      }

      return config;
    },
  ]);

  return config;
}

module.exports = withSMSReader;