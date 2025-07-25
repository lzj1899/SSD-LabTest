FROM php:8.2-apache

# Create non-root user
RUN useradd -m -d /home/www -s /bin/bash www

# Set permissions
COPY ./html /var/www/html/
RUN chown -R www:www /var/www/html

# Switch to non-root user
USER www

EXPOSE 80
