const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  pluginOptions: {
    mpx: {
      srcMode: "wx",

      plugin: {
        transRpxRules: [
          {
            mode: "all", // 所有样式都启用转换rpx，除了注释为'use px'的样式不转换
            comment: "use px", // mode为'all'时，默认值为'use px'
            designWidth: 700, // 设计稿宽度
          },
        ],
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require("path");
          const packageJSONPath = path.resolve("package.json");
          if (files.has(packageJSONPath)) files.delete(packageJSONPath);
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath);
          }
        },
      },
      loader: {},
    },
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {},
});
