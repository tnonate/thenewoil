---
layout: "@layouts/default.astro"
title: Criteria
draft: false
---

# Criteria

Every service we recommend must meet at least the following criteria.

## Definitions

Because many words and phrases can be subjective, we have clarified some of our usage here to avoid confusion.

* **Actively maintained** - A developer (or development team) who is regularly updating and improving the project, and who engages with user feedback such as bug reports, feature requests, etc. We do not impose specific timelines on this definition as different projects require different update frequencies, and different development teams have different resources available in terms of time and expertise. However it should be easy to prove that the project is still being maintained to qualify.

* **All operating systems** - Debian, Fedora, Mac, Windows, Android, and iOS.

* **Anonymous sign up** - Sign up does not require possibly identifying information such as a SIM phone number, real name, or credit card. VoIP numbers, masked email address, and cryptocurrency are acceptable forms of verification.

* **Big Tech** - Large technology companies that engage in privacy-averse practices, such as collecting more data than necessary, selling targeting ads, and more. Companies include but are not limited to Google, Amazon, Facebook, Apple, Microsoft, Discord, Snapchat, TikTok, etc.

* **Ephemeral messaging** - the ability to set messages to automatically delete from your device (and usually recipient devices) after a certain period of time.

* **Metadata resistant** - The service has taken significant steps to reduce the amount of metadata can be collected by an inside actor, legal order, or adversary who intercepts traffic in a default state (that is, without exploiting any additional zero days, vulnerabilities, or other significant efforts outside the typical operation of the service). This could include (but is not limited to) things like using multi-hop architecture to hide the sender's IP address or not logging message hsitory. _IMPORTANT NOTE:_ This is a broad criteria. Exactly what metadata is obfuscated and how varies from service to service. Readers should never assume that all metadata is protected or even that all services obfuscate the same metadata. Please consult the service in question for more details about what metadata they protect and how.

* **Recently audited** - code was examined by a qualified, independent, third-party auditor within the last 5 years and results were publicly released in a complete, comprehensible form

* **Source available** - the overwhelming majority of the source code is available for review by anyone to audit, suggest improvements, or report vulnerabilities. Any proprietary bits should be kept to a minimum and should have a valid reason for keeping them proprietary, such as licensing requirements of the code being used or for security reasons (ex, Signal keeping their anti-spam features hidden to slow down spammers finding workarounds).

## Universal Requirements

* Must be actively maintained
* Must be available on all operating systems (where applicable). Web apps acceptable for desktop, though not preferred.
* Mobile apps must be available through the Google Play and/or Apple App stores (where applicable). F-Droid and/or APKs preferred for Android devices.
* Recommendations must be source available (at least on the client side) unless few or no such alternatives exist.
* Proprietary recommendations must have an established history or assurance of respecting user privacy and data sovereignty, or must offer significant features not found in their source available counterparts that would be beneficial for a typical threat model

## Backup & Cloud Storage

* Must offer a free plan
* Must be zero knowledge
* Must target consumers (ex, there should not be an abundance of talk on the main pages of the website about APIs, compliance, and other topics that would not be of interest to an average consumer)

### Books & Documentaries
* May be exempt from the "must be actively maintained" rule, however must be no older than 5 years or must be provably still relevant and accurate.
* Non-fiction only
* Educational content only

## Browser Extensions
* Must improve user privacy and/or security significantly to the point of offsetting the risk of additional browser fingerprinting enabled

## Destkop Settings & Apps
* Recommended settings changes must reduce the amount of data submitted to the developers or must improve device security against common threats
* Recommended settings changes must not break functionality

## Encrypted Messaging
* Must have end-to-end encrypted one-to-one messaging enabled by default
* Ability to export messages for backup or portability purposes
* Must optionally support ephemeral messaging (realtime messaging only)
* Must be metadata-resistant (realtime messaging only)
* Must support custom domains (e-mail only)

## Links & Resources
* All resources and links must be directly relevant to individual data privacy and/or cybersecurity.

## Mobile Settings & Apps
* Recommended settings changes must reduce the amount of data submitted to the device manufacturer, cell carrier, and/or app developers and/or must improve device security against common threats
* Recommended settings changes must not break functionality

## Multifactor Authentication
* Hardware keys are excempt from the "must be actively maintained" rule due to the fact that many obtain security by not pushing updates
* Must offer the ability to export seeds

## Password Managers
* For the user-friendliness of the target audience, stateless password managers are not permitted

## Payment Masking
* Must allow the creation of at least one credit or debit card that allows the user's real banking information to be protected against card skimming or theft

### Podcast/Video
* Must be actively producing content
* Educational content only
* Non-fiction content only

## VOIP
* Must be capable of making and receiving calls, SMS, and MMS to "regular" phone numbers.
* Must have a first-party mobile app
* Must target consumers (ex, there should not be an abundance of talk on the main pages of the website about APIs, compliance, and other topics that would not be of interest to an average consumer)
* Excempt from "all operating systems" requirement, only required to be available for mobile devices (desktop apps preferred)

## VPNs
* Must not keep logs

## Web Browsers
* Must be capable of auto-update
* Recommended settings changes must improve user privacy and/or security while causing little or no breakage on commonly used sites