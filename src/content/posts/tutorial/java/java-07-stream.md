---
title: Java 进阶-Stream流
published: 2021-12-25
pinned: false
description: 本文介绍 Java 进阶部分，你将学习到 Java Stream流的使用方法，这将大大简化数据处理，提高代码效率。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 进阶, 教程, Java Stream流]
category: Java 教程:从入门到精通
slug: tutorial-java-stream
series: "Java 教程:从入门到精通"
seriesOrder: 7
---

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 进阶部分，你将学习到 Java Stream流的使用方法，这将大大简化数据处理，提高代码效率。文章内容来自站主大学时期的课程笔记。

# Java 进阶<Stream流>

## Stream流

- 是JDK8开始新增的一套API，可以用于操作集合或者数组的数据。
- 优势：Stream流大量结合了Lambda的语法风格来编程，功能强大、性能高效、代码简洁、可读性好。

**示例**：把集合中以“张”开头，且名字是三个字的元素存储到一个新集合中。

```java
List<String> newList = list.stream().filter(s -> s.startsWith("张"))
        .filter(s -> s.length() == 3).toList();
System.out.println(newList);
```

步骤：

1. 获取Stream流
2. 调用Stream流的各种方法，对数据进行处理、计算
3. 获取处理的结果（遍历、统计、收集到新集合中）

### 获取Stream流

- 获取Collection集合的Stream流

  ```java
  default Stream<E> stream()
  ```

- 获取Arrays数组的Stream流

  ```java
  public static <T> Stream<T> stream(T[] array)
  ```

  获取当前接收数据的Stream流

  ```java
  public static<T> Stream<T> of(T... values)
  ```

  示例：

  ```java
  String[] names = {"张三", "李四", "王五", "赵六"};
  Stream<String> stream = Arrays.stream(names);
  Stream<String> stream2 = Stream.of("张三", "李四", "王五", "赵六");
  Stream<String> stream3 = Stream.of(names);
  ```

- 获取Map的Stream流

  ```java
  Map<String, String> map = new HashMap<>();
  Stream<String> stream = map.keySet().stream(); // 键流
  Stream<String> stream1 = map.values().stream(); // 值流
  Stream<Map.Entry<String, String>> stream2 = map.entrySet().stream(); // 键值流
  ```

### 常用中间方法

中间方法指的是调用完成后会返回新的Stream流，可以继续使用（支持链式编程）。

| 常用方法                                                     | 说明                             |
| ------------------------------------------------------------ | -------------------------------- |
| Stream\<T> filter(Predicate<? super T> predicate)            | 用于对流中的数据进行过滤         |
| Stream\<T> sorted()                                          | 对元素进行升序排序               |
| Stream\<T> sorted(Comparator<? super T> compatator)          | 按照指定规则排序                 |
| Stream\<T> limit(long maxSize)                               | 获取前几个元素                   |
| Stream\<T> skip(long n)                                      | 跳过前几个元素                   |
| Stream\<T> distinct()                                        | 去除流中重复元素                 |
| \<R> Stream\<R> map(Function<? super T, ? extends R> mapper) | 对元素进行加工，并返回对应的新流 |
| static \<T> Stream\<T> concat(Stream a, Stream b)            | 合并a和b两个流                   |

示例：

```java
List<Integer> scores = new ArrayList<>();
scores.add(100);
scores.add(90);
scores.add(80);
// map
scores.stream().map(score -> score + 10).forEach(System.out::println);
scores.stream().map(score -> "加10分后" + (score + 10)).forEach(System.out::println);
```

```java
Stream<Integer> integerStream = Stream.of(1, 2, 3);
Stream<String> stringStream = Stream.of("hello", "world");
Stream<Object> newStream = Stream.concat(integerStream, stringStream);
newStream.forEach(System.out::println);
```

### 常用终结方法

终结方法是指调用完成后，不返回新Stream。

| 终结方法                                           | 说明                     |
| -------------------------------------------------- | ------------------------ |
| void forEach(Consumer action)                      | 对刺溜运算后的元素遍历   |
| long count()                                       | 统计此流运算后的元素个数 |
| Optional\<T> max(Comparator<? super T> comparator) | 获取此流运算后的最大元素 |
| Optional\<T> min(Comparator<? super T> comparator) | 获取此流运算后的最小元素 |

示例：

```java
Optional<Student> max = list.stream().max((s1, s2) -> Double.compare(s1.getSalary(), s2.getSalary()));
Student maxStudent = max.get();
System.out.println(maxStudent);
```

**收集Stream流**：把Stream流操作后的结果转回到集合或数组中返回

流只能收集一次！

| Stream提供的终结方法           | 说明                                   |
| ------------------------------ | -------------------------------------- |
| R collect(Collector collector) | 把流处理后的结果收集到一个指定的结合中 |
| Object[] toArray()             | 把流处理后的结果收集到一个数组中       |

| Collectors工具类提供的收集方法                               | 说明                   |
| ------------------------------------------------------------ | ---------------------- |
| public static \<T> Collector toList()                        | 把元素收集到List集合中 |
| public static \<T> Collector toSet()                         | 把元素收集到Set集合中  |
| public static Collector toMap(Function keyMapper, Function valueMapper) | 把元素收集到Map集合中  |

示例：

```java
// 收集到list
List<Student> list1 = stream.collect(Collectors.toList());
System.out.println(list1);
```

```java
// 收集到set
Set<Student> set = stream.collect(Collectors.toSet());
System.out.println(set);
```

```java
// 收集到map
Map<String, Student> map = stream.collect(Collectors.toMap(Student::getName, s -> s));
System.out.println(map);
```

```java
// 收集到数组
Student[] students = stream.toArray(Student[]::new);
for (Student student : students) {
    System.out.println(student);
}
```
