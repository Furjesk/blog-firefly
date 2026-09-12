---
title: Python 函数
published: 2022-06-01
pinned: false
description: 通过本章的学习，你将学习到 Python 的函数定义和调用方法。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 基础, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-function
series: "Python 教程:从入门到精通"
seriesOrder: 3
---

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 通过本章的学习，你将学习到 Python 的函数定义和调用方法。文章内容来自站主大学时期的课程笔记。

# 函数

函数一段可执行的代码，在python中，他也是一种对象，也是一段数据，被保存在内存中

在需要的时候会被取出来执行，多次调用

函数在python是一等对象

1. 对象在运行时创建
2. 能赋值给变量或者作为数据结构中的元素
3. 能作为参数传递
4. 能作为返回值使用

```python
语法：
def 函数名(形参1,形参2,....形参n):
    函数体
    
函数名称命名 规则一般是按照字母+下划线、或者驼峰法则
```



```python
def sayHello():
    print('hello')
    
print(sayHello,type(sayHello))
# <function sayHello at 0x0000023A0EA67F70> <class 'function'>    
```

## 函数的参数

形参（形式参数）

实参（实际参数）

```python
def add(a,b):
    a += 10
    print(a+b)
a = 10
b = 20
add(a,b) # 40
print(a) # 10
```

函数调用的时候，实际参数的数量要和定义的形参的数量一致

如果不强调，位置也要一样

位置可以通过名字来强调 **关键字参数**

```python
add(b=1,a=2) # 调用的时候，按照参数名去传递参数
```

还可以混用，但是**关键字参数一定要放在后面**，且位置还是不可以乱

```python
add(b=1,2) #错误 SyntaxError: positional argument follows keyword argument

add(2,b=1) # 正确

add(2,a=1) # TypeError: add() got multiple values for argument 'a'
```

***函数调用的时候，不会去检查函数的类型***

```python
add(True,10) # 21
add('a',10) # 报错
```

参数类型注解

```python
sig = inspect.signature(add)
params = sig.parameters
print(params,type(params))
for v in params.values():
    print(v)
```

和java一样，参数传递也是值 copy（**值传递**）

```python
def add(a,b):
    total = 0
    for i in a:
        total+=i
    for i in b:
        total+=i
    print(total)
    a.append(4)
    b.append(5)
    
a = [1,2,3]
b = [4,5]
add(a,b)	# 15
print(a,b)	# [1, 2, 3, 4] [4, 5, 5]
```

>【注】这里的“值传递”是指：add(a,b)
>
>当a = 10，传递的形参a，即是变量a的值10
>
>当a = [1,2,3]，传递的形参a，即是变量a的值（是一个类似于指针）是列表的地址

## 不定长参数

```python
# 在元组中的拆包中可以用*去代表若干剩下的参数

def add(*nums:int):
    print(nums,type(nums))

add(1,2,3)
# (1, 2, 3) <class 'tuple'>

def add(*nums:int):
    total = 0
    for i in nums:
        total+=i
    return total

print(add(1,2,3,4)) # 10

# 推荐现成下面这样，标记好返回类型
def add(*nums:int)->int:
    total = 0
    for i in nums:
        total+=i
    return total

print(add(1,2,3,4))
```

带***号的不定长参数只能有一个**

可以和其他的参数混用，Java不定长参数只能放在最后,python随便,但是有规则

```python
# 不定项参数放在最后
def add(a,b,*c):
    total=0
    total+=a*100
    total+=b*10
    for i in c:
        total+=i
    return total

print(add(1,2,3,4,5)) # 132

# 如果不定项参数不放在最后，那么必须用关键字参数的方式传递
def fn(*a,b,c):
    print(a)
    print(b)
    print(c)
    
fn(1,2,3,b=4,c=5)

def fn(a,*b,c):
    print(a)
    print(b)
    print(c)
    
fn(1,2,3,4,c=5)

# 第一个参数位置直接使用一个*号，表示必须用关键字参数传递所有参数
def fn(*,a,b,c):
    print(a)
    print(b)
    print(c)
    
# 如果只有一个不定项参数，那不能使用关键字参数
def add(*nums):

print(add(1,2,3,a=1)) # 不可以

# ** 作为形参可以接收其他的关键字参数，会将这些参数统一保存在一个字典里
# ** 不定项关键字形参只有一个，而且必须写在所有参数的最后
# * 相当于若干个不定项的位置参数
# ** 相当于若干个不定项的关键字参数

def fn(**kwargs):
    print(kwargs,type(kwargs))
    for i in kwargs:
        print(i)

fn(a=1,b=2,c=3,d=4)    
# {'a': 1, 'b': 2, 'c': 3, 'd': 4} <class 'dict'>

# 参数的解包
def fn(a,b,c):
    print(a)
    print(b)
    print(c)

t = 1,2,3
fn(t) # 报错
# TypeError: fn() missing 2 required positional arguments: 'b' and 'c'
fn(*t) # 传进去的是不定项的t

# 传字典
def fn(a,b,c):
    print(a)
    print(b)
    print(c)

# d = dict(a=1,b=2,c=3) 
d = {'a':1,'b':2,'c':3}
fn(**d)
```



## 返回值

```python
def add(*nums):
    total = 0
    for i in nums:
        total+=i
    return total

# 函数也可以返回函数
def fn():
    def fn2():
        print('hello')
    
    return fn2

a = fn() 
a()
# fn()()

print(fn,type(fn))
print(fn(),type(fn()))

# fn fn() 不一样
# <function fn at 0x0000023A0FAE98B0> <class 'function'>
# <function fn.<locals>.fn2 at 0x0000023A1036A4C0> <class 'function'>
```

## 函数的帮助文档

help()

dir()

```
Help on built-in function print in module builtins:

print(...)
    print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
    
    Prints the values to a stream, or to sys.stdout by default.
    Optional keyword arguments:
    file:  a file-like object (stream); defaults to the current sys.stdout.
    sep:   string inserted between values, default a space.
    end:   string appended after the last value, default a newline.
    flush: whether to forcibly flush the stream.
```



## 作用域

作用域分为两种，

全局作用域

​	程序开始时候就创建，程序结束时候销毁

函数作用域

​	函数执行的时候创建，在调用结束销毁，每次调用都会参数一个新的函数作用域

当我们使用变量的时候，会优先查找当前作用域，如果没有则到上一级去查找

```python
a = 10 # globe 全局变量, 不太建议去修改全局变量
def fn():
    a = 20 # 函数内部变量
```



## 参数传递

java String 类，本质char[]构成，java中数组是不可变长度

StringBuilder StringBuffer 

append

** **值传递** **  基本数据类型的值就是**基本数据类型本身**  对象类型就是**对象的地址**



## 命名空间

命名空间（namespace）：是指变量存储的位置，每一个变量都是存储在指定的命名空间中的

每一个作用域都有一个对应的命名空间

**全局命名空间**保存全局变量

**函数命名空间**，保存函数中的局部变量

java web中有一个范围概念

变量就是存储在这个范围里面的，这个范围实质就是一个字典

通过**locals()** 获取**当前作用域的命名空间**

**globals()**   在任意地方获取**全局作用域**

```python
scope = locals()
print(scope,type(scope))
# 通过字典去拿取全局变量
print(scope['a1']) 
# 创建一个全局变量 key-value  c = 10000
# 一般不建议
scope['c'] = 10000  
print(c) 

def test():
    a = 10
    scope = locals()
    print(scope['a'])
    scope['b'] = 20
    print(scope,type(scope))
#     print(b)					# 可以添加函数作用域内的变量b
    global_scope = globals()   # 在任意地方获取全局作用域
    print(global_scope)

test()
```



## 递归

函数自己调用自己，一定要有边界

```python
def fabo(num:int)->int:
    if num == 1 or num == 2:
        return 1
    return fabo(num-1)+fabo(num-2)

print(fabo(10))

def factorial(n:int)->int:
    if n == 1:
        return 1
    return n*factorial(n-1)

print(factorial(10))

# 非递归
def factorial2(n:int)->int:
    r = 1
    for i in range(1,n+1):
        r*=i
    return r

print(factorial2(10))
```



## 高阶函数

高阶函数：①接受函数作为参数，②或者将函数作为返回的函数

```python
fn = abs # 绝对值函数
print(fn(-10))
```

将函数赋值给一个变量，函数的参数是一个变量，所以我们是不是可以把函数作为另外一个函数的参数传递给他

```python
def add(a:int,b:int,func)->int:
    return func(a) + func(b)
print(add(-10,10,fn))
```

### 内置高阶函数

#### map函数

map函数有两个参数，一个是函数，一个是(Iterable)可迭代对象，map函数就会将**传入的函数**一次**在可迭代对象的每一个元素上用一次**，并且把用完的结果作为新的可迭代对象返回

Java中Stream有map

```python
def fn(n:int)->int:
    return n+1
arr = [1,2,3,4,5]
arr2 = map(fn, arr)
print(arr)   
# arr 不变 [1, 2, 3, 4, 5]
for i in arr2:
    print(i)
# 打印 2 3 4 5 6 
s = {1,2,3,4}
print(set(map(fn,s)))
# {2, 3, 4, 5}
```



#### reduce函数

在 Python2中是自带的，到Python3中在全局命名空间中删除了，需要 import

reduce 接受两个参数，一个是函数，一个是序列，reduce函数把**每次计算的结果**继续**和下一个元素累计计算**

``` python
from functools import reduce
def add(a:int,b:int)->int:
    return a + b

print(reduce(add,arr))
# reduce(add,[1,2,3,4,5]) = add(add(add(add(1,2),3),4),5)

def trans(a:int,b:int)->int:
    return a*10+b
print(trans(1,2))

# trans(trans(trans(1,2),3),4)
print(reduce(trans,[1,2,3,4,5]))
# 12345


def c2n(s):
    d = {'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9}
    return d[s]

# type(c2n('1'))
# m = list(map(c2n,'12345'))
# print(list(m))
print(reduce(trans,map(c2n,'12345')))
```



#### filter函数

filter函数接受一个函数和一个序列，和map 不一样的地方，filter会把传入的**函数依次用于每个元素**，然后**根据返回值**是True还是False来**决定是否保留这个元素**

```python
def is_odd(num:int)->bool:
    return num%2==1
print(list(filter(is_odd,[1,2,3,4,5,6])))
# [1, 3, 5]

def check_lens(s:str)->bool:
    return len(s) > 5
# print(check_lens('abcdefg'))

for s in filter(check_lens,['abc','asdjsadsad','zhangsan','lisi','wangwu']):
    print(s)
```



#### sorted 函数

sorted函数可以接受一个key函数，key函数用来实现自定义排序，还可以接受一个reverse的bool值决定正序还是倒序

```python
sorted([10,5,8,-12,24,-9],key=abs,reverse=True)
# [24, 10, 8, 5, -9, -12]
```



###  自定义

（自定义过滤器）

```python
def fn(func, items):
    new_items = []
    for i in items:
        if func(i):
            new_items.append(i)
    return new_items

def f1(i):
    return i%3 == 0

def f2(i):
    return i>10

print(fn(f2,[1,20,5,6,12,24]))
        
```



### lambda 表达式

lambda表达式  匿名函数

可以用来创建一些简单的函数

语法： lambda 参数列表 : 返回值

```python
def add(a,b):
    return a+b

add(1,2) # 3

fn = lambda a,b: a+b
fn(3,5) # 8

(lambda a,b: a+b)(3,5) # 8

print(reduce(lambda a,b: a+b,[1,2,3,4,5])) # 15

fn(lambda i:i%3==0,[1,20,5,6,12,24])  # 上面自定义过滤器

fn(lambda i:i>10,[1,20,5,6,12,24])  
```



### 闭包

闭包：将**函数作为返回值**返回

通过闭包可以创建一些只有当前函数能访问的变量，可以将一些私有的数据藏在闭包内

函数嵌套

将内部的函数作为返回值返回

内部函数可以使用外部函数的变量

```python
def fn():
    a = 10
    def inner_fn():
        print(a)
    return inner_fn;

# r = fn()
# r()
fn()()
```

在一些语言中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，则可能产生闭包。闭包可以用来在一个函数与一组“私有”变量之间创建关联关系。在给定函数被多次调用的过程中，这些私有变量能够保持其持久性。

上面这段话实际上解释了闭包的一个定义和两个作用：

- 定义：闭包就是能够读取外部函数内的变量的函数。（前面已经讲解过）
- 作用1：闭包是将外层函数内的局部变量和外层函数的外部连接起来的一座桥梁。（下一部分讲解）
- 作用2：将外层函数的变量持久地保存在内存中。（下一部分讲解）



局部变量无法共享和长久的保存，而全局变量可能造成变量污染，**闭包**既可以**长久的保存变量**又**不会造成全局污染**。

闭包使得函数内局部变量的值始终保持在内存中，不会在外层函数调用后被自动清除。

当**外层函数返回了内层函数**后，**外层函数的局部变量还被内层函数引用**

带参数的装饰器，那么一般都会生成闭包。

闭包在爬虫以及web应用中都有很广泛的应用。



## 装饰器

```python
def log(func):
    def print_log(*args,**kw):
        print('begin')
        r = func(*args,**kw)    
        print('end')
        return r
    return print_log

# add2 = log(add)
print(log(add)(1,5))
```

log函数，称之为装饰器

装饰器的作用：可以在不修改原有代码的基础上，进行扩展

```python
def sub(a,b):
    return a - b

def fn(c='zhangsan'):
    print(c)
    
log(fn)('lisi')
# begin
# lisi
# end
```

我们可以使用@装饰器名，来指定给某个方法加上指定的装饰器

```python
@log
def fn(c='zhangsan'):
    print(c)
fn()
```

装饰器，可以有多个

装饰器按照从内向外的顺序依次装饰

```python
@log2
@log
def fn(c='zhangsan'):
    print(c)
fn()

'''
begin2
begin
zhangsan
end
end2
'''
```

带参数的装饰器

```python
def funA(fn):
    # 定义一个嵌套函数
    def say(arc):
        print("Python教程:",arc)
    fn(arc)
    return say
@funA
def funB(arc):
    print("funB():", a)
funB("http://w")
# Python教程: http://w



def funA(fn):
    # 定义一个嵌套函数
    def say(arc):
        print("Python教程:",arc)
        fn(arc)
    return say
@funA
def funB(arc):
    print("funB():",arc)
    
funB("http://w")
# Python教程: http://w
# funB(): http://w
```

