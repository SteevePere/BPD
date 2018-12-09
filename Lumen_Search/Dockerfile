FROM php:7.2-apache

RUN docker-php-ext-install pdo_mysql
RUN a2enmod rewrite
RUN pecl install mongodb && docker-php-ext-enable mongodb

ADD . /var/www
ADD ./public /var/www/html
RUN chmod -R 777 /var
