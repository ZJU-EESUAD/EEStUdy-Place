## 提交commit 格式

* feat: 新功能
* fix: 修复 bug
* docs: 仅修改了文档
* style: 修改代码格式（空格、分号等，不影响代码逻辑）
* refactor: 代码重构（既不是修 bug，也不是加功能）
* perf: 性能优化
* test: 增加或修改测试用例
* chore: 构建过程或辅助工具的变动（如更改配置文件）

# EEStUdy-Place网站维护文档

<center>Update Date: 2025.9.28</center>

## 以Termial命令行的方式登录云端服务器

#### 连接远程服务器

```
ssh root@101.201.46.135
```

用户名【老大】：root

服务器：101.201.46.135

#### 密码-root的密码

```
Zjueesu123
```

## 或者选择可视化的方式打开云端服务器

下载WinSCP或者其他软件：[WinSCP :: Official Site :: Download](https://winscp.net/eng/download.php)

## 初始化云端git账户

#### 第一步：克隆git到本地（有点慢，所以我直接发文件夹给ch了，应该直接解压缩也可以）

```
git clone git@101.201.46.135:/www/eestudy-place.git
```

#### 第二步：正常维护git的方式维护即可

```
>>> git pull
git@101.201.46.135's password: 
```

==会要求git用户的密码：==

```
git@eestudyplace
```



## 维护云端git

主分支：main

开发分支（作为开发过程中的分支）：dev

在每阶段开发完毕后，将dev分支与master分支合并，然后网站进入下一个版本（更新）

#### <span style="color:red">!!!一定要做!!!</span>   第一步：从云端dev分支上拉取（PULL）更新

首先确保在dev分支：

```
git checkout dev
```

拉取dev的最新更新：

```
git pull origin dev
```

#### 第二步：完成一个更新后提交（Commit）

```
git commit -m "<类型>: <简要说明>"
```

后面“”内的内容是备注，可以是：

```
feat(auth): 添加用户登录接口
fix(ui): 修复按钮错位问题
docs: 补充接口说明文档
refactor: 重构登录流程
test: 添加 token 验证测试
chore: 升级依赖包
```

#### 第三步：将更新提交（PUSH）到云端的dev分支上

```
git push origin dev
```

#### 第四步：dev分支一个阶段开发完毕，将其合并到master分支

切换到主分支

```
git checkout main
```

合并dev分支到master

```
git merge dev
```

云端的master同步更改

```
git push origin main
```

由于设置了git的自动化，当更改分支master时，会自动更新[^自动化mkdocs更新网站代码]网站，因此会出现下面这些内容：

```
>>> git push origin main
git@101.201.46.135's password: 
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: === post-receive hook started ===
remote: main branch was updated.
remote: Git checkout successful.
remote: INFO    -  Cleaning site directory
remote: INFO    -  Building documentation to directory: /www/eestudy-place/site
remote: INFO    -  The following pages exist in the docs directory, but are not included in the "nav" configuration:
remote:   - 涓撲笟蹇呬慨璇?鑷姩鍖?宓屽叆寮忕郴缁?宓屽叆寮忕郴缁?md
remote:   - 閫氳瘑蹇呬慨璇?澶у鐗╃悊/澶у鐗╃悊.md
remote: INFO    -  Documentation built in 22.40 seconds
remote: MkDocs build successful.
remote: === post-receive hook finished ===
To 101.201.46.135:/www/eestudy-place.git
   e84edc0..ace52c7  main -> main
```



[^自动化mkdocs更新网站代码]:在/www/eestudy-place.git/hooks这个文件夹下面的`post-receive`文件内



