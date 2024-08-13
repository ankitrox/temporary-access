=== Temporary Access ===
Contributors: shrutigade, wpgurudev
Tags: passwordless, login, temporary, temporary access, limit login
Requires at least: 5.5.0
Tested up to: 6.7.0
Requires PHP: 7.3
Stable tag: 0.0.1
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

== Frequently Asked Questions ==

= How many users can be created using this plugin? =
You can created unlimited users.

= Does it provide a REST API endpoint? =
Yes. It provides REST API endpoints with `tempaccess/v1/` route.

== Screenshots ==

1. Users listing
2. Add user
3. Create user
4. Delete user

== Changelog ==

= 1.0.0 =
* First release.
