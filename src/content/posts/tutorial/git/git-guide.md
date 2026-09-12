---
title: Git 使用指南
published: 2026-08-17
pinned: false
description: 本指南将介绍 Git 版本管理的基本使用方法。包括首次上传项目到 Git 的流程、后续代码开发流程、本地仓库同步至新仓库的流程、提升 Git Clone 的速度、为仓库添加 License 等。
# image: ./Git-Icon.png
tags: [Git, 教程, 指南, 教程]
category: Git 指南
slug: tutorial-git-guide
series: "Git 指南"
seriesOrder: 1
---

# 首次上传项目到Git

> [!NOTE] 温馨提示
> 转载请标注来源哦~~

> 以下步骤适用于 GitHub 和 Gitee，以 Gitee，以 为例

## 步骤1：创建 Gitee 远程仓库

1. 登录 Gitee 后，点击右上角「+」号，选择「新建仓库」；
2. 填写仓库基础信息：
   - 仓库名称：建议与本地项目名称一致（如“student-manage-system”），便于识别；
   - 仓库介绍：简要说明项目用途（如“学生信息管理系统前端代码”）；
   - 仓库类型：个人项目选“私有”，开源项目选“公有”；
   - 其他选项：默认勾选“初始化 README 文件”（便于后续同步），点击「创建」完成。
3. 仓库创建后，复制页面中的「HTTPS 链接」（如 `https://gitee.com/your-username/your-project-name.git`），后续需用该链接关联本地代码。

## 步骤2：打开本地项目的 Git 命令行

1. 找到本地代码所在的文件夹（如“D:\projects\student-manage-system”）；
2. 在文件夹空白处右键，选择「Git Bash Here」（Windows 系统）或通过终端进入该文件夹（macOS/Linux 系统），打开 Git 命令行窗口。

> 如果已安装 Git 但是没有 Git Bash Here 选项，可以通过 Git 的安装包中自带的 Git Bash 来使用 Git 命令行。也可以根据这个博客进行设置：[右键添加git bash here并增加图标](https://blog.csdn.net/qq_41019529/article/details/110139830)

## 步骤3：配置 Git 用户名和邮箱（首次使用需配置）

在命令行中输入以下 2 条命令，完成身份配置（替换为你的 Gitee 用户名和邮箱）：

```bash
git config --global user.name "你的 Gitee 用户名"
git config --global user.email "你的 Gitee 绑定邮箱"
```

- 配置后可输入以下命令验证是否成功：

  ```bash
  git config user.name  # 显示用户名即成功
  git config user.email # 显示邮箱即成功
  ```

## 步骤4：初始化本地仓库

在命令行中输入以下命令，将当前文件夹初始化为 Git 可管理的本地仓库（初始化后文件夹会新增隐藏的“.git”文件夹，无需手动修改）：

```bash
git init
```

- 出现“Initialized empty Git repository in ...”提示，说明初始化成功。

## 步骤5：将本地代码添加到暂存区

输入以下命令，将文件夹内所有文件（包括子文件夹）添加到 Git 暂存区，准备后续提交：

```bash
git add .
```

- 注意命令中的“.”代表“当前文件夹下所有文件”，若只需添加单个文件，可将“.”替换为文件名（如 `git add index.html`）。

## 步骤6：提交代码到本地仓库

输入以下命令，将暂存区的代码提交到本地仓库，并添加提交说明（说明需简洁明确，方便后续追溯修改记录）：

```bash
git commit -m "首次提交：完成学生管理系统登录页面开发"
```

- 出现类似“1 file changed, 10 insertions(+)”的提示，说明提交成功。

## 步骤7：关联本地仓库与 Gitee 远程仓库

输入以下命令，将本地仓库与步骤1中复制的 Gitee 远程仓库链接关联（替换命令中的“远程仓库HTTPS链接”为你实际复制的链接）：

```bash
git remote add origin 远程仓库HTTPS链接
```

- 若出现“fatal: remote origin already exists”错误，说明已关联过仓库，可先输入 `git remote rm origin` 删除旧关联，再重新执行上述命令。

## 步骤8：同步远程仓库文件（关键！避免冲突）

若 Gitee 远程仓库已存在文件（如 README.md），需先同步远程文件到本地，避免后续推送时出现冲突：

```bash
git pull --rebase origin master
```

- 若远程仓库为空（未勾选“初始化 README 文件”），可跳过此步骤；
- 出现“Already up to date”提示，说明本地与远程文件已同步。

## 步骤9：推送本地代码到 Gitee 远程仓库

输入以下命令，将本地仓库的代码推送到 Gitee 远程仓库：

```bash
git push origin master
```

- 首次推送会弹出登录窗口，输入你的 Gitee 用户名和密码（或使用 Gitee 令牌登录，令牌需在 Gitee 「设置-安全设置-私人令牌」中创建）；
- 出现“100% (3/3), done.”提示，说明推送成功。


---

# 后续开发代码更新

## 推荐的分支模型

```
master (v1.0) ────────────────●───────────────●──→ （生产环境）
                              ↑               ↑
develop ──●────●────●─────────●────●────●────●──→ （开发集成）
          ↑    ↑    ↑         ↑
        featA featB hotfix   release
```

| 分支              | 用途                       | 是否可直接推送         |
| :---------------- | :------------------------- | :--------------------- |
| `master` / `main` | **生产发布**，永远稳定     | ❌ 不要直接开发         |
| `develop`         | **日常开发集成**，最新功能 | ✅ 可在此开发（小项目） |
| `feature/login`   | **具体功能开发**（大项目） | ✅ 每人一个分支         |

> 💡 对于**个人小项目**，用 `master` + `develop` 双分支足够；
> 对于**团队项目**，建议每人开 `feature/*` 分支。

## ✅ 你的开发流程应该这样

### 第一次初始化

```bash
# 1. 克隆仓库（如果本地没有代码）
git clone https://gitee.com/your-usernmae/your-project-name.git
cd your-project-name

# 2. 创建 develop 分支（如果远程没有）
git checkout -b develop

# 3. 推送到 Gitee
git push -u origin develop
```

### 日常开发

```bash
# 1. 切换到 develop
git checkout develop

# 2. 拉取最新代码（重要！个人项目可省略）
git pull origin develop

# 3. 在 IDE 中开发...

# 4. 提交并推送
git add .
git commit -m "例如 完成用户登录接口"
git push origin develop
```

### 发布到 master（当 develop 稳定时）

```bash
git checkout master
git pull origin master
git merge develop          # 或使用 --no-ff 保留合并记录
git push origin master
```


---

# 已有本地Git仓库 同步到新仓库

```bash
# 1. 查看当前项目所有已配置的远程仓库及其地址
git remote -v

# 2. 将名为 origin 的远程仓库重命名为 github-origin
git remote rename origin github-origin

# 3. 添加一个新的远程仓库，并将其命名为 origin
# 可以和第四步合并为 git remote add new-origin https://xxx.git
git remote add origin https://xxx.git

# 4. 将刚刚添加的、名为 origin 的远程仓库（即 GitCode 仓库）重命名为 new-origin
git remote rename origin new-origin

# 5. 将本地所有分支的代码推送到名为 new-origin 的远程仓库
git push -u new-origin --all

# 6. 将本地所有的标签（tags）推送到名为 new-origin 的远程仓库
git push -u new-origin --tag
```


---

# 提升挂梯子后 Git Clone 的速度

要解决这个问题，需要让 Git 明确使用本地代理端口。假设你的代理监听在 *127.0.0.1:10809*（HTTP）或 *127.0.0.1:10808*（SOCKS5），可以这样配置：(我是127.0.0.1:7897)

```bash
# HTTP 代理
git config --global http.proxy http://127.0.0.1:10809
git config --global https.proxy http://127.0.0.1:10809
# SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:10808
git config --global https.proxy socks5://127.0.0.1:10808
# 仅对 GitHub 启用 SOCKS5 代理（推荐）
git config --global http.https://github.com.proxy socks5://127.0.0.1:7897
```

这样 Git 的网络请求会通过你的梯子端口，从而显著提升克隆速度。

配置完成后，可用以下命令验证：

```bash
git config --list
```

如果不再需要代理，可以取消：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

这种方法的核心是**让 Git 与浏览器一样走代理通道**，避免直连国外服务器的网络瓶颈。正确配置后，*git clone* 的速度通常会有明显提升。


---

# 如何为已存在的仓库添加 License

为已存在的 GitHub 仓库添加 License（开源协议）非常简单，你可以直接在 GitHub 网页端完成操作。以下是具体的步骤：

## 方法1：网页端添加步骤

1. **进入仓库主页**：在 GitHub 上打开你想要添加协议的仓库页面。
2. **创建新文件**：在文件列表上方，点击 **“Add file”** 下拉菜单，然后选择 **“Create new file”**。
3. **输入文件名**：在文件名字段中，输入 `LICENSE` 或 `LICENSE.md`（建议全部大写）。
4. **选择协议模板**：输入文件名后，下方会出现一个 **“Choose a license template”** 按钮，点击它。
5. **选择并配置协议**：在弹出的列表中选择合适的协议（如 MIT、Apache 2.0 等）。部分协议需要你填写当前年份 `[year]` 和你的名字或组织名 `[fullname]`。
6. **提交更改**：点击 **“Review and submit”**（查看并提交），在提交信息框中输入简短的说明（如 `Add MIT License`），最后点击 **“Commit changes”** 即可。

## 方法2：本地添加方法

如果你习惯在本地开发，也可以直接在本地仓库的根目录下新建一个名为 `LICENSE` 的文件，将协议全文粘贴进去，然后像平时一样通过 `git add`、`git commit` 和 `git push` 推送到 GitHub 即可。