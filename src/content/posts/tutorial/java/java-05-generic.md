---
title: Java 进阶-泛型
published: 2021-12-23
pinned: false
description: 本文介绍 Java 进阶部分，你将学习到 Java 泛型的使用方法。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 进阶, 教程, Java 泛型]
category: Java 教程:从入门到精通
slug: tutorial-java-generic
series: "Java 教程:从入门到精通"
seriesOrder: 5
---

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 进阶部分，你将学习到 Java 泛型的使用方法。文章内容来自站主大学时期的课程笔记。

# Java 进阶:泛型

## 泛型

定义类、接口、方法时，同时声明了一个或多个类型变量（如`<E>`），称为泛型类、泛型接口、泛型方法。它们统称为**泛型**。

作用：

泛型提供了在编译阶段约束所能操作的数据类型，并自动进行检查的能力。这样可以避免强制类型转换，及其可能出现的异常。

本质：

把具体的数据类型作为参数传递给类型变量。

```java
ArrayList<String> list = new ArrayList<>();
list.add("hello");
```

### 泛型类

**类型变量**建议用**大写英文字母**，常用的有：E、T（返回值）、K、V（键值）

```
修饰符 class 类名<类型变量,类型变量,...> {

}
```

```java
public class MyArrayList<E> {
    public boolean add(E e) {
        ...
    }
    public E get(int index) {
        ...
    }
}
```

### 泛型接口

```
修饰符 interface 接口名<类型变量,类型变量,...> {

}
```

需求：项目需要对学生/老师数据都进行增删改查操作。

```java
public interface Data<E> {
    void add(E e);
}
```

```java
public class StudentData implements Data<Student> {
    @Override
    public void add(Student student) {
        
    }
}
```

### 泛型方法

#### 基本使用

泛型类，是在**实例化类的时候指明泛型的具体类型**；泛型方法，是在**调用方法的时候指明泛型的具体类型** 。

**方法自己定义的泛型**。

```
修饰符 <类型变量,类型变量,...> 返回值类型 方法名(形参列表) {

}
```

示例：

- 需求1：打印任意类型的数组内容
- 需求2：返回任意类型数组的元素，且不用强制类型转换

```java
public static void main(String[] args) {
    String[] array = {"hello", "world", "java"};
    print(array); // 打印String类型数组
    
    Student[] students = new Student[3];
    print(students); // 打印Student类型数组

    String max = getMax(array); // 这样就不需要强转类型了
    Student max1 = getMax(students);
}

public static <T> void print(T[] array) {
    for (T t : array) {
        System.out.println(t);
    }
}

public static <T> T getMax(T[] array) {
    return ...;
}
```

**public 与 返回值中间`<T>`非常重要，可以理解为声明此方法为泛型方法**。

注意：这种不算泛型方法，因为它只是由所在的泛型类定义的，不是方法自己定义的：

```
public class MyArrayList<E> {
    public E get(int index) { // 这不是泛型方法
        ...
    }
}
```

> 泛型下面的几小节内容来自：[java 泛型详解-绝对是对泛型方法讲解最详细的，没有之一 - little fat - 博客园](https://www.cnblogs.com/coprince/p/8603492.html)

#### 泛型方法与可变参数

再看一个泛型方法和可变参数的例子：

```java
public <T> void printMsg( T... args){
    for(T t : args){
        Log.d("泛型测试","t is " + t);
    }
}
printMsg("111",222,"aaaa","2323.4",55.55);
```

#### 静态方法与泛型

静态方法有一种情况需要注意一下，那就是在类中的静态方法使用泛型：**静态方法无法访问类上定义的泛型**；如果静态方法操作的引用数据类型不确定的时候，必须要将泛型定义在方法上。

即：**如果静态方法要使用泛型的话，必须将静态方法也定义成泛型方法**。

```java
public class StaticGenerator<T> {
    ....
    ....
    /**
     * 如果在类中定义使用泛型的静态方法，需要添加额外的泛型声明（将这个方法定义成泛型方法）
     * 即使静态方法要使用泛型类中已经声明过的泛型也不可以。
     * 如：public static void show(T t){..},此时编译器会提示错误信息：
          "StaticGenerator cannot be refrenced from static context"
     */
    public static <T> void show(T t){

    }
}
```

#### 泛型方法指导原则

泛型方法能使方法独立于类而产生变化，以下是一个基本的指导原则：

- **无论何时，如果你能做到，你就该尽量使用泛型方法**。也就是说，如果使用泛型方法将整个类泛型化，那么就应该使用泛型方法。
- **如果static方法要使用泛型能力，就必须使其成为泛型方法**。

### 通配符

就是`?`，可以在“**<span style="color:red;">使用</span>泛型**”时代表一切类型；而E、T、K、V是在**定义泛型**的时候使用。

例如：BYD和Xiaomi是Car的子类

```java
public static void main(String[] args) {

    ArrayList<BYD> byds = new ArrayList<>();
    byds.add(new BYD());

    ArrayList<Xiaomi> xiaomis = new ArrayList<>();
    xiaomis.add(new Xiaomi());

    go(byds);
    go(xiaomis);
}

// 改成ArrayList<Car>也不行
// 因为虽然Xiaomi和BYD都是Car的子类，但是集合ArrayList<BYD>、ArrayList<Xiaomi>和ArrayList<Car>是没有继承关系的
public static void go(ArrayList<?> cars) {

}
```

注意：这里go方法参数不能用`ArrayList<T> cars`，因为`T`是在定义泛型时使用的，而**这里是在使用泛型**时，所以只能用通配符。

### 泛型的上下限

- 泛型上限：`? extends Car`：？能接收的必须是Car或者其子类
- 泛型下限：`? super Car`：？能接收的必须是Car或者其父类

通配符那个例子有个问题：我把狗类型数组也能丢进go方法。可以改成：

```java
public static void go(ArrayList<? extends Car> cars) {

}
```

### 泛型支持的类型

泛型**不支持八种基本数据类型**，**只能支持对象类型（引用数据类型）**。

这个会报错：

```java
ArrayList<int> list = new ArrayList<>();
list.add(1);
// 相当于Object x = 1;
// 而对象类型不能指向常量1
```

如果要接收整型，那就要用包装类

#### 包装类

包装类就是把基本类型的数据包装成对象类型。——万物皆对象

| 基本数据类型 | 对应的包装类（引用数据类型） |
| ------------ | ---------------------------- |
| byte         | Byte                         |
| short        | Short                        |
| **int**      | **Integer**                  |
| long         | Long                         |
| **char**     | **Character**                |
| float        | Float                        |
| double       | Double                       |
| boolean      | Boolean                      |

手工包装：

```java
// Integer i = new Integer(100); // 不推荐
Integer i = Integer.valueOf(100); // 提前创建好-127到128的对象，单例模式
Integer j = Integer.valueOf(100);
System.out.println(i == j); // true
```

#### 自动装箱/拆箱

自动装箱：基本数据类型可以自动转换为包装类型

自动拆箱：包装类型可以自动转换为基本数据类型

```java
// 自动装箱
Integer k = 100;
Integer l = 100;
System.out.println(k == l); // true

// 自动拆箱
int m = k;
System.out.println(m);

ArrayList<Integer> list = new ArrayList<>();
list.add(100); // 自动装箱

int n = list.get(0); // 自动拆箱
```

#### 包装类具备的其他功能

- 可以把基本数据类型的数据转换成字符串类型。

  ```
  public static String toString(double d)
  public String toString()
  ```

- 可以把字符串类型的数据转换成数值本身对应的真实数据类型。

  ```
  public static int parseInt(String s)
  public static Integer valueOf(String s)
  ```

示例：

```java
Integer i1 = 100;
String s = i1.toString(); // "100"
String s1 = Integer.toString(i1); // "100"

String s2 = "100";
Integer i2 = Integer.parseInt(s2); // 100
Integer i3 = Integer.valueOf(s2); // 100
```

