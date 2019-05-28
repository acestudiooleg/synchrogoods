# Installation Instructions

The following is a set of instructions for Driver App installation and setting up, which is hosted in the [Marketsoup organization](https://bitbucket.org/marketsoup/) on Bitbucket.

Feel free to make a request to update this instructions if you use different OS.

#### Table of Contents
* [Oracle Java](#oracle-java)
* [Android SDK](#android-sdk)
* [Gradle](#gradle)
* [Node](#node)
* [Ruby](#roby)

## Oracle java

### Installation

### Linux

You can use WebUpd8 PPA (this will download the required files from Oracle and install JDK 8):

```bash
sudo apt-add-repository ppa:webupd8team/java
sudo apt update
sudo apt install oracle-java8-installer
```

Also ensure your `JAVA_HOME` variable has been set to:

```
/usr/lib/jvm/java-8-oracle
```

## Gradle

### Installation

Follow the [gradle installation instructions](https://docs.gradle.org/current/userguide/installation.html).

### Setting up

Make sure to have the gradle/bin in your `PATH` envrionment variable.

## Android SDK

### Installation

#### Linux

Set up [Android Studio](https://developer.android.com/studio/index.html).

Try to use a script [android-sdk-installer](https://github.com/journeyapps/android-sdk-installer).

Or download SDK and install it manually.

It may also require `lib32stdc++6`. So do `apt install lib32stdc++6`.

#### Mac OS

Proceed to [the instructions](https://github.com/codepath/android_guides/wiki/Installing-Android-SDK-Tools) from `codepath/android_guides`.

### Setting up

Start Android SDK Manager:

```bash
android sdk
```

Install:
* Android SDK Tools
* Android SDK Platform-tools
* Android SDK Build-tools from 23.0.3 to 21.1.2
* Android 6 and Android 5

Start Android Virtual Device (AVD) Manager.

```bash
android avd
```

Create an emulator and try to run it to make sure, that everything works properly.

Make sure to have the android-sdk/tools and android-sdk/platform-tools in your `PATH` envrionment variable.

Also, create a `ANDROID_HOME` envrionment variable and point to the Android SDK location.

## Node

### Installation

Use [tj/n version manager](https://github.com/tj/n) or any other node version manager.

### Setting up

Perform in the working directory

```
npm install
```

## Ruby

### Installation

Use [rvm](https://rvm.io/) or any other ruby version manager.

### Setting up

Perform in the working directory

```
bundle install
```
