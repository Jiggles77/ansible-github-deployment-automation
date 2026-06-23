server {
    listen 80;
    server_name {{ wiki_fqdn }};
    root /var/www/mediawiki;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php-fpm/www.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    error_log /var/log/nginx/wiki_error.log;
    access_log /var/log/nginx/wiki_access.log;
}
