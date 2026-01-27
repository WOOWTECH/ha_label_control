// Use HA's bundled LitElement - no external CDN dependency
const { LitElement, html, css } = await import("/frontend_latest/frontend.js").catch(() => {
  // Fallback for older HA versions
  return import("https://unpkg.com/lit@2.8.0/index.js?module");
});

// Domain icons mapping
const DOMAIN_ICONS = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  climate: "mdi:thermostat",
  cover: "mdi:blinds",
  fan: "mdi:fan",
  media_player: "mdi:cast",
  vacuum: "mdi:robot-vacuum",
  lock: "mdi:lock",
  humidifier: "mdi:air-humidifier",
  water_heater: "mdi:water-boiler",
  valve: "mdi:valve",
  lawn_mower: "mdi:robot-mower",
  input_boolean: "mdi:toggle-switch-outline",
  input_number: "mdi:ray-vertex",
  input_select: "mdi:form-dropdown",
  input_text: "mdi:form-textbox",
  input_datetime: "mdi:calendar-clock",
  input_button: "mdi:gesture-tap-button",
  counter: "mdi:counter",
  timer: "mdi:timer",
  schedule: "mdi:calendar-clock",
  automation: "mdi:robot",
  script: "mdi:script-text",
  scene: "mdi:palette",
  button: "mdi:gesture-tap-button",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-marked-circle",
  weather: "mdi:weather-partly-cloudy",
  sun: "mdi:weather-sunny",
  air_quality: "mdi:air-filter",
  image: "mdi:image",
  camera: "mdi:cctv",
  stt: "mdi:microphone-message",
  tts: "mdi:speaker-message",
  notify: "mdi:bell",
  siren: "mdi:alarm-light",
  device_tracker: "mdi:crosshairs-gps",
  person: "mdi:account",
  zone: "mdi:map-marker-radius",
  calendar: "mdi:calendar",
  todo: "mdi:clipboard-list",
  event: "mdi:alert-circle",
  number: "mdi:ray-vertex",
  select: "mdi:form-dropdown",
  text: "mdi:form-textbox",
  date: "mdi:calendar",
  time: "mdi:clock",
  datetime: "mdi:calendar-clock",
  remote: "mdi:remote",
  alarm_control_panel: "mdi:shield-home",
  update: "mdi:package-up",
  conversation: "mdi:microphone-message",
  wake_word: "mdi:chat-sleep",
};

// Domain display order (priority domains first) - matches HA Core grouping
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

// Domain name translations for display
const DOMAIN_NAMES = {
  en: {
    light: "Lights",
    switch: "Switches",
    climate: "Climate",
    cover: "Covers",
    fan: "Fans",
    media_player: "Media Players",
    vacuum: "Vacuums",
    lock: "Locks",
    humidifier: "Humidifiers",
    water_heater: "Water Heaters",
    valve: "Valves",
    lawn_mower: "Lawn Mowers",
    input_boolean: "Input Boolean",
    input_number: "Input Number",
    input_select: "Input Select",
    input_text: "Input Text",
    input_datetime: "Input Datetime",
    input_button: "Input Button",
    counter: "Counters",
    timer: "Timers",
    schedule: "Schedules",
    automation: "Automations",
    script: "Scripts",
    scene: "Scenes",
    button: "Buttons",
    sensor: "Sensors",
    binary_sensor: "Binary Sensors",
    weather: "Weather",
    sun: "Sun",
    air_quality: "Air Quality",
    image: "Images",
    camera: "Cameras",
    stt: "Speech to Text",
    tts: "Text to Speech",
    notify: "Notifications",
    siren: "Sirens",
    device_tracker: "Device Trackers",
    person: "Persons",
    zone: "Zones",
    calendar: "Calendars",
    todo: "To-do Lists",
    event: "Events",
    number: "Numbers",
    select: "Selects",
    text: "Texts",
    date: "Dates",
    time: "Times",
    datetime: "Datetimes",
    remote: "Remotes",
    alarm_control_panel: "Alarm Panels",
    update: "Updates",
    conversation: "Conversations",
    wake_word: "Wake Words",
  },
  "zh-Hant": {
    light: "燈光",
    switch: "開關",
    climate: "溫控",
    cover: "窗簾",
    fan: "風扇",
    media_player: "媒體播放器",
    vacuum: "掃地機器人",
    lock: "門鎖",
    humidifier: "加濕器",
    water_heater: "熱水器",
    valve: "閥門",
    lawn_mower: "割草機",
    input_boolean: "輸入布林",
    input_number: "輸入數字",
    input_select: "輸入選擇",
    input_text: "輸入文字",
    input_datetime: "輸入日期時間",
    input_button: "輸入按鈕",
    counter: "計數器",
    timer: "計時器",
    schedule: "排程",
    automation: "自動化",
    script: "腳本",
    scene: "場景",
    button: "按鈕",
    sensor: "感測器",
    binary_sensor: "二元感測器",
    weather: "天氣",
    sun: "太陽",
    air_quality: "空氣品質",
    image: "圖片",
    camera: "攝影機",
    stt: "語音轉文字",
    tts: "文字轉語音",
    notify: "通知",
    siren: "警報器",
    device_tracker: "裝置追蹤",
    person: "人員",
    zone: "區域",
    calendar: "日曆",
    todo: "待辦事項",
    event: "事件",
    number: "數字",
    select: "選擇",
    text: "文字",
    date: "日期",
    time: "時間",
    datetime: "日期時間",
    remote: "遙控器",
    alarm_control_panel: "保全",
    update: "更新",
    conversation: "對話",
    wake_word: "喚醒詞",
  },
  "zh-Hans": {
    light: "灯光",
    switch: "开关",
    climate: "温控",
    cover: "窗帘",
    fan: "风扇",
    media_player: "媒体播放器",
    vacuum: "扫地机器人",
    lock: "门锁",
    humidifier: "加湿器",
    water_heater: "热水器",
    valve: "阀门",
    lawn_mower: "割草机",
    input_boolean: "输入布尔",
    input_number: "输入数字",
    input_select: "输入选择",
    input_text: "输入文字",
    input_datetime: "输入日期时间",
    input_button: "输入按钮",
    counter: "计数器",
    timer: "计时器",
    schedule: "排程",
    automation: "自动化",
    script: "脚本",
    scene: "场景",
    button: "按钮",
    sensor: "传感器",
    binary_sensor: "二元传感器",
    weather: "天气",
    sun: "太阳",
    air_quality: "空气质量",
    image: "图片",
    camera: "摄像机",
    stt: "语音转文字",
    tts: "文字转语音",
    notify: "通知",
    siren: "警报器",
    device_tracker: "设备追踪",
    person: "人员",
    zone: "区域",
    calendar: "日历",
    todo: "待办事项",
    event: "事件",
    number: "数字",
    select: "选择",
    text: "文字",
    date: "日期",
    time: "时间",
    datetime: "日期时间",
    remote: "遥控器",
    alarm_control_panel: "安防",
    update: "更新",
    conversation: "对话",
    wake_word: "唤醒词",
  },
};

// Translations
const TRANSLATIONS = {
  en: {
    title: "Label Control",
    noLabels: "No labels available",
    noEntities: "No entities with this label",
    entities: "entities",
    loading: "Loading...",
  },
  "zh-Hant": {
    title: "標籤控制",
    noLabels: "沒有可用的標籤",
    noEntities: "此標籤沒有實體",
    entities: "個實體",
    loading: "載入中...",
  },
  "zh-Hans": {
    title: "标签控制",
    noLabels: "没有可用的标签",
    noEntities: "此标签没有实体",
    entities: "个实体",
    loading: "加载中...",
  },
};

// Label color mapping
const LABEL_COLORS = {
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deep_purple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  light_blue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  light_green: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deep_orange: "#ff5722",
  brown: "#795548",
  grey: "#9e9e9e",
  blue_grey: "#607d8b",
};

class HaLabelControlPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      _labels: { type: Array, state: true },
      _selectedLabel: { type: Object, state: true },
      _entities: { type: Object, state: true },
      _loading: { type: Boolean, state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
        --tile-color: var(--state-icon-color);
        --rgb-amber: 255, 179, 0;
        --rgb-blue: 33, 150, 243;
        --rgb-purple: 156, 39, 176;
        --rgb-green: 76, 175, 80;
        --rgb-orange: 255, 152, 0;
        --rgb-red: 244, 67, 54;
        --rgb-cyan: 0, 188, 212;
      }

      /* App Bar - HA Style with light/dark mode support */
      .app-header {
        display: flex;
        align-items: center;
        height: 56px;
        padding: 0 4px;
        background-color: var(--app-header-background-color, var(--primary-color));
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
        position: sticky;
        top: 0;
        z-index: 4;
        box-sizing: border-box;
      }

      .app-header ha-icon-button {
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
        --mdc-icon-button-size: 48px;
      }

      .app-header .title {
        font-size: 20px;
        font-weight: 400;
        margin-left: 8px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
      }

      .menu-button {
        margin-right: 4px;
      }

      .back-button {
        margin-right: 4px;
      }

      .content {
        padding: 16px;
        overflow-y: auto;
        flex: 1;
      }

      /* Label Grid */
      .label-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 12px;
      }

      .label-card {
        background-color: var(--card-background-color);
        border-radius: 18px;
        padding: 16px;
        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-left: 4px solid var(--label-color, var(--primary-color));
      }

      .label-card:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .label-card:active {
        transform: scale(0.98);
      }

      .label-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: var(--secondary-background-color);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        --mdc-icon-size: 24px;
        color: var(--label-color, var(--primary-color));
      }

      .label-name {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 4px;
        word-break: break-word;
      }

      .label-count {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      /* Domain Section - HA Core Style */
      .domain-section {
        margin-bottom: 24px;
      }

      .domain-header {
        display: flex;
        align-items: center;
        padding: 8px 0;
        margin-bottom: 12px;
      }

      .domain-header ha-icon {
        margin-right: 12px;
        color: var(--secondary-text-color);
        --mdc-icon-size: 24px;
      }

      .domain-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1;
      }

      .domain-arrow {
        color: var(--secondary-text-color);
        --mdc-icon-size: 24px;
      }

      /* Entity Grid - HA Core Tile Card Style */
      .entity-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      @media (min-width: 600px) {
        .entity-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
      }

      .entity-tile {
        background-color: var(--card-background-color);
        border-radius: 18px;
        padding: 12px;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
        display: flex;
        flex-direction: column;
        min-height: 90px;
        position: relative;
        overflow: hidden;
      }

      .entity-tile:hover {
        filter: brightness(1.05);
      }

      .entity-tile:active {
        transform: scale(0.98);
      }

      /* Active state colors - HA Core style */
      .entity-tile.on {
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.light {
        background-color: rgba(var(--rgb-amber), 0.25);
      }

      .entity-tile.on.switch {
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.climate {
        background-color: rgba(var(--rgb-blue), 0.2);
      }

      .entity-tile.on.climate.heating {
        background-color: rgba(var(--rgb-orange), 0.2);
      }

      .entity-tile.on.cover {
        background-color: rgba(var(--rgb-purple), 0.2);
      }

      .entity-tile.on.fan {
        background-color: rgba(var(--rgb-cyan), 0.2);
      }

      .entity-tile.on.media_player {
        background-color: rgba(var(--rgb-blue), 0.2);
      }

      .entity-tile.on.lock {
        background-color: rgba(var(--rgb-green), 0.2);
      }

      .entity-tile.on.vacuum {
        background-color: rgba(var(--rgb-cyan), 0.2);
      }

      .entity-tile.on.automation,
      .entity-tile.on.script,
      .entity-tile.on.scene {
        background-color: rgba(var(--rgb-blue), 0.2);
      }

      .entity-tile.on.binary_sensor {
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.input_boolean {
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.unavailable {
        opacity: 0.5;
      }

      .entity-icon-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: auto;
      }

      .entity-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 24px;
        color: var(--secondary-text-color);
        position: relative;
      }

      .entity-tile.on .entity-icon {
        color: var(--primary-text-color);
      }

      .entity-tile.on.light .entity-icon {
        color: rgb(var(--rgb-amber));
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.switch .entity-icon {
        color: rgb(var(--rgb-amber));
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.climate .entity-icon {
        color: rgb(var(--rgb-blue));
        background-color: rgba(var(--rgb-blue), 0.2);
      }

      .entity-tile.on.cover .entity-icon {
        color: rgb(var(--rgb-purple));
        background-color: rgba(var(--rgb-purple), 0.2);
      }

      .entity-tile.on.fan .entity-icon {
        color: rgb(var(--rgb-cyan));
        background-color: rgba(var(--rgb-cyan), 0.2);
      }

      .entity-tile.on.media_player .entity-icon {
        color: rgb(var(--rgb-blue));
        background-color: rgba(var(--rgb-blue), 0.2);
      }

      .entity-tile.on.vacuum .entity-icon {
        color: rgb(var(--rgb-cyan));
        background-color: rgba(var(--rgb-cyan), 0.2);
      }

      .entity-tile.on.binary_sensor .entity-icon {
        color: rgb(var(--rgb-amber));
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-tile.on.input_boolean .entity-icon {
        color: rgb(var(--rgb-amber));
        background-color: rgba(var(--rgb-amber), 0.2);
      }

      .entity-info {
        margin-top: 8px;
      }

      .entity-name {
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.3;
        color: var(--primary-text-color);
      }

      .entity-state {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .entity-tile.on .entity-name {
        color: var(--primary-text-color);
      }

      .entity-tile.on .entity-state {
        color: var(--primary-text-color);
        opacity: 0.8;
      }

      /* Loading & Empty States */
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        flex-direction: column;
        gap: 16px;
        color: var(--secondary-text-color);
      }

      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        color: var(--secondary-text-color);
        font-size: 16px;
      }

      /* Responsive */
      @media (max-width: 600px) {
        .label-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }

  constructor() {
    super();
    this._labels = [];
    this._selectedLabel = null;
    this._entities = {};
    this._loading = true;
  }

  firstUpdated() {
    this._loadLabels();
  }

  _t(key) {
    const lang = this.hass?.language || "en";
    const langKey = TRANSLATIONS[lang] ? lang : "en";
    return TRANSLATIONS[langKey][key] || TRANSLATIONS["en"][key] || key;
  }

  _getDomainName(domain) {
    const lang = this.hass?.language || "en";
    const langKey = DOMAIN_NAMES[lang] ? lang : "en";
    return DOMAIN_NAMES[langKey][domain] || DOMAIN_NAMES["en"][domain] || domain.replace(/_/g, " ");
  }

  _getLabelColor(color) {
    if (!color) return "var(--primary-color)";
    return LABEL_COLORS[color] || color;
  }

  async _loadLabels() {
    this._loading = true;
    try {
      const result = await this.hass.callWS({
        type: "label_control/get_permitted_labels",
      });
      this._labels = result.labels || [];
    } catch (error) {
      console.error("Failed to load labels:", error);
      this._labels = [];
    }
    this._loading = false;
  }

  async _selectLabel(label) {
    this._selectedLabel = label;
    this._loading = true;
    try {
      const result = await this.hass.callWS({
        type: "label_control/get_label_entities",
        label_id: label.id,
      });
      this._entities = result.entities || {};
    } catch (error) {
      console.error("Failed to load entities:", error);
      this._entities = {};
    }
    this._loading = false;
  }

  _goBack() {
    this._selectedLabel = null;
    this._entities = {};
  }

  _showMoreInfo(entityId) {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  _getEntityState(entityId) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) {
      return { state: "unavailable", name: entityId.split(".")[1], icon: null };
    }
    return {
      state: stateObj.state,
      name: stateObj.attributes.friendly_name || entityId.split(".")[1],
      icon: stateObj.attributes.icon,
    };
  }

  _isEntityOn(entityId) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return false;
    const state = stateObj.state.toLowerCase();
    return ["on", "playing", "home", "open", "unlocked", "heat", "cool", "heat_cool", "auto", "cleaning", "returning"].includes(state);
  }

  _isEntityUnavailable(entityId) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return true;
    return stateObj.state === "unavailable" || stateObj.state === "unknown";
  }

  _isHeating(entityId) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return false;
    return stateObj.state === "heat" || stateObj.attributes.hvac_action === "heating";
  }

  _formatEntityState(entityId) {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return "Unavailable";

    try {
      return this.hass.formatEntityState(stateObj);
    } catch {
      return stateObj.state;
    }
  }

  _getDomainIcon(domain) {
    return DOMAIN_ICONS[domain] || "mdi:puzzle";
  }

  _getSortedDomains() {
    const domains = Object.keys(this._entities);

    return domains.sort((a, b) => {
      const indexA = DOMAIN_ORDER.indexOf(a);
      const indexB = DOMAIN_ORDER.indexOf(b);

      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }

  _renderLabelList() {
    if (this._loading) {
      return html`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
          <span>${this._t("loading")}</span>
        </div>
      `;
    }

    if (this._labels.length === 0) {
      return html`<div class="empty">${this._t("noLabels")}</div>`;
    }

    return html`
      <div class="label-grid">
        ${this._labels.map(
          (label) => html`
            <div
              class="label-card"
              style="--label-color: ${this._getLabelColor(label.color)}"
              @click=${() => this._selectLabel(label)}
            >
              <div class="label-icon">
                <ha-icon icon=${label.icon || "mdi:label"}></ha-icon>
              </div>
              <div class="label-name">${label.name}</div>
              <div class="label-count">${label.entity_count} ${this._t("entities")}</div>
            </div>
          `
        )}
      </div>
    `;
  }

  _renderEntityList() {
    if (this._loading) {
      return html`
        <div class="loading">
          <ha-circular-progress active></ha-circular-progress>
          <span>${this._t("loading")}</span>
        </div>
      `;
    }

    const domains = this._getSortedDomains();

    if (domains.length === 0) {
      return html`<div class="empty">${this._t("noEntities")}</div>`;
    }

    return html`
      ${domains.map((domain) => {
        const entityIds = this._entities[domain] || [];

        return html`
          <div class="domain-section">
            <div class="domain-header">
              <ha-icon icon=${this._getDomainIcon(domain)}></ha-icon>
              <span class="domain-title">${this._getDomainName(domain)}</span>
              <ha-icon class="domain-arrow" icon="mdi:chevron-right"></ha-icon>
            </div>
            <div class="entity-grid">
              ${entityIds.map((entityId) => {
                const entity = this._getEntityState(entityId);
                const isOn = this._isEntityOn(entityId);
                const isUnavailable = this._isEntityUnavailable(entityId);
                const isHeating = this._isHeating(entityId);
                const domainClass = domain;

                return html`
                  <div
                    class="entity-tile ${isOn ? "on" : ""} ${isUnavailable ? "unavailable" : ""} ${domainClass} ${isHeating ? "heating" : ""}"
                    @click=${() => this._showMoreInfo(entityId)}
                  >
                    <div class="entity-icon-row">
                      <div class="entity-icon">
                        <ha-icon icon=${entity.icon || this._getDomainIcon(domain)}></ha-icon>
                      </div>
                    </div>
                    <div class="entity-info">
                      <div class="entity-name">${entity.name}</div>
                      <div class="entity-state">${this._formatEntityState(entityId)}</div>
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        `;
      })}
    `;
  }

  _toggleSidebar() {
    const event = new CustomEvent("hass-toggle-menu", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="app-header">
        ${this._selectedLabel
          ? html`
              <ha-icon-button class="back-button" @click=${this._goBack}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </ha-icon-button>
              <span class="title">${this._selectedLabel.name}</span>
            `
          : html`
              <ha-icon-button class="menu-button" @click=${this._toggleSidebar}>
                <ha-icon icon="mdi:menu"></ha-icon>
              </ha-icon-button>
              <span class="title">${this._t("title")}</span>
            `}
      </div>
      <div class="content">
        ${this._selectedLabel ? this._renderEntityList() : this._renderLabelList()}
      </div>
    `;
  }
}

customElements.define("ha-label-control-panel", HaLabelControlPanel);
