# VintedTitles

A browser extension that adds full item titles to Vinted listings, making it easier to see complete product information without clicking on each item.

## Features

- **Full Title Display**: Shows complete item titles instead of truncated versions
- **Multi-language Support**: Works across all Vinted international domains
- **Clean Integration**: Seamlessly integrates with Vinted's existing UI

## Supported Domains

The extension works on all Vinted international domains:

- United Kingdom, United States, France, Germany, Austria, Australia
- Belgium, Czech Republic, Denmark, Estonia, Spain, Finland, Greece
- Croatia, Hungary, Ireland, Italy, Lithuania, Luxembourg, Latvia
- Netherlands, Poland, Portugal, Romania, Sweden, Slovenia, Slovakia

## How It Works

VintedTitles extracts the full item title from the image alt text and displays it above the brand name in product listings. The extension:

1. Parses image alt text to extract titles before metadata fields (Brand, Condition, Size, etc.)
2. Removes existing titles to prevent duplicates
3. Inserts the full title in a styled element above the brand
4. Uses a MutationObserver to handle infinite scroll and dynamic content loading

## Installation

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this repository

### Chrome/Chromium

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the directory containing `manifest.json`

## Development

The extension consists of:

- `manifest.json` - Extension configuration and permissions
- `content/vinted-titles.js` - Main content script logic
- `content/vinted-titles.css` - Styling for the title display
- `icons/` - Extension icons

### Building

No build process is required - the extension uses vanilla JavaScript and CSS. Simply load the unpacked extension as described above.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Privacy Policy

VintedTitles does not collect, store, or transmit any user data. All processing is done locally in the browser. The extension only requires permission to access Vinted domains to inject the content script.
