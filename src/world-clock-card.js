import {
  LitElement,
  html,
  css,
} from "lit";

const DEFAULT_ZONES = [
  { timezone: "America/New_York", name: "New York" },
  { timezone: "Europe/London", name: "London" },
  { timezone: "Europe/Moscow", name: "Moscow" },
];

const DATE_FORMAT_OPTIONS = {
  long: { year: "numeric", month: "long", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  short: { year: "2-digit", month: "short", day: "numeric" },
  extra_short: { month: "short", day: "numeric" },
  numeric: { year: "numeric", month: "2-digit", day: "2-digit" },
};

// Weekday style used per preset when show_weekday is enabled.
const WEEKDAY_STYLE = {
  long: "long",
  medium: "short",
  short: "short",
  extra_short: "short",
  numeric: "long",
};

class WorldClockCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { attribute: false },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        cursor: default;
        --mdc-icon-size: 5em;
        /* Establishes this card as a query container so its internal
           layout can respond to its own rendered width — independent
           of however many grid columns HA's Sections view happens to
           be giving it, which the card has no direct way to read. */
        container-type: inline-size;
        container-name: world-clock-card;
      }
      .content {
        padding: 24px 16px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      .main-clock {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        flex: 0 0 100%;
        align-content: center;
        align-items: baseline;
        color: var(--primary-text-color);
      }
      .clockicon {
        align-self: baseline;
        margin-right: 1.2em;
      }
      .time {
        font-family: var(--paper-font-headline_-_font-family);
        font-size: clamp(3.5rem, 9cqi, 3rem);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: 1.1em;
        white-space: nowrap;
      }
      .date {
        font-family: var(--paper-font-headline_-_font-family);
        font-size: clamp(0.8rem, 4cqi, 1.3rem);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
      }
      .ampm {
        font-size: 0.3em;
        font-weight: 500;
        vertical-align: super;
        margin-left: -0.5em;
      }
      .zones-clocks {
        padding: 0;
        margin: 0;
        margin-top: 1em;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        flex: 0 0 100%;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;
        color: var(--primary-text-color);
      }
      .zone-time,
      .zone-name {
        color: var(--primary-text-color);
        font-family: var(--paper-font-headline_-_font-family);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        font-size: clamp(1rem, 6cqi, 2rem);
        white-space: nowrap;
      }
      .zone-name {
        color: var(--secondary-text-color);
        font-size: clamp(0.65rem, 3cqi, 1rem);
      }

      /* Below roughly the space a 9-column card gets: drop the icon,
         its width isn't earning its keep once things get tight. */
      @container world-clock-card (max-width: 420px) {
        .clockicon {
          display: none;
        }
      }

      /* Narrower still: three zone columns side by side stop working
         at all, so stack them instead of letting them wrap mid-value.
         Each zone row now gets the full card width to itself, so it
         can afford to be a bit larger than the 3-across layout was. */
      @container world-clock-card (max-width: 320px) {
        .date-time {
          text-align: center;
        }
        .time {
          font-size: clamp(2.8rem, 14cqi, 3.6rem);
        }
        .date {
          font-size: clamp(0.8rem, 6cqi, 1rem);
          line-height: 1rem;
        }
        .zones-clocks {
          flex-direction: column;
          align-items: center;
          gap: 0.75em;
        }
        .zone-time {
          font-size: clamp(1.4rem, 11cqi, 1.8rem);
        }
        .zone-name {
          font-size: clamp(0.8rem, 5cqi, 1rem);
        }
      }
    `;
  }

  constructor() {
    super();
    this._now = new Date();
    this._timer = undefined;
  }

  static getStubConfig() {
    return {
      time_format: "auto",
      show_seconds: true,
      date_format: "long",
      show_weekday: true,
      locale: "auto",
      zones: DEFAULT_ZONES,
    };
  }

  static getConfigElement() {
    return document.createElement("world-clock-card-editor");
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (config.zones && config.zones.length !== 3) {
      throw new Error("world-clock-card requires exactly 3 zones");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    super.connectedCallback();
    this._tick();
    this._timer = setInterval(() => this._tick(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  _tick() {
    this._now = new Date();
    this.requestUpdate();
  }

  _zones() {
    return this.config?.zones ?? DEFAULT_ZONES;
  }

  _locale() {
    const configured = this.config?.locale;
    if (configured && configured !== "auto") {
      return configured;
    }
    return this._hass?.locale?.language ?? "en";
  }

  // Resolves to true (12h) / false (24h) / undefined (let Intl pick from locale).
  _hour12() {
    const tf = this.config?.time_format ?? "auto";
    if (tf === "12h") return true;
    if (tf === "24h") return false;
    const haFormat = this._hass?.locale?.time_format;
    if (haFormat === "12") return true;
    if (haFormat === "24") return false;
    return undefined;
  }

  _mainTimeFormatter() {
    const showSeconds = this.config?.show_seconds ?? true;
    return new Intl.DateTimeFormat(this._locale(), {
      hour12: this._hour12(),
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds ? { second: "2-digit" } : {}),
    });
  }

  _zoneTimeFormatter(timeZone) {
    return new Intl.DateTimeFormat(this._locale(), {
      timeZone,
      hour12: this._hour12(),
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Renders a formatter's output part-by-part so the AM/PM marker (when
  // present — only in 12h mode) can be wrapped and styled as a
  // superscript, distinct from the hour/minute/second digits.
  _renderTime(formatter) {
    return formatter
      .formatToParts(this._now)
      .map((part) =>
        part.type === "dayPeriod"
          ? html`<span class="ampm">${part.value}</span>`
          : part.value
      );
  }

  _formatDate() {
    const preset = this.config?.date_format ?? "long";
    const showWeekday = this.config?.show_weekday ?? true;

    if (preset === "iso") {
      const y = this._now.getFullYear();
      const m = String(this._now.getMonth() + 1).padStart(2, "0");
      const d = String(this._now.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    const base = DATE_FORMAT_OPTIONS[preset] ?? DATE_FORMAT_OPTIONS.long;
    const options = showWeekday
      ? { weekday: WEEKDAY_STYLE[preset] ?? "long", ...base }
      : base;
    return this._now.toLocaleDateString(this._locale(), options);
  }

  render() {
    const zones = this._zones();
    return html`
      <ha-card .header=${this.config?.title || undefined}>
        <div class="content">
          <div class="main-clock">
            <div class="clockicon">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
            </div>
            <div class="date-time">
              <div class="time">${this._renderTime(this._mainTimeFormatter())}</div>
              <div class="date">${this._formatDate()}</div>
            </div>
          </div>
          <div class="zones-clocks">
            ${zones.map(
              (zone) => html`
                <div class="clock-zone">
                  <div class="zone-time">
                    ${this._renderTime(this._zoneTimeFormatter(zone.timezone))}
                  </div>
                  <div class="zone-name">${zone.name}</div>
                </div>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  // Home Assistant uses this to size the card in the masonry layout.
  getCardSize() {
    return 3;
  }

  // Home Assistant uses this to size/resize the card in the Sections
  // (grid) view. The grid is 12 columns wide.
  getGridOptions() {
    return {
      columns: 12,
      rows: "auto",
      min_columns: 6,
      max_columns: 12,
      min_rows: 3,
      max_rows: 4,
    };
  }
}

customElements.define("world-clock-card", WorldClockCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "world-clock-card",
  name: "World Clock Card",
  description:
    "Shows the local time and date, plus the current time in three other timezones.",
  preview: true,
});

// ---------------------------------------------------------------------------
// Visual (UI) editor
// ---------------------------------------------------------------------------

const CURATED_CITIES = [
  { name: "Sofia", timezone: "Europe/Sofia" },
  { name: "London", timezone: "Europe/London" },
  { name: "Paris", timezone: "Europe/Paris" },
  { name: "Berlin", timezone: "Europe/Berlin" },
  { name: "Moscow", timezone: "Europe/Moscow" },
  { name: "Istanbul", timezone: "Europe/Istanbul" },
  { name: "New York", timezone: "America/New_York" },
  { name: "Los Angeles", timezone: "America/Los_Angeles" },
  { name: "Chicago", timezone: "America/Chicago" },
  { name: "Mexico City", timezone: "America/Mexico_City" },
  { name: "Sao Paulo", timezone: "America/Sao_Paulo" },
  { name: "Dubai", timezone: "Asia/Dubai" },
  { name: "Mumbai", timezone: "Asia/Kolkata" },
  { name: "Bangkok", timezone: "Asia/Bangkok" },
  { name: "Shanghai", timezone: "Asia/Shanghai" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Seoul", timezone: "Asia/Seoul" },
  { name: "Singapore", timezone: "Asia/Singapore" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Auckland", timezone: "Pacific/Auckland" },
  { name: "Cairo", timezone: "Africa/Cairo" },
  { name: "Johannesburg", timezone: "Africa/Johannesburg" },
];

const FIELD_LABELS = {
  title: "Title (optional)",
  time_format: "Time format",
  show_seconds: "Show seconds on main clock",
  date_format: "Date format",
  show_weekday: "Show day name",
  locale: "Locale",
};

function fireEvent(node, type, detail) {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
}

class WorldClockCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { attribute: false },
      _customZoneOverride: { state: true },
    };
  }

  constructor() {
    super();
    this._customZoneOverride = [false, false, false];
  }

  static get styles() {
    return css`
      .zones-heading {
        margin: 16px 0 8px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .zones-help {
        margin: 0 0 12px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .zones-help a {
        color: var(--primary-color);
      }
      .zone-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
      }
      .zone-row > * {
        flex: 1;
        min-width: 140px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .field select,
      .field input[type="text"] {
        padding: 10px 8px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 1em;
        font-family: inherit;
      }
    `;
  }

  setConfig(config) {
    this.config = config;
  }

  _zones() {
    return this.config?.zones ?? DEFAULT_ZONES;
  }

  _localeOptions() {
    const translations = this._hass?.translationMetadata?.translations;
    const auto = { value: "auto", label: "Auto (use Home Assistant setting)" };
    if (!translations) {
      return [auto];
    }
    const entries = Object.entries(translations).map(([code, meta]) => ({
      value: code,
      label: meta?.nativeName ?? code,
    }));
    entries.sort((a, b) => a.label.localeCompare(b.label));
    return [auto, ...entries];
  }

  _schema() {
    return [
      { name: "title", selector: { text: {} } },
      {
        name: "time_format",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto (use Home Assistant setting)" },
              { value: "12h", label: "12-hour" },
              { value: "24h", label: "24-hour" },
            ],
          },
        },
      },
      { name: "show_seconds", selector: { boolean: {} } },
      {
        name: "date_format",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "long", label: "Long - Thursday, September 10, 2026" },
              { value: "medium", label: "Medium - Thu, Sep 10, 2026" },
              { value: "short", label: "Short - Thu, Sep 10, 26" },
              { value: "extra_short", label: "Extra short - Thu, Sep 10" },
              { value: "numeric", label: "Numeric - Thursday, 10.09.2026" },
              { value: "iso", label: "ISO - 2026-09-10" },
            ],
          },
        },
      },
      {
        name: "show_weekday",
        selector: { boolean: {} },
        disabled: this.config?.date_format === "iso",
      },
      {
        name: "locale",
        selector: {
          select: {
            mode: "dropdown",
            options: this._localeOptions(),
          },
        },
      },
    ];
  }

  _computeLabel = (schemaItem) => {
    return FIELD_LABELS[schemaItem.name] ?? schemaItem.name;
  };

  _valueChanged(ev) {
    const newConfig = { ...this.config, ...ev.detail.value };
    fireEvent(this, "config-changed", { config: newConfig });
  }

  _zoneCityChanged(index, ev) {
    const value = ev.target.value;

    if (value === "custom") {
      // "Custom" is a display-mode choice, not itself config data — don't
      // touch the zone's timezone/name, just force the custom fields open.
      const overrides = [...this._customZoneOverride];
      overrides[index] = true;
      this._customZoneOverride = overrides;
      return;
    }

    if (this._customZoneOverride[index]) {
      const overrides = [...this._customZoneOverride];
      overrides[index] = false;
      this._customZoneOverride = overrides;
    }

    const zones = [...this._zones()];
    const city = CURATED_CITIES.find((c) => c.timezone === value);
    if (city) {
      zones[index] = { timezone: city.timezone, name: city.name };
    }
    fireEvent(this, "config-changed", {
      config: { ...this.config, zones },
    });
  }

  _zoneFieldChanged(index, field, value) {
    const zones = [...this._zones()];
    zones[index] = { ...zones[index], [field]: value };
    fireEvent(this, "config-changed", {
      config: { ...this.config, zones },
    });
  }

  _renderZoneEditor(zone, index) {
    const forcedCustom = this._customZoneOverride?.[index] ?? false;
    const curated =
      !forcedCustom &&
      CURATED_CITIES.find((c) => c.timezone === zone.timezone);
    return html`
      <div class="zone-row">
        <div class="field">
          <label>Zone ${index + 1} city</label>
          <select @change=${(ev) => this._zoneCityChanged(index, ev)}>
            ${CURATED_CITIES.map(
              (city) => html`
                <option
                  value=${city.timezone}
                  ?selected=${!!curated && curated.timezone === city.timezone}
                >
                  ${city.name}
                </option>
              `
            )}
            <option value="custom" ?selected=${!curated}>Custom...</option>
          </select>
        </div>
        ${!curated
          ? html`
              <div class="field">
                <label>Timezone (IANA)</label>
                <input
                  type="text"
                  .value=${zone.timezone ?? ""}
                  @input=${(ev) =>
                    this._zoneFieldChanged(
                      index,
                      "timezone",
                      ev.target.value
                    )}
                />
              </div>
            `
          : ""}
        <div class="field">
          <label>Label</label>
          <input
            type="text"
            .value=${zone.name ?? ""}
            @input=${(ev) =>
              this._zoneFieldChanged(index, "name", ev.target.value)}
          />
        </div>
      </div>
    `;
  }

  set hass(hass) {
    this._hass = hass;
  }

  render() {
    if (!this.config) {
      return html``;
    }
    return html`
      <ha-form
        .hass=${this._hass}
        .data=${this.config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="zones-heading">Zones</div>
      <div class="zones-help">
        Pick a city for each zone, or choose "Custom" to enter any IANA
        time zone name directly (e.g. Europe/Sofia). See the
        <a
          href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
          target="_blank"
          rel="noopener noreferrer"
          >full list of IANA time zones on Wikipedia</a
        >.
      </div>
      ${this._zones().map((zone, index) =>
        this._renderZoneEditor(zone, index)
      )}
    `;
  }
}

customElements.define("world-clock-card-editor", WorldClockCardEditor);
