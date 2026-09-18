---
title: SpringBoot2 配置文件
published: 2023-02-06
pinned: false
description: 本文介绍 SpringBoot2 配置文件的类型和语法。文章内容来自站主大学时期的学习笔记。
# image: ./image-20230811161806416.png
tags: [SpringBoot2, SpringBoot2 教程, 教程, SpringBoot 配置文件]
category: SpringBoot 2 教程:从入门到精通
slug: tutorial-springboot2-config
series: "SpringBoot 2 教程:从入门到精通"
seriesOrder: 4
---


# 5.SpringBoot2 配置文件

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 SpringBoot2 配置文件的类型和语法。文章内容来自站主大学时期的学习笔记。

## 5.1文件类型

### 1.properties

同以前的properties用法

### 2.yaml

#### 1.1简介

YAML 是 "YAML Ain't Markup Language"（YAML 不是一种标记语言）的递归缩写。在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）。 

非常适合用来做**以数据为中心**的配置文件

#### 1.2基本语法

- key: value；kv之间有空格
- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格（idea可以用tab）
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释
- 字符串无需加引号，如果要加，''与""表示字符串内容 会被 转义/不转义（单引号就输出\n，而双引号会换行）

#### 1.3数据类型

- 字面量：单个的、不可再分的值。date、boolean、string、number、null

  ```yaml
  k: v
  ```

- 对象：键值对的集合。map、hash、set、object 

  ```yaml
  行内写法：  k: {k1:v1,k2:v2,k3:v3}
  #或
  k: 
    k1: v1
    k2: v2
    k3: v3
  ```

- 数组：一组按次序排列的值。array、list、queue

  ```yaml
  行内写法：  k: [v1,v2,v3]
  #或者
  k:
   - v1
   - v2
   - v3
  ```

  

#### 1.4示例

```java
@Data
public class Person {
	
	private String userName;
	private Boolean boss;
	private Date birth;
	private Integer age;
	private Pet pet;
	private String[] interests;
	private List<String> animal;
	private Map<String, Object> score;
	private Set<Double> salarys;
	private Map<String, List<Pet>> allPets;
}

@Data
public class Pet {
	private String name;
	private Double weight;
}
```

yaml表示以上对象

```yaml
person:
  userName: zhangsan
  boss: true
  birth: 2019/12/1
  age: 18
#  interests: [网球,篮球]
  interests:
    - 篮球
    - 网球
  animal: [猫,狗]
#  score: {english:80,math:90}
  score:
    english: 80
    math: 90
  salarys:
    - 999.9
    - 999.8
  pet:
    name: 狗
    weight: 99.9
  allPets:
    sick:
      - {name:狗,weight:99.9}
      - name: 猫
        weight: 88.9
    health: [{name:龙,weight:99.9}]
```

yaml和properties都有，则properties优先

## 5.2配置提示

自定义的类和配置文件绑定一般没有提示。

加入依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

加入configuration，打包时排除上面这个插件（没啥用）

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

