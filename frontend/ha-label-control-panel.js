// Home Assistant Native Style - Label Control Panel
// Matches HA Home Dashboard design with summary cards and label tiles

const { LitElement, html, css } = await import("/frontend_latest/frontend.js").catch(() => {
  return import("https://unpkg.com/lit@2.8.0/index.js?module");
});

// ============================================================================
// DESIGN TOKENS - HA Native Style
// ============================================================================

const DOMAIN_COLORS = {
  light: "#FFB300",
  switch: "#FFB300",
  input_boolean: "#FFB300",
  fan: "#009688",
  climate: "#FF9800",
  climate_cool: "#2196F3",
  cover: "#9C27B0",
  lock: "#4CAF50",
  lock_unlocked: "#F44336",
  vacuum: "#009688",
  media_player: "#673AB7",
  humidifier: "#00BCD4",
  automation: "#2196F3",
  script: "#2196F3",
  scene: "#E91E63",
  sensor: "#607D8B",
  binary_sensor: "#607D8B",
  button: "#FF9800",
  person: "#4CAF50",
  person_away: "#9E9E9E",
};

const DOMAIN_ICONS = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  input_boolean: "mdi:toggle-switch-outline",
  fan: "mdi:fan",
  climate: "mdi:thermostat",
  cover: "mdi:window-shutter",
  lock: "mdi:lock",
  vacuum: "mdi:robot-vacuum",
  media_player: "mdi:cast",
  humidifier: "mdi:air-humidifier",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-marked-circle",
  button: "mdi:gesture-tap-button",
  person: "mdi:account",
  camera: "mdi:cctv",
  alarm_control_panel: "mdi:shield-home",
  update: "mdi:package-up",
  weather: "mdi:weather-partly-cloudy",
  input_number: "mdi:ray-vertex",
  input_select: "mdi:form-dropdown",
  input_text: "mdi:form-textbox",
  number: "mdi:ray-vertex",
  select: "mdi:form-dropdown",
  text: "mdi:form-textbox",
  device_tracker: "mdi:crosshairs-gps",
  calendar: "mdi:calendar",
  todo: "mdi:clipboard-list",
  remote: "mdi:remote",
};

// Domains that show in summary section
const SUMMARY_DOMAINS = [
  "light",
  "climate",
  "cover",
  "fan",
  "media_player",
  "lock",
  "vacuum",
  "switch",
  "input_boolean",
  "alarm_control_panel",
];

// Domains that can be toggled
const TOGGLEABLE_DOMAINS = [
  "light",
  "switch",
  "input_boolean",
  "fan",
  "automation",
  "lock",
  "vacuum",
  "media_player",
];

// Domain display order
const DOMAIN_ORDER = [
  "light", "switch", "climate", "cover", "fan", "media_player",
  "automation", "script", "scene", "button",
  "sensor", "binary_sensor",
  "vacuum", "lock", "camera",
  "input_boolean", "input_number", "input_select", "input_text",
  "number", "select", "text",
  "person", "device_tracker",
  "calendar", "todo",
  "alarm_control_panel", "update",
];

// Translations
const TRANSLATIONS = {
  en: {
    title: "Label Control",
    summary: "Summary",
    labels: "Labels",
    noLabels: "No labels available",
    noEntities: "No entities with this label",
    entities: "entities",
    loading: "Loading...",
    on: "on",
    off: "off",
    allOff: "All off",
  },
  "zh-Hant": {
    title: "標籤控制",
    summary: "摘要",
    labels: "標籤",
    noLabels: "沒有可用的標籤",
    noEntities: "此標籤沒有實體",
    entities: "個實體",
    loading: "載入中...",
    on: "開啟",
    off: "關閉",
    allOff: "全部關閉",
  },
  "zh-Hans": {
    title: "标签控制",
    summary: "摘要",
    labels: "标签",
    noLabels: "没有可用的标签",
    noEntities: "此标签没有实体",
    entities: "个实体",
    loading: "加载中...",
    on: "开启",
    off: "关闭",
    allOff: "全部关闭",
  },
};

const DOMAIN_NAMES = {
  en: {
    light: "Lights", switch: "Switches", climate: "Climate", cover: "Covers",
    fan: "Fans", media_player: "Media", vacuum: "Vacuums", lock: "Locks",
    humidifier: "Humidifiers", automation: "Automations", script: "Scripts",
    scene: "Scenes", button: "Buttons", sensor: "Sensors",
    binary_sensor: "Binary Sensors", input_boolean: "Input Boolean",
    input_number: "Input Number", input_select: "Input Select",
    input_text: "Input Text", alarm_control_panel: "Security",
    camera: "Cameras", person: "Persons", device_tracker: "Trackers",
  },
  "zh-Hant": {
    light: "燈光", switch: "開關", climate: "溫控", cover: "窗簾",
    fan: "風扇", media_player: "媒體播放器", vacuum: "掃地機", lock: "門鎖",
    humidifier: "加濕器", automation: "自動化", script: "腳本",
    scene: "場景", button: "按鈕", sensor: "感測器",
    binary_sensor: "二元感測器", input_boolean: "輔助開關",
    input_number: "輸入數字", input_select: "輸入選擇",
    input_text: "輸入文字", alarm_control_panel: "保全",
    camera: "攝影機", person: "人員", device_tracker: "追蹤器",
  },
  "zh-Hans": {
    light: "灯光", switch: "开关", climate: "温控", cover: "窗帘",
    fan: "风扇", media_player: "媒体播放器", vacuum: "扫地机", lock: "门锁",
    humidifier: "加湿器", automation: "自动化", script: "脚本",
    scene: "场景", button: "按钮", sensor: "传感器",
    binary_sensor: "二元传感器", input_boolean: "辅助开关",
    input_number: "输入数字", input_select: "输入选择",
    input_text: "输入文字", alarm_control_panel: "安防",
    camera: "摄像机", person: "人员", device_tracker: "追踪器",
  },
};

// Label color mapping
const LABEL_COLORS = {
  red: "#f44336", pink: "#e91e63", purple: "#9c27b0", deep_purple: "#673ab7",
  indigo: "#3f51b5", blue: "#2196f3", light_blue: "#03a9f4", cyan: "#00bcd4",
  teal: "#009688", green: "#4caf50", light_green: "#8bc34a", lime: "#cddc39",
  yellow: "#ffeb3b", amber: "#ffc107", orange: "#ff9800", deep_orange: "#ff5722",
  brown: "#795548", grey: "#9e9e9e", blue_grey: "#607d8b",
};

// ============================================================================
// ENTITY TILE COMPONENT - HA Native Style
// ============================================================================

class EntityTile extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      entityId: { type: String, attribute: "entity-id" },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .tile {
        background: var(--card-background-color, rgba(255, 255, 255, 0.05));
        border-radius: 12px;
        padding: 12px;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.1s ease;
        position: relative;
        overflow: hidden;
      }

      .tile:hover {
        filter: brightness(1.1);
      }

      .tile:active {
        transform: scale(0.98);
      }

      .tile.on {
        background: var(--tile-color-bg, rgba(255, 179, 0, 0.2));
      }

      .tile.unavailable {
        opacity: 0.5;
      }

      .tile-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        flex: 0 0 auto;
      }

      .tile-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--icon-bg, rgba(255, 255, 255, 0.1));
        color: var(--icon-color, var(--secondary-text-color));
        flex-shrink: 0;
      }

      .tile.on .tile-icon {
        background: var(--tile-color-bg, rgba(255, 179, 0, 0.3));
        color: var(--tile-color, #ffb300);
      }

      .tile-icon ha-icon {
        --mdc-icon-size: 20px;
      }

      .tile-info {
        flex: 1;
        min-width: 0;
      }

      .tile-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.3;
      }

      .tile-state {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .tile.on .tile-state {
        color: var(--primary-text-color);
        opacity: 0.8;
      }
    `;
  }

  get entity() {
    return this.hass?.states?.[this.entityId];
  }

  get domain() {
    return this.entityId?.split(".")[0];
  }

  get isOn() {
    const state = this.entity?.state;
    return ["on", "playing", "open", "unlocked", "heat", "cool", "heat_cool", "auto", "cleaning", "returning", "home"].includes(state);
  }

  get isUnavailable() {
    return this.entity?.state === "unavailable" || !this.entity;
  }

  get icon() {
    return this.entity?.attributes?.icon || DOMAIN_ICONS[this.domain] || "mdi:help-circle";
  }

  get tileColor() {
    const domain = this.domain;

    // For RGB lights, use actual color
    if (domain === "light" && this.isOn) {
      const rgb = this.entity?.attributes?.rgb_color;
      if (rgb) {
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }
    }

    // Climate: use blue for cooling, orange for heating
    if (domain === "climate" && this.isOn) {
      const hvacAction = this.entity?.attributes?.hvac_action;
      if (hvacAction === "cooling") return DOMAIN_COLORS.climate_cool;
    }

    // Lock: use green for locked, red for unlocked
    if (domain === "lock") {
      return this.entity?.state === "locked" ? DOMAIN_COLORS.lock : DOMAIN_COLORS.lock_unlocked;
    }

    return DOMAIN_COLORS[domain] || "#9E9E9E";
  }

  _hexToRgb(hex) {
    if (hex.startsWith("rgb")) {
      const match = hex.match(/\d+/g);
      return match ? match.slice(0, 3).join(", ") : "255, 255, 255";
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "255, 255, 255";
  }

  _formatState() {
    if (this.isUnavailable) return "Unavailable";
    try {
      return this.hass.formatEntityState(this.entity);
    } catch {
      return this.entity?.state || "Unknown";
    }
  }

  _handleClick() {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this.entityId },
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.entity && !this.entityId) return html``;

    const color = this.tileColor;
    const colorRgb = this._hexToRgb(color);

    return html`
      <div
        class="tile ${this.isOn ? "on" : ""} ${this.isUnavailable ? "unavailable" : ""}"
        style="--tile-color: ${color}; --tile-color-bg: rgba(${colorRgb}, 0.2); --icon-bg: rgba(${colorRgb}, 0.1);"
        @click=${this._handleClick}
      >
        <div class="tile-header">
          <div class="tile-icon">
            <ha-icon icon=${this.icon}></ha-icon>
          </div>
          <div class="tile-info">
            <div class="tile-name">${this.entity?.attributes?.friendly_name || this.entityId}</div>
            <div class="tile-state">${this._formatState()}</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("entity-tile", EntityTile);

// ============================================================================
// SUMMARY CARD COMPONENT - Horizontal Style (like HA Home)
// ============================================================================

class SummaryCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      domain: { type: String },
      entities: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .summary-card {
        background: var(--card-background-color, rgba(255, 255, 255, 0.05));
        border-radius: 12px;
        padding: 12px 16px;
        cursor: pointer;
        transition: background 0.2s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 48px;
      }

      .summary-card:hover {
        filter: brightness(1.1);
      }

      .summary-card.active {
        background: var(--tile-color-bg, rgba(255, 179, 0, 0.15));
      }

      .summary-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .summary-card.active .summary-icon {
        background: var(--tile-color-bg, rgba(255, 179, 0, 0.3));
        color: var(--tile-color, #ffb300);
      }

      .summary-icon ha-icon {
        --mdc-icon-size: 20px;
      }

      .summary-info {
        flex: 1;
        min-width: 0;
      }

      .summary-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .summary-state {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .summary-card.active .summary-state {
        color: var(--primary-text-color);
        opacity: 0.8;
      }
    `;
  }

  get activeCount() {
    if (!this.entities || !this.hass) return 0;
    return this.entities.filter((entityId) => {
      const state = this.hass.states[entityId]?.state;
      return ["on", "playing", "open", "unlocked", "heat", "cool", "heat_cool", "auto", "cleaning", "home"].includes(state);
    }).length;
  }

  get isActive() {
    return this.activeCount > 0;
  }

  get stateText() {
    const lang = this.hass?.language || "en";
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    if (this.activeCount === 0) {
      return t.allOff;
    }
    return `${this.activeCount} ${t.on}`;
  }

  get domainLabel() {
    const lang = this.hass?.language || "en";
    const names = DOMAIN_NAMES[lang] || DOMAIN_NAMES.en;
    return names[this.domain] || this.domain;
  }

  _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "255, 255, 255";
  }

  render() {
    const icon = DOMAIN_ICONS[this.domain] || "mdi:help-circle";
    const color = DOMAIN_COLORS[this.domain] || "#9E9E9E";
    const colorRgb = this._hexToRgb(color);

    return html`
      <div
        class="summary-card ${this.isActive ? "active" : ""}"
        style="--tile-color: ${color}; --tile-color-bg: rgba(${colorRgb}, 0.2);"
      >
        <div class="summary-icon">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="summary-info">
          <div class="summary-label">${this.domainLabel}</div>
          <div class="summary-state">${this.stateText}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("summary-card", SummaryCard);

// ============================================================================
// LABEL CARD COMPONENT - Square Style (like HA Home Areas)
// ============================================================================

class LabelCard extends LitElement {
  static get properties() {
    return {
      label: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .label-card {
        background: var(--card-background-color, rgba(255, 255, 255, 0.05));
        border-radius: 12px;
        padding: 16px;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.1s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        min-height: 100px;
      }

      .label-card:hover {
        filter: brightness(1.1);
      }

      .label-card:active {
        transform: scale(0.98);
      }

      .label-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--label-color-bg, rgba(33, 150, 243, 0.2));
        color: var(--label-color, #2196f3);
        margin-bottom: 12px;
      }

      .label-icon ha-icon {
        --mdc-icon-size: 24px;
      }

      .label-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
        word-break: break-word;
      }

      .label-count {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `;
  }

  _hexToRgb(hex) {
    if (!hex) return "33, 150, 243";
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "33, 150, 243";
  }

  _getLabelColor(color) {
    if (!color) return "#2196f3";
    return LABEL_COLORS[color] || color;
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("label-selected", {
        bubbles: true,
        composed: true,
        detail: { label: this.label },
      })
    );
  }

  render() {
    const icon = this.label.icon || "mdi:label";
    const color = this._getLabelColor(this.label.color);
    const colorRgb = this._hexToRgb(color);

    return html`
      <div
        class="label-card"
        style="--label-color: ${color}; --label-color-bg: rgba(${colorRgb}, 0.2);"
        @click=${this._handleClick}
      >
        <div class="label-icon">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="label-name">${this.label.name}</div>
        <div class="label-count">${this.label.entity_count || 0}</div>
      </div>
    `;
  }
}

customElements.define("label-card", LabelCard);

// ============================================================================
// DOMAIN SECTION COMPONENT
// ============================================================================

class DomainSection extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      domain: { type: String },
      entities: { type: Array },
      expanded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.expanded = true;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 16px;
      }

      .section-header {
        display: flex;
        align-items: center;
        padding: 8px 4px;
        cursor: pointer;
        user-select: none;
      }

      .section-header:hover {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
      }

      .section-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        color: var(--secondary-text-color);
      }

      .section-icon ha-icon {
        --mdc-icon-size: 20px;
      }

      .section-title {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .section-arrow {
        color: var(--secondary-text-color);
        transition: transform 0.2s ease;
      }

      .section-arrow.collapsed {
        transform: rotate(-90deg);
      }

      .section-arrow ha-icon {
        --mdc-icon-size: 20px;
      }

      .tiles-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        padding-top: 8px;
      }

      @media (min-width: 600px) {
        .tiles-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .tiles-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .tiles-grid.collapsed {
        display: none;
      }
    `;
  }

  get domainLabel() {
    const lang = this.hass?.language || "en";
    const names = DOMAIN_NAMES[lang] || DOMAIN_NAMES.en;
    return names[this.domain] || this.domain;
  }

  _toggleExpanded() {
    this.expanded = !this.expanded;
  }

  render() {
    const icon = DOMAIN_ICONS[this.domain] || "mdi:help-circle";

    return html`
      <div class="section-header" @click=${this._toggleExpanded}>
        <div class="section-icon">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        <div class="section-title">${this.domainLabel}</div>
        <div class="section-arrow ${this.expanded ? "" : "collapsed"}">
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </div>
      </div>
      <div class="tiles-grid ${this.expanded ? "" : "collapsed"}">
        ${this.entities?.map(
          (entityId) => html`
            <entity-tile .hass=${this.hass} entity-id=${entityId}></entity-tile>
          `
        )}
      </div>
    `;
  }
}

customElements.define("domain-section", DomainSection);

// ============================================================================
// MAIN PANEL COMPONENT
// ============================================================================

class HaLabelControlPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      panel: { type: Object },
      // Internal state
      _view: { type: String },
      _selectedLabel: { type: Object },
      _labels: { type: Array },
      _labelEntities: { type: Object },
      _loading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this._view = "home";
    this._selectedLabel = null;
    this._labels = [];
    this._labelEntities = {};
    this._loading = true;
    this._labelsLoading = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        background: var(--primary-background-color);
      }

      .panel-container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      /* App Header - matches HA native style */
      .app-header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, var(--text-primary-color));
        border-bottom: 1px solid var(--divider-color);
        position: sticky;
        top: 0;
        z-index: 4;
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 4px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .toolbar-icon {
        position: relative;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        border-radius: 50%;
        --mdc-icon-size: 24px;
      }

      .toolbar-icon:hover {
        background: var(--secondary-background-color);
      }

      .toolbar-icon:active {
        background: var(--divider-color);
      }

      .header-title {
        font-size: 20px;
        font-weight: 400;
        flex: 1;
        margin-left: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Hide menu button when sidebar is docked */
      :host([narrow]) .menu-btn {
        display: flex;
      }

      .menu-btn {
        display: none;
      }

      @media (max-width: 870px) {
        .menu-btn {
          display: flex;
        }
      }

      /* Content */
      .content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }

      /* Section styling */
      .section {
        margin-bottom: 24px;
      }

      .section-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
      }

      /* Summary grid - 2 columns horizontal cards */
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      @media (max-width: 599px) {
        .summary-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Labels grid - 3 columns square cards */
      .labels-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      @media (max-width: 599px) {
        .labels-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .labels-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      /* Loading */
      .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 16px;
        height: 200px;
        color: var(--secondary-text-color);
      }

      .empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        color: var(--secondary-text-color);
        font-size: 14px;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("hass") && this.hass && this._labels.length === 0 && !this._labelsLoading) {
      this._loadLabels();
    }
  }

  _t(key) {
    const lang = this.hass?.language || "en";
    const langKey = TRANSLATIONS[lang] ? lang : "en";
    return TRANSLATIONS[langKey][key] || TRANSLATIONS["en"][key] || key;
  }

  async _loadLabels() {
    this._labelsLoading = true;
    this._loading = true;
    try {
      const result = await this.hass.callWS({
        type: "label_control/get_permitted_labels",
      });
      this._labels = result.labels || [];

      // Load all label entities for summary
      for (const label of this._labels) {
        await this._loadLabelEntities(label.id);
      }
    } catch (error) {
      console.error("Failed to load labels:", error);
      this._labels = [];
    }
    this._loading = false;
    this._labelsLoading = false;
  }

  async _loadLabelEntities(labelId) {
    if (this._labelEntities[labelId]) return;

    try {
      const result = await this.hass.callWS({
        type: "label_control/get_label_entities",
        label_id: labelId,
      });
      this._labelEntities = {
        ...this._labelEntities,
        [labelId]: result.entities || {},
      };
      this.requestUpdate();
    } catch (error) {
      console.error("Failed to load label entities:", error);
    }
  }

  _getAllEntitiesByDomain() {
    const domainEntities = {};

    for (const labelId of Object.keys(this._labelEntities)) {
      const entities = this._labelEntities[labelId];
      for (const [domain, entityIds] of Object.entries(entities)) {
        if (!domainEntities[domain]) {
          domainEntities[domain] = new Set();
        }
        entityIds.forEach((id) => domainEntities[domain].add(id));
      }
    }

    // Convert Sets to Arrays
    const result = {};
    for (const [domain, entitySet] of Object.entries(domainEntities)) {
      result[domain] = Array.from(entitySet);
    }
    return result;
  }

  _handleLabelSelected(e) {
    const label = e.detail.label;
    this._selectedLabel = label;
    this._view = "label";
    this._loadLabelEntities(label.id);
  }

  _handleBack() {
    this._view = "home";
    this._selectedLabel = null;
  }

  _toggleSidebar() {
    this.dispatchEvent(
      new CustomEvent("hass-toggle-menu", {
        bubbles: true,
        composed: true,
      })
    );
  }

  _renderHeader() {
    let title = this._t("title");
    let showBack = false;

    if (this._view === "label" && this._selectedLabel) {
      title = this._selectedLabel.name;
      showBack = true;
    }

    return html`
      <div class="app-header">
        ${showBack
          ? html`
              <button class="toolbar-icon" @click=${this._handleBack} title="返回">
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </button>
            `
          : html`
              <button class="toolbar-icon menu-btn" @click=${this._toggleSidebar} title="開啟側邊欄">
                <ha-icon icon="mdi:menu"></ha-icon>
              </button>
            `}
        <div class="header-title">${title}</div>
      </div>
    `;
  }

  _renderHomeView() {
    if (this._loading) {
      return html`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
          <span>${this._t("loading")}</span>
        </div>
      `;
    }

    const allEntitiesByDomain = this._getAllEntitiesByDomain();
    const summaryDomains = SUMMARY_DOMAINS.filter((d) => allEntitiesByDomain[d]?.length > 0);

    return html`
      <!-- Summary Section -->
      ${summaryDomains.length > 0
        ? html`
            <div class="section">
              <div class="section-label">${this._t("summary")}</div>
              <div class="summary-grid">
                ${summaryDomains.map(
                  (domain) => html`
                    <summary-card
                      .hass=${this.hass}
                      .domain=${domain}
                      .entities=${allEntitiesByDomain[domain] || []}
                    ></summary-card>
                  `
                )}
              </div>
            </div>
          `
        : ""}

      <!-- Labels Section -->
      <div class="section">
        <div class="section-label">${this._t("labels")}</div>
        ${this._labels.length === 0
          ? html`<div class="empty">${this._t("noLabels")}</div>`
          : html`
              <div class="labels-grid">
                ${this._labels.map(
                  (label) => html`
                    <label-card
                      .label=${label}
                      @label-selected=${this._handleLabelSelected}
                    ></label-card>
                  `
                )}
              </div>
            `}
      </div>
    `;
  }

  _renderLabelView() {
    const entities = this._labelEntities[this._selectedLabel?.id] || {};
    const domains = Object.keys(entities).sort((a, b) => {
      const indexA = DOMAIN_ORDER.indexOf(a);
      const indexB = DOMAIN_ORDER.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    if (domains.length === 0) {
      return html`<div class="empty">${this._t("noEntities")}</div>`;
    }

    return html`
      ${domains.map(
        (domain) => html`
          <domain-section
            .hass=${this.hass}
            .domain=${domain}
            .entities=${entities[domain]}
          ></domain-section>
        `
      )}
    `;
  }

  render() {
    return html`
      <div class="panel-container">
        ${this._renderHeader()}
        <div class="content">
          ${this._view === "home" ? this._renderHomeView() : this._renderLabelView()}
        </div>
      </div>
    `;
  }
}

customElements.define("ha-label-control-panel", HaLabelControlPanel);
