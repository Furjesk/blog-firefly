---
title: Python 面向对象3:模块和包
published: 2022-06-04
pinned: false
description: 通过本章的学习，你将学习到 Python 中模块和包的定义和使用。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 进阶, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-oo3
series: "Python 教程:从入门到精通"
seriesOrder: 6
---

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
>
> 通过本章的学习，你将学习到 Python 中模块和包的定义和使用。文章内容来自站主大学时期的课程笔记。

# 面向对象3:模块和包

## 模块

模块（module）是 Python 程序架构的一个核心概念
模块化，模块化指将一个完整的程序分解为一个一个小的模块
通过将模块组合，来搭建出一个完整的程序
不采用模块化，统一将所有的代码编写到一个文件中
采用模块化，将程序分别编写到多个文件中
模块化的有点：

1. 方便开发
2. 方便维护
3. 模块可以复用！

在Python中一个py文件就是一个模块，要想创建模块，实际上就是创建一个python文件
注意：模块名要符号标识符的规范

在一个模块中引入外部模块

```python
import 模块名 （模块名，就是python文件的名字，注意不要py）

import 模块名 as 模块别名
 
```

  - 可以引入同一个模块多次，但是**模块的实例只会创建一个**
  - import可以在程序的任意位置调用，但是一般情况下，import语句都会统一写在程序的开头
  - 在每一个模块内部都有一个```__name__```属性，通过这个属性可以获取到模块的名字
  - ```__name__```属性值为 ```__main__```的模块是主模块，一个程序中只会有一个主模块
    主模块就是我们直接通过 python 执行的模块

```
import test_module as test

# print(test.__name__)
print(__name__)
```



```python
# 可以在模块中定义变量，在模块中定义的变量，在引入模块后，就可以直接使用了
a = 10
b = 20

# 添加了_的变量，只能在模块内部访问，在通过import * 引入时，不会引入_开头的变量
_c = 30

# 可以在模块中定义函数，同样可以通过模块访问到
def test():
    print('test')

def test2():
    print('test2')

# 也可以定义类    
class Person:
    def __init__(self):
        self.name = '孙悟空'

# 编写测试代码，这部分代码，只要当当前文件作为主模块的时候才需要执行
#   而当模块被其他模块引入时，不需要执行的，此时我们就必须要检查当前模块是否是主模块  
if __name__ == '__main__':
    test()
    test2()
    p = Person()
    print(p.name)
```



#### from...import 导入

- 如果希望 **从某一个模块** 中，导入 **部分** 工具，就可以使用 `from ... import` 的方式
- `import 模块名` 是 **一次性** 把模块中 **所有工具全部导入**，并且通过 **模块名/别名** 访问

```python
# 从 模块 导入 某一个工具
from 模块名1 import 工具名
```

- 导入之后
  - **不需要** 通过 `模块名.`
  - 可以直接使用 **模块提供的工具** —— **全局变量**、**函数**、**类**

**注意**

> 如果 **两个模块**，存在 **同名的函数**，那么 **后导入模块的函数**，会 **覆盖掉先导入的函数**

- 开发时 `import` 代码应该统一写在 **代码的顶部**，更容易及时发现冲突
- 一旦发现冲突，可以使用 `as` 关键字 **给其中一个工具起一个别名**

##### from...import *（知道）

```python
# 从 模块 导入 所有工具
from 模块名1 import *
```

**注意**

> 这种方式不推荐使用，因为函数重名并没有任何的提示，出现问题不好排查

### 模块的搜索顺序[扩展]

`Python` 的解释器在 **导入模块** 时，会：

1. 搜索 **当前目录** 指定模块名的文件，**如果有就直接导入**
2. 如果没有，再搜索 **系统目录**

> 在开发时，给文件起名，不要和 **系统的模块文件** **重名**

`Python` 中每一个模块都有一个内置属性 `__file__` 可以 **查看模块** 的 **完整路径**

**示例**

```python
import random

# 生成一个 0～10 的数字
rand = random.randint(0, 10)

print(rand)
```

> 注意：如果当前目录下，存在一个 `random.py` 的文件，程序就无法正常执行了！

- 这个时候，`Python` 的解释器会 **加载当前目录** 下的 `random.py` 而不会加载 **系统的** `random` 模块



### 原则 —— 每一个文件都应该是可以被导入的

- 一个 **独立的 `Python` 文件** 就是一个 **模块**
- 在导入文件时，文件中 **所有没有任何缩进的代码** 都会被执行一遍！

**实际开发场景**

- 在实际开发中，每一个模块都是独立开发的，大多都有专人负责
- 开发人员通常会在模块下方增加一些测试代码
  - 仅在模块内使用，而被导入到其他文件中不需要执行



## 包（Package）

### 概念

- **包** 是一个 **包含多个模块** 的 **特殊目录**
- 目录下有一个 **特殊的文件** `__init__.py`
- 包名的 **命名方式** 和变量名一致，**小写字母** + `_`

**好处**

- 使用 `import 包名` 可以一次性导入 **包** 中 **所有的模块**

```
包 Package
包也是一个模块
当我们模块中代码过多时，或者一个模块需要被分解为多个模块时，这时就需要使用到包
普通的模块就是一个py文件，而包是一个文件夹
  包中必须要一个一个 __init__.py 这个文件，这个文件中可以包含有包中的主要内容
from hello import a , b

print(a.c)
print(b.d)

__pycache__ 是模块的缓存文件
py代码在执行前，需要被解析器先转换为机器码，然后再执行
  所以我们在使用模块（包）时，也需要将模块的代码先转换为机器码然后再交由计算机执行
  而为了提高程序运行的性能，python会在编译过一次以后，将代码保存到一个缓存文件中
  这样在下次加载这个模块（包）时，就可以不再重新编译而是直接加载缓存中编译好的代码即可
```



### python的标准库

```python
# 开箱即用
# 为了实现开箱即用的思想，Python中为我们提供了一个模块的标准库
# 在这个标准库中，有很多很强大的模块我们可以直接使用，
#   并且标准库会随Python的安装一同安装
# sys模块，它里面提供了一些变量和函数，使我们可以获取到Python解析器的信息
#   或者通过函数来操作Python解析器
# 引入sys模块
import sys

# pprint 模块它给我们提供了一个方法 pprint() 该方法可以用来对打印的数据做简单的格式化
import pprint

# sys.argv
# 获取执行代码时，命令行中所包含的参数
# 该属性是一个列表，列表中保存了当前命令的所有参数
# print(sys.argv)

# sys.modules
# 获取当前程序中引入的所有模块
# modules是一个字典，字典的key是模块的名字，字典的value是模块对象
# pprint.pprint(sys.modules)

# sys.path
# 他是一个列表，列表中保存的是模块的搜索路径
# ['C:\\Users\\lilichao\\Desktop\\resource\\course\\lesson_06\\code',
# 'C:\\dev\\python\\python36\\python36.zip',
# 'C:\\dev\\python\\python36\\DLLs',
# 'C:\\dev\\python\\python36\\lib',
# 'C:\\dev\\python\\python36',
# 'C:\\dev\\python\\python36\\lib\\site-packages']
# pprint.pprint(sys.path)

# sys.platform
# 表示当前Python运行的平台
# print(sys.platform)

# sys.exit()
# 函数用来退出程序
# sys.exit('程序出现异常，结束！')
# print('hello')

# os 模块让我们可以对操作系统进行访问
import os

# os.environ
# 通过这个属性可以获取到系统的环境变量
# pprint.pprint(os.environ['path'])

# os.system()
# 可以用来执行操作系统的名字
# os.system('dir')
os.system('notepad')
```





### 案例演练

1. 新建一个 `hm_message` 的 **包**
2. 在目录下，新建两个文件 `send_message` 和 `receive_message`
3. 在 `send_message` 文件中定义一个 `send` 函数
4. 在 `receive_message` 文件中定义一个 `receive` 函数
5. 在外部直接导入 `hm_message` 的包

### `__init__.py`

- 要在外界使用 **包** 中的模块，需要在 `__init__.py` 中指定 **对外界提供的模块列表**

```python
# 从 当前目录 导入 模块列表
from . import send_message
from . import receive_message
```



## 发布模块（知道）

- 如果希望自己开发的模块，**分享** 给其他人，可以按照以下步骤操作

### 制作发布压缩包步骤

#### 1) 创建 setup.py

- `setup.py` 的文件

```python
from distutils.core import setup

setup(name="hm_message",  # 包名
      version="1.0",  # 版本
      description="发送和接收消息模块",  # 描述信息
      long_description="完整的发送和接收消息模块",  # 完整描述信息
      author="notreal",  # 作者
      author_email="notrealxu@gmail.com",  # 作者邮箱
      url="",  # 主页
      py_modules=["hm_message.send_message",
                  "hm_message.receive_message"])
```



#### 2) 构建模块

```bash
$ python3 setup.py build
```

#### 3) 生成发布压缩包

```bash
$ python3 setup.py sdist
```

> 注意：要制作哪个版本的模块，就使用哪个版本的解释器执行！

### 安装模块

```bash
$ tar -zxvf hm_message-1.0.tar.gz 

$ sudo python3 setup.py install
```

**卸载模块**

直接从安装目录下，把安装模块的 **目录** 删除就可以

```python
$ cd /usr/local/lib/python3.5/dist-packages/
$ sudo rm -r hm_message*
```

### pip 安装第三方模块

第三方模块通常是指由知名的第三方团队开发的并且被程序员广泛使用的Python包 / 模块，例如 `pygame` 就是一套非常成熟的 **游戏开发模块**

`pip` 是一个现代的，通用的 `Python` 包管理工具提供了对 `Python` 包的查找、下载、安装、卸载等功能

安装和卸载命令如下：

```bash
# 将模块安装到 Python 2.x 环境
$ sudo pip install pygame
$ sudo pip uninstall pygame

# 将模块安装到 Python 3.x 环境
$ sudo pip3 install pygame
$ sudo pip3 uninstall pygame
```

