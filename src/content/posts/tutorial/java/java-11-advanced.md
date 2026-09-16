---
title: Java 高级技术
published: 2021-12-29
pinned: false
description: 本文介绍 Java 高级技术，你将学习到 Java 单元测试、反射、注解和动态代理的知识。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 高级, 教程, 反射, 注解, 动态代理]
category: Java 教程:从入门到精通
slug: tutorial-java-advanced
series: "Java 教程:从入门到精通"
seriesOrder: 11
---

# Java 高级技术

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 高级技术，你将学习到 Java 单元测试、反射、注解和动态代理的知识。文章内容来自站主大学时期的课程笔记。

源码、框架、架构师层面的技术

## 单元测试

就是针对最小的功能单元：方法，编写测试代码对其进行正确性测试、

> 咱们之前是如何进行单元测试的?有啥问题?
> 只能在main方法编写测试代码，去调用其他方法进行测试。
> 无法实现自动化测试，一个方法测试失败，可能影响其他方法的测试
> 无法得到测试的报告，需要程序员自己去观察测试是否成功。

可以用来对方法进行测试，它是第三方公司开源出来的（很多开发工具已经集成了Junit框架，比如IDEA）

优点：

- 可以灵活的编写测试代码，可以针对某个方法执行测试，也支持一键完成对全部方法的自动化测试，且各自独立
- 不需要程序员去分析测试的结果，会自动生成测试报告出来。

**步骤**：

1. 将Junit4框架的jar包导入到项目中（IDEA集成了Junit框架，不需要我们自己手工导入了）
2. **为需要测试的业务类，定义对应的测试类**，并为每个业务方法，编写对应的测试方法（必须：**公共、无参、无返回值**）
3. 测试方法上必须声明**@Test注解**，然后在测试方法中，编写代码，调用被测试的业务方法进行测试
4. 开始测试：选中测试方法，右键选择“JUnit运行”，如果测试通过则是绿色；如果测试失败，则是红色（如果没有开始按钮，重启idea）

示例：

一开始是错误的代码：

```java
public class StringUtil {
    // 字符串长度
    public static void printNumber(String str) {
        System.out.println(str.length());
    }
    // 求字符串最大索引
    public static int maxIndex(String str) {
        if (str == null) return -1;
        return str.length();
    }
}
```

测试类：

```java
public class StringUtilTest {

    @Test
    public void testPrintNumber() {
        // 测试用例要完整
        StringUtil.printNumber("123abc");
        StringUtil.printNumber("");
        StringUtil.printNumber(null);
    }
    @Test
    public void testMaxIndex() {
        int maxIndex1 = StringUtil.maxIndex("abc123");
        System.out.println(maxIndex1);
        int maxIndex2 = StringUtil.maxIndex("");
        System.out.println(maxIndex2);
        int maxIndex3 = StringUtil.maxIndex(null);
        System.out.println(maxIndex3);

        // 断言
        // assert maxIndex1 == 5;
        Assert.assertEquals("求最大索引有问题", 5, maxIndex1);
        Assert.assertEquals("求最大索引有问题", -1, maxIndex2);
        Assert.assertEquals("求最大索引有问题", -1, maxIndex3);
    }
}
```

发现错误并修改后：

```java
public class StringUtil {
    public static void printNumber(String str) {
        if (str == null) {
            System.out.println("参数为空");
            return;
        }
        System.out.println(str.length());
    }

    // 求字符串最大索引
    public static int maxIndex(String str) {
        if (str == null || str.equals("")) return -1;
        return str.length() - 1;
    }
}
```

## 反射

定义：先加载类，并允许以编程的方式解剖类中的各种成分（成员变量、方法、构造器等）

学什么？

学习获取类的信息、操作它们

1. 反射第一步：加载类，获取类的字节码：Class对象
2. 获取类的构造器：Constructor对象
3. 获取类的成员变量：Field对象
4. 获取类的成员方法：Method对象

### 1 加载类

获取Class对象的三种方式：

1. `Class c1=类名.class`
2. 调用Class提供方法：`public static Class forName(String package);`
3. 0bject提供的方法：`public Class getClass();` 例如`Class c3=对象.getClass();`

示例：

```java
// 1. 获取类对象
Class c1 = Student.class;

// 2. forName
Class c2 = null;
try {
    c2 = Class.forName("com.itheima.helloworld.Student");
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}

// 3. getClass
Student s = new Student();
Class c3 = s.getClass();

System.out.println(c1 == c2); // true
System.out.println(c1 == c3); // true
```

### 2 获取类的成分并操作

- Class提供了从类中**获取构造器**的方法

| 方法                                                         | 说明                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| Constructor<?>[] getConstructors()                           | 获取全部构造器(只能获取public修饰的) |
| Constructor<?>[] getDeclaredConstructors()                   | 获取全部构造器(只要存在就能拿到)     |
| Constructor\<T> getConstructor(Class<?>... parameterTypes)   | 获取某个构造器(只能获取public修饰的) |
| Constructor\<T> getDeclaredConstructor(Class<?>...parameterTypes) | 获取某个构造器(只要存在就能拿到)     |

获取到构造器的作用：依旧是创建对象：

| Constructor提供的方法                   | 说明                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| T new Instance(Object...initargs)       | 调用此构造器对象表示的构造器，并传入参数，完成对象的初始化并返回 |
| public void setAccessible(boolean flag) | 设置为true，表示禁止检查访问控制(暴力反射)                   |

- Class提供了从类中**获取成员变量**的方法

| 方法                                       | 说明                                       |
| ------------------------------------------ | ------------------------------------------ |
| public Field[] getFields()                 | 获取类的全部成员变量(只能获取public修饰的) |
| public Field[] getDeclaredFields()         | 获取类的全部成员变量(只要存在就能拿到)     |
| public Field getField(string name)         | 获取类的某个成员变量(只能获取public修饰的) |
| public Field getDeclaredField(string name) | 获取类的某个成员变量(只要存在就能拿到)     |

获取到成员变量的作用：依然是赋值、取值。

| 方法                                    | 说明     |
| --------------------------------------- | -------- |
| void set(object obj,object value)       | 赋值     |
| Object get(object obj)                  | 取值     |
| public void setAccessible(boolean flag) | 暴力反射 |

- Class提供了从类中**获取成员方法**的API

| 方法                                                         | 说明                                       |
| ------------------------------------------------------------ | ------------------------------------------ |
| Method[] getMethods()                                        | 获取类的全部成员方法(只能获取public修饰的) |
| Method[] getDeclaredMethods()                                | 获取类的全部成员方法(只要存在就能拿到)     |
| Method getMethod(string name, Class<?>...parameterTypes)     | 获取类的某个成员方法(只能获取public修饰的) |
| Method getDeclaredMethod(String name,Class<?>... parameterTypes) | 获取类的某个成员方法(只要存在就能拿到)     |

成员方法的作用：依然是执行

| Method提供的方法                                | 说明                       |
| ----------------------------------------------- | -------------------------- |
| public Object invoke(object obj,object... args) | 触发某个对象的该方法执行。 |
| public void setAccessible(boolean flag)         | 暴力反射                   |



示例：

```java
// 反射 获取类的信息
Class c1 = Student.class;
System.out.println(c1.getName());
System.out.println(c1.getSimpleName());

// 1.获取构造器
Constructor[] cons = c1.getDeclaredConstructors();// 获取所有的无参构造器
Constructor cons1 = c1.getDeclaredConstructor(String.class, int.class);// 获取指定参数的构造器
// 作用
cons1.setAccessible(true); // 临时设置(私有)构造器可访问(暴力反射)
Student s = (Student) cons1.newInstance("张三", 18);

// 2.获取成员变量
Field[] fields = c1.getDeclaredFields(); // 获取所有的成员变量
Field field = c1.getDeclaredField("age"); // 获取指定成员变量
// 作用
field.setAccessible(true);
field.set(s, 19);
System.out.println(s.getName() + ":" + s.getAge());

// 3.获取方法
Method[] methods = c1.getDeclaredMethods(); // 获取所有的方法
Method method = c1.getDeclaredMethod("setName", String.class); // 获取指定有参方法
// 作用
method.setAccessible(true);
method.invoke(s, "李四");
```

### 反射的作用

- 可以得到一个类的全部成分然后操作。

- 可以破坏封装性。

- 可以绕过泛型的约束

  ```JAVA
  // 反射 绕过泛型的约束
  ArrayList<String> list = new ArrayList<>();
  list.add("hello");
  
  Class<? extends ArrayList> cls = list.getClass();
  // 获取add方法
  Method add = cls.getMethod("add", Object.class);
  add.invoke(list, 100);
  ```

- **最重要的用途是**：
  **适合做Java的框架**，基本上，**主流的框架都会基于反射设计出一些通用的功能**。

  > 面试问你：sprintboot原理是什么：反射肯定有



示例，**做一个简易的框架**：

需求：对于任意一个对象，**该框架都可以把对象的字段名和对应的值，保存到文件中去**。

1. 定义一个方法，可以接收任意对象。
2. 每收到一个对象后，使用反射获取该对象的Class对象，然后获取全部的成员变量
3. 遍历成员变量，然后提取成员变量在该对象中的具体值。
4. 把成员变量名、和其值，写出到文件中去即可，

```java
public static void saveObject(Object o) throws Exception {
    PrintStream ps = new PrintStream(new FileOutputStream("01-basic\\src/object.txt", true));
    // 只有反射可以知道对象有多少个字段
    // 1. 获取Class对象
    Class c = o.getClass();
    ps.println("=========" + c.getSimpleName() + "==========");
    // 2. 获取所有字段
    Field[] fields = c.getDeclaredFields();
    for (Field f : fields) {
        // 3. 获取字段名
        String fieldName = f.getName();
        // 4. 获取字段值
        Object fieldValue = null;
        try {
            f.setAccessible(true);
            fieldValue = f.get(o);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        // 5. 保存到数据库
        ps.println(fieldName + ":" + fieldValue);
    }
}
```

```java
Student s = new Student("张三", 18, "深圳", 5000.0);
Xiaomi xiaomi = new Xiaomi();

SaveObject.saveObject(s);
SaveObject.saveObject(xiaomi);
```

## 注解

- 就是Java代码里的特殊标记，比如:@Override、@Test等

- 作用是：让其他程序根据注解信息来决定怎么执行该程序。

- 注解可以用在类上、构造器上、方法上、成员变量上、参数上、等位置处。

### 自定义注解

```
public @interface 注解名称{
	public 属性类型 属性名() default 默认值;
}
```

```java
public @interface MyBook {
    String name();
    int aga() default 18;
    String[] address();
}
```

使用：在方法、类...上面加：

````java
@MyBook(name = "java", aga = 19, address = {"深圳", "北京"})
````

### 特殊属性名：value

- 如果**注解中只有一个value属性**，**使用注解时，value名称可以不写**。
- 或者**其他属性给了默认值**，那么也可以只写一个value的属性值，而不写value名称。

```java
public @interface A {
    String value();
}
```

使用：

```java
@A(value = "hello") 或者
@A("hello")
```

### 原理

- 本质上是一个接口继承了Annotation类，属性其实是抽象方法

- 使用@注解(...)：其实就是一个实现类对象，实现了该注解以及Annotation接口

### 元注解

指的是：注解注解的注解。（套娃）

1. **@Target**
   作用：**声明被修饰的注解只能在哪些位置使用**

   ```java
   @Target(xxx) // 只有一个value属性, 是枚举类型
   ```

   > 1. TYPE，（只能修饰）类，接口
   > 2. FIELD，成员变量
   > 3. METHOD，成员方法
   > 4. PARAMETER，方法参数
   > 5. CONSTRUCTOR，构造器
   > 6. LOCAL VARIABLE，局部变量

   例如：

   ```java
   // @Target(ElementType.METHOD)
   @Target({ElementType.TYPE, ElementType.FIELD})
   public @interface A {
       String value();
   }
   ```

2. **@Retention**
   作用：声明注解的保留周期。

   ```
   @Retention(RetentionPolicy.RUNTIME)
   ```

   > 1. SOURCE
   >    只作用在源码阶段，字节码文件中不存在。
   > 2. CLASS(默认值)
   >    保留到字节码文件阶段，运行阶段不存在。
   > 3. RUNTIME(开发**常用**)
   >    一直保留到运行阶段。

### 注解的解析

- 就是判断类上、方法上、成员变量上是否存在注解，并把注解里的内容给解析出来。

如何解析注解？

- 要解析谁上面的注解，就应该先拿到谁。
  比如要解析类上面的注解，则应该先获取该类的Class对象，再通过Class对象解析其上面的注解。
- Class 、Method、Field,Constructor、都实现了AnnotatedElement接口，它们都拥有解析注解的能力

| AnnotatedElement接口提供了解析注解的方法                     | 说明                           |
| ------------------------------------------------------------ | ------------------------------ |
| public Annotation[] getDeclaredAnnotations()                 | 获取当前对象上面的全部注解。   |
| public T getDeclaredAnnotation(Class\<T>annotationClass)     | 获取指定的注解对象             |
| public boolean isAnnotationPresent(Class\<Annotation> annotationclass) | 判断当前对象上是否存在某个注解 |

示例——需求：

1. 定义注解MyTest，要求如
   包含属性:String value()
   包含属性:double aaa()，默认值为 100
   包含属性:String bbb()
   限制注解使用的位置:类和成员方法上
   指定注解的有效范围:一直到运行时

   ```java
   @Target({ElementType.TYPE, ElementType.METHOD})
   @Retention(RetentionPolicy.RUNTIME)
   public @interface MyTest {
       String value();
       double aaa() default 100;
       String bbb();
   }
   ```

2. 定义一个类叫:Demo，在类中定义一个test1方法，并在该类和其方法上使用MyTest注解

   ```java
   @MyTest(value = "jjy", bbb = "123")
   public class Demo {
       @MyTest(value = "jjy2", bbb = "1232")
       public void test1(){
           System.out.println("test1");
       }
   }
   ```

3. 定义AnnotationTest3测试类，解析Demo类中的全部注解。

   ```java
   // 1.获取Class对象
   Class clazz = Demo.class;
   
   // 是否有注解
   if (clazz.isAnnotationPresent(MyTest.class)) {
       // 2.获取类上面的MyTest注解
       MyTest mt = (MyTest) clazz.getDeclaredAnnotation(MyTest.class);
       System.out.println(mt.value());
       System.out.println(mt.bbb());
   
       // 3.获取类上面的全部注解，并遍历
       Annotation[] annotations = clazz.getAnnotations();
       for (Annotation a : annotations) {
           System.out.println(a);
       }
       // 4. 获取方法上面的注解
       Method[] methods = clazz.getDeclaredMethods();
       for (Method m : methods) {
           if (m.isAnnotationPresent(MyTest.class)) {
               MyTest mt2 = m.getDeclaredAnnotation(MyTest.class);
               System.out.println(mt2.value());
               System.out.println(mt2.bbb());
           }
       }
   }
   ```

### 注解的应用场景

使用注解开发出一个简易版的Junit框架。

属性的作用：例如规定该程序运行几次等

需求：

- 定义若干个方法，只要加了MyTest注解，就会触发该方法执行。

分析：invoke

1. 定义一个自定义注解MyTest，只能注解方法，存活范围是一直都在。
2. 定义若干个方法，部分方法加上@MyTest注解修饰，部分方法不加。
3. 模拟一个junit程序，可以触发加了@MyTest注解的方法执行。

```java
public class AnnotationDemo {
    public static void main(String[] args) {
        // 模拟一个junit程序，可以触发加了@MyTest注解的方法执行
        Class c = AnnotationDemo.class;
        Method[] methods = c.getDeclaredMethods();
        for (Method m : methods) {
            if (m.isAnnotationPresent(MyTest.class)) {
                try {
                    m.invoke(new AnnotationDemo()); // 出发某个对象的该方法执行
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    @MyTest
    public void test1(){
        System.out.println("test1");
    }

    public void test2(){
        System.out.println("test2");
    }

    @MyTest
    public void test3(){
        System.out.println("test3");
    }
}
```

## 动态代理

### 认识动态代理

- 目标对象如果嫌身上干的事太多的话可以通过代理来转移部分职责。

- 目标对象有什么方法想被代理，代理就一定要有对应的方法。

- 中介如何知道要派有唱歌、跳舞方法的代理呢?

  接口

如何创建代理对象？

- java.lang.reflect.Proxy类：提供了为对象产生代理对象的方法**Proxy.newProxyInstance**

  ```JAVA
  public static object newProxyInstance(classLoader loader, class<?>[] interfaces, InvocationHandler h)
  参数一:用于指定用哪个类加载器，去加载生成的代理类（使用任意类加载器都可以）
  参数二:指定代理对象需要实现的接口（明星/目标类实现了哪些接口，代理对象就实现哪些接口）
  参数三:用来指定生成的代理对象要干什么事情
  ```

  

示例：为杨超越创建代理

明星对象（目标对象）：

```java
public interface SuperStarService {
    void sing(String song);
    void dance();
}
@...
public class SuperStar implements SuperStarService {
    private String name;
    @Override
    public void sing(String song) {
        System.out.println(name + ": 唱" + song);
    }
    @Override
    public void dance() {
        System.out.println(name + ": 跳");
    }
}
```

**创建代理对象**：

```java
public class ProxyUtil {
    public static SuperStarService createProxy(SuperStar target) {
        // 创建明星对象的代理对象
        SuperStarService starProxy = (SuperStarService) Proxy.newProxyInstance(
                target.getClass().getClassLoader(), // 类加载器, 使用任意类加载器都可以
                target.getClass().getInterfaces(), // 指定代理对象需要实现的接口，明星类实现了哪些接口，代理对象就实现哪些接口
                (proxy, method, args) -> { // 方法调用处理程序，代理对象调用任何方法，都会执行这个方法。即代理要做哪些事情
                    /**
                     * proxy: 代理对象，它就是我们创建的代理对象，它和目标对象有相同的类型，但是它不是目标对象.
                     * method: 目标对象的方法，它就是我们代理对象调用的方法，它和目标对象方法有相同的签名，但是它不是目标对象方法.
                     * args: 目标对象方法的参数，它和目标对象方法的参数有相同的类型，但是它不是目标对象方法的参数.
                     */
                    if (method.getName().equals("dance")) {
                        System.out.println("准备场地，收钱10w");
                    } else if (method.getName().equals("sing")) {
                        System.out.println("准备麦克风，收钱20w");
                    }
                    // 调用目标对象的方法
                    Object result = method.invoke(target, args);
                    return result;
                }
        );
        return starProxy;
    }
}
```

创建代理执行：

```java
public static void main(String[] args) throws Exception {
    SuperStar star = new SuperStar("杨超越");
    // 创建代理
    SuperStarService starProxy = ProxyUtil.createProxy(star);
    starProxy.dance(); // 代理对象执行方法
    starProxy.sing("蜡笔小新");
}
```

### 解决实际问题-好处

1. 减少代码量，简化代码
1. 减少耦合度，解耦合
1. 拓展功能，增强功能

案例——使用代理优化用户管理类

场景

- 某系统有一个用户管理类，包含用户登录，删除用户，查询用户等功能，系统要求统计每个功能的执行耗时情况，以便后期观察程序性能。

本来这些方法内部进行统计耗时，太乱——使用代理模式，将这些功能合并成一个代理类，代理类负责统计耗时。（类似于AOP切面编程）
