---
title: Python 面向对象2:面向对象三大特性
published: 2022-06-03
pinned: false
description: 通过本章的学习，你将学习到面向对象的三大核心特性——封装、继承、多态。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Python, Python 教程, Python 进阶, 教程]
category: Python 教程:从入门到精通
slug: tutorial-python-oo2
series: "Python 教程:从入门到精通"
seriesOrder: 5
---

# 面向对象2:面向对象三大特性

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
>
> 通过本章的学习，你将学习到面向对象的三大核心特性——封装、继承、多态。文章内容来自站主大学时期的课程笔记。

## 封装

目前我们可以直接通过 对象.属性 的方式来修改属性的值，这种方式导致对象中的属性可以随意修改
非常的不安全，值可以任意修改，不论对错
现在我们就需要一种方式来增强数据的安全性

1. 属性不能随意修改（我让你改你才能改，不让你改你就不能改）
2. 属性不能修改为任意的值（年龄不能是负数）



### 伪私有属性和私有方法

```python
class Girl:
    def __init__(self, name):
        self.name = name
        self.__age = 18

    def __secret(self):
        print("我的年龄是 %d" % self.__age)

g = Girl("热巴")
# 私有属性，外部不能直接访问
# print(g.__age)

# 私有方法，外部不能直接调用
g.__secret()
```

> **不要使用这种方式**，**访问对象的 私有属性 或 私有方法**

`Python` 中，并没有 **真正意义** 的 **私有**

- 在给 **属性**、**方法** 命名时，实际是对 **名称** 做了一些特殊处理，使得外界无法访问到
- **处理方式**：在 **名称** 前面加上 `_类名` => `_类名__名称`

```python
print(g._Girl__age)
g._Girl__secret()
```





封装是面向对象的三大特性之一
封装指的是隐藏对象中一些不希望被外部所访问到的属性或方法
如何隐藏一个对象中的属性？
将对象的属性名，修改为一个外部不知道的名字
如何获取（修改）对象中的属性？

需要提供一个getter和setter方法使外部可以访问到属性
getter 获取对象中的指定属性（get_属性名）
setter 用来设置对象的指定属性（set_属性名）
使用封装，确实增加了类的定义的复杂程度，但是它也确保了数据的安全性

1. 隐藏了属性名，使调用者无法随意的修改对象中的属性
2. 增加了getter和setter方法，很好的控制的属性是否是只读的
   如果希望属性是只读的，则可以直接去掉setter方法
   如果希望属性不能被外部访问，则可以直接去掉getter方法
3. 使用setter方法设置属性，可以增加数据的验证，确保数据的值是正确的
4. 使用getter方法获取属性，使用setter方法设置属性
   可以在读取属性和修改属性的同时做一些其他的处理
5. 使用getter方法可以表示一些计算的属性

```python
class Dog:
    def __init__(self , name , age):
        self.hidden_name = name
        self.hidden_age = age

    def say_hello(self):
        print('大家好，我是 %s'%self.hidden_name) 

    def get_name(self):
        return self.hidden_name

    def set_name(self , name):
        self.hidden_name = name

    def get_age(self):
        return self.hidden_age

    def set_age(self , age):
        if age > 0 :
            self.hidden_age = age    


d = Dog('旺财',8)

# d.say_hello()

# 调用setter来修改name属性 
d.set_name('小黑')
d.set_age(-10)

# d.say_hello()
print(d.get_age())
print(d.hidden_name)
```

property装饰器，用来将一个get方法，转换为对象的属性
添加为property装饰器以后，我们就可以像调用属性一样使用get方法
使用property装饰的方法，必须和属性名是一样的

```python
class Goods(object):

    def __init__(self):
        # 原价
        self._price = 100
        # 折扣
        self._discount = 0.8

    @property
    def price(self):
        # 实际价格 = 原价 * 折扣
        new_price = self._price * self._discount
        return new_price

    @price.setter
    def price(self, value):
        self._price = value

    @price.deleter
    def price(self):
        del self._price

    @property
    def discount(self):
        return self._discount

    @discount.setter
    def discount(self,value):
        self._discount = value
        
g = Goods()
g.discount = 0.5
g.price = 200
print(g.price)  
```



## 继承

**实现代码的重用**，相同的代码不需要重复的编写

 有一个类，能够实现我们需要的大部分功能，但是不能实现全部功能
 如何能让这个类来实现全部的功能呢？

- 直接修改这个类，在这个类中添加我们需要的功能，修改起来会比较麻烦，并且会违反OCP开闭原则
- 直接创建一个新的类，创建一个新的类比较麻烦，并且需要大量的进行复制粘贴，会出现大量的重复性代码
- 直接从Animal类中来继承它的属性和方法

继承是面向对象三大特性之一
通过继承我们可以使一个类获取到其他类中的属性和方法

                            - 在定义类时，可以在类名后的括号中指定当前类的父类（超类、基类、super）
                                  子类（衍生类）可以直接继承父类中的所有的属性和方

通过继承可以直接让子类获取到父类的方法或属性，避免编写重复性的代码，并且也符合OCP原则
所以我们经常需要通过继承来对一个类进行扩展

**继承的概念**：**子类** 拥有 **父类** 的所有 **方法** 和 **属性**

<img src="E:\train\python\python.assets\011_继承对比图示.png" alt="011_继承对比图示" style="zoom:33%;" />

语法：

```python
class 类名(父类名):

    pass
```



### 新式类与旧式（经典）类

- Python2.2之前是没有共同的祖先的，之后引入Object类，它是所有类的共同祖先类Object

- Python2中为了兼容，分为古典类（旧式类）和新式类

- Python3中全部都是新式类

- 新式类都是继承自Object的，新式类可以使用super

  为了保证编写的代码能够同时在 `Python 2.x` 和 `Python 3.x` 运行！
  今后在定义类时，**如果没有父类，建议统一继承自 `object`**



- **子类** 继承自 **父类**，可以直接 **享受** 父类中已经封装好的方法，不需要再次开发

- **子类** 中应该根据 **职责**，封装 **子类特有的** **属性和方法**

  

###  方法的重写

- **子类** 拥有 **父类** 的所有 **方法** 和 **属性**
- **子类** 继承自 **父类**，可以直接 **享受** 父类中已经封装好的方法，不需要再次开发

**应用场景**

- 当 **父类** 的方法实现不能满足子类需求时，可以对方法进行 **重写(override)**

```python
class Animal(object):
    def run(self):
        print('Animal is running...')
# 当我们需要编写Dog和Cat类时，就可以直接从Animal类继承：

class Dog(Animal):

    def run(self):
        print('Dog is running...')

    def eat(self):
        print('Eating meat...')

class Cat(Animal):
    pass
```



**重写** 父类方法有两种情况：

1. **覆盖** 父类的方法
2. 对父类方法进行 **扩展**

#### 1) 覆盖父类的方法

- 如果在开发中，**父类的方法实现** 和 **子类的方法实现**，**完全不同**
- 就可以使用 **覆盖** 的方式，**在子类中** **重新编写** 父类的方法实现

> 具体的实现方式，就相当于在 **子类中** 定义了一个 **和父类同名的方法并且实现**

重写之后，在运行时，**只会调用** 子类中重写的方法，而不再会调用 **父类封装的方法**

#### 2) 对父类方法进行 **扩展**

- 如果在开发中，子类的方法实现中包含父类的方法实现
  - **父类原本封装的方法实现** 是 **子类方法的一部分**
- 就可以使用扩展的方式
  1. **在子类中** **重写** 父类的方法
  2. 在需要的位置使用 `super().父类方法` 来调用父类方法的执行
  3. 代码其他的位置针对子类的需求，编写 **子类特有的代码实现**

### 关于 `super`

- 在 `Python` 中 `super` 是一个 **特殊的类**
- `super()` 就是使用 `super` 类创建出来的对象
- **最常** 使用的场景就是在 **重写父类方法时**，调用 **在父类中封装的方法实现**

#### 调用父类方法的另外一种方式（了解即可）

父类名.方法(self)

- 这种方式，目前在 `Python 3.x` 还支持这种方式
- 这种方法 **不推荐使用**，因为一旦 **父类发生变化**，方法调用位置的 **类名** 同样需要修改

**提示**

- 在开发时，`父类名` 和 `super()` 两种方式不要混用
- 如果使用 **当前子类名** 调用方法，会形成递归调用，**出现死循环**

### 父类的 私有属性 和 私有方法

1. **子类对象** **不能** 在自己的方法内部，**直接** 访问 父类的 **私有属性** 或 **私有方法**
2. **子类对象** 可以通过 **父类** 的 **公有方法** **间接** 访问到 **私有属性** 或 **私有方法**

> - **私有属性、方法** 是对象的隐私，不对外公开，**外界** 以及 **子类** 都不能直接访问
> - **私有属性、方法** 通常用于做一些内部的事情

**示例**

<img src="E:\train\python\python.assets\013_父类的私有属性和私有方法.png" alt="013_父类的私有属性和私有方法" style="zoom:50%;" />

- `B` 的对象不能直接访问 `__num2` 属性
- `B` 的对象不能在 `demo` 方法内访问 `__num2` 属性
- `B` 的对象可以在 `demo` 方法内，调用父类的 `test` 方法
- 父类的 `test` 方法内部，能够访问 `__num2` 属性和 `__test` 方法



### 例子

```python
class Animal:
    def __init__(self,name):
        self._name = name

    def run(self):
        print('动物会跑~~~')

    def sleep(self):
        print('动物睡觉~~~')

    @property
    def name(self):
        return self._name

    @name.setter    
    def name(self,name):
        self._name = name

# 父类中的所有方法都会被子类继承，包括特殊方法，也可以重写特殊方法
class Dog(Animal):

    def __init__(self,name,age):
        # 希望可以直接调用父类的__init__来初始化父类中定义的属性
        # super() 可以用来获取当前类的父类，
        # 并且通过super()返回对象调用父类方法时，不需要传递self
        super().__init__(name)
        self._age = age

    def bark(self):
        print('汪汪汪~~~') 

    def run(self):
        print('狗跑~~~~')   

    @property
    def age(self):
        return self._age

    @age.setter    
    def age(self,age):
        self._age = name        

d = Dog('旺财',18) 

print(d.name)       
print(d.age)       
```



### 多继承

在Python中是支持多重继承的，也就是我们可以为一个类同时指定多个父类

可以在类名的()后边添加多个类，来实现多重继承

多重继承，会使子类同时拥有多个父类，并且会获取到所有父类中的方法

在开发中没有特殊的情况，应该尽量避免使用多重继承，因为多重继承会让我们的代码过于复杂



多继承很好的模拟了世界，因为事务很少单一继承，但是舍弃简单，必然引入复杂性，带来了冲突

如同一个孩子继承了来自父母双方的特征，那么到底眼睛像爸爸还是妈妈尼？孩子究竟改像谁多一点尼？

多继承的实现会导致编译器设计的复杂度增加，所以现在很多语言舍弃了类的多继承

C++支持多继承；Java舍弃了多继承

> 多继承可能会带来二义性，例如，猫和狗都继承自动物类，现在一个类多继承了猫和狗类，猫和狗都有了shout方法，子类究竟继承谁的shout尼？

- 解决方案：实现了多继承的语言，要解决二义性，深度优先或者广度优先

如果多个父类中有同名的方法，则会现在第一个父类中寻找，然后找第二个，然后找第三个。。。
前边父类的方法会覆盖后边父类的方法

<img src="E:\train\python\python.assets\014_多继承.png" alt="014_多继承" style="zoom:50%;" />

#### Python 中的 MRO —— 方法搜索顺序（了解即可）

- `Python` 中针对 **类** 提供了一个 **内置属性** `__mro__` 可以查看 **方法** 搜索顺序
- MRO 是 `method resolution order`，主要用于 **在多继承时判断 方法、属性 的调用 路径**

```python
print(C.__mro__)
print(C.mro())
```

**输出结果**（C<--B<--A<--Object）

```
(<class '__main__.C'>, <class '__main__.B'>, <class '__main__.A'>, <class 'object'>)
```

- 在搜索方法时，是按照 `__mro__` 的输出结果 **从左至右** 的顺序查找的
- 如果在当前类中 **找到方法，就直接执行，不再搜索**
- 如果 **没有找到，就查找下一个类** 中是否有对应的方法，**如果找到，就直接执行，不再搜索**
- 如果找到最后一个类，还没有找到方法，程序报错



### 多继承问题

**不使用super调用父类方法，使用父类名.方法名的形式。**

**注意：代码里当在子类中通过父类名调用时，parent被执行了2次**

```python
class Parent(object):
    def __init__(self, name):
        print('parent的init开始被调用')
        self.name = name
        print('parent的init结束被调用')
 
class Son1(Parent):
    def __init__(self, name, age):
        print('Son1的init开始被调用')
        self.age = age
        Parent.__init__(self, name) #直接使用父类名.方法名的方式调用父类的__init__方法
        print('Son1的init结束被调用')
 
class Son2(Parent):
    def __init__(self, name, gender):
        print('Son2的init开始被调用')
        self.gender = gender
        Parent.__init__(self, name) #
        print('Son2的init结束被调用')
 
class Grandson(Son1, Son2):
    def __init__(self, name, age, gender):
        print('Grandson的init开始被调用')
        Son1.__init__(self, name, age)  # 单独调用父类的初始化方法
        Son2.__init__(self, name, gender)
        print('Grandson的init结束被调用')
 
gs = Grandson('grandson', 12, '男') 
print('姓名：', gs.name)
print('年龄：', gs.age)
print('性别：', gs.gender)
 
'''执行结果如下：
Grandson的init开始被调用
Son1的init开始被调用
parent的init开始被调用
parent的init结束被调用
Son1的init结束被调用
Son2的init开始被调用
parent的init开始被调用
parent的init结束被调用
Son2的init结束被调用
Grandson的init结束被调用
姓名： grandson
年龄： 12
性别： 男
'''
```



```python
class Parent(object):
    def __init__(self, name, *args, **kwargs):  # 为避免多继承报错，使用不定长参数，接受参数
        print('parent的init开始被调用')
        self.name = name
        print('parent的init结束被调用')
 
class Son1(Parent):
    def __init__(self, name, age, *args, **kwargs):  # 为避免多继承报错，使用不定长参数，接受参数
        print('Son1的init开始被调用')
        self.age = age
        super().__init__(name, *args, **kwargs)  # 为避免多继承报错，使用不定长参数，接受参数
        print('Son1的init结束被调用')
 
class Son2(Parent):
    def __init__(self, name, gender, *args, **kwargs):  # 为避免多继承报错，使用不定长参数，接受参数
        print('Son2的init开始被调用')
        self.gender = gender
        super().__init__(name, *args, **kwargs)  # 为避免多继承报错，使用不定长参数，接受参数
        print('Son2的init结束被调用')
 
class Grandson(Son1, Son2):
    def __init__(self, name, age, gender):
        print('Grandson的init开始被调用')
        # 多继承时，相对于使用类名.__init__方法，要把每个父类全部写一遍
        # 而super只用一句话，执行了全部父类的方法，这也是为何多继承需要全部传参的一个原因
        # super(Grandson, self).__init__(name, age, gender) 效果和下面的一样
        super().__init__(name, age, gender)
        print('Grandson的init结束被调用')
 
print(Grandson.__mro__) #搜索顺序
 
gs = Grandson('grandson', 12, '男')
 
print('姓名：', gs.name)
print('年龄：', gs.age)
print('性别：', gs.gender)
 
'''结果如下：
(<class '__main__.Grandson'>, <class '__main__.Son1'>, <class '__main__.Son2'>, <class '__main__.Parent'>, <class 'object'>)
Grandson的init开始被调用
Son1的init开始被调用
Son2的init开始被调用
parent的init开始被调用
parent的init结束被调用
Son2的init结束被调用
Son1的init结束被调用
Grandson的init结束被调用
姓名： grandson
年龄： 12
性别： 男
'''
```

注意：在上面模块中，当在子类中通过super调用父类方法时，parent被执行了1次。

super调用过程：上面gs初始化时，先执行grandson中init方法, 其中的init有super调用，每执行到一次super时，都会从__mro__方法元组中顺序查找搜索。所以先调用son1的init方法，在son1中又有super调用，这个时候就就根据__mro__表去调用son2的init，然后在son2中又有super调用，这个就根据mro表又去调用parent中的init，直到调用object中的init.  所以上面的打印结果如此，要仔细分析执行过程。

``` super().__init__```相对于```类名.__init__```在单继承上用法基本无差
但在多继承上有区别，super方法能保证每个父类的方法只会执行一次，而使用类名的方法会导致方法被执行多次，具体看前面的输出结果
**多继承**时，使用**super方法**，对父类的传参数，应该是由于python中super的算法导致的原因，**必须把参数全部传递**，否则会报错！
**单继承**时，使用**super方法**，则不能全部传递，**只能传父类方法所需的参数**，否则会报错！
**多继承**时，相对于使用类名.__init__方法，要把每个父类全部写一遍, 而使用**super方法**，只需**写一句话便执行了全部父类的方法**，这**也是为何多继承需要全部传参**的一个原因

### 单继承使用super调用父类

```python
class Parent(object):
    def __init__(self, name):
        print('parent的init开始被调用')
        self.name = name
        print('parent的init结束被调用')
 
class Son1(Parent):
    def __init__(self, name, age):
        print('Son1的init开始被调用')
        self.age = age
        super().__init__(name)  # 单继承不能提供全部参数！
        print('Son1的init结束被调用')
 
class Grandson(Son1):
    def __init__(self, name, age, gender):
        print('Grandson的init开始被调用')
        super().__init__(name, age)  # 单继承不能提供全部参数
        print('Grandson的init结束被调用')
 
gs = Grandson('grandson', 12, '男')
print('姓名：', gs.name)
print('年龄：', gs.age)
```





## 多态

Python 是弱类型语言，其最明显的特征是在使用变量时，无需为其指定具体的数据类型。这会导致一种情况，即同一变量可能会被先后赋值不同的类对象，这种**不算多态**

```python
class Dog:
    def talk(self):
        print("woof")
class Cat:
    def talk(self):
        print("miaow")
a = Dog()
a.talk()
a = Cat()
a.talk()
```



**类的多态**特性，还要满足以下 2 个**前提条件**：

1. 继承：多态一定是**发生在子类和父类之间**；
2. 重写：**子类重写了父类的方法**。

> 不同的子类对象，调用相同的父类方法，产生不同的执行结果。

```python
class Animal: #同一类事物:动物
    def talk(self):
        pass

class Cat(Animal): #动物的形态之一:猫
    def talk(self):
        print('say miaomiao')

class Dog(Animal): #动物的形态之二:狗
    def talk(self):
        print('say wangwang')

class Pig(Animal): #动物的形态之三:猪
    def talk(self):
        print('say aoao')

class Noise:
    def byAnimal(self, animal):
        animal.talk()

cat = Cat()
dog = Dog()
pig = Pig()
n = Noise()        
n.byAnimal(cat)
n.byAnimal(dog)
n.byAnimal(pig)
	
```



### isintance()

isinstance() 函数来判断一个对象是否是一个已知的类型，类似 type()。

```python
isinstance(object,classinfo)

isinstance(cat,Animal) # True
```



## 单态设计模式

### ```__new__```

使用 **类名()** 创建对象时，`Python` 的解释器 **首先** 会 调用 `__new__` 方法为对象 **分配空间**

```__new__```是一个 由**`object`基类**提供的内置的**静态方法**，主要作用有两个：

 1. 内存中为对象 **分配空间**

 2. **返回** 对象的引用

    

Python 的解释器获得对象的 **引用** 后，将引用作为 **第一个参数**，传递给 `__init__` 方法

> 重写 `__new__` 方法 的代码非常固定！

- 重写 `__new__` 方法 **一定要** `return super().__new__(cls)`
- 否则 Python 的解释器 **得不到** 分配了空间的 **对象引用**，**就不会调用对象的初始化方法**
- 注意：`__new__` 是一个静态方法，在调用时需要 **主动传递** `cls` 参数



```python
class MusicPlayer(object):

    def __new__(cls, *args, **kwargs):
        # 如果不返回任何结果，
        return super().__new__(cls)

    def __init__(self):
        print("初始化音乐播放对象")

player = MusicPlayer()

print(player)
player1 = MusicPlayer()
player2 = MusicPlayer()
print(player1==player2)
```

### 单态

1. 定义一个 **类属性**，初始值是 `None`，用于记录 **单例对象的引用**
2. 重写 `__new__` 方法
3. 如果 **类属性** `is None`，调用父类方法分配空间，并在类属性中记录结果
4. 返回 **类属性** 中记录的 **对象引用**

> 一个类，无论实例化多少个对象，都有且只有一个
>
> 优点：节省内存空间，提升执行效率
> 针对于不要额外对该对象添加成员的场景，如mysql增删改查

```python
class MusicPlayer(object):

    # 定义类属性记录单例对象引用
    instance = None

    def __new__(cls, *args, **kwargs):

        # 1. 判断类属性是否已经被赋值
        if cls.instance is None:
            cls.instance = super().__new__(cls)

        # 2. 返回类属性的单例引用
        return cls.instance

player1 = MusicPlayer()
player2 = MusicPlayer()
print(player1==player2)
```



```python
class MyClass():
	__obj = None
	def __new__(cls,name):
		if cls.__obj is None:
			cls.__obj=object.__new__(cls)
		return cls.__obj
	def __init__(self,name):
		self.name=name
		print("{}穿着白色的衣服".format(self.name))

obj1 = MyClass("Lsir")
obj2 = MyClass("Zsir")
print(obj1.name)
print(obj2.name)

# Lsir穿着白色的衣服
# Zsir穿着白色的衣服
# Zsir
# Zsir
```

> 第一次实例化对象时候,创建一个对象赋值给`cls.__obj`,返回 `cls.__obj`
> 第二次实例化对象时候,因为 `cls.__obj is None`不满足,返回上一个创建好的对象
> obj1 和 obj2 所指代的对象是同一个对象



### 只执行一次初始化工作



在每次使用 类名() 创建对象时，Python 的解释器都会自动调用两个方法：
__new__ 分配空间
__init__ 对象初始化
在上一小节对 __new__ 方法改造之后，每次都会得到 第一次被创建对象的引用
但是：初始化方法还会被再次调用

让 初始化动作 只被 执行一次

1. 定义一个类属性 init_flag 标记是否 执行过初始化动作，初始值为 False
2. 在``` __init__ ```方法中，判断 init_flag，如果为 False 就执行初始化动作
3. 然后将 init_flag 设置为 True
4. 这样，再次 自动 调用 __init__ 方法时，初始化动作就不会被再次执行 了

```python
class MusicPlayer(object):

    # 记录第一个被创建对象的引用
    instance = None
    # 记录是否执行过初始化动作
    init_flag = False

    def __new__(cls, *args, **kwargs):

        # 1. 判断类属性是否是空对象
        if cls.instance is None:
            # 2. 调用父类的方法，为第一个对象分配空间
            cls.instance = super().__new__(cls)

        # 3. 返回类属性保存的对象引用
        return cls.instance

    def __init__(self):

        if not MusicPlayer.init_flag:
            print("初始化音乐播放器")

            MusicPlayer.init_flag = True


# 创建多个对象
player1 = MusicPlayer()
print(player1)

player2 = MusicPlayer()
print(player2)
```

