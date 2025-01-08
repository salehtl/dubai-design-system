import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

@Component({
  tag: 'dds-button',
  styleUrl: 'dds-button.css',
  shadow: true,
})
export class DdsButton {
  /**
   * The visual variant for the button (emphasis level).
   * "primary" for strong emphasis, "secondary" for lighter emphasis.
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  /**
   * The appearance style of the button.
   * "solid" for filled background, "outline" for bordered style.
   */
  @Prop() appearance: 'solid' | 'outline' = 'solid';

  /**
   * Indicates the button's type.
   * Equivalent to the native HTML button `type` attribute.
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Disable the button if true.
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, displays the button in a compact size with reduced padding.
   */
  @Prop() compact: boolean = false;

  /**
   * Fires when the button is clicked (if not disabled).
   */
  @Event() ddsClick!: EventEmitter<MouseEvent>;

  private handleClick(event: MouseEvent): void {
    // Only emit event if button is not disabled
    if (!this.disabled) {
      this.ddsClick.emit(event);
    }
  }

  render() {
    // Using Host to attach attributes or additional ARIA properties if needed
    return (
      <Host>
        <button
          part="button"
          type={this.type}
          class={{
            'dds-button': true,
            [`dds-button--${this.variant}`]: true,
            [`dds-button--${this.appearance}`]: true,
            'is-disabled': this.disabled,
            'dds-button--compact': this.compact
          }}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : null}
          onClick={this.handleClick.bind(this)}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
