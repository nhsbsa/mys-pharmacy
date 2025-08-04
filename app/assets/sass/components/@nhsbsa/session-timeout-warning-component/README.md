# NHS BSA Timeout Component

Timeout warning code adapted from https://github.com/hannalaakso/accessible-timeout-warning and https://gitlab.com/nhsbsa/libraries/nhsbsa-session-timeout

### Usage

An example can be found [here](https://nhsbsa.gitlab.io/libraries/node/session-timeout-warning-component)

##### No Javascript Support

For users who are not using javascript the below should be included in the `head` of the html file 

```
{{% if redirectOnSessionTimeout %}}
        <noscript>
          <meta http-equiv="refresh" content="{{ sessionTimeout }};url={{ redirectUrl }}" />
        </noscript>
{{% endif %}}
```

`sessionTimeout`: Session length in seconds
`redirectUrl`: Where to redirect when session has timed out


##### Javascript
This component requires client side javascript, you should include `timeout.js` located in the dist folder into your public folder.

You can do this directly linking to the dist folder using express or copying the timeout.js to your public folder. 

Using express.static example. 

```js
app.use(express.static('./node_modules/@nhsbsa/session-timeout-warning-component/dist'))
```
You can then load the timeout.js file in the head of your html. 

```html
<script src="/timeout.js" defer></script>
```

##### CSS
Recommend to link the the _timeout.scss file into your main .scss file in your project.

```sass
"@import component/session-timeout-warning/_timeout.scss"
```

Or copy the CSS file from the dist folder into your public folder. 

```
dist/css/main.min.css
```

### HTML Markup

The data tags are required to set the values in javascript to control when the timer is displayed, show any text etc, if using the html component you should replace the values in the data tags with your desired values.

```html
<dialog id="js-modal-dialog" data-url-redirect="session-timeout.html"
   data-session-timeout="60" data-session-timeout-warning="45"
   data-session-timeout-timer-text="You will be signed out in "  data-session-timeout-timer-extra-text="This is to ensure you data is safe"
   class="modal-dialog dialog" role="dialog" aria-live="polite" aria-labelledby="dialog-title" aria-describedby="at-timer">
   <div class="modal-dialog__inner">
      <h1 id="dialog-title" class="heading-large">
         Session Timeout
      </h1>
      <div class="modal-dialog__inner__text">
         <div id="timer" class="timer" aria-hidden="true" aria-relevant="additions"></div>
         <div id="at-timer" class="at-timer nhsuk-u-visually-hidden" role="status"></div>
      </div>
      <div class="modal-dialog__inner__block">
         <button class="nhsuk-button js-dialog-close">Continue Application</button>
      </div>
   </div>
</dialog>
```

### Nunjucks macro

```
    {{ % from 'session-timeout/macro.njk' import sessionTimeoutWarning % }}

    {{ sessionTimeoutWarning({
        redirectOnSessionTimeout: true,
        sessionTimeout: 30,
        sessionTimeoutWarning: 15 - 5,
        heading: "Your application will time out soon",
        timerText: "We will sign you out in",
        extraText: "This is to protect your data",
        buttonText: "Continue Application",
        urlRedirect: "/session-timeout.html"
    }) }}
```

### Nunjucks arguments

The timeout Nunjucks macro takes the following arguments:

| Name                   | Type    | Required | Description                                                                                                                                                                                                                                                                |
| ---------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **redirectOnSessionTimeout**            | boolean  | Yes       | If true adds the timeout component onto the page.                                                                                   |
| **sessionTimeout**     | number  | Yes      | How long the session is active for without any activity in **seconds**, this should match your server session timeout |
| **sessionTimeoutWarning**  | number  | Yes      | Triggers the modal to display on the page. How long in **seconds** before the session will timeout. Example - if you want it to show 5 minutes before the session times out enter `300`  |
| **heading** | string | Yes | The heading to display on the component                                                                                                                            
| **timerText**               | string  | Yes      | The text you wish to display on the sessionTimeout component, it should be noted text similar to `xx seconds` is appended to the text, so the text should be appropriate to the appended text, i.e `Your session will timeout in 10 Seconds` |
| **extraText**               | string  | No      | Additional text to display to the user |
| **buttonText**               | string  | Yes      | Text to display on the button |
| **urlRedirect**               | string  | Yes      | The page to display if the user does not extend the session |


If you are using Nunjucks macros in production be aware that using `html` arguments, or ones ending with `html` can be a [security risk](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting). Read more about this in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).

#### Updating the component
If changing any css or js you should run `npm run build` to update the css and js files. 