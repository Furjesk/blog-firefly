---
title: Python 异常
published: 2022-06-05
pinned: false
description: 通过本章的学习，你将学习到 Python 中异常的定义和使用。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 进阶, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-exception
series: "Python 教程:从入门到精通"
seriesOrder: 7
---

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
>
> 通过本章的学习，你将学习到 Python 中异常的定义和使用。文章内容来自站主大学时期的课程笔记。

# 异常


- 程序在运行时，如果 `Python 解释器` **遇到** 到一个错误，**会停止程序的执行，并且提示一些错误信息**，这就是 **异常**
- **程序停止执行并且提示错误信息** 这个动作，我们通常称之为：**抛出(raise)异常**

语法:

```python
try:
    # 尝试执行的代码
    pass
except 错误类型1:
    # 针对错误类型1，对应的代码处理
    pass
except 错误类型2:
    # 针对错误类型2，对应的代码处理
    pass
except (错误类型3, 错误类型4):
    # 针对错误类型3 和 4，对应的代码处理
    pass
except Exception as result:
    # 打印错误信息
    print(result)
else:
    # 没有异常才会执行的代码
    pass
finally:
    # 无论是否有异常，都会执行的代码
    print("无论是否有异常，都会执行的代码")
```

- `else` 只有在没有异常时才会执行的代码
- `finally` 无论是否有异常，都会执行的代码



```python
try:
    num = int(input("请输入整数："))
    result = 8 / num
    print(result)
except ValueError:
    print("请输入正确的整数")
except ZeroDivisionError:
    print("除 0 错误")
except Exception as result:
    print("未知错误 %s" % result)
else:
    print("正常执行")
finally:
    print("执行完成，但是不保证正确")
```



## 异常的传递

- **异常的传递** —— 当 **函数/方法** 执行 **出现异常**，会 **将异常传递** 给 函数/方法 的 **调用一方**
- 如果 **传递到主程序**，仍然 **没有异常处理**，程序才会被终止

在开发中，可以在主函数中增加 **异常捕获**而在主函数中调用的其他函数，只要出现异常，都会传递到主函数的 **异常捕获** 中，这样就不需要在代码中，增加大量的 **异常捕获**，能够保证代码的整洁



## 抛出 `raise` 异常

Python` 中提供了一个 `Exception **异常类**在开发时，如果满足特定业务需求时，希望抛出异常，可以：**创建** 一个 `Exception` 的 **对象**，使用 `raise` **关键字** 抛出 **异常对象**



```python
def input_password():

    # 1. 提示用户输入密码
    pwd = input("请输入密码：")

    # 2. 判断密码长度，如果长度 >= 8，返回用户输入的密码
    if len(pwd) >= 8:
        return pwd

    # 3. 密码长度不够，需要抛出异常
    # 1> 创建异常对象 - 使用异常的错误信息字符串作为参数
    ex = Exception("密码长度不够")

    # 2> 抛出异常对象
    raise ex


try:
    user_pwd = input_password()
    print(user_pwd)
except Exception as result:
    print("发现错误：%s" % result)
```

### 自定义异常

自定义异常类应该总是继承自内置的 `Exception` 类， 或者是继承自那些本身就是从 `Exception` 继承而来的类。 尽管所有类同时也继承自 `BaseException` ，但你不应该使用这个基类来定义新的异常。`BaseException` 是为系统退出异常而保留的，比如 `KeyboardInterrupt` 或 `SystemExit` 以及其他那些会给应用发送信号而退出的异常。 因此，捕获这些异常本身没什么意义。 这样的话，假如你继承 `BaseException` 可能会导致你的自定义异常不会被捕获而直接发送信号退出程序运行。

```python
class MyException(Exception):  # 继承异常类
    def __init__(self, name, reason):
        self.name = name
        self.reason = reason


from datetime import datetime

try:
    if str(datetime.now()) > "2018":
        raise MyException("TimeoutException", "time is overtime...")
except MyException as e:
    print(e.name + ":" + e.reason)

"""
    抛出异常
"""
try:
    6 / 0
    raise
except Exception as e:
    print(e)
```



```python
class  AgeErro(Exception):
    def __init__(self,age):
       self.age =age

    def __str__(self):
        return "年龄异常{}".format(self.age)

class Person(object):
    def __init__(self,age):
        if age>0 and age <100:
            self.age =age
        else:
            raise AgeErro(age)

person =Person(800)
```

