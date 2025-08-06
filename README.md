# Description

This application works on both Android Tablets, and phones. However, it is originaly intended to be used on Android Tablets ONLY.

## Requirements

Note that these steps work specifically for Windows users only. However, Mac and Linux Users should be able to get the app running based on these instructions, but please use the correct command line and steps to create Environment Variable on your system.

We need to install Android Studio to be able to run Android Emulators.

Install [Android Studio](https://developer.android.com/studio)
Once installed, check to make sure we have adb installed `~/AppData/Local/Android/Sdk/platform-tools/adb` (~ is C:\Users\Your_User_Name).If you get an error like "adb command not found", then adb is not installed. (By default, adb should be installed automatically for you, but in case for some reason it didn't install for you then follow the step below to install adb)

Install [adb](https://developer.android.com/studio/releases/platform-tools). Then extract the adb zip file, and copy the "platform-tools" folder inside of the extracted folder to `~/AppData/Local/Android/Sdk` If the platform-tools folder is already exist, make sure to overwrite it.

Once you have completed the steps above, you need to navigate to Control Panel > User Accounts > User Accounts > Change my environment variables (on the left panel). An Environment Variables window will open, by User variables for "Your_User_Name", you need to click on "New..." to create a new Variable. Enter `ANDROID_HOME` for Variable Name, and the path to your Android's Sdk folder `C:\Users\Your_User_Name\AppData\Local\Android\Sdk` Please make sure to swap out "Your_User_Name" to whatever the user name on your computer is, and double check on the name of folder "Sdk" (By the time of me writing these instructions, "Sdk" is the correct name, but they may change this folder's name to something else). Next scroll down and find the "Path" Variable, then click "Edit...". Click on New button, to create a new path, then copy the absolute path of your platform-tools folder and paste it in here`C:\Users\Your_User_Name\AppData\Local\Android\Sdk\platform-tools`. Then click Ok and exit.

After completed all the initial setup, we can go ahead and do `npm i` in this project's root folder to install all dependencies.

## Start the App

Open Android Studio, if you are greeted with a welcome window, and options to create a new project, or to open an existing one, you can just click on the "3 dots" button and select "Virtual Device Manager". Create a new virtual device, by select a Tablet device, click Next, and choose an Android version. (Note that Android 11.0 (API Level 30) was used to succesfully run the app). Once finished, you don't have to start the emulator, the script in the instruction below will start it up for you automatically, as long as you have the Device Manager window opened. Or you can manually start it up before we run the scripts below. It doesn't matter.

We can now start the app by first `npm start` to start Metro.
Keep this Metro terminal open, and open another terminal window, and run `npm run android`. Now wait for a little bit, and the app should be running on the Android Emulator.

The instruction below is to build a `.aab` file for production and publishing on Google Play.

## Build Instructions for Android

### Step 1: (skip this if you have Android studio setup and running)

Have Android studio installed and ready install. Follow `Android development environment` [here](https://reactnative.dev/docs/environment-setup) to set install and setup Android Studio.

### Step 2:

Open Android studio --> select `Open Existing Project` --> open `PATH_TO/dashboardMobile/android`

### Step 3:

Open `app/build.gradle` in Gradle Scripts, inside build.gradle find `versionCode` and `versionName` increase it according to the instructions in `app/build.gradle`

### Step 4:

Locate the `Build` option on the tool bar on top of the screen. `Build ---> Generate Signed Bundle / APK ---> Next ---> for Key Store Path ---> select Choose Existing ---> PATH_TO/dashboardMobile/DashboardMobile_android_key_store`. Enter `dashboardmobile@Skipli` for both key store password and key password. Select `Remember passwords`. Then click Next. Choose `release`. Then click finish

### Step 5:

Wait for the gradle successfully build then locate the
`app-release.aab`
at
`PATH_TO/dashboardMobile/android/app/release`

### Step 6

Upload `.aab` to Goole play store console

## Code Push Build Instructions

### NOTE: Code Push ONLY works for any changes in .js files. Any changes relate to Native files (files in android folder) such as gradle, MainActivity.js, MainApplication.js will not reflected on the relase version and could cause ERROR. Please use with CAUTION.

### Step 1: Install Code Push App Center CLI if you have not installed it.

`npm install -g appcenter-cli`
then to login run this in your teminal and follow the instructions
`appcenter login`

### Step 2:

Open Android studio --> select `Open Existing Project` --> open `PATH_TO/dashboardMobile/android`

### Step 3:

Open `app/build.gradle` in Gradle Scripts, inside build.gradle find `versionCode` and `versionName` increase it according to the instructions in `app/build.gradle`

### Step 4:

Locate the `Build` option on the tool bar on top of the screen. `Build ---> Generate Signed Bundle / APK ---> Next ---> for Key Store Path ---> select Choose Existing ---> PATH_TO/dashboardMobile/DashboardMobile_android_key_store`. Enter `dashboardmobile@Skipli` for both key store password and key password. Select `Remember passwords`. Then click Next. Choose `release` in Build Variants. Then click finish

Deselect "Export encrypted key for enrolling published app"
Key Alias: dashboard_mobile_key_store

### Step 5.a: Deploy BETA Version - Only available with device that has this feature enable

In your terminal run this
`appcenter code push relase-react -a Skipli/dashboard-mobile -m -d Staging --description <YOUR DESCRIPTION - please include the app version from Gradle file.>`

### Step 5.a: Deploy PRODUCTION Version

After testing with beta version and ready for deployment
`appcenter code push relase-react -a Skipli/dashboard-mobile -m -d Production --description <YOUR DESCRIPTION - please include the app version from Gradle file.>`

### Step 6: Upload .aab

Upload .aab file to Google Play Store console
# usa-mobile
