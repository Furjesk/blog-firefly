---
title: Python 文件
published: 2022-06-06
pinned: false
description: 通过本章的学习，你将学习到 Python 中文件的打开、关闭、读写等操作。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 进阶, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-file
series: "Python 教程:从入门到精通"
seriesOrder: 8
---

# 文件

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
>
> 通过本章的学习，你将学习到 Python 中文件的打开、关闭、读写等操作。文章内容来自站主大学时期的课程笔记。

## 打开文件/创建文件/关闭文件

在python，使用open函数，可以打开一个已经存在的文件，或者创建一个新文件

```python
# open(文件路径，访问模式)
f = open('test.txt', 'w')
f.close()
```

文件路径：绝对路径、相对路径

访问模式：





| 访问模式 | 说明                                               |
| -------- | -------------------------------------------------- |
| ‘r’      | 只读打开（默认）                                   |
| ‘w’      | 写入打开，首先截断文件（覆盖），文件不存在，则创建 |
| ‘x’      | 单独创建打开，如果文件已存在则失败                 |
| ‘a’      | 写入打开，如果文件存在则添加到尾部（append）       |
| ‘b’      | 二进制模式                                         |
| ‘t’      | 文本模式（默认）                                   |
| ‘+’      | 更新方式（读、写）打开磁盘文件                     |
|          |                                                    |



完整api

```python
open(file, mode='r', buffering=-1, encoding_=None, errors=None, newline=None, closefd=True, opener=None)
```

- buffering

buffering是一个整数可选项，用于设置缓冲策略，传入0关闭缓冲（仅允许在二进制模式下），1选择行缓冲（尽用于文本模式），大于1的整数用于指示某个固定大小的块缓冲区的字节大小。当没有给定buffering参数时，默认缓冲策略运行如下：

二进制文件在固定大小的块内缓冲，缓冲区大小的选择，会使用启发式的方法来尝试决定底层设备的“块尺寸“，并退回至io.DEFAULT_BUFFER_SIZE。在很多系统上，缓冲区通常的字长是4096或8192。
”交互式“文本文件（对于isatty()返回True的文件）使用行缓冲，其他文本文件使用的策略与上面二进制文件的相同

- encoding

encoding是用于编码或解码文件的编码名称。该参数应仅用于文本模式，默认的编码是平台依赖的（无论locale.getpreferredencoding()返回什么），但所有Python支持的文本编码都可使用，支持的编码列表参考codecs模块。



## 文件的读写

- 使用write()可以完成向文件写入数据

```python
# 如果文件不存在，那么创建；如果存在那么就先清空，然后写入数据
f = open('test.txt', 'w')
f.write('hello world, i am here!\n' * 5)
f.close()
```



- 读数据(read)

使用read(num)可以从文件中读取数据，num表示要从文件中读取的数据的长度（单位是字节），如果**没有传入**
**num**，那么就表示**读取文件中所有的数据**

```python
f = open('test.txt', 'r')
content = f.read(5) # 最多读取5个数据
print(content)
print("‐"*30) # 分割线，用来测试
content = f.read() # 从上次读取的位置继续读取剩下的所有的数据
print(content)
f.close() # 关闭文件
```

正规写法

```python
try:
    f = open('test.txt', 'r')
    content = f.read() # 从上次读取的位置继续读取剩下的所有的数据
	print(content)
finally:
	if f:
		f.close()
```



**with open**

```python
with open('test.txt', 'r') as f:
    print(f.read())
```

可以不用close 类似java try()



   



- 读数据（readline）

readline只用来读取一行数据。

```python
f = open('test.txt', 'r')
content = f.readline()
print("1:%s" % content)
content = f.readline()
print("2:%s" % content)
f.close()
```

常用循环读取

```python
file = open("test.txt")
while True:
    text = file.readline()
    # 判断是否读取到内容
    if not text:
        break
    print(text)
file.close()
```



- 读数据（readlines)

readlines可以按照行的方式把整个文件中的内容进行一次性读取，并且返回的是一个列表，其中**每一行为列表的**
**一个元素**

```python
f = open('test.txt', 'r')
content = f.readlines()
print(type(content))
for temp in content:
print(temp)
f.close()
```

**跳过第一行内容(字段名)**

```python
with open(file_path,'r',encoding='utf-8-sig') as f
    next(f)
    all_line_list = f.readlines()
```

**读写非utf-8编码文件，并忽略错误**

```python
with open(file_path,'r',encoding='gbk',errors='ignore') as f
    all_line_list = f.readlines()
```

**读取二进制文件**

```python
with open(file_path,'rb') as f:
	f.read()
```





- 文件copy

```python
# 1. 打开
file_read = open("test.txt")
file_write = open("test-副本.txt", "w")

# 2. 读、写
text = file_read.read()
file_write.write(text)

# 3. 关闭
file_read.close()
file_write.close()
```



- 大文件copy

调用read()会一次性读取文件的全部内容，如果文件有10G，内存就爆了。
要保险起见，可以反复调用read(size)方法，每次最多读取size个字节的内容。例如，read(1024) 每次读取1024个字节的数据内容
调用**readline()**可以每次读取一行内容，调用**readlines()**一次读取所有内容并按行返回list。因此，要根据需要决定怎么调用。
如果文件很小，read()一次性读取最方便；如果**不能确定文件大小，反复调用read(size)比较保险**；如果是**配置文件，调用readlines()**最方便：

```python
# 1. 打开
file_read = open("test.txt")
file_write = open("test-副本.txt", "w")

# 2. 读、写
while True:
    # 读取一行内容
    text = file_read.readline()
    # 判断是否读取到内容
    if not text:
        break

    file_write.write(text)

# 3. 关闭
file_read.close()
file_write.close()

```



- 序列化和反序列化

通过文件操作，我们可以将字符串写入到一个本地文件。但是，如果是一个**对象**(例如列表、字典、元组等)，就**无**
**法直接写入到一个文件**里，需要对这个**对象进行序列化**，然后才能写入到文件里。
设计一套协议，按照某种规则，把内存中的数据转换为字节序列，保存到文件，这就是序列化，反之，从文件的字
节序列恢复到内存中，就是反序列化。
对象=>字节序列 => 序列化
字节序列=>对象 =>反序列化

Python中提供了JSON这个模块用来实现数据的序列化和反序列化。

JSON提供了**dumps**和**dump**方法，将一个对象进行**序列化**

```python
import json
file = open('names.txt', 'w')
names = ['zhangsan', 'lisi', 'wangwu', 'jerry', 'henry', 'merry', 'chris']
# file.write(names) 出错，不能直接将列表写入到文件里
# 可以调用 json的dumps方法，传入一个对象参数
result = json.dumps(names)
# dumps 方法得到的结果是一个字符串
print(type(result)) # <class 'str'>
# 可以将字符串写入到文件里
file.write(result)
file.close()
```

dump方法可以在将对象转换成为字符串的同时，指定一个文件对象，把转换后的字符串写入到这个文件里

```python
import json
file = open('names.txt', 'w')
names = ['zhangsan', 'lisi', 'wangwu', 'jerry', 'henry', 'merry', 'chris']
# dump方法可以接收一个文件参数，在将对象转换成为字符串的同时写入到文件里
json.dump(names, file)
file.close()
```

- 使用JSON实现反序列化

使用**loads**和**load**方法，可以将一个JSON**字符串反序列化**成为一个Python对象。
**loads**方法需要一个**字符串参数**，用来将一个字符串加载成为Python对象。

```python
import json
# 调用loads方法，传入一个字符串，可以将这个字符串加载成为Python对象
result = json.loads('["zhangsan", "lisi", "wangwu", "jerry", "henry", "merry", "chris"]')
print(type(result)) # <class 'list'>
```

**load**方法可以**传入一个文件对象**，用来将一个文件对象里的数据加载成为Python对象。

```python
import json
# 以可读方式打开一个文件
file = open('names.txt', 'r')
# 调用load方法，将文件里的内容加载成为一个Python对象
result = json.load(file)
print(result)
file.close()
```



## os 模块

`os`就是“operating system”的缩写，顾名思义，`os`模块提供的就是各种 Python 程序与操作系统进行交互的接口。通过使用`os`模块，一方面可以方便地与操作系统进行交互，另一方面页可以极大增强代码的可移植性。如果该模块中相关功能出错，会抛出`OSError`异常或其子类异常。

注意，如果是读写文件的话，建议使用内置函数`open()`；如果是路径相关的操作，建议使用`os`的子模块`os.path`；如果要逐行读取多个文件，建议使用`fileinput`模块；要创建临时文件或路径，建议使用`tempfile`模块；要进行更高级的文件和路径操作则应当使用`shutil`模块。

此外，导入`os`模块时还要小心一点，千万**不要**为了图调用省事儿而将`os`模块解包导入，即不要使用`from os import *`来导入`os`模块；否则`os.open()`将会覆盖内置函数`open()`，从而造成预料之外的错误。



### os.name

```python
import os
print(os.name)
```

查看`sys`模块中的`sys.platform`属性可以得到关于运行平台更详细的信息

### **os.environ**

`os.environ`属性可以返回环境相关的信息，主要是各类环境变量。返回值是一个映射（类似字典类型），具体的值为第一次导入`os`模块时的快照；其中的各个键值对，键是环境变量名，值则是环境变量对应的值。在第一次导入`os`模块之后，除非直接修改`os.environ`的值，否则该属性的值不再发生变化

```python
os.environ["HOMEPATH"]
```

### **os.walk()**

这个函数需要传入一个路径作为`top`参数，函数的作用是在以`top`为根节点的目录树中游走，对树中的每个目录生成一个由`(dirpath, dirnames, filenames)`三项组成的三元组。

```python
for item in os.walk("."):
	print(item)
```



### **os.listdir()**

“listdir”即“list directories”，列出（当前）目录下的全部路径（及文件）。该函数存在一个参数，用以指定要列出子目录的路径，默认为`“.”`，即“当前路径”。

```python
def get_filelists(file_dir='.'):
     list_directory = os.listdir(file_dir)
     filelists = []
     for directory in list_directory:
         # os.path 模块稍后会讲到
         if(os.path.isfile(directory)):
             filelists.append(directory)
     return filelists
```

