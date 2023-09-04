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
    res.redirect('check-suspension-contact-details');
  }
});


router.post(/ConfirmContacts/, function (req, res) {
  res.redirect('declaration');
})


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



router.post(/TraineeDelete/, function (req, res) {

  const TraineeDelete = req.session.data['TraineeDelete']

  if (TraineeDelete === "yes") {
    res.redirect('');
  } else {
    res.redirect('multi-cya');
  }
});



router.post(/AddAnotherTrainee/, function (req, res) {

  const AddAnotherTrainee = req.session.data['AddAnotherTrainee']

  if (AddAnotherTrainee === "yes") {
    res.redirect('create-trainee');
  } else {
    res.redirect('declaration');
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


router.post(/JULY/, function (req, res) {

  const JULY = req.session.data['JULY']

  if (JULY === "yes") {
    res.redirect('patient-details-new-July');
  } else {
    res.redirect('patient-details-new-rep-July');
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


router.post(/NewPatient/, function (req, res) {

  const NewPatient = req.session.data['NewPatient']

  if (NewPatient === "yes") {
    res.redirect('patient-details-new');
  } else {
    res.redirect('cya');
  }
});


router.post(/JulyMore/, function (req, res) {

  const JulyMore = req.session.data['JulyMore']

  if (JulyMore === "yes") {
    res.redirect('select-July');
  } else {
    res.redirect('cya-July');
  }
});


router.post(/LFDConfirm/, function (req, res) {

  const LFDConfirm = req.session.data['LFDConfirm']

  if (LFDConfirm === "yes") {
    res.redirect('cya-July');
  } else {
    res.redirect('cya-July');
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


// Covid //


router.post(/ADDANOTHERMONTH/, function (req, res) {

  const ADDANOTHERMONTH = req.session.data['ADDANOTHERMONTH']

  if (ADDANOTHERMONTH === "yes") {
    res.redirect('covid-select-month');
  } else {
    res.redirect('declaration-V2');
  }
});


router.post(/PICKMONTH/, function (req, res) {

  const PICKMONTH = req.session.data['PICKMONTH']

  if (PICKMONTH === "april") {
    res.redirect('month');
  } else if (PICKMONTH === "march") {
    res.redirect('month');
  } else {
    res.redirect('month');
  }
});


router.post(/COVIDDELETE/, function (req, res) {

  const COVIDDELETE = req.session.data['COVIDDELETE']

  if (COVIDDELETE === "yes") {
    res.redirect('covid-select-month');
  } else {
    res.redirect('declaration-V2');
  }
});

// CPCS //


router.post(/CPCSReg/, function (req, res) {

  const CPCSReg = req.session.data['CPCSReg']

  if (CPCSReg === "yes") {
    res.redirect('reg-declaration');
  } else {
    res.redirect('../services');
  }
});


// Templates //

router.post(/TemplateManualDeReg/, function (req, res) {

  const TemplateManualDeReg = req.session.data['TemplateManualDeReg']

  if (TemplateManualDeReg === "yes") {
    res.redirect('../manual/de-registration-declaration');
  } else {
    res.redirect('../manual/months');
  }
});

router.post(/TemplateAPIDeReg/, function (req, res) {

  const TemplateAPIDeReg = req.session.data['TemplateAPIDeReg']

  if (TemplateAPIDeReg === "yes") {
    res.redirect('../api/de-registration-declaration');
  } else {
    res.redirect('../api/months');
  }
});


router.post(/TemplateDelete/, function (req, res) {

  const TemplateDelete = req.session.data['TemplateDelete']

  if (TemplateDelete === "yes") {
    res.redirect('declaration-june');
  } else {
    res.redirect('declaration');
  }
});


router.post(/Remove/, function (req, res) {

  const Remove = req.session.data['Remove']

  if (Remove === "yes") {
    res.redirect('declaration-june');
  } else {
    res.redirect('../api/cya');
  }
});


router.post(/ManualAPI/, function (req, res) {

  const ManualAPI = req.session.data['ManualAPI']

  if (ManualAPI === "yes") {
    res.redirect('confirm-path-api');
  } else {
    res.redirect('../manual/months-manual');
  }
});


router.post(/Choice/, function (req, res) {

  const Choice = req.session.data['Choice']

  if (Choice === "yes") {
    res.redirect('../both/months');
  } else {
    res.redirect('select-path');
  }
});


router.post(/AddAnotherMonth/, function (req, res) {

  const AddAnotherMonth = req.session.data['AddAnotherMonth']

  if (AddAnotherMonth === "yes") {
    res.redirect('../manual/months');
  } else {
    res.redirect('../manual/declaration');
  }
});


module.exports = router;
