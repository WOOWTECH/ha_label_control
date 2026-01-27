# Home Assistant Label Control

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/WOOWTECH/ha_label_control)](https://github.com/WOOWTECH/ha_label_control/releases)
[![License](https://img.shields.io/github/license/WOOWTECH/ha_label_control)](LICENSE)

A Home Assistant custom component that provides a sidebar panel for controlling entities organized by labels. Works with the [Permission Manager](https://github.com/WOOWTECH/ha_permission_manager) integration to show only the labels each user has permission to access.

## Features

- **Label-based Entity Control**: View and control entities grouped by their assigned labels
- **Permission-aware**: Integrates with Permission Manager to show only permitted labels for each user
- **Multi-language Support**: English, Traditional Chinese (zh-Hant), and Simplified Chinese (zh-Hans)
- **Modern UI**: Clean, responsive interface following Home Assistant design guidelines
- **Domain Grouping**: Entities are organized by domain (lights, switches, climate, etc.)
- **Real-time Updates**: Entity states update in real-time

## Screenshots

The panel displays labels as cards with entity counts. Click a label to see all entities with that label, organized by domain.

## Requirements

- Home Assistant 2024.1.0 or newer
- [Permission Manager](https://github.com/WOOWTECH/ha_permission_manager) integration (dependency)

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click the three dots in the top right corner
3. Select "Custom repositories"
4. Add this repository URL: `https://github.com/WOOWTECH/ha_label_control`
5. Select "Integration" as the category
6. Click "Add"
7. Search for "Label Control" and install it
8. Restart Home Assistant

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/WOOWTECH/ha_label_control/releases)
2. Extract the `ha_label_control` folder to your `custom_components` directory
3. Restart Home Assistant

## Configuration

1. Go to **Settings** > **Devices & Services**
2. Click **+ Add Integration**
3. Search for "Label Control"
4. Click to add it

After installation, a new "Label Control" panel will appear in your sidebar.

## How It Works

### For Admin Users
Admin users see all labels defined in Home Assistant with full access.

### For Non-Admin Users
Non-admin users see only the labels they have been granted access to via the Permission Manager integration. The permission levels are:

- **Closed (0)**: No access
- **View (1)**: Can see the label and its entities
- **Limited (2)**: Can view and limited control
- **Edit (3)**: Full control

## File Structure

```
custom_components/ha_label_control/
├── __init__.py           # Main integration setup
├── manifest.json         # Component manifest
├── config_flow.py        # Configuration flow
├── const.py              # Constants
├── panel.py              # WebSocket API handlers
├── strings.json          # Default strings
├── frontend/
│   └── ha-label-control-panel.js  # Frontend panel
└── translations/
    ├── en.json           # English translations
    ├── zh-Hant.json      # Traditional Chinese
    └── zh-Hans.json      # Simplified Chinese
```

## WebSocket API

The integration exposes two WebSocket commands:

### `label_control/get_permitted_labels`
Returns a list of labels the current user has permission to access.

### `label_control/get_label_entities`
Returns entities grouped by domain for a specific label.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/WOOWTECH/ha_label_control/issues).

## Credits

Developed by [WOOWTECH](https://github.com/WOOWTECH)
