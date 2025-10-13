# 🧭 项目总体目标

建设面向电气工程学院学生的学习经验分享与资源网站，包含笔记、实验资料、学习经验分享、常见问题、下载区等内容。

## 📂 一、基础建设

### 1. 主站
* 域名: `eestudy.com.cn` 与 `www.eestudy-place.com`
* 技术: `mkdocs` 部署

### 2. 资源站
* 域名: `file.eestudy-place.com`
* 功能:
  * 课件、报告模板、程序文件等上传下载
  * 课程分类
  * 共享链接
* 实现: `FileBrowser` + `Nginx`
* 已完成:
  * [x] 二级域名挂载
  * [x] Nginx 配置优化
  * [x] 权限设置

### 3. CDN优化
* [ ] 阿里云DCDN/Cloudflare加速
* [ ] 资源分离域名
* [ ] 缓存策略
* [ ] HTTPS配置

### 4. 域名规划
* 结构:
  ```
  eestudy-place.com        → 主域名
  www.eestudy-place.com    → 主站
  file.eestudy-place.com   → 资源站
  cdn.eestudy-place.com    → CDN
  api.eestudy-place.com    → API服务
  ```
* 待办:
  * [ ] SSL证书管理
  * [ ] CORS配置

### 5. 扩展功能
* 从数学之韵网站和图灵网站上学习一些网站建设的技巧
* [ ] 图床
* mkdocs插件:
  * [ ] git-revision-date-localized
  * [x] material
  * [ ] material-extensions
  * [ ] pdf
* [x] GitHub Actions自动部署
* [x] CI/CD脚本

## 🧠 二、内容建设

### 1. 内容整理
* [ ] 课程按照“课程号+名称”分类
* [ ] CC98资料整合，按照课程整理CC98链接
* [ ] 文件夹名称改成英文（可选）

### 2. 协作规范
* [x] PR提交教程
* [x] issue 和pr 模版
* [ ] 目录结构规范

## 🌐 三、运营推广
* [ ] 友情链接：增加友情链接
* [ ] 学期资料更新
* [ ] 学习经验征集
