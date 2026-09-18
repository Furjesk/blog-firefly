---
title: SpringBoot2 容器功能
published: 2023-02-04
pinned: false
description: 本文介绍 SpringBoot2 容器功能。文章内容来自站主大学时期的学习笔记。
# image: ./image-20230811161806416.png
tags: [SpringBoot2, SpringBoot2 教程, 教程]
category: SpringBoot 2 教程:从入门到精通
slug: tutorial-springboot2-container
series: "SpringBoot 2 教程:从入门到精通"
seriesOrder: 2
---

# 3.SpringBoot2 容器功能

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 SpringBoot2 容器功能。文章内容来自站主大学时期的学习笔记。

## 3.1组件添加

### 1.@Configuration

- 先准备两个bean：boot/bean/Pet.class和User.class

  ```java
  package com.atguigu.boot.bean;
  
  public class User {
      private String name;
      private Integer age;
      private Pet pet;
  
      public User() {
      }
      public User(String name, Integer age) {
          this.name = name;
          this.age = age;
      }
  
      public Pet getPet() {
          return pet;
      }
      public void setPet(Pet pet) {
          this.pet = pet;
      }
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
      public Integer getAge() {
          return age;
      }
      public void setAge(Integer age) {
          this.age = age;
      }
  
      @Override
      public String toString() {
          return "User{" +
                  "name='" + name + '\'' +
                  ", age=" + age +
                  ", pet=" + pet +
                  '}';
      }
  }
  ```

  

- 以前Spring容器中添加两组件方式：在resources下创建beans.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
  
      <bean id="user01" class="com.atguigu.boot.bean.User">
          <!--        默认值-->
          <property name="name" value="zhangsan"/>
          <property name="age" value="18"/>
      </bean>
      <bean id="cat" class="com.atguigu.boot.bean.Pet">
          <property name="name" value="tomcat"/>
      </bean>
  </beans>
  ```

  

- 现在SpringBoot组件添加

  创建boot/config/MyConfig.class

  ```java
  package com.atguigu.boot.config;
  
  import com.atguigu.boot.bean.Pet;
  import com.atguigu.boot.bean.User;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  //告诉SpringBoot这是配置类（相当于以前的配置文件）
  @Configuration
  public class MyConfig {
      //给容器中添加组件。以方法名作为组件的id。返回类型就是组件类型。返回的值，就是组件在容器中的实例
      //外部无论对配置类中的这个组件注册方法调用多少次获取的都是之前注册容器中的单实例对象
      @Bean
      public User user01(){
          User zhangsan = new User("zhangsan",18);
          //User组件依赖了Pet组件
          zhangsan.setPet(tomcatPet());
          return zhangsan;
      }
  
      @Bean
      public Pet tomcatPet(){
          return new Pet("tomcat");
      }
  }
  ```

  > - 给容器中添加组件。以方法名作为组件的id（也可以不用方法名：`@Bean("tomcat")`。返回类型就是组件类型。返回的值，就是组件在容器中的实例
  > - @Configuration(proxyBeanMethods = false)：是否是代理对象（单实例），默认true【启用代理，就是先创建bean，每次用的时候直接拿】
  > - **Full模式(true)与Lite模式**
  > - - 配置类组件之间无依赖关系（别人不依赖你）用Lite模式加速容器启动过程，减少判断（容器中是否有这个bean）
  >   - 配置类组件之间有依赖关系，方法会被调用得到之前单实例组件，用Full模式

- 测试验证MainApplication.class

  ```java
  @SpringBootApplication
  public class MainApplication {
      public static void main(String[] args) {
          //把主类加载进来(1.返回IOC容器)
          ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
          //2.查看容器里面的组件
          String[] names = run.getBeanDefinitionNames();
          for (String name : names) {
              System.out.println(name);
          }
  
          //3、从容器中获取组件
          Pet tom01 = run.getBean("tomcat", Pet.class);
          Pet tom02 = run.getBean("tomcat", Pet.class);
          System.out.println("组件："+(tom01 == tom02));
  
          //4、com.atguigu.boot.config.MyConfig$$EnhancerBySpringCGLIB$$51f1e1ca@1654a892
          MyConfig bean = run.getBean(MyConfig.class);
          System.out.println(bean);
  
          //如果@Configuration(proxyBeanMethods = true)代理对象调用方法。SpringBoot总会检查这个组件是否在容器中有。
          //保持组件单实例
          User user = bean.user01();
          User user1 = bean.user01();
          System.out.println(user == user1);
  
          User user01 = run.getBean("user01", User.class);
          Pet tom = run.getBean("tomcat", Pet.class);
          System.out.println("用户的宠物："+(user01.getPet() == tom));
      }
  }
  ```

  

### 2.@Bean、@Component、@Controller、@Service、@Repository

@Bean：给容器中添加组件，以方法名作为组件的id，返回类型就是组件的类型，返回的值，就是组件在容器中的实例

@Component：组件，默认组件名就是类名，首字母小写

@Controller：控制层

@Service：服务层

@Repository：数据访问层


### 3.@ComponentScan、@Import

MyConfig.class

```
@Import({User.class})
@Configuration
public class MyConfig {
```

> @Import({User.class, DBHelper.class})
>
> 给容器中自动创建出这两个类型的组件、默认组件的名字就是全类名

MainApplication.class

```java
//5、获取组件
String[] beanNamesForType = run.getBeanNamesForType(User.class);
for (String s : beanNamesForType) {
    System.out.println(s);
}
```

> 输出：
> 
> com.atguigu.boot.bean.User
> 
> user01

@Import 高级用法： https://www.bilibili.com/video/BV1gW411W7wy?p=8

### 4.@Conditional

条件装配：满足Conditional指定的条件，则进行组件注入


MyConfig.class

```java
@Configuration
public class MyConfig {
    //容器中有tomcat组件时才给容器注入user01
    @ConditionalOnBean(name = "tomcat")
    @Bean
    public User user01(){
        User zhangsan = new User("zhangsan",18);
        //User组件依赖了Pet组件
        zhangsan.setPet(tomcatPet());
        return zhangsan;
    }
}
```

MainApplication.class

```java
boolean tomcat = run.containsBean("tomcat");
System.out.println("有没有tomcat组件"+tomcat);
boolean user01 = run.containsBean("user01");
System.out.println("有没有user01组件"+user01);
```

> 输出：
> 
> 有没有tomcat组件false
> 
> 有没有user01组件false

也可以放到类上面：

```java
@ConditionalOnMissingBean(name = "tomcat")
public class MyConfig {
```

表示只有当容器中有tomcat组件时这个类中的配置才生效
