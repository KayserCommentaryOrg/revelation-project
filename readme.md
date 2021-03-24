To run locally, you'll need an Apache instance hosting out of the `public` folder in this repo.

I accomplished this by adding the following to my httpd.conf file:

```xml
Listen 81
NameVirtualHost *:81

<VirtualHost *:81>
	DocumentRoot "/Users/josh/code/revelation-project/public"
	<Directory "/Users/josh/code/revelation-project/public">
		Options FollowSymLinks Multiviews
		MultiviewsMatch Any
		AllowOverride All
		Require all granted
	</Directory>
</VirtualHost>
```

You'll also need mod_expires, mod_deflate, mod_filter, and mod_rewrite enabled.
