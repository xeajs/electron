const port = {
  views: 9001,
  serve: 9000
};

const RootConfig = {
  port,
  devServer: {
    port: port.views,
    after() {},
    before() {}
  }
};

module.exports = RootConfig;
