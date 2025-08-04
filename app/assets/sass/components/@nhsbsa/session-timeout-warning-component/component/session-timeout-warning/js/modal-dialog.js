;(function (global) {
    'use strict'
  
    const NHSBSASessionTimeout = {}
    
    if ( document.getElementById('js-modal-dialog')) {
        // Modal dialog prototype
    NHSBSASessionTimeout.sessionDialog = {
        el: document.getElementById('js-modal-dialog'),
        // $el: $('#js-modal-dialog'),
        $lastFocusedEl: null,
        $closeButton: document.querySelector('.modal-dialog .js-dialog-close'),
        dialogIsOpenClass: 'dialog-is-open',
        timers: [],
        warningTextPrefix: document.querySelector('#js-modal-dialog')?.dataset['sessionTimeoutTimerText'] + " " || 'We will reset your application if you do not respond in ',
        warningTextSuffix: '.',
        warningTextExtra: " " + document.querySelector('#js-modal-dialog')?.dataset['sessionTimeoutTimerExtraText'] || ' We do this to keep your information secure.',
        
        // Timer specific markup. If these are not present, timeout and redirection are disabled
        $timer: document.querySelector('#js-modal-dialog .timer'),
        $accessibleTimer: document.querySelector('#js-modal-dialog .at-timer'),
    
        secondsSessionTimeout: parseInt(document.querySelector('#js-modal-dialog').dataset['sessionTimeout'] || 1800),
        secondsTimeoutWarning: parseInt(document.querySelector('#js-modal-dialog').dataset['sessionTimeoutWarning'] || 300),
        secondsFinalWarning: parseInt(document.querySelector('#js-modal-dialog').dataset['sessionTimeoutFinalWarning'] || 4),
        timeoutRedirectUrl: document.querySelector('#js-modal-dialog').dataset['urlRedirect'],
        timerText: document.querySelector('#js-modal-dialog').dataset['sessionTimeoutTimerText'],
        accessibleTimerText: document.querySelector('#js-modal-dialog').dataset['sessionTimeoutTimerAccessibleText'],
        timeSessionRefreshed: new Date(),
    
        bindUIElements: function () {
          NHSBSASessionTimeout.sessionDialog.$closeButton.addEventListener('click', e => {
            e.preventDefault()
            NHSBSASessionTimeout.sessionDialog.closeDialog()
          })
          
          // Close modal when ESC pressed
          document.addEventListener("keydown", (e) => {
            if (NHSBSASessionTimeout.sessionDialog.isDialogOpen() && e.key === "Escape") {
              NHSBSASessionTimeout.sessionDialog.closeDialog()
            }
          })      
        },
        
        isDialogOpen: function () {
          return NHSBSASessionTimeout.sessionDialog.el['open']
        },
        
        isConfigured: function () {
          const {
            $timer, $accessibleTimer, secondsSessionTimeout, secondsTimeoutWarning, timeoutRedirectUrl
          } = NHSBSASessionTimeout.sessionDialog
          return NHSBSASessionTimeout.sessionDialog.$timer &&
                  NHSBSASessionTimeout.sessionDialog.$accessibleTimer && 
                  NHSBSASessionTimeout.sessionDialog.secondsSessionTimeout &&
                  NHSBSASessionTimeout.sessionDialog.secondsTimeoutWarning &&
                  NHSBSASessionTimeout.sessionDialog.timeoutRedirectUrl
        },
        
        openDialog: function () {
          if (!NHSBSASessionTimeout.sessionDialog.isDialogOpen()) {
            document.body.classList.add(NHSBSASessionTimeout.sessionDialog.dialogIsOpenClass)
            
            NHSBSASessionTimeout.sessionDialog.saveLastFocusedEl()
            NHSBSASessionTimeout.sessionDialog.makePageContentInert()
            NHSBSASessionTimeout.sessionDialog.el.showModal()
          }
        },
        
        closeDialog: function () {
          if (NHSBSASessionTimeout.sessionDialog.isDialogOpen()) {
            document.body.classList.remove(NHSBSASessionTimeout.sessionDialog.dialogIsOpenClass)
            NHSBSASessionTimeout.sessionDialog.el.close()
            NHSBSASessionTimeout.sessionDialog.setFocusOnLastFocusedEl()
            NHSBSASessionTimeout.sessionDialog.removeInertFromPageContent()
            NHSBSASessionTimeout.sessionDialog.refreshSession()
          }
        },
        
        saveLastFocusedEl: function () {
          NHSBSASessionTimeout.sessionDialog.$lastFocusedEl = document.activeElement
          if (!NHSBSASessionTimeout.sessionDialog.$lastFocusedEl || NHSBSASessionTimeout.sessionDialog.$lastFocusedEl === document.body) {
            NHSBSASessionTimeout.sessionDialog.$lastFocusedEl = null
          } else if (document.querySelector) {
            NHSBSASessionTimeout.sessionDialog.$lastFocusedEl = document.querySelector(':focus')
          }
        },
        
        // Set focus back on last focused el when modal closed
        setFocusOnLastFocusedEl: function () {
          if (NHSBSASessionTimeout.sessionDialog.$lastFocusedEl) {
            window.setTimeout(function () {
              NHSBSASessionTimeout.sessionDialog.$lastFocusedEl.focus()
            }, 0)
          }
        },
        
        // Set page content to inert to indicate to screenreaders it's inactive
        // NB: This will look for #content for toggling inert state
        makePageContentInert: function () {
          if (document.querySelector('#content')) {
            document.querySelector('#content').inert = true
            document.querySelector('#content').setAttribute('aria-hidden', 'true')
          }
        },
        
        // Make page content active when modal is not open
        // NB: This will look for #content for toggling inert state
        removeInertFromPageContent: function () {
          if (document.querySelector('#content')) {
            document.querySelector('#content').inert = false
            document.querySelector('#content').setAttribute('aria-hidden', 'false')
          }
        },
        
        numberToWords: function (n) {
            var string = n.toString()
            var units
            var tens
            var scales
            var start
            var end
            var chunks
            var chunksLen
            var chunk
            var ints
            var i
            var word
            var words = 'and'
    
            if (parseInt(string) === 0) {
              return 'zero'
            }
    
            /* Array of units as words */
            units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ]
    
            /* Array of tens as words */
            tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ]
    
            /* Array of scales as words */
            scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ]
    
            /* Split user arguemnt into 3 digit chunks from right to left */
            start = string.length
            chunks = []
            while (start > 0) {
              end = start
              chunks.push(string.slice((start = Math.max(0, start - 3)), end))
            }
    
            /* Check if function has enough scale words to be able to stringify the user argument */
            chunksLen = chunks.length
            if (chunksLen > scales.length) {
              return ''
            }
    
            /* Stringify each integer in each chunk */
            words = []
            for (i = 0; i < chunksLen; i++) {
              chunk = parseInt(chunks[i])
    
              if (chunk) {
                /* Split chunk into array of individual integers */
                ints = chunks[i].split('').reverse().map(parseFloat)
    
                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if (ints[1] === 1) {
                  ints[0] += 10
                }
    
                /* Add scale word if chunk is not zero and array item exists */
                if ((word = scales[i])) {
                  words.push(word)
                }
    
                /* Add unit word if array item exists */
                if ((word = units[ints[0]])) {
                  words.push(word)
                }
    
                /* Add tens word if array item exists */
                if ((word = tens[ ints[1] ])) {
                  words.push(word)
                }
    
                /* Add hundreds word if array item exists */
                if ((word = units[ints[2]])) {
                  words.push(word + ' hundred')
                }
              }
            }
            return words.reverse().join(' ')
        },
        
        // Attempt to convert numerics into text as OS VoiceOver
        // occasionally stalled when encountering umbers
        timeToWords: function(t, unit) {
            var words
            if (t > 0) {
                try {
                    words = NHSBSASessionTimeout.sessionDialog.numberToWords(t)
                } catch (e) {
                    words = t
                }
                words = words + ' ' + NHSBSASessionTimeout.sessionDialog.pluralise(t, unit)
            } else {
                words = ''
            }
            return words
        },
    
        pluralise: function(n, unit) {
            return n == 1 ? unit : unit + 's'
        },
        
        numericSpan: function(n, unit) {
            return '<span class="tabular-numbers">' + n + '</span> ' + NHSBSASessionTimeout.sessionDialog.pluralise(n, unit)
        },
        
        countdownText: function(minutes, seconds) {
            var minutesText = NHSBSASessionTimeout.sessionDialog.numericSpan(minutes, 'minute')
            var secondsText = NHSBSASessionTimeout.sessionDialog.numericSpan(seconds, 'second')
            return minutes > 0 ? minutesText + (minutes == 1 && seconds == 0 ? '' : ' ' + secondsText) : secondsText
        },
        
        countdownAtText: function(minutes, seconds) {
            var minutesText = NHSBSASessionTimeout.sessionDialog.timeToWords(minutes, 'minute')
            var secondsText = NHSBSASessionTimeout.sessionDialog.timeToWords(seconds, 'second')
            return minutes > 0 ? minutesText + (seconds > 0 ? ' and ' + secondsText : '') : secondsText
        },
        
        startCountdown: function() {
            var $timer = NHSBSASessionTimeout.sessionDialog.$timer
            var $accessibleTimer = NHSBSASessionTimeout.sessionDialog.$accessibleTimer
            var timerRunOnce = false
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
            
            var seconds = NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout()
            var minutes = seconds / 60
            
            $timer.text = minutes + ' minute' + (minutes > 1 ? 's' : '');
    
            (function countdown () {
    
                var secondsUntilSessionTimeout = NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout()
                var timerExpired = secondsUntilSessionTimeout <= NHSBSASessionTimeout.sessionDialog.secondsFinalWarning
                
                if (!timerExpired) {
    
                    var minutesLeft = parseInt(secondsUntilSessionTimeout / 60, 10)
                    var secondsLeft = parseInt(secondsUntilSessionTimeout % 60, 10)
                    
                    var atMinutesText = NHSBSASessionTimeout.sessionDialog.timeToWords(minutesLeft, 'minute')
                    var atSecondsText = NHSBSASessionTimeout.sessionDialog.timeToWords(secondsLeft, 'second')
        
                    // Below string will get read out by screen readers every time
                    // the timeout refreshes (every 15 secs. See below).
                    // Please add additional information in the modal body content
                    // or in below extraText which will get announced to AT the
                    // first time the time out opens
                    var countdownText = NHSBSASessionTimeout.sessionDialog.countdownText(minutesLeft, secondsLeft)
                    var text = NHSBSASessionTimeout.sessionDialog.warningTextPrefix + '<strong>' + countdownText + '</strong>' + NHSBSASessionTimeout.sessionDialog.warningTextSuffix
                    var countdownAtText = NHSBSASessionTimeout.sessionDialog.countdownAtText(minutesLeft, secondsLeft)
                    var atText = NHSBSASessionTimeout.sessionDialog.warningTextPrefix + countdownAtText  + NHSBSASessionTimeout.sessionDialog.warningTextSuffix
                    var extraText = ' ' + NHSBSASessionTimeout.sessionDialog.warningTextExtra;
    
                    $timer.innerHTML = text + ' ' + extraText
    
                    // Update screen reader friendly content every 15 secs
                    if (secondsLeft % 15 === 0) {
    
                        // Read out the extra content only once.
                        // Don't read out on iOS VoiceOver which stalls on the longer text
                        if (!timerRunOnce && !iOS) {
                            $accessibleTimer.textContent = atText + extraText
                            timerRunOnce = true
                        } else {
                            $accessibleTimer.textContent = atText
                        }
                    }
    
                    NHSBSASessionTimeout.sessionDialog.addTimer(countdown, 1)
                }
          })()
        },
        
        finalWarning: function() {
            var $timer = NHSBSASessionTimeout.sessionDialog.$timer
            var $accessibleTimer = NHSBSASessionTimeout.sessionDialog.$accessibleTimer
                $accessibleTimer.setAttribute('aria-live', 'assertive')
            $timer.textContent = 'You are about to be redirected'
            $accessibleTimer.textContent = 'You are about to be redirected'
        },
        
        // Clears all timers
        clearTimers: function () {
          for (var i = 0; i < NHSBSASessionTimeout.sessionDialog.timers.length; i++) {
            clearTimeout(NHSBSASessionTimeout.sessionDialog.timers[i])
          }
        },
    
        request: function () {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', "", true);
          xhr.responseType = 'text';
          xhr.send(null);
        },
    
        refreshSession: function () {
          this.request()
            NHSBSASessionTimeout.sessionDialog.timeSessionRefreshed = new Date();
            NHSBSASessionTimeout.sessionDialog.controller()
        },
        
        redirect: function () {
          NHSBSASessionTimeout.sessionDialog.clearTimers();
          window.location = NHSBSASessionTimeout.sessionDialog.timeoutRedirectUrl;
        },
        
        // JS doesn't allow resetting timers globally so timers need
        // to be retained for resetting.
        addTimer: function(f, seconds) {
            NHSBSASessionTimeout.sessionDialog.timers.push(setTimeout(f, seconds * 1000))
        },
        
        secondsSinceRefresh: function() {
            return Math.round(Math.abs((NHSBSASessionTimeout.sessionDialog.timeSessionRefreshed - new Date()) / 1000))
        },
        
        secondsUntilSessionTimeout: function() {
            return NHSBSASessionTimeout.sessionDialog.secondsSessionTimeout - NHSBSASessionTimeout.sessionDialog.secondsSinceRefresh()
        },
        
        secondsUntilTimeoutWarning: function() {
            return NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout() - NHSBSASessionTimeout.sessionDialog.secondsTimeoutWarning
        },
        
        secondsUntilFinalWarning: function() {
            return NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout() - NHSBSASessionTimeout.sessionDialog.secondsFinalWarning
        },
        
        // countdown controller logic
        controller: function() {
            
            NHSBSASessionTimeout.sessionDialog.clearTimers()
            
            var secondsUntilSessionTimeout = NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout()
            
            //timed out - redirect
            if (secondsUntilSessionTimeout <= 0) {
                return NHSBSASessionTimeout.sessionDialog.redirect();
            }
            
            //final warning - show timeout imminent warning and schedule redirect
            else if (secondsUntilSessionTimeout <= NHSBSASessionTimeout.sessionDialog.secondsFinalWarning) {
                NHSBSASessionTimeout.sessionDialog.openDialog()
                NHSBSASessionTimeout.sessionDialog.finalWarning()
                NHSBSASessionTimeout.sessionDialog.addTimer(NHSBSASessionTimeout.sessionDialog.controller, NHSBSASessionTimeout.sessionDialog.secondsUntilSessionTimeout())
            }
            
            //timeout warning - show countdown and schedule imminent warning
            else if (secondsUntilSessionTimeout <= NHSBSASessionTimeout.sessionDialog.secondsTimeoutWarning) {
                NHSBSASessionTimeout.sessionDialog.openDialog()
                NHSBSASessionTimeout.sessionDialog.startCountdown()
                NHSBSASessionTimeout.sessionDialog.addTimer(NHSBSASessionTimeout.sessionDialog.controller, NHSBSASessionTimeout.sessionDialog.secondsUntilFinalWarning())
            }
            
            //wait for warning 
            else {
                NHSBSASessionTimeout.sessionDialog.addTimer(NHSBSASessionTimeout.sessionDialog.controller, NHSBSASessionTimeout.sessionDialog.secondsUntilTimeoutWarning())
            }
        },
        
    
        init : function(options) {
            NHSBSASessionTimeout.sessionDialog = {...NHSBSASessionTimeout.sessionDialog, ...options}
            if (NHSBSASessionTimeout.sessionDialog.el && NHSBSASessionTimeout.sessionDialog.isConfigured()) {
          
                // Native dialog is not supported by browser so use polyfill
                if (typeof HTMLDialogElement !== 'function') {
                        window.dialogPolyfill.registerDialog(NHSBSASessionTimeout.sessionDialog.el)
                    }
                    NHSBSASessionTimeout.sessionDialog.bindUIElements()
                    NHSBSASessionTimeout.sessionDialog.controller();
                }
            }
        }
      
    }
    
    global.NHSBSASessionTimeout = NHSBSASessionTimeout
  
  })(window); // eslint-disable-line semi
  