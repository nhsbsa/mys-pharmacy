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
    res.redirect('service-suspension-time');
  } else {
    res.redirect('service-suspension-time');
  }
});




router.post(/Time/, function (req, res) {
  res.redirect('closure-reason');
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
    res.redirect('suspension-date');
  } else {
    res.redirect('declaration');
  }
});


router.post(/temp-check-your-answers/, function (req, res) {
  res.redirect('check-suspension-details');
})


router.post(/DeleteConfirmation/, function (req, res) {

  const deleteconfirmation = req.session.data['deleteconfirmation']

  if (deleteconfirmation === "yes") {
    res.redirect('suspension-date');
  } else {
    res.redirect('check-suspension-details');
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


router.post(/unplanned-actions/, function (req, res) {
  res.redirect('mitigating-actions');
})


router.post(/unplanneddetailsmore/, function (req, res) {
  res.redirect('unplanned-cya-more');
});



router.post(/testing-name/, function (req, res) {
  res.redirect('reason2');
})

router.post(/unplanned-cya-two/, function (req, res) {
  res.redirect('unplanned-check-your-answers-new');
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



// Covid Vaccination //


router.post(/CovidVaccination/, function (req, res) {

  const covid = req.session.data['covid']

  if (covid === "yes") {
    res.redirect('covid-vaccination');
  } else {
    res.redirect('cya');
  }
});


// HEE //


router.post(/HEETerms/, function (req, res) {

  const heeterms = req.session.data['heeterms']

  if (heeterms === "yes") {
    res.redirect('hee-months');
  } else {
    res.redirect('hee-terms-declined');
  }
});




router.post(/HEECourse/, function (req, res) {

  const heecourse = req.session.data['heecourse']

  if (heecourse === "yes") {
    res.redirect('hee-terms-ptpts');
  } else if (heecourse === "no") {
    res.redirect('hee-terms-pftp');
  } else {
    res.redirect('hee-terms');
  }
});



router.post(/TermsPTPTS/, function (req, res) {

  const termsptpts = req.session.data['termsptpts']

  if (termsptpts === "yes") {
    res.redirect('hee-months-ptpts');
  } else {
    res.redirect('hee-terms-declined');
  }
});



router.post(/TermsPFTP/, function (req, res) {

  const termspftp = req.session.data['termspftp']

  if (termspftp === "yes") {
    res.redirect('hee-months-pftp');
  } else {
    res.redirect('hee-terms-declined');
  }
});


router.post(/DeleteTrainee/, function (req, res) {

  const deletetrainee = req.session.data['deletetrainee']

  if (deletetrainee === "yes") {
    res.redirect('hee-cya-deleted');
  } else {
    res.redirect('hee-cya');
  }
});


router.post(/PTPTS/, function (req, res) {

  const deletetraineeptpts = req.session.data['deletetraineeptpts']

  if (deletetraineeptpts === "yes") {
    res.redirect('hee-cya-deleted-ptpts');
  } else {
    res.redirect('hee-cya-ptpts');
  }
});


router.post(/PFTP/, function (req, res) {

  const deletetraineepftp = req.session.data['deletetraineepftp']

  if (deletetraineepftp === "yes") {
    res.redirect('hee-cya-deleted-pftp');
  } else {
    res.redirect('hee-cya-pftp');
  }
});


// LFT //

router.post(/Select/, function (req, res) {

  const select = req.session.data['select']

  if (select === "yes") {
    res.redirect('patient-details-new');
  } else {
    res.redirect('patient-details-new-rep');
  }
});


router.post(/EvidencePatient/, function (req, res) {

  const evidencepatient = req.session.data['evidencepatient']

  if (evidencepatient === "yes") {
    res.redirect('lft-details-patient');
  } else {
    res.redirect('lft-start-page-new');
  }
});

// HEE REG/DE-REG //

router.post(/DERegistration/, function (req, res) {

  const dereg = req.session.data['dereg']

  if (dereg === "yes") {
    res.redirect('de-registration-declaration');
  } else {
    res.redirect('hee-months');
  }
});


// Flu //

router.post(/ViewAndSubmit/, function (req, res) {

  const ViewAndSubmit = req.session.data['ViewAndSubmit']

  if (ViewAndSubmit === "yes") {
    res.redirect('cya');
  } else {
    res.redirect('manual');
  }
});


router.post(/FLUCHECKYOURANSWERS/, function (req, res) {

  const FLUCHECKYOURANSWERS = req.session.data['FLUCHECKYOURANSWERS']

  if (FLUCHECKYOURANSWERS === "yes") {
    res.redirect('flu-dashboard');
  } else {
    res.redirect('declaration');
  }
});


router.post(/CYATWO/, function (req, res) {

  const CYATWO = req.session.data['CYATWO']

  if (CYATWO === "yes") {
    res.redirect('flu-dashboard');
  } else {
    res.redirect('declaration2');
  }
});


module.exports = router;
