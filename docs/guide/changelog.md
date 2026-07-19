---
title: 更新日志
createTime: 2026/07/19 19:56:21
permalink: /guide/changelog/
copyright:
  author:
    name: YeizelNylo
    url: https://github.com/tb-miao
---

## 2026-07-19

- **feat(admin): 添加管理后台功能** [9608d08](https://github.com/Nachceko/yeizelnylo-data-center/commit/9608d0899dd7e70d913db40e80d6ce37f24a0ecc)
  - 添加本地文件API服务器启动批处理脚本 `api-server-run.bat`，用于检查Node.js环境并启动API服务器。
  - 添加本地文件API服务器脚本 `api-server.js`，实现文件扫描、读取和写入功能。
  - 添加管理控制台页面 `dashboard.html`，支持GitHub Token模式和本地开发模式下的文件管理。
  - 添加管理后台登录页面 `login.html`，用户通过输入访问密钥登录。
  - 修改 `docs/guide/intro.md`，将Markdown内容中的标题从 **test!** 改为 # test!。

- **📃 docs: 修复pages.yml错误** [953f430](https://github.com/Nachceko/yeizelnylo-data-center/commit/953f430a8c064240d2e929d3972e429d35df5942)

- **docs: 更新 `.pages.yml` 文档以支持正文内容的预览** [8ace40f](https://github.com/Nachceko/yeizelnylo-data-center/commit/8ace40f8245e56c94501b730707c62d13c4b581e)
  - 为正文内容字段添加了 `required`, `minimal` 和 `preview` 属性，使其在内容视图中可选、最小化并支持预览功能。
  - 在 `content` 部分的 `post` 类型中，为 `body` 字段添加了 `required: false`, `minimal: true` 和 `preview: true`。
  - 在 `content` 部分的 `page` 类型中，为 `body` 字段添加了 `required: false`, `minimal: true` 和 `preview: true`。

- **docs: 更新文档配置和数据结构** [518956f](https://github.com/Nachceko/yeizelnylo-data-center/commit/518956f6285b9604f0af4d0b17ed12a9bc084c9a)
  - 修改了徽章类型的描述，新增了 `createTime` 和 `permalink` 字段，并为版权信息添加了更详细的作者信息结构。
  - 更新了 `collections.ts` 文件中的文档仓库配置，启用了 `changelog` 功能，并根据生产环境配置了 `git` 插件。
  - 调整了 `guide-sidebar.json` 文件中的侧边栏配置，更新了链接和文本信息。
  - 移除了 `navbar.ts` 中不必要的空行。
  - 更新了 `plume.config.ts` 文件中的社交配置，修改了 GitHub 链接。
  - 新增了 `nodemon.json` 文件，用于监视文件变化并自动重启开发服务器。
  - 更新了 `package.json` 文件，新增了 `nodemon` 依赖和开发命令。
  - 更新了 `pnpm-lock.yaml` 文件，添加了 `nodemon` 和相关依赖的版本信息及其配置。
  - 在多个地方更新了 `debug` 的依赖，使其兼容 `supports-color@5.5.0`。
  - 添加了多个新依赖及其版本信息到 `pnpm-lock.yaml` 文件中，包括 `anymatch`, `binary-extensions`, `brace-expansion` 等。
  - 更新了 `snapshots` 中多个依赖的版本信息及其依赖关系，确保兼容性。

## 2026-07-17

- **refactor(guide-sidebar): 将 badge 对象拆分为 badge_type 和 badge_text 字符串** [5a48e15](https://github.com/Nachceko/yeizelnylo-data-center/commit/5a48e1587c66fcaeef0d5b7ead65d5bd53069ee6)
  - beta-v0.0.6
  - 将 badge 字段从一个对象拆分为两个独立的字符串字段 badge_type 和 badge_text，以便于配置和使用。
  - 修改了 badge 字段的配置方式，使用 badge_type 字段指定徽章的类型，默认值为 "info"，并添加了描述。
  - 修改了 badge 字段的配置方式，使用 badge_text 字段指定徽章的文本内容，并添加了描述。
  - 更新了 guide-sidebar.ts 文件中对 badge 字段的处理逻辑，以便从拆分后的字段重新构建 badge 对象。
  - Closes #123

- **docs: 优化 .pages.yml 文件中的选项格式** [ad62e1e](https://github.com/Nachceko/yeizelnylo-data-center/commit/ad62e1e56f9bddef675e418b1415a032c60124f4)
  - beta-v0.0.5
  - 简化了 .pages.yml 文件中 select 类型选项的格式，去掉了不必要的 value 和 label 重复定义。
  - 将选项从 `value: info label: 信息` 简化为 `info`
  - 同样简化了其他选项 warning、danger 和 success 的格式
  - 这些更改使得配置文件更加简洁易读。

- **🐞 fix(.pages.yml): 修复徽章类型无法选择** [53ad68c](https://github.com/Nachceko/yeizelnylo-data-center/commit/53ad68c79a316cf153ad0fb9dcf2df8347b80486)

- **🐞 fix(guide-sidebar.json，.pages.yml，guide-sidebar.ts): beta-v0.0.3** [5411bd0](https://github.com/Nachceko/yeizelnylo-data-center/commit/5411bd06a1803adf360ee96aa04aed4f97803d5c)
  - 修复PagesCMS 不支持根级别为数组的 JSON 文件，需要对象结构。

- **🦄 refactor: 更改了部分配置文件-betav0.0.2** [5bd353b](https://github.com/Nachceko/yeizelnylo-data-center/commit/5bd353b2a5a2e4d539cddc178ad0d70f2a15ea9e)

## ---END---

- **🎉 init: 文档beta-v0.0.1测试版本** [58393b7](https://github.com/Nachceko/yeizelnylo-data-center/commit/58393b701bb51627e3cfa41f05b45d4f0d612a1c)
  - 2026-07-17 18:54:43 +0800

