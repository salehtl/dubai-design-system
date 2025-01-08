import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'dds-alert',
  styleUrl: 'dds-alert.css',
  shadow: true,
})
export class DdsAlert {
  @Prop() type: 'primary' | 'secondary' = 'primary';
  @Prop() variant: 'info' | 'warning' | 'error' | 'success' = 'info';
  @Prop() alertTitle: string = '';
  @Prop() description: string = '';
  @Prop() primaryLink?: string;
  @Prop() secondaryLink?: string;
  @Prop() primaryText: string = 'Primary';
  @Prop() secondaryText: string = 'Secondary';
  @Prop() customClass?: string = '';

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
