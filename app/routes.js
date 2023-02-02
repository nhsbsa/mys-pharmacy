// External dependencies
const express = require('express');
const router = express.Router();

// PPC Routes //

router.get(/ppcEmail/, function (req, res) {
  if (req.query.radioInlineGroup === "Email") {
    res.redirect('ppc-customer-email1');
  } else {
    res.redirect('ppc-cya');
  }
});

// HRT PPC Routes //

router.get(/ppcEmail/, function (req, res) {
  if (req.query.radioInlineGroup === "Email") {
    res.redirect('ppc-customer-email1');
  } else {
    res.redirect('ppc-cya');
  }
});

router.get(/hrtPpcEmail/, function (req, res) {
  if (req.query.radioInlineGroup === "Email") {
    res.redirect('hrtppc-customer-email1');
  } else {
    res.redirect('hrtppc-cya');
  }
});

router.get(/hrtHrtEmail/, function (req, res) {
  if (req.query.radioInlineGroup === "Email") {
    res.redirect('hrt-customer-email1');
  } else {
    res.redirect('hrt-cya');
  }
});

router.get(/ppcHrtQuestion/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('ppc-or-hrt-ppc-start-page');
  } else {
    res.redirect('ppc-or-hrt-hrt-start-page');
  }
});

// PUC routes //

router.get(/plannedLength/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('planned-date');
  } else {
    res.redirect('planned-multiples');
  }
});

router.get(/unPlannedLength/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('unplanned-date');
  } else {
    res.redirect('unplanned-multiples');
  }
});

router.get(/plannedMultiple/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('planned-start-date');
  } else {
    res.redirect('planned-date');
  }
});

router.get(/plannedAddDate/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('planned-date');
  } else {
    res.redirect('planned-declaration');
  }
});

router.get(/unPlannedAddDate/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('time');
  } else {
    res.redirect('time');
  }
});




router.post(/Time/, function (req, res) {
  res.redirect('reason');
});

router.get(/unplanned-cya/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('unplanned-cya2');
  } else {
    res.redirect('unplanned-cya2');
  }
});


router.get(/unPlannedMultiple/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('unplanned-day');
  } else {
    res.redirect('unplanned-date');
  }
});


router.get(/unPlannedDay/, function (req, res) {
  if (req.query.radioInlineGroup === "Yes") {
    res.redirect('unplanned-reopen');
  } else {
    res.redirect('unplanned-reopen');
  }
});



router.post(/unPlannedReopen/, function (req, res) {

  const pharmacyReOpenDate = req.session.data['pharmacyReOpenDate']

  if (pharmacyReOpenDate === "yes") {
    res.redirect('unplanned-reopen-day');
  } else {
    res.redirect('reason3');
  }
});


router.post(/UnplannedCheckYourAnswersNew/, function (req, res) {

  const addanotherdate = req.session.data['addanotherdate']

  if (addanotherdate === "Yes") {
    res.redirect('unplanned-date');
  } else {
    res.redirect('unplanned-declaration');
  }
});


router.post(/ReasonMore/, function (req, res) {

  const reason = req.session.data['reason']

  if (reason === "Yes") {
    res.redirect('unplanned-day');
  } else {
    res.redirect('unplanned-declaration-more');
  }
});

router.post(/NoDate/, function (req, res) {

  const nodate = req.session.data['nodate']

  if (nodate === "Yes") {
    res.redirect('unplanned-day');
  } else {
    res.redirect('unplanned-declaration-no-date');
  }
});


router.post(/unplannedCheck/, function (req, res) {
  res.redirect('unplanned-checkya');
})


router.post(/unplanneddetailsmore/, function (req, res) {
  res.redirect('unplanned-cya-more');
});



router.post(/testing-name/, function (req, res) {
  res.redirect('reason2');
})


// Registration Services //

router.post(/opt-in/, function (req, res) {
  res.redirect('declaration');
})

router.post(/declarationpage/, function (req, res) {
  res.redirect('done');
})

router.post(/opt-out/, function (req, res) {
  res.redirect('reason');
})

router.post(/selectreason/, function (req, res) {
  res.redirect('declaration2');
})

router.post(/dereg-declaration/, function (req, res) {
  res.redirect('done2');
})

router.post(/unplanned-cya-two/, function (req, res) {
  res.redirect('unplanned-check-your-answers-new');
})




module.exports = router;
