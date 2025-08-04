function ready(fn) {
	if (document.readyState !== 'loading') {
	  fn();
	} else {
	  document.addEventListener('DOMContentLoaded', fn);
	}
  }
if (NHSBSASessionTimeout?.sessionDialog) {
	ready(NHSBSASessionTimeout.sessionDialog.init)
}
