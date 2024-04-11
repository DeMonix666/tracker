fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android test

```sh
[bundle exec] fastlane android test
```

Runs all the tests

### android beta

```sh
[bundle exec] fastlane android beta
```

Submit a new Beta Build to Crashlytics Beta

### android build_prod

```sh
[bundle exec] fastlane android build_prod
```

Create Production APK

### android distribute_prod

```sh
[bundle exec] fastlane android distribute_prod
```

Deploy production build to firebase

### android increment_prod_version

```sh
[bundle exec] fastlane android increment_prod_version
```



### android build_dev

```sh
[bundle exec] fastlane android build_dev
```

Create Development APK

### android distribute_dev

```sh
[bundle exec] fastlane android distribute_dev
```

Distribute development build to firebase

### android increment_dev_version

```sh
[bundle exec] fastlane android increment_dev_version
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
