# PostCSS Prefix Hover

[PostCSS] plugin for prefixing a selection containing :hover.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Input example */
.foo a:hover {
    color: black;
}
```

```css
/* Output example */
.using-mouse .foo a:hover {
    color: black;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-prefix-hover
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-prefix-hover'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Settings

| Option                  | Default        | Description |
|-------------------------|----------------|-------------|
| **prefix**              | ".using-mouse" | The selector to prefix |
| **useCssModulesGlobal** | false          | Whether or not the prefix should be wrapped in ":global()" to support CSS Modules |

## Possible issues

Be aware that adding a prefix also adds higher specificity to the CSS selector. This might cause some issues.

**Input causing a possible issue:**

```css
a:hover {
    color: black;
}

a.active {
    color: red;
}
```

**Output** where `a:hover` is more specific than `a.active` causing browsers to prioritize hover over active.

```css
.using-mouse a:hover {
    color: black;
}

a.active {
    color: red;
}
```

**How to fix it:**

```css
a:hover {
    color: black;
}

a.active,
a.active:hover {
    color: red;
}
```

This will output the following:

```css
.using-mouse a:hover {
    color: black;
}

a.active,
.using-mouse a.active:hover {
    color: red;
}
```
