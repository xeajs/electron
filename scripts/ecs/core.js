const path = require('path');

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
  static RenderProcessDev() {}
  static RenderProcessPro(error, stats) {
    BuildStatsHandle(error, stats);
  }
  static MainProcessDev(error, stats) {
    BuildStatsHandle(error, stats, false);
  }
  static MainProcessPro(error, stats) {
    BuildStatsHandle(error, stats);
  }
  static JoinCwd(dirOrPath) {
    if (!dirOrPath) {
      return process.cwd();
    }
    return path.join(process.cwd(), dirOrPath);
  }
  static isPro() {
    return process.env.NODE_ENV === 'production';
  }
}

module.exports = StatsHandle;
