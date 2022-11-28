// External dependencies
const express = require('express');
const router = express.Router();

// PPC Routes //

router.get(/ppcEmail/, function (req, res) {
  if (req.query.radioInlineGroup === "Email" ) {
    res.redirect('ppc-customer-email1');
    } else {
    res.redirect('ppc-cya');
  }
});

// HRT PPC Routes //

router.get(/ppcEmail/, function (req, res) {
    if (req.query.radioInlineGroup === "Email" ) {
      res.redirect('ppc-customer-email1');
      } else {
      res.redirect('ppc-cya');
    }
  });
  
  router.get(/hrtPpcEmail/, function (req, res) {
    if (req.query.radioInlineGroup === "Email" ) {
      res.redirect('hrtppc-customer-email1');
      } else {
      res.redirect('hrtppc-cya');
    }
  });
  
  router.get(/hrtHrtEmail/, function (req, res) {
    if (req.query.radioInlineGroup === "Email" ) {
      res.redirect('hrt-customer-email1');
      } else {
      res.redirect('hrt-cya');
    }
  });
  
  router.get(/ppcHrtQuestion/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('ppc-or-hrt-ppc-start-page');
      } else {
      res.redirect('ppc-or-hrt-hrt-start-page');
    }
  });

  // PUC routes //

  router.get(/plannedAddDate/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('planned-date');
      } else  {
      res.redirect('planned-declaration');
    }
  });

  router.get(/unPlannedAddDate/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('unplanned-date');
      } else  {
      res.redirect('unplanned-actions');
    }
  });

  

module.exports = router;
