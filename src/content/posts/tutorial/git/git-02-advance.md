---
title: Git 进阶技巧
published: 2026-09-20
pinned: false
description: 本指南将介绍 Git 版本管理的进阶技巧。包括临时保存当前工作现场、追加提交等。
# image: ./Git-Icon.png
tags: [Git, 教程, 指南, 教程]
category: Git 指南
slug: tutorial-git-advance
series: "Git 指南"
seriesOrder: 2
---


> [!NOTE] 温馨提示
> 转载请标注来源哦~~

> 以下步骤适用于 GitHub 和 Gitee

# 临时保存当前工作现场（Stash）

## 保存工作现场

1、保存当前修改（默认只保存已跟踪文件）

```bash
git stash
```

2、保存并添加描述，方便后续识别

```bash
git stash save "正在开发用户登录模块"
```

3、保存时包含未跟踪的新文件

```bash
git stash -u
```

## 查看暂存记录

```bash
git stash list
```

## 恢复记录

1、恢复最近一次暂存并删除记录（推荐）

```bash
git stash pop
```

2、恢复指定 stash 并删除记录

```bash
git stash pop stash@{1}
```

3、恢复但不删除记录

```bash
git stash apply
```

4、恢复指定 stash，但保留记录

```bash
git stash apply stash@{1}
```

# 追加提交

```bash
git commit --amend

git commit --amend -m "新的提交信息"
```

执行命令后会弹出文件编辑页面（如果是IDE，会打开一个文件），如果不需要修改提交信息，直接关闭即可（一般都是直接关闭）。
