# dds-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                          | Type                              | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `disabled` | `disabled` | Disable the button if true.                                                                                          | `boolean`                         | `false`     |
| `type`     | `type`     | Indicates the button’s type. Equivalent to the native HTML button `type` attribute.                                  | `"button" \| "reset" \| "submit"` | `'button'`  |
| `variant`  | `variant`  | The visual variant for the button (emphasis level). "primary" for strong emphasis, "secondary" for lighter emphasis. | `"primary" \| "secondary"`        | `'primary'` |


## Events

| Event      | Description                                         | Type                      |
| ---------- | --------------------------------------------------- | ------------------------- |
| `ddsClick` | Fires when the button is clicked (if not disabled). | `CustomEvent<MouseEvent>` |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"button"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
