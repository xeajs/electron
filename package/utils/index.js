const BuildStatsHandle = (error, stats, isPro = true) => {
  if (error) throw new Error(error);
  if (stats.hasErrors()) {
    console.error(
      stats.toString({
        colors: true,
        errors: true,
        all: false
      })
    );
  }
  isPro &&
    console.info(
      stats.toString({
        colors: true,
        builtAt: true,
        timings: true,
        version: true,
        assets: true,
        errors: true,
        hash: true,
        all: false,
        chunks: false,
        modules: false,
        source: false
      })
    );
};

class StatsHandle {
  static ViewsDev() {}
  static ViewsPro(error, stats) {
    BuildStatsHandle(error, stats);
  }
  static ServeDev(error, stats) {
    BuildStatsHandle(error, stats, false);
  }
  static ServePro(error, stats) {
    BuildStatsHandle(error, stats);
  }
}

module.exports = StatsHandle;
