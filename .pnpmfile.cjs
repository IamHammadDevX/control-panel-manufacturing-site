// Allow build scripts for all packages
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Don't block any build scripts
      return pkg;
    },
  },
};
