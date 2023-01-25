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

  router.get(/plannedLength/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('planned-date');
      } else  {
      res.redirect('planned-multiples');
    }
  });

  router.get(/unPlannedLength/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('unplanned-date');
      } else  {
      res.redirect('unplanned-multiples');
    }
  });

  router.get(/plannedMultiple/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('planned-start-date');
      } else  {
      res.redirect('planned-date');
    }
  });

  router.get(/plannedAddDate/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('planned-date');
      } else  {
      res.redirect('planned-declaration');
    }
  });

  router.get(/unPlannedAddDate/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('');
      } else  {
      res.redirect('unplanned-details');
    }
  });

  router.get(/unPlannedCYA/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('');
      } else  {
      res.redirect('unplanned-actions');
    }
  });


  router.get(/unPlannedMultiple/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('unplanned-day');
      } else  {
      res.redirect('unplanned-day');
    }
  });

  
  router.get(/unPlannedDay/, function (req, res) {
    if (req.query.radioInlineGroup === "Yes" ) {
      res.redirect('unplanned-reopen');
      } else  {
      res.redirect('unplanned-reopen');
    }
  });



  router.post(/unPlannedReopen/, function (req, res) {

    const pharmacyReOpenDate = req.session.data['pharmacyReOpenDate']

    if (pharmacyReOpenDate === "yes" ) {
      res.redirect('unplanned-day');
      } else  {
      res.redirect('unplanned-details');
    }
  });


  router.post(/unPlannedCYAv4/, function (req, res) {

    const addanotherdate = req.session.data['addanotherdate']

    if (addanotherdate === "Yes" ) {
      res.redirect('unplanned-day');
      } else  {
      res.redirect('unplanned-actions');
    }
  });



  router.post(/unPlannedReopenDay/, function (req, res) {
      res.redirect('unplanned-reason');
  });


module.exports = router;
