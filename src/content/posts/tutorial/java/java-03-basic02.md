---
title: Java 基本语法02
published: 2021-12-21
pinned: false
description: 本文介绍 Java 基本语法第二部分，你将学习到 Java 面向对象高级用法、常用 API、GUI 编程。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 基础, 教程, 面向对象, GUI]
category: Java 教程:从入门到精通
slug: tutorial-java-basic02
series: "Java 教程:从入门到精通"
seriesOrder: 3
---

# Java 基本语法--Part 2

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 基本语法第二部分，你将学习到 Java 面向对象高级用法、常用 API、GUI 编程。文章内容来自站主大学时期的课程笔记。

## 面向对象高级

### final关键字

- 修饰类：该类称为最终类，特点是不能被继承了。

  用处：修饰工具类

- 修饰方法：该方法称为最终方法，特点是不能被重写了。

- 修饰变量：该变量有且仅能被赋值一次。

  一般修饰静态成员变量和局部变量，而不修饰实例成员变量（没意义）

修饰变量的注意：

- final修饰基本类型的变量，变量存储的数据不能被改变。
- final修饰引用类型的变量（数组、对象），变量存储的地址不能被改变，但地址所指向对象的内容是可以被改变的。

### 常量

- 使用`static final`修饰的成员变量被称为常量。
- 作用：常用于记录系统的配置信息。
- 命名规范：使用大写英文字母，多个单词使用下划线连接起来。

优势：

- 代码可读性好，可维护性好。
- 程序编译后，常量会被“宏替换”：出现常量的地方全部会被替换为其存储的字面量，这样可以保证使用常量和直接使用字面量的性能是一样的。

### 单例类（设计模式）

架构师层面的技术。

- **设计模式**：一个问题通常有n种解法，其中有一种解法是最优的，这个最优的解法被人总结出来了，称之为设计模式。
- 设计模式有20种，对应20多种软件开发中会遇到的问题。
- 主要学什么：
  - 解决什么问题？
  - 怎么写设计模式？

**单例设计模式**：

作用：**确保某个类只能创建一个对象**。

形式：

- 饿汉式单例：在获取类的对象时，对象以及创建好了
  - 写法：
    - 把类的构造器私有。
    - 定义一个类变量记住类的一个对象。
    - 定义一个类方法，返回对象。
- 懒汉式单例：拿对象时，才开始创建对象
  - 写法：
    - 把类的构造器私有。
    - 定义一个私有静态变量用于存储对象。
    - 定义一个静态方法，保证返回的是同一个对象。
- 优缺点：
  - 饿汉式单例占内存，懒汉式单例第一次加载慢

好处：

- 在某些业务场景下，使用单例模式，可以避免浪费内存

#### 饿汉式单例

```java
public class A {
    // 2. 私有静态变量
    private static A a = new A();
    
    // 1. 构造器私有
    private A() {
    }
    
    // 3. 静态方法，保证返回的是同一个对象
    pubilc static A getInstance() {
        return a;
    }
}
```

使用：

```java
A a1 = A.getInstance();
```

#### 懒汉式单例

```java
public class B {
    // 2. 定义一个类变量记住类的一个对象
    // 写法1 final防止被篡改
    //public static final A a = new A();
    // 写法2
    private static B b;
    
    // 1. 构造器私有
    private B() {
    }
    
    // （对应写法2）定义一个类方法，返回对象
    pubilc static B getInstance() {
        if (b == null) {
            b = new B();
        }
        return b;
    }
}
```

### 枚举类

写法：

```java
修饰符 enmu 枚举类名 {
    名称1, 名称2, ... ;
    其他成员
}
```

特点：

- 枚举类都是最终类，不可以被继承，枚举类都是继承java.lang.Enum类的。

- **枚举类中的第一行，只能写枚举类的对象名称，且要用逗号隔开**。

- 这些名称，本质是常量，每个常量都记住了枚举类的一个对象。

- 枚举类的构造器是私有的（写不写都只能是私有的），因此，枚举类对外不能创建对象。（多例类）

  这样写就是单例类了：

  ```
  public enum A {
      X;
  }
  ```

- 编译器为枚举类新增了几个方法。

示例：

```java
// 枚举类 A.java
public enum A {
    X, Y, Z;
}
```

为了看到枚举类的真实面貌，需要编译--反编译：

- 编译：`javac A.java`

- 反编译：`javap A.class`

  ```
  Compiled from "A.java"
  public final class A extends java.lang.Enum<A> {
  	public static final A X = new A();
  	public static final A Y = new A();
  	public static final A Z = new A();
  	public static A[] values();
  	public static A valueOf(java.lang.String);
  	static {};
  }
  ```

使用：

```java
A a1 = A.X;
System.out.println(a1); // X
A a2 = A.X;
System.out.println(a2); // Y

System.out.println(a1.name()); // X
System.out.println(a2.name()); // Y
System.out.println(a1.ordinal()); // 索引 0
System.out.println(a2.ordinal()); // 索引 1
```

#### 应用场景

适合做信息的分类和标志。

示例：模拟上下左右移动

(1) 方法一：用常量。缺点：参数值不受约束

```java
public class Constant {
    public static final int UP = 0;
    public static final int DOWN = 1;
    public static final int LEFT = 2;
    public static final int RIGHT = 3;
}
```

```java
public static void main(String[] args) {
    move(Constant.UP);
    move(100); // 缺点：参数值不受约束，这样写没有意义
}

public static void move(int direction) {
    switch (direction) {
        case Constant.UP:
            System.out.println("向上移动");
            break;
        case Constant.DOWN:
            System.out.println("向下移动");
            break;
        ...
        default:
            System.out.println("输入有误");
    }
}
```

(2) 枚举类

```java
public class Direction {
    UP, DOWN, LEFT, RIGHT;
}
```

```java
public static void main(String[] args) {
    move(Direction.UP); // 只能用枚举类
}

public static void move(Direction direction) {
    switch (direction) {
        case Direction.UP:
            System.out.println("向上移动");
            break;
        case DOWN: // 可以省略Direction
            System.out.println("向下移动");
            break;
        case LEFT:
            System.out.println("向左移动");
            break;
        case RIGHT:
            System.out.println("向右移动");
            break;
    }
}
```

### 抽象类

abstract关键字

- 修饰类，就是抽象类。
- 修饰方法，就是抽象方法。只有方法签名，不能有方法体

注意事项：

- 抽象类中不一定要有抽象方法，**有抽象方法的类必须是抽象类**。
- 类有的成员（成员变量、方法、构造器）抽象类都可以有。
- 抽象类最主要的特点：**抽象类不能创建对象，仅作为一种特殊的父类，让子类继承并实现**。
- 一个类继承抽象类，必须重写完抽象父类的全部抽象方法，否则这个类也必须定义为抽象类。

```java
public abstract class A {
    public abstract void test();
}
```

好处：

- 父类知道每个子类都要做某个行为，但每个子类要做的情况不一样，父类就定义成抽象方法，交给子类去重写实现。设计这样的类就是为了更好的支持多态。

#### 模板方法设计模式

提供一个方法作为完成某类功能的模板，模板方法封装了每个实现步骤，但允许子类提供特定步骤的实现。

示例：

```java
public abstract class person {
    public void write() {
        System.out.println("标题");
        // 正文 给子类自己实现
        writeMain();
        System.out.println("结尾");
    }
    
    public abstract void writeMain();
}
```

优雅一点：建议使用final关键字修饰模板方法，为什么？

- 模板方法是给子类直接使用的，不能被重写。一旦子类重写模板方法，模板方法就失效了

### 接口

interface关键字

- 接口不能创建对象
- 接口是用来被类**实现（inplements）**的，实现接口的类称为**实现类**，**一个类可以同时实现多个接口**。
- 实现类实现多个接口时，必须实现全部接口的抽象方法，否则必须定义为抽象类。

```
public interface 接口名 {
    // 成员变量（常量）
    // 成员方法（抽象方法）
}
```

- 常量：接口中定义常量可以省略`public static final`，默认会加上
- 抽象方法：接口中定义抽象方法可以省略`public abstract`。

```java
public interface A {
    // public static final String NAME = "黑马";
    String NAME = "黑马";
    
    // public abstract void run();
    void run();
}
```

```java
public class C implements A,B {
    ...
}
public class D implements A {
    ...
}
```

```java
A a1 = new C();
A a2 = new D();
```

好处：

- 弥补了类单继承的不足，一个类同时可以实现多个接口，使类的角色更多，功能更强大。
- 让程序可以面向接口编程，这样程序员就可以灵活方便地切换各种业务实现（更便于程序的解耦合）。

#### JDK8开始新增的三种方法

- **默认方法**（普通实例方法）：使用default修饰，默认会加上public修饰

  只能使用接口的实现类对象调用（因为接口不能创建对象）。

- **私有方法**（普通私有方法）：用private修饰（JDK9开始）

  只能使用接口种其他实例方法来调用。

- **类方法**（静态方法）：使用static修饰，默认会加上public修饰

  只能使用接口名调用。

```java
public interface A {
    default void test1() {
        ...
    }
    private void test2() {
        ...
    }
    static void test3() {
        ...
    }
}
```

自己基本上用不到，是sun公司自己用的多

- 增强了接口能力，更便于项目的扩展和维护。（例如项目写好了，突然要在接口里加一个功能，那就可以定义上面的三种方法，子类就不用改了）

#### 接口的注意事项

1. 接口与接口可以多继承：一个接口可以同时继承多个接口。【重点】

   - 好处：本来是这样`class D implements A,B,C {}`，现在可以：

     ```
     interface C extends B, A {} // ABC都是接口
     class D implements C {}
     ```

2. 一个接口继承多个接口，如果多个接口中存在方法签名冲突，则此时不支持多继承，也不支持多实现。（例如不能多个接口有同名方法，且方法返回值不一样）

3. 一个类继承了父类，有同事实现了接口，如果父类中和接口中有同名的默认方法，实现类会优先用父类的。

   实在要用接口的，需要在子类中转一下（用接口名调用）

4. 一个类实现了多个接口，如果多个接口中存在同名的默认方法，也会冲突。

   实在要不冲突，这个类重写该方法即可。

### 抽象类Vs接口的区别

相同点：

1. 都是抽象形式：都可以有抽象方法，都不能创建对象。
2. 都是派生子类形式：抽象类是被子类继承使用，接口是被实现类实现。
3. 一个类继承抽象类，或者实现接口，都必须重写完它们的抽象方法，否则自己要成为抽象类。
4. 都能支持多态，都能实现解耦合。

不同点：

1. 抽象类中可以定义类的全部普通成员，接口只能定义常量、抽象方法（、JDK8后新增的三种方式）。
2. 抽象类只能被类单继承，接口可以被类多实现。
3. 一个类继承抽象类就不能再继承其他类，一个类实现类接口还可以继承其他类或实现其他接口。
4. 抽象类体现模板思想：更利于做父类，实现代码的复用性。
5. 接口更适合做功能的解耦合：解耦合性更强更灵活。

### 代码块

类中5大成分：成员变量、构造器、方法、代码块、内部类。

静态、实例代码块

#### 静态代码块

- 格式：`static{}`
- 特点：类加载时自动执行，由于类智慧加载一次，所以静态代码块也会执行一次。
- 作用：完成类的初始化，例如：对静态变量的初始化赋值。

```java
public class StaticBlock {
    public static String[] cards = new String[54];
    
    public static void main(String args[]) {
        System.out.println("--main--");
    }
    static {
        System.out.println("--static--");
        cards[0] = "A";
        cards[1] = "B";
        ...
    }
}
// --static--
// --main--
```

上面的对cards数组的赋值也可以放到main中，但是这样写逼格高。

#### 实例代码块

也叫构造代码块。

- 格式：`{}`
- 特点：每次创建对象时，执行实例代码块，并在构造器前执行。（不加static属于对象）
- 作用：和构造器一样，都是用来完成对象的初始化的，例如：对实例变量进行初始化赋值。

```java
public class InstanceBlock {
    public String[] cards = new String[54]; // 不加static是实例变量
    
    {
        System.out.println("--Instance--");
        cards[0] = "A";
        cards[1] = "B";
        ...
    }
    public static void main(String args[]) {
        System.out.println("--main--");
        new InstanceBlock();
    }
}
// --main--
// --Instance--
```

### 内部类

- 如果一个类定义在另一个类内部，这个类就是内部类。
- 场景：当一个类的内部，包含了一个完整的事物，且这个事物没有必要单独设计时，就可以把这个事物设计成内部类。

#### 成员内部类

就是类中的一个普通成员，类似前面我们学过的普通成员变量、成员方法。

- 无static修饰，属于**外部类的对象持有**。
- 创建方式：`外部类名称.内部类名称 对象名 = new 外部类名称().new 内部类名称();`
- 可以拥有成员变量、成员方法、构造器等，可以（被）继承

```java
public class Outer {
    
    public class Inner {
        ...
    }
}
```

```java
// 使用
Outer.Inner oi = new Outer().new Inner();
```

成员内部类访问外部类成员的特点（扩展）：

- 成员内部类中可以直接访问外部类的静态成员 和 实例成员。
- 成员内部类的实例方法中，可以拿到当前寄生的外部类对象：`外部类名.this`

#### 静态内部类

- 有static修饰的内部类，属于**外部类自己持有**。
- 创建方式：`外部类名.内部类名 对象名 = new 外部类.内部类();`

```java
public class Outer {
    
    public static class Inner {
        ...
    }
}
```

```java
// 使用
Outer.Inner oi = new Outer.Inner();
```

静态内部类访问外部类成员的特点：

- 静态内部类中 可以 直接访问外部类的静态成员。
- 静态内部类中 不可以 直接访问外部类的实例成员（可以间接：创建外部类对象访问）。

#### 局部内部类

- 定义在方法中、代码块中、构造器等执行体中。

鸡肋语法，只有特殊的局部内部类——匿名内部类有用。

```java
public class Test {
    
    public static void go() {
        class Local1 {
            ...
        }
        abstract class Local2 {
            ...
        }
        interface Local3 {
            ...
        }
    }
}
```

#### 匿名内部类

##### 认识

- 一种特殊的局部内部类。
- 所谓匿名：指的是程序员不需要为这个类声明名字，默认有一个隐藏的名字。
- **特点**：本质是一个子类，并会立即创建出一个子类对象（既是一个类也是一个子类对象）。
- **作用**：用于更方便地创建一个子类对象。

```java
new 类活接口(参数值...) {
    类体（一般是方法重写）
};
```

示例：

```java
public abstract class Animal {
    public abstract void cry();
}
```

原来需要用子类Cat重写父类Animal，才能实例化子类。

现在直接用匿名内部类，直接重写父类方法即可创建对象：

```java
public class HelloWorld {
    public static void main(String[] args) {

        Animal a = new Animal() {
            @Override
            public void cry() {
                System.out.println("miao~");
            }
        };
    }
}
```

- 匿名内部类实际是有名字的，在编译后的工程文件夹`out/production/01-basic/com/itheima/helloworld`下，名字是`外部类名$编号.class`——证明是一个类。
- 反编译回去发现它继承了Animal——证明是一个子类。

##### 使用形式

- 通常作为一个对象参数传给方法。

示例：

原来是这样：

```java
public class HelloWorld {
    public static void main(String[] args) {

        Swin student = new Student();
        start(student);
    }

    public static void start(Swin swin) {
        swin.swining();
    }
}

class Teacher implements Swin {
    @Override
    public void swining() {
        System.out.println("老师游泳");
    }
}

class Student implements Swin {
    @Override
    public void swining() {
        System.out.println("学生游泳");
    }
}
interface Swin {
    void swining();
}
```

现在：（对象回调）

```java
public class HelloWorld {
    public static void main(String[] args) {

        // 写法1
        Swin student = new Swin() {
            @Override
            public void swining() {
                System.out.println("学生游泳");
            }
        };
        start(student);
        
        // 写法2
        start(new Swin() {
            @Override
            public void swining() {
                System.out.println("老师游泳");
            }
        });
    }

    public static void start(Swin swin) {
        swin.swining();
    }
}

interface Swin {
    void swining();
}
```

##### 应用场景

- 调用别人提供的方法实现需求时，这个方法正好可以让我们传输一个匿名内部类对象给其使用。
- （不是我们主动写匿名内部类，而是用别人的功能的时候，别人可以让我们用，我们才用）

**示例1**：创建一个登录窗口，窗口上只有一个登录按钮（安卓好多这种）

```java
public static void main(String[] args) {

    // 创建一个登录窗口，窗口上只有一个登录按钮
    JFrame win = new JFrame();
    win.setSize(300, 200);
    win.setTitle("登录窗口");
    win.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // 点击×时退出程序

    JPanel p = new JPanel();
    JButton btn = new JButton("登录");

    p.add(btn);
    win.add(p);

    btn.addActionListener(new AbstractAction() {
        @Override
        public void actionPerformed(ActionEvent e) {
            System.out.println("登录按钮被点击了");
        }
    });
    //btn.addActionListener(e -> {
    //    System.out.println("登录");
    //});
    //btn.addActionListener(e -> System.out.println("登录"));
    win.setVisible(true);
}
```

> btn.addActionListener方法接收一个接口实现类对象，在这个对象里写点击按钮后要执行的动作。该实现类要自己写。
>
> 所以可以用匿名内部类。

**示例2**：排序

```java
public static void main(String[] args) {
    Student[] students = new Student[5];
    students[0] = new Student("张三", 18);
	...

    // 按年龄升序排序
    // public static <T> void sort(T[] a, Comparator<? super T> c)
    // Comparator是一个接口，需要实现compare方法
    Arrays.sort(students, new Comparator<Student>() {
        @Override
        public int compare(Student o1, Student o2) {
            // 如果左边 > 右边，需要返回正整数
            // 左边 < 右边，返回负整数
            // 左边 == 右边，返回0
            return o1.getAge() - o2.getAge();
        }
    });
    
    // Arrays.sort(students, (o1, o2) -> o1.getAge() - o2.getAge());
}
```

### 函数式编程

- 此“函数”类似于数学中的函数（强调做什么）。

#### Lambda表达式

- JDK8开始新增的语法形式，它表示函数
- 使用Lambda函数替代某些匿名内部类对象，从而让程序代码更简洁、可读性更好。

```
(被重写方法的形参列表) -> {
	被重写方法的方法体
}
```

注意：

- Lambda表达式**只能替代函数式接口的匿名内部类**！

- **函数式接口**：**有且仅有一个抽象方法**的**接口**。

  可以用注解`@FunctionalInterface`约束一下

**省略规则**：

- 参数类型全部可以省略不写。

- 如果只有一个参数，参数类型省略的同时“`()`”也可以省略；但多个参数时不能省略“`()`”。

- 如果Lambda表达式中只有一行代码，大括号可以不写，同时要省略分号“`;`”，如果这行代码是return语句，也必须去掉return。

  ```java
  Arrays.sort(students, (o1, o2) -> o1.getAge() - o2.getAge());
  ```

```java
public class HelloWorld {
    public static void main(String[] args) {
        Swim swim = () -> {
                System.out.println("游泳");
        };
    }

}
@FunctionalInterface
interface Swim {
    void swimming();
}
```

#### 方法引用`::`

用来进一步简化Lambda表达式。

##### 静态方法引用

```
类名::静态方法
```

使用场景：

- 如果某个Lambda表达式只是调用一个静态方法，并且“`->`”前后参数的形式一致，就可以使用静态方法引用。

```java
// Student类的静态方法
public static int compareAge(Student s1, Student s2){
    return s1.age - s2.age;
}
```

```java
// Arrays.sort(students, (s1, s2) -> Student.compareAge(s1, s2));

Arrays.sort(students, Student::compareAge);
```

##### 实例方法引用

```
对象名::实例方法
```

使用场景：

- 如果某个Lambda表达式只是通过对象名称调用一个实例方法，并且“`->`”前后参数的形式一致，就可以使用实例方法引用。

```java
// Student类的实例方法
public int compareAge(Student s1, Student s2){
    return s1.age - s2.age;
}
```

```java
Student t = new Student();
//  Arrays.sort(students, (s1, s2) -> t.compareAge(s1, s2));

Arrays.sort(students, t::compareAge);
```

##### 特定类型的方法引用

```
特定类的名称::方法
```

使用场景：

- 如果某个Lambda表达式只是调用一个特定类型（例如String）的实例方法，并且前面参数列表中的第一个参数是作为方法的主调，后面的所有参数都是作为该实例方法的入参的，就可以使用实例方法引用。

```java
String[] names = {"Jack", "Rose", "Tom", "jrry", "Lucy", "Mary"};
// Arrays.sort(names, (s1, s2) -> s1.compareToIgnoreCase(s2));
Arrays.sort(names, String::compareToIgnoreCase);
```

##### 构造器引用

```
类名::new
```

使用场景：

- 如果某个Lambda表达式只是在创建对象，并且“`->`”前后参数的形式一致，就可以使用实构造器引用。

```java
interface Factory<P> {
    Car getCar(String name);
}
@Data
@AllArgsConstructor
class Car {
    private String name;
}
```

```java
public static void main(String[] args) {

    // 写法1
    Factory factory1 = new Factory() {
        @Override
        public Car getCar(String name) {
            return new Car(name);
        }
    };
    // 写法2
    Factory factory2 = name -> new Car(name);
    // 构造器引用
    Factory factory3 = Car::new;
}
```

## 常用API

### String

方式一：Java程序中的所有字符串文字（例如“abc”）都为此类的对象。

```java
String str = "hello world";
System.out.println(str.length()); // 11
```

方式二：调用String类的构造器初始化字符串对象。

| 构造器                         | 说明                                   |
| ------------------------------ | -------------------------------------- |
| public String()                | 创建一个空白字符串对象，不含有任何内容 |
| public String(String original) | 根据传入的字符串内容，来创建字符串对象 |
| public String(char[] chars)    | 根据字符数组的内容，来创建字符串对象   |
| public String(byte[] bytes)    | 根据字节数组的内容，来创建字符串对象   |

```java
// 都不推荐
String str2 = new String(); // String str3 = "";
String str4 = new String("hello world");

// 有时候会用到要转成字符串
char[] chars = {'a', 'b', 'c'};
String str5 = new String(chars);

byte[] bytes = {97, 98, 99};
String str6 = new String(bytes);
```

区别：

- 只要是以双引号方式写出的字符串对象，会存储到字符串常量池（堆中），且相同的字符串只存储一份。

  ```java
  String str = "hello world";
  String str2 = "hello world";
  System.out.println(str == str2); // true
  ```

- 通过new方式创建的字符串对象，每new一次都会产生一个新的对象放在堆内存中。

注意：

字符串对比时，使用`==`比较的是地址，一般是用`equal`方法，只比较内容：

```
str.equals(str2)
```

### ArrayList动态数组

是一个集合（动态数组）。

- 数组定义完并启动后，长度就固定了。
- 集合大小可变，功能丰富，开发中用的多。

| 常用方法名                            | 说明                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| public boolean add(E e)               | 将指定元素添加到刺激和的末尾                         |
| public void add(int index, E element) | 将刺激和中的指定位置插入新元素                       |
| public E get(int index)               | 获取指定索引处的元素                                 |
| public int size()                     |                                                      |
| public E remove(int index)            | 根据索引删除，返回被删除元素                         |
| public boolean remove(Object o)       | 删除指定元素，返回是否删除成功                       |
| public E set(int index, E element)    | 修改指定索引处的元素，返回被修改的元素（原来的元素） |

## GUI编程（已过时，按需学习）

- GUI，全称Graphical User Interface，是指图形用户界面
- 通过图形元素（窗口、按钮、文本框等）于用户交互
- 于命令行（CLI）相比，GUI更加直观、友好

Java的GUI编程包：

- AWT（Abstract Window Toolkit）
  - 提供了一组元素的GUI组件，依赖于操作系统的本地窗口系统（只适用于windows电脑）
- **Swing**
  - 基于AWT，提供了更丰富的GUI组件，轻量级组件，不依赖于本地窗口系统（Windows和Mac都能用）

### 常用的Swing组件

- JFrame：窗口
- JPanel：用于组织其他组件的容器
- JButton：按钮组件
- JTextField：输入框
- JTable：表格
- ...

### 常用的布局管理器

布局管理器：可以决定组件在容器中的布局方式，避免了手动设置每个组件的位置和大小，从而简化了GUI设计过程。

- FlowLayout：水平布局
- BorderLayout：四角和中间布局
- GridLayout：网格布局
- BoxLayout：X和Y轴布局（Y——竖着）

### 事件处理

事件处理是通过事件监听器（Event Listener）来完成的

- 点击事件监听器 ActionListener

- 按键事件监听器 KeyListener

  - 要让窗口成为焦点，否则无法监听键盘事件:`jf.requestFocus();`

    ```java
    jf.addKeyListener(new KeyAdapter() {
    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode();
        if (keyCode == KeyEvent.VK_UP) {
            System.out.println("向上");
        }else if (keyCode == KeyEvent.VK_DOWN) {
            System.out.println("向下");
        } else if (keyCode == KeyEvent.VK_LEFT) {
            System.out.println("向左");
        } else if (keyCode == KeyEvent.VK_RIGHT) {
            System.out.println("向右");
        }
    }
    });
    
    jf.setVisible(true);
    // 让窗口成为焦点，否则无法监听键盘事件
    jf.requestFocus();
    ```

- 鼠标行为监听器 MouseListener

- ...

### 事件的几种常见写法

1. 直接提供实现类，用于创建事件监听对象。

   ```java
   // 点击事件监听
   jb.addActionListener(new MyActionListener(jf));
   ```

   ```java
   class MyActionListener implements ActionListener {
       private JFrame jf;
       public MyActionListener(JFrame jf) {
           this.jf = jf;
       }
       @Override
       public void actionPerformed(ActionEvent e) {
           JOptionPane.showMessageDialog(jf, "点击了登录按钮"); // 弹窗
       }
   }
   ```

2. 直接使用匿名内部类的对象，代表事件监听对象。

   ```java
   jb.addActionListener(new AbstractAction() {
   @Override
   public void actionPerformed(ActionEvent e) {
       JOptionPane.showMessageDialog(jf, "点击了登录按钮");
   }
   });
   ```

3. **自定义窗口，让窗口对象实现事件接口（让界面本身成为事件监听器对象）**。每个界面都是独立的对象，更优雅。

   ```java
   class LoginFrame extends JFrame implements ActionListener{
       private JButton loginButton;
   
       public LoginFrame(){
           init();
           // setVisible(true);
       }
   
       private void init(){
           setTitle("登录界面");
           setSize(400,300);
           setLocationRelativeTo(null);
           setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
   
           JPanel panel = new JPanel();
           loginButton = new JButton("登录");
           loginButton.addActionListener(this); // 添加监听器（this本身是ActionListener）
   
           panel.add(loginButton);
           this.add(panel);
       }
       @Override
       public void actionPerformed(ActionEvent e) {
           JOptionPane.showConfirmDialog(this, "欢迎回来");
       }
   }
   ```

   ```java
   public class HelloWorld {
       public static void main(String[] args) {
           LoginFrame loginFrame = new LoginFrame();
           loginFrame.setVisible(true);
       }
   }
   ```

