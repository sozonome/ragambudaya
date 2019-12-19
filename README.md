# Hatchoko Ionic App - Ragam Budaya 
- Hanasya Shabrina  00000014425
- Agustinus Nathaniel 00000014472
- Kevin Kelly Isyanta 00000014910
<br><b>2019</b>

### Dependencies / Library Used
- cordova plugins
  - <code>cordova-plugin-camera-preview</code>
  - <code>cordova-plugin-x-socialsharing</code>
- <code>watermarkjs</code>

### Guide
- To run locally
  <code>npm i</code> or <code>npm install</code>
  <br>
- Debug app to Android
  <code>npm run debug-android</code> or <code>ionic cordova run android</code>
  <br>
- Build to Android application
  1. Build release APK
    <code>npm run build-release-android</code>
    or <code>ionic cordova build android --prod --release</code>
    <br>
  2. Create a keystore
    <code>keytool -genkey -v -keystore [APPNAME].keystore -alias [APP_ALIAS] -keyalg RSA -keysize 2048 -validity 10000</code> <br>
    change [APPNAME] and [APP_ALIAS] to any name needed <br>
    e.g. : <code>keytool -genkey -v -keystore RagamBudaya-mobileapps.keystore -alias RagamBudaya -keyalg RSA -keysize 2048 -validity 10000</code><br>
    <b>OR just use the keystore in this repository and skip this step</b>
    <br>
  3. Place the keystore / generated keystore (copy/move it) into the release APK folder
    <code>cd platforms/android/app/build/outputs/apk/release</code>
    (put the keystore here)<br>
    Still in <code>platforms/android/app/build/outputs/apk/release</code> folder...
    <br>
  4. Sign the APK using <code>jarsigner</code>
    <code>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore [KEYSTORE_NAME / APP_NAME].keystore app-release-unsigned.apk [APP_NAME]</code><br>
    e.g. : <code>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore RagamBudaya-mobileapps.keystore app-release-unsigned.apk RagamBudaya</code><br>
    Not finished yet . . .
    <br>
  5. Run the <code>zipalign</code> tool to optimize the APK
    <code>zipalign -v 4 app-release-unsigned.apk [APP_NAME].apk</code>
    e.g. : <code>zipalign -v 4 app-release-unsigned.apk RagamBudaya.apk</code>
    <br>
  6. Done, the APK is ready to use.
  <br>
  7. [The APK can't be installed?](https://stackoverflow.com/questions/34265897/cannot-install-signed-apk-to-device-manually-got-error-app-not-installed)

#### Questions or Discussions
If you are someone out there trying to learn using this project, feel free to give some feedbacks / discussions with us through 'New Issue' button.

#### References
- [Build Release Signed APK to Android using Cordova](https://stackoverflow.com/questions/26449512/how-to-create-a-signed-apk-file-using-cordova-command-line-interface)
- [<code>zipalign</code> not found? (in command)](https://stackoverflow.com/questions/31048208/zipalign-command-not-found)