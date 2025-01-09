import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'dds-alert',
  styleUrl: 'dds-alert.css',
  shadow: true,
})
export class DdsAlert {
  /**
   * The visual style type of the alert.
   * 'primary' for stronger emphasis, 'secondary' for lighter emphasis.
   */
  @Prop() type: 'primary' | 'secondary' = 'primary';

  /**
   * The semantic variant of the alert that indicates its purpose.
   * - 'info': For general information messages
   * - 'warning': For warning messages that require attention
   * - 'error': For error messages that indicate a problem
   * - 'success': For success messages that confirm a positive outcome
   */
  @Prop() variant: 'info' | 'warning' | 'error' | 'success' = 'info';

  /**
   * The main heading text of the alert.
   */
  @Prop() alertTitle: string = '';

  /**
   * The detailed message text of the alert.
   */
  @Prop() description: string = '';

  /**
   * URL for the primary action button.
   * If provided, clicking the primary button will navigate to this URL.
   */
  @Prop() primaryLink?: string;

  /**
   * URL for the secondary action button.
   * If provided, clicking the secondary button will navigate to this URL.
   */
  @Prop() secondaryLink?: string;

  /**
   * Text label for the primary action button.
   */
  @Prop() primaryText: string = 'Primary';

  /**
   * Text label for the secondary action button.
   */
  @Prop() secondaryText: string = 'Secondary';

  /**
   * Additional CSS class names to apply to the alert container.
   * Multiple classes can be provided as a space-separated string.
   */
  @Prop() customClass?: string = '';

  /**
   * Event emitted when the close button is clicked.
   */
  @Event() closeEvent: EventEmitter<void>;

  private handleClose(event: MouseEvent) {
    event.preventDefault();
    this.closeEvent.emit();
  }

  render() {
    return (
      <div class={`dds-alert dds-alert--${this.type} dds-alert--${this.variant} ${this.customClass}`}>
        <div class="alert-content">
          {this.alertTitle && <h4 class="alert-title">{this.alertTitle}</h4>}
          {this.description && <p class="alert-description">{this.description}</p>}
          <div class="alert-actions">
            {this.secondaryLink && 
              <dds-button
                compact={true}
                variant="secondary"
                appearance="outline"
                onClick={() => window.location.href = this.secondaryLink}
              >
                {this.secondaryText}
              </dds-button>
            }
            {this.primaryLink &&
              <dds-button
                compact={true}
                variant="primary"
                onClick={() => window.location.href = this.primaryLink}
              >
                {this.primaryText}
              </dds-button>
            }
          </div>
        </div>
        <dds-button
          variant="secondary"
          appearance="outline"
          compact={true}
          onClick={(event) => this.handleClose(event)}
        >
          Close
        </dds-button>
      </div>
    );
  }
}
