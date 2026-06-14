# PDF Embed Block — Embed PDF Files in Posts or Pages

![PDF Embed Banner](https://ps.w.org/pdf-embed-block/assets/banner-772x250.png)

[![WordPress Support](https://img.shields.io/badge/WordPress-6.5+-blue.svg?style=flat-square&logo=wordpress)](https://wordpress.org/plugins/pdf-embed-block/)
[![PHP Support](https://img.shields.io/badge/PHP-7.1+-777bb4.svg?style=flat-square&logo=php)](https://wordpress.org/plugins/pdf-embed-block/)
[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-green.svg?style=flat-square)](https://wordpress.org/plugins/pdf-embed-block/)
[![Stable Version](https://img.shields.io/badge/Version-1.3.1-blue.svg?style=flat-square)](https://wordpress.org/plugins/pdf-embed-block/)

**PDF Embed Block** is a lightweight, high-performance, and fully responsive Gutenberg block and shortcode plugin for WordPress. It allows your website visitors to view and embed PDF files easily in your posts or pages using the official Adobe PDF Embed API.

---

## 🚀 Key Features

### 💎 Core Functionality (Free)
Everything you need to add a seamless PDF viewer to your website:
- **Adobe PDF Embed Engine:** Renders high-fidelity, interactive, and crisp vector-drawn PDF files directly on your page.
- **2 Embed Modes:**
  - **Sized Container:** Embed the PDF in a designated width and height container.
  - **In-Line:** Display the PDF inline with the webpage layout.
- **Alignment Controls:** Align the PDF container to Left, Center, Right, Wide, or Full Width.
- **Dimension Customization:** Configure custom width (e.g. `100%`) and height (e.g. `469px`) settings in the block sidebar.
- **Universal Shortcode API:** Embed PDFs anywhere on your site using simple shortcodes.
- **Uninstall Data Cleanup:** Toggle database cleaning options to wipe custom posts, API keys, and plugin settings when the plugin is deleted.

### 👑 Premium Power (Pro)
Unlock advanced styling and viewer control:
- **Show Download PDF Toggle:** Allow or restrict visitors from downloading the PDF file directly.
- **Show Print PDF Toggle:** Allow or restrict visitors from printing the PDF directly.
- **Show Fullscreen Mode Toggle:** Allow or restrict fullscreen reading mode.
- **Layout Spacing Controls:** Custom padding and margins for your PDF viewer.
- **Custom Borders & Shadows:** Design beautiful containers with custom borders (style, width, color, radius) and multi-layered box shadows.

---

## 🧩 Gutenberg Blocks Reference

The plugin registers a modern Gutenberg block:

| Block Title | Block Name (Slug) | Description |
| :--- | :--- | :--- |
| **PDF Embed** | `peb/pdf-embed` | Adds a customizable PDF viewer block with design and embed mode controls. |

---

## 🗂 Custom Post Types (CPTs)

To separate configurations cleanly, the plugin registers a custom post type:
1. **`pdf_embed` (PDF Embed):** Manages saved block configurations and PDF files, allowing them to be loaded anywhere via shortcodes.

---

## 🔌 Developer Shortcodes API

Embed any saved PDF Embed configuration anywhere on your site:
```markdown
[pdf_embed id="123"]
```
*Code Reference:* Defined in [ShortCode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/ShortCode.php).

---

## 🛠 Technical Stack & Libraries

- **Adobe PDF Embed API:** The underlying rendering engine that provides high-fidelity viewer controls.
- **Frontend JS/React:** React is used to drive the custom Gutenberg block interfaces, custom sidebars, and admin dashboard fields.
- **Build System:** Gulp handles packaging and ZIP compilation, while Webpack via `@wordpress/scripts` handles block transpilation and code splitting.
- **bpl-tools (Shared Utility):** A shared utility library providing admin dashboard components and common Gutenberg editor controls.
  - **Source/GitHub:** [bPlugins/bpl-tools](https://github.com/bPlugins/bpl-tools)
  - **License:** GPL-2.0-or-later
  - **External Services:** Connects to bPlugins and Freemius services for product data and checkout functionality.

---

## 💻 Developer Guide

### Directory Layout

- **`/src`**: Active React components, SCSS styling, and Webpack entry files.
  - **`/pdf-embed`**: Gutenberg block edit/save templates, settings panels, display modes, and SDK wrapper.
  - **`/bplugins-admin`**: React components and layouts for the backend plugin settings page.
  - **`/utils`**: Common helper functions and icons.
- **`/includes`**: Core PHP controllers, namespace loaders, and class managers.
  - [core.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/core.php): Main plugin bootstrapper and loader.
  - [Init.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/Init.php): Registers block types and custom post types.
  - [AdminMenu.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/AdminMenu.php): Creates submenu page for Help & Demos and renders the settings dashboard wrapper.
  - [Enqueue.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/Enqueue.php): Enqueues editor blocks scripts, Adobe SDK scripts, and dashboard style assets.
  - [ShortCode.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/ShortCode.php): Handles shortcode rendering.
  - [CustomColumn.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/CustomColumn.php): Appends a quick copy-to-clipboard shortcode column in the PDF CPT admin table.
  - [RestAPI.php](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/includes/RestAPI.php): Processes backend AJAX settings requests securely.
- **`/build`**: Compiled and bundled files (automatically generated via Webpack).
- **`index.php`**: The main executable and plugin bootstrapper.
- **`uninstall.php`**: Database cleaning script executed on plugin deletion.

### Development Workflow

1. Install development dependencies:
   ```bash
   npm install
   ```
2. Start development hot-rebuild mode:
   ```bash
   npm start
   ```
3. Compile minified assets for release:
   ```bash
   npm run build
   ```
4. Package plugin into a clean distribution ZIP file:
   ```bash
   npm run make-zip
   ```

### Data Flow & Lifecycle
1. **Editor Side:** Block configurations are configured via React panels in `/src/pdf-embed` and stored as serialized block attribute comments in the post content database.
2. **PHP Frontend Rendering:** When a shortcode or block renders, the server parses the attributes and outputs a DOM container with a `data-props` JSON string.
3. **JS Initialization:** On DOMContentLoaded, the frontend script [view.js](file:///c:/Users/Shamim%20bPlugins/Local%20Sites/free-plugins-dev/app/public/wp-content/plugins/pdf-embed-block/src/pdf-embed/view.js) parses `data-props`, mounts the React component, and renders the PDF using the Adobe PDF Embed API within the specified display mode (Sized Container, In-Line, Lightbox, or Full Window).

---
*Developed with ❤️ by [bPlugins](https://bplugins.com)*