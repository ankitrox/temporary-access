=== Temporary Access ===
Contributors: shrutigade, wpgurudev
Donate link: http://sharethingz.com
Tags: passwordless, login, temporary, limit login, passwordless
Requires at least: 5.5.0
Tested up to: 6.7.0
Requires PHP: 7.3
Stable tag: 1.0.0
License: GPLv2 or later (of course!)
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Provide temporary access to users without password

== Description ==
Temporary access plugin allows to provide temporary access to users without password. A generates a magic link which users can use to login to the website without entering password.

= Features =

* Create unlimited temporary users.
* Provides a magic link to allow passwordless login.
* Set start time and expiration time to allow logins for temporary users.
* REST API to perform CRUD operations.
* User friendly interface to manage temporary users.
* Best code quality. `SOLID` principles used during development.
* Active support and maintenance.

== Installation ==
1. Install Temporary Acess from the 'Plugins' section in your dashboard (Plugins > Add New > Search for "Temporary Access" ).

2. Alternatively, you can [download](https://downloads.wordpress.org/plugin/temporary-access.zip) the plugin from the repository. Unzip it and upload it to the plugins folder of your WordPress installation (wp-content/plugins/ directory of your WordPress installation).

3. Activate it through the 'Plugins' section.

4. Go to Users > Temporary Users, you can manage temporary users in this page.

== Frequently Asked Questions ==

= How many users can be created using this plugin? =
You can created unlimited users.

= Does it provide a REST API endpoint? =
Yes. It provides REST API endpoints with `tempaccess/v1/` route.

= Can I set the password for the user? =
Setting a password for the user is available in REST API, but not in the user interface. However; this can be introduced 
in the upcoming versions.

= How should I share the magic login link with the users? =
There is an option to copy the login link to the clipboard in users listing (Users > Temporary Access) page. You can copy the link 
and share it with user. We will introduce the feature to send it via email in future versions.

= Can I set the expiry in minutes, hours or days? =
You can set the expiry to all of these and even in seconds. Plugin provides the date and time picker for 
expiry, so you can select date time upto seconds of your choice.

= Can I set the option to redirect the users after they login to a specific page? =
This option will be introduced in the future version and is scheduled in the roadmap for the plugin.

= How can I suggest the new feature for the plugin? =
You can suggest a new feature via support forum or you can open a [new issue on github](https://github.com/ankitrox/temporary-access/issues/new). 

== Screenshots ==

1. Users Listing
2. Add User
3. Updare User
4. Delete User

== Changelog ==

= 1.0.0 =
* First release.

== Upgrade Notice ==

= 1.0.0 =
* Initial version.
