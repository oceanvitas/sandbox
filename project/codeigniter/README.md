### init config
*  add VirtualHost in httpd-vhosts
	<VirtualHost *:80>
	   DocumentRoot "/Users/.../codeigniter/"
	    ServerName local.codeigniter.com
	    SetEnv CI_ENV development
	         <Directory "/.../codeigniter/">
	                Options Indexes FollowSymLinks MultiViews
	                AllowOverride None
	                Order deny,allow
	                Allow from all
	                Require all granted
	        </Directory>
	         ErrorLog /private/var/log/codeigniter.com-error_log
	         CustomLog /private/var/log/codeigniter.com-access_log common

	        DirectoryIndex index.php index.php3 index.html
	</VirtualHost>

* add host 
	127.0.0.1 local.codeigniter.com