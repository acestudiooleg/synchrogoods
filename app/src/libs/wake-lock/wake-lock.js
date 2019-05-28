export const wakeLockErr = 'Failed to wake lock application';
export default value => {
  try {
    window.cordova.plugins.backgroundMode.setEnabled(value);
  } catch (err) {
    window.console.error(wakeLockErr);
  }
};
