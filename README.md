# Mastering Chrome DevTools, v4
This is a companion repository for the [Mastering Chrome DevTools, v4](https://frontendmasters.com/courses/dev-tools-v4/) course on Frontend Masters.
[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/dev-tools-v4/)

## Running the Site

This website is a collection of static HTML files that need to be served through an HTTP server. Here are a few options to run it locally:

### Using Node.js http-server

```bash
# Install globally
npm install -g http-server

# Run (from project directory)
http-server
```

### Using Python

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

### Using PHP

```bash
php -S localhost:8080
```

Any of these commands will start a local server, typically accessible at `http://localhost:8080`. Choose the method that best suits your system and preferences.

### Adding a PHP router

This is not require for the course, but the basic PHP server won't resolve links without extensions. A solution is to add a `router.php` to the project:

```php
// create a router.php file in the root of the project with this code:

<?php
// Get the requested URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// If the file exists, serve it directly
if (is_file(__DIR__ . $uri)) {
    return false;
}

// Check for the root path
if ($uri == '/') {
    include __DIR__ . '/index.html';
    return true;
}

// Check if the path with .html exists
if (is_file(__DIR__ . $uri . '.html')) {
    include __DIR__ . $uri . '.html';
    return true;
}

// Default to 404
http_response_code(404);
echo "404 Not Found";

```

Then run the PHP server with:

```bash
php -S localhost:8080 router.php
```
