"""Constants for ha_label_control."""

DOMAIN = "ha_label_control"

# Permission Manager patterns
# Entity ID format: select.permission_manager_{user}_{resource_type}_{resource}
# We check for entities starting with this prefix
PERM_PREFIX = "select.permission_manager_"
PERM_LABEL_TYPE = "label"

# Permission levels
PERM_CLOSED = 0
PERM_VIEW = 1
PERM_LIMITED = 2
PERM_EDIT = 3

# Panel configuration
PANEL_URL = "label-control"
PANEL_TITLE = "Label Control"
PANEL_TITLE_ZH = "標籤控制"
PANEL_ICON = "mdi:label"
PANEL_VERSION = "1.1.0"
