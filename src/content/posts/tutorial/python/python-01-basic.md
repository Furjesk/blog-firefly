---
title: Python 介绍和基本语法
published: 2022-05-30
pinned: false
description: 本文介绍 Python 语言，你将学习到 Python 的基本语法。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 基础, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-basic
series: "Python 教程:从入门到精通"
seriesOrder: 1
---

# Python

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Python 语言，你将学习到 Python 的基本语法。文章内容来自站主大学时期的课程笔记。

## 计算机语言

### 发展历程：

机器语言

符号语言（汇编）

 - 用符号来代替机器01。将符号语言 => 机器语言过程汇编，将机器语言 => 符号语言，反汇编

高级语言

​	开始说人话，和硬件结合的不是那么紧密，学起来也较简单C C++ Java javascript Python 



### 编译和解释

语言转换为机器语言的时间不一样编译型和解释型

编译： C 

​    在执行之前就会被编译成机器码    

​    优点：速度快，效率高

​    缺点：跨平台较差

解释型：python

java ? 刚出来的时候解释型，后来JIT ，半解释半编译

​    缺点：执行速度较慢



## Python的介绍

Python由荷兰数学和计算机科学研究学会的吉多·范罗苏姆 于1990 年代初设计，作为一门叫做ABC语言的替代品。设计出来给**非专业程序员**用的教学语言。

Python 蟒蛇 1991 第一个解释器诞生

Life is short you need Python. 人生苦短，你需要Python

优点：

1. 简单明了，学习曲线低，容易上手
2. 开源，跨平台
3. 第三方支持好，包多，功能多

缺点：

1. 执行效率稍低
2. 代码无法加密
3. 工程化相对较差，不够严谨，太灵活

适合做什么：

   WEB后端，网络爬虫，自动化运维，自动化测试，科学计算、数据分析、数据可视化、机器学习、量化交易

​    

## Python开发环境

所谓开发环境就是安装Python的解释器

解释器：

- CPython 官方，用C语言编写的解释器
- PyPy 用Python语言编写的解释器
- Jython 用Java编写的解释器
- IronPython 用.net写的解释器

推荐使用Anaconda来搭建开发环境，适合做科学计算的Python发行版

如果比较熟悉了以后推荐去掉图形界面 miniconda来做环境

镜像地址：https://mirrors.tuna.tsinghua.edu.cn/anaconda/

检验安装是否成功，请在cmd模式下输入 python 回车检查是否启动环境

**更改conda的源**

在Anaconda中配置一个新的Environment，然后启动prompt【防止下载的包什么的会影响冲突】

请在（新的environment）Anaconda的命令行中操作【配置镜像，下库快】

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --set show_channel_urls yes
```

> 注：
>
> 创建的环境在`D:\Program Files\Anaconda\envs\`
>
> 下面安装的Jupyter工具在`D:\Program Files\Anaconda\envs\learn`



### 开发工具 Jupyter Notebook

高德纳是算法和程序设计技术的先驱者，计算机排版系统TeX和字型设计系统METAFONT的发明者，他因这些成就和大量创造性的影响深远的著作而誉满全球，荣获1974年度的图灵奖 。爱因斯坦《相对论》 费曼《量子电动力学》

literate programming

编程从让计算机读懂，进化到让机器去理解我们的想法

IPython 交互性的shell



# 基本语法

1. Python严格区分大小写
2. 每一行都是一条语句，以**换行**结束
3. 规范建议每一行语句不要超过80个字符
4. 一条语句可以**分多行写**，但是每行结束要用**`\`**来结尾
5. **严格缩进**，Python中没有用{}或者单词来代表语句块，是用缩进来代表的，**4个空格**（tab也行）
6. Python的注释是用`#`，多行注释是三个单引号`'''`
7. 按tab补全，shift+回车只运行这一块代码，ctrl+回车运行这一块代码不会另起一块代码

```python
print('H\
ell\
o')

# print('H\
# ell\
# o')
print('Hello')
```



## 字面量和变量

字面量就是一个值，1，2，3，'Hello'

变量（variable）可以用来保存字面量，并且变量中的字面量是不定的

变量本身就是一个标识，但是会根据存的字面量不同而表示不同的意思



## 变量和标识符

```
java中
int i = 10;
必须要声明，类型要确定，或者类型推断，一个变量的存的类型是一定的

Python中使用变量，不需要声明，直接赋值
a = 10
所有变量一定要赋值后才可以使用
print(b)
NameError: name 'b' is not defined
```

命名规范（变量，类名，函数名）

1. 标识符可以含有`数字`，`字母`，`_`，但是不能用数字开头：`a_1` `_1a` `_a1` , 1_a（错）

2. 不能用关键字和保留字，也不建议用函数名
3. 一般用下划线分割单词或者用帕斯卡命名（驼峰法则）DoSomething do_something doSomething 



## 数据类型

### 数值

(整型、浮点型、布尔型、复数)

 - 整型：Python中的整数没有大小限制，可以无限大

   ​	a = 123_456_789 # 数字过长可以用下划线分割

   ```python
   a = 15
   b = 0b1111  # 2进制
   c = 0o17	# 8进制
   d = 0xF     # 16进制
   print(a)
   print(b)
   print(c)
   print(d)
   ```

   

 - 浮点型

   Python中所有的浮点数都是**float类型**，浮点型**无法保证精确度**

   ```python
   a = 0.1+0.2
   print(a)
   # 0.30000000000000004
   print(0.3 == 0.1 + 0.2) # False 浮点数计算用精确度达到一定范围来确定是否相等
   ```

   

 - 布尔型 True False 本质值(1,0)

   ```python
   # bool型本质是0，1，所以可以做整数运算
   a = False + 1
   print(a)
   print(a == True)
   # 1
   # True
   ```

   


- 复数



### 字符串

字符串的本质是一段不可变的序列

s = 'Hello'  # 用引号括起来，可以是**单引号**，也可以是**双引号**，**三引号**，必须配对使用

```python
s = '''床前明月光，     
疑似地上霜。
举头望明月，
低头思故乡。'''  # 排版格式会保留下来，三引号可以换行
print(s)
```

#### 转义字符

```
\ 做转义 和java一样
```

#### 格式化字符

%s 表示任意字符占位 

%d 表示整数占位

%f  表示浮点数占位

```python
s = 'Hello %s'%'Zhangsan'
s2 = 'Hello %s 你有%d元钱'%('Zhangsan',199)
s3 = 'Hello %s 你有%d元钱，还欠贷款%f元钱'%('Zhangsan',199,99999.99)
print(s)
print(s2)
print(s3)
# Hello Zhangsan
# Hello Zhangsan 你有199元钱
# Hello Zhangsan 你有199元钱，还欠贷款99999.990000元钱
```

占位可以**定长度**

```python
s4 = 'Hello %5.10s'%'Zhangsanmohanmodeali'
s5 = 'Hello %5.10s'%'Zh'# 字符串的长度在5-10个字符之间
print(s4)
print(s5)
# Hello Zhangsanmo
# Hello    Zh
s6 = '存款是%.2f'%12345.6789
print(s6)
# 存款是12345.68
```

用 **`f`** 和 **`{}`** 来配合**格式化** 

```python
name = '张三'
rq = 1
print(f'Hello {name}，{rq}是星期一')
# Hello 张三，1是星期一
```

用 **`+`** 号拼接，一定**只能拼接字符串**（java中可以将别的类型转成字符串，python不可以）

```python
print('Hello'+ ' Zhangsan')
# Hello Zhangsan
print('Hello'+' Zhangsan'+ 1)
# TypeError: can only concatenate str (not "int") to str
```

空值

```
None # 表示不存在
```



### 类型检查

type() 来检查类型

```python
print(type(1))
print(type(1.1))
print(type(True))
print(type('abc'))
print(type(None))
print(type(print))

<class 'int'>
<class 'float'>
<class 'bool'>
<class 'str'>
<class 'NoneType'>
<class 'builtin_function_or_method'>
```



### 类型转换

`int()`  `float()`  `bool()`  `str()` 四个函数来转换类型

字符串转的时候一定要是合法数字字符

bool()可以将任何类型转换为布尔值，所有代表非空的都会变成True

```python
a = 12345.6789
b = int(a)
print(b,type(b))
# 12345 <class 'int'> 直接取整，不四舍五入

c = '1234'
print(int(c))

c = '1234.5'
print(float(c))

# 字符串转的时候一定要是合法数字字符,下面的出错
# c = '1234.5'
# print(int(c))

print(bool('True'))  # True
print(bool('False')) # True
print(bool('false')) # True
print(bool(0))		 # False
print(bool(''))      # False
print(bool(None))    # False
print(bool('0'))     # True
```

对象类型....



## 运算符

### 算术运算符

```python
# + 加法，还可以拼接字符串 
# - 
# *  除了做乘法以外，还可以表示字符串重复次数
s = 'abc'
print(s*3)
# %
# /  除法，所有的结果总是浮点数
# // 整除
# ** 幂运算
a = 10
print(a**2)  # 100
print(a**0.5) # 3.1622776601683795
```



### 赋值运算符

```
+=  -=  
*=  除了数学的*=还可以表示字符串*=
/=
//=
%=
**= 
```

```python
s = 'abc'
s*=3
print(s)
# abcabcabc
```



### 关系运算符

```python
> >= < <= == !=  
is  is not 比较两个对象是不是同一个对象，实质是比较对象的id
也可以用来比较字符串，实质比的是字符串的unicode的编码大小（同java）

print(1 is 1)     # True警告
print(True is 1)  # False警告
print(1 == True)  # True
print(id(1),id(True))  # is 的本质是比较id
```



### 逻辑运算符

and 与 or 或  not 非  （Java：&& || !）

如果运算中出现非bool值，相当Python会对其做一个bool转换

```python
print(True and 2)  # 2  相当于 True
print(1 and 0)   # 0
```



### 三元运算符

相当于java中的 int i = 2>1?2:1;

```python
a = 10
b = 50
c = 80
max = a if a > b else b if b > c else c
print(max)
```

## 运算符优先级

| **             | 幂运算       |
| -------------- | ------------ |
| * / % //       | 乘除取模整除 |
| + -            | 加，减       |
| > >= < <=      | 比较运算符   |
| == !=          | 等于         |
| = %= /= *= ... | 赋值运算符   |
| not and or     | 逻辑运算符   |

```python
a = 1<2<3    # 1<2 and 2<3
print(a)     # True
```



## 流程控制语句

### if

语法结构

```python
if 条件表达式:     # 用冒号代表语句块开始
    代码块        # 缩进非常重要
    
a = 10
if a > 10:
    print('大于10')
    print('hello')
```

input()

```python
name = input('请输入您的姓名')
print(type(name),name)
所有输入的内容都是当作字符串
```

#### if-else

```python
if 条件表达式 :
    代码块
else :
    代码块
```

#### if-elif-else

```python
if 条件表达式 :
    代码块
elif 条件表达式 :
    代码块
elif 条件表达式 :
    代码块
elif 条件表达式 :
    代码块
else : 
    代码块
```

作业:

1. 输入一个数，判断是否是水仙花数
2. 输入年月日，判断这天是这年的哪一天
3. BMI 体重和身高 换算