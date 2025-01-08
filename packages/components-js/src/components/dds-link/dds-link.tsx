import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'dds-link',
  styleUrl: 'dds-link.css',
  shadow: true,
})
export class DdsLink {
  /**
   * The URL that the hyperlink points to.
   */
  @Prop() href?: string;

  /**
   * Specifies where to open the linked document: 
   * _blank, _self, _parent, _top, or a frame name.
   */
  @Prop() target?: string;

  /**
   * Specifies the relationship between the current document 
   * and the linked document (e.g., 'noopener', 'noreferrer').
   */
  @Prop() rel?: string;

  /**
   * If true, the link will prompt for download 
   * rather than navigating to the resource.
   */
  @Prop() download = false;

  /**
   * An optional label for screen readers if 
   * the link text is not descriptive enough.
   */
  @Prop() customAriaLabel?: string;

  /**
   * If true, the link becomes visually and functionally disabled. 
   * It won’t be clickable or navigable.
   */
  @Prop() disabled = false;

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      // Prevent navigation/click
      event.preventDefault();
    }
  }

  render() {
    return (
      <Host>
        <a
          class={{
            'dds-link': true,
            'is-disabled': this.disabled,
          }}
          href={this.disabled ? undefined : this.href}
          target={this.target}
          rel={this.rel}
          download={this.download}
          aria-label={this.customAriaLabel}
          aria-disabled={this.disabled ? 'true' : null}
          onClick={this.handleClick.bind(this)}
        >
          <slot></slot>
        </a>
      </Host>
    );
  }
}
