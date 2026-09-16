---
title: Java 进阶-多线程
published: 2021-12-27
pinned: false
description: 本文介绍 Java 进阶部分，你将学习到 Java 多线程的使用方法。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 进阶, 教程, 多线程]
category: Java 教程:从入门到精通
slug: tutorial-java-thread
series: "Java 教程:从入门到精通"
seriesOrder: 9
---

# Java 进阶:多线程

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 进阶部分，你将学习到 Java 多线程的使用方法。文章内容来自站主大学时期的课程笔记。

## 多线程

- 线程（Thread）：是一个程序内的一条执行流程。
  - 程序中如果只有一条执行流程，那这个程序就是单线程的程序
- 多线程：指从软硬件上实现的多条执行流程的技术（多条线程由CPU负责调度执行）。

### 创建线程1—继承Thread

1. 继承Thread类，并重写run方法
2. 创建该线程类的对象，代表一个线程
3. **调用start方法，启动线程**（然后执行的是run方法）

优点：编码简单。

缺点：线程类已经继承Thread，无法继承其他类，不利于功能的扩展。

注意：

- **必须调用start方法才是启动一个新的线程执行**。
- 如果直接调用run方法会当成普通方法执行，相当于单线程。
- **不要把主线程的任务放在启动子线程之前**（会导致主线程东西跑完了才启动子线程，相当于单线程）。

示例：结果是主线程和子线程混着跑

```java
public class Main {
    // main 本身也是一个线程
    public static void main(String[] args) {
        Thread t = new MyThread();
        t.start();
        for (int i = 0; i < 6; i++) {
            System.out.println("主线程执行了" + i);
        }
    }
}

class MyThread extends Thread {
    // 重写run方法
    @Override
    public void run() {
        // 线程执行体
        for (int i = 0; i < 6; i++) {
            System.out.println("子线程执行了" + i);
        }
    }
}
```

如果调用run方法：会先执行run方法的内容，然后执行main的后续代码

```java
public static void main(String[] args) {
    Thread t = new MyThread();
    t.run();
    for (int i = 0; i < 6; i++) {
        System.out.println("主线程执行了" + i);
    }
}
```

### 创建线程2—Runnable

1. 创建一个线程任务类，实现Runnable接口，并重写run方法
2. 创建一个线程任务对象
3. 创建一个线程对象，把任务对象作为构造参数传递进去
4. 调用start方法，启动线程

优点：可以继承其他类，实现其他接口，扩展性强。

缺点：

- 需要多一个Runnable对象。
- 如果线程由执行结果是不能直接返回的。

**匿名内部类写法**：

1. 可以创建Runnable的匿名内部类对象
2. 创建一个线程对象，把任务对象作为构造参数传递进去
3. 调用start方法，启动线程

示例：

```java
public class Main {
    public static void main(String[] args) {
        // 2. 创建一个线程任务对象
        Runnable task = new MyRunnable();
        // 3. 创建一个线程对象，把任务对象作为构造参数传递进去
        Thread thread = new Thread(task);
        // 4. 调用start方法，启动线程
        thread.start();
        System.out.println("main thread");
    }
}
// 1. 创建一个线程任务类，实现Runnable接口
class MyRunnable implements Runnable {

    // 重写run方法
    @Override
    public void run() {
        System.out.println("子线程执行");
    }
}
```

匿名内部类写法：

```java
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("子线程执行");
    }
};
Thread thread = new Thread(task);
thread.start();
// =======简化=============
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("子线程执行");
    }
});
thread.start();
// ======简化=============
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("子线程执行");
    }
}).start();
// ======lambda简化=============
new Thread(() -> {
    System.out.println("子线程执行");
}).start();
```

### 创建线程3—Callable—返回结果

前两种方式线程执行完毕后run方法不能返回结果。

JDK5提供了Callable接口和FutureTask类来实现

- 优点：可以继承其他类，可扩展性强；**可以返回线程执行后的结果**
- 缺点：编码复杂一点

步骤：

1. 实现Callable，重写call方法，返回值是泛型，可以抛出异常
2. 创建Callable对象，并封装成FutureTask对象（线程任务对象，最终实现的Runnable接口），可以通过它来获取返回值
3. 创建线程对象，并启动线程
4. 获取返回值（get方法会阻塞当前线程，直到获取到返回值）

```java
public class Main {
    public static void main(String[] args) {
        MyCallable callable = new MyCallable();
        FutureTask<Integer> task = new FutureTask<>(callable);
        
        Thread thread = new Thread(task);
        thread.start();
         
        try {
            Integer result = task.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        return 1;
    }
}
```

### 线程的常用方法

| Thread提供的常用方法                 | 说明                                          |
| ------------------------------------ | --------------------------------------------- |
| public void run()                    | 线程的任务方法                                |
| public void start()                  | 启动线程                                      |
| public String getName()              | 获取当前线程的名称，线程名称默认是Thread-索引 |
| public void setName(String name)     | 为线程设置名称（必须**在启动线程之前**）      |
| public static Thread currentThread() | 获取当前执行的线程对象                        |
| public static void sleep(long time)  | 让当前执行的线程休眠多少毫秒后，再执行        |
| public final void join()             | 让调用当前这个方法的线程先执行完（插队）      |

| Thread提供的常见构造器                      | 说明                                       |
| ------------------------------------------- | ------------------------------------------ |
| public Thread(String name)                  | 可以为当前线程指定名称                     |
| public Thread(Runnable target)              | 封装Runnable对象称为线程对象               |
| public Thread(Runnable target, String name) | 封装Runnable对象称为线程对象，并指定线程名 |

### 线程安全

概念：**多个线程，同时操作同一个共享资源**时，可能会出现业务安全问题。

```java
public class Account {
    private String cardId;
    private int balance;
    // 取钱
    public void drawMoney(int money) {
        String name = Thread.currentThread().getName();
        if (balance >= money) {
            System.out.println(name + " 取钱中...");
            balance -= money;
            System.out.println(name + " 取钱成功，取钱金额为：" + money);
            System.out.println(name + " 剩余余额为：" + balance);
        } else {
            System.out.println(name + " 余额不足，取钱失败");
        }
    }
}
```

```java
 Account account = new Account("6215583123455225555", 6000);
new Thread(() -> account.drawMoney(5000)).start();
new Thread(() -> account.drawMoney(5000)).start();
```

> Thread-0 取钱中...
> Thread-1 取钱中...
> Thread-1 取钱成功，取钱金额为：5000
> Thread-0 取钱成功，取钱金额为：5000
> Thread-1 剩余余额为：-4000
> Thread-0 剩余余额为：-4000

### 线程同步

加锁：对于共享资源，每次只允许一个线程加锁，加锁后才能进入访问，访问完毕后自动解锁，然后其他线程才能再加锁进来。

#### 同步代码块

- 作用：把访问共享资源的核心代码给上锁，以此保证线程安全。

  ```java
  synchronized(同步锁) {
  	访问共享资源的核心代码
  }
  ```

- 原理：每次只允许一个线程加锁进入，执行完毕后自动解锁，然后其他线程才能进来。

- 注意❗：对于当前同时执行的线程来说，**同步锁必须是同一把（同一个对象）**，否则会出bug。

锁对象随便使用一个唯一的对象好不好？

- 不好，会影响其他无关线程的执行（你一家人取钱，全世界的人都得等你）

锁对象使用规范：

- 对于面向对象编程，建议**使用共享资源作为对象**。
  - 对于**实例方法**建议使用**this**作为锁对象。
  - 对于**静态方法**建议使用**字节码（类名.class**，例如Account.class）作为锁对象。

```java
public void drawMoney(int money) {
    String name = Thread.currentThread().getName();
    synchronized ("wjh") {
        if (balance >= money) {
            System.out.println(name + " 取钱中...");
            balance -= money;
            System.out.println(name + " 取钱成功，取钱金额为：" + money);
            System.out.println(name + " 剩余余额为：" + balance);
        } else {
            System.out.println(name + " 余额不足，取钱失败");
        }
    }
}
```

改进：使用当前对象

```java
public void drawMoney(int money) {
    String name = Thread.currentThread().getName();
    synchronized (this) {
        if (balance >= money) {
            System.out.println(name + " 取钱中...");
            balance -= money;
            System.out.println(name + " 取钱成功，取钱金额为：" + money);
            System.out.println(name + " 剩余余额为：" + balance);
        } else {
            System.out.println(name + " 余额不足，取钱失败");
        }
    }
}
```

#### 同步方法

- 作用：把访问共享资源的核心方法给上锁，以保证线程安全。

- ```java
  修饰符 synchronized 返回值类型 方法名称(形参列表) {
      操作共享资源的代码
  }
  ```

- 底层原理：

  - 底层也是有隐式锁对象的，只是锁的范围是整个方法代码
  - 如果方法是实例方法：同步方法默认用this作为的锁对象，
    如果方法是静态方法：同步方法默认用类名.class作为的锁对象，

```java
public synchronized void drawMoney(int money) {
    String name = Thread.currentThread().getName();
    if (balance >= money) {
        System.out.println(name + " 取钱中...");
        balance -= money;
        System.out.println(name + " 取钱成功，取钱金额为：" + money);
        System.out.println(name + " 剩余余额为：" + balance);
    } else {
        System.out.println(name + " 余额不足，取钱失败");
    }
}
```

对比：

- 范围上：同步代码块锁的范围更小（性能好），同步方法锁的范围更大
- 可读性：同步方法更好

#### Lock锁

- Lock锁是JDK5开始提供的一个新的锁定操作，通过它可以创建出锁对象进行加锁和解锁，更灵活、更方便、更强大。
- Lock是接口，不能直接实例化，可以采用它的实现类ReentrantLock来构建Lock锁对象。

| 构造器                 | 说明                   |
| ---------------------- | ---------------------- |
| public ReentrantLock() | 获得Lock锁的实现类对象 |

| 常用方法      | 说明   |
| ------------- | ------ |
| void lock()   | 获得锁 |
| void unlock() | 释放锁 |

注意：

- 锁对象建议使用final修饰，防止被别人篡改
- 释放锁的操作建议放到finally代码中，确保锁用完了一定会被释放

```java
public class Account {
    private String cardId;
    private int balance;
    // Lock锁 final保护锁对象
    private final Lock lock = new ReentrantLock();
    // 取钱
    public void drawMoney(int money) {
        String name = Thread.currentThread().getName();
        lock.lock(); // 上锁
        try {
            // 业务代码
            if (balance >= money) {
                System.out.println(name + " 取钱中...");
                balance -= money;
                System.out.println(name + " 取钱成功，取钱金额为：" + money);
                System.out.println(name + " 剩余余额为：" + balance);
            } else {
                System.out.println(name + " 余额不足，取钱失败");
            }
        } finally {
            lock.unlock(); // 解锁
        }
    }
}
```

### 线程池

- 线程池是一个可以复用线程的技术。

- 不使用线程池的缺点：用户每发起一个请求，后台就需要创建一个新线程来处理，创建新线程的开销是很大的，并且请求过多时，会产生大量的线程，会严重影响系统的性能。

- 原理：线程池中有若干工作线程（WorkThread），任务（任务接口Runnable、Callable的实现类）在任务队列（WorkQueue）中排队等待空闲线程。

#### 创建线程池

JDK5.0起提供了代表线程池的接口：ExecutorService

1. 方式1：使用ExecutorService的实现类ThreadPoolExecutor自创建一个线程池对象

   > ThreadPoolExecutor提高的构造器：使用指定的初始化参数创建一个新的线程池对象
   >
   > public ThreadPoolExecutor(
   > 	int corePoolSize, 			指定线程池的核心线程的数量（3）。
   > 	int maximumPoolSize,	指定线程池的最大线程数量（5）。
   > 	long keepAliveTime,		指定临时线程的存活时间（5-3=2）。
   > 	TimeUnit unit,					指定临时线程存活的时间单位(秒、分、时、天)
   > 	BlockingQueue<Runnable>workQueue,	指定线程池的任务队列
   > 	ThreadFactory threadFactory,		指定线程池的线程工厂
   > 	RejectedExecutionHandler handleG)	指定线程池的任务拒绝策略（线程都在忙，任务队列也满了的时候，新任务来了该怎么处理）

2. 方式2：使用Executors(线程池的工具类)调用方法返回不同特点的线程池对象

#### ExecutorService提供的常用方法

| 方法                                   | 说明                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| void **execute**(Runnable command)     | 执行 **Runnable 任务**                                       |
| Future\<T>**submit**(Callable<T> task) | 执行 **Callable 任务**，返回未来任务对象，用于获取线程返回的结果 |
| void shutdown()                        | 等全部任务执行完毕后，再关闭线程池!                          |
| List\<Runnable>shutdownNow()           | 立即关闭，不等                                               |

**线程池的注意事项**：

什么时候**开始创建临时线程**？

- 新任务提交时发现**核心线程都在忙，任务队列也满了，并且还可以创建临时线程**，此时才会创建临时线程

什么时候会**拒绝新任务**？

- **核心线程和临时线程都在忙，任务队列也满**了，新的任务过来的时候才会开始拒绝任务。

#### 任务拒绝策略

| 策略                                      | 说明                                                       |
| ----------------------------------------- | ---------------------------------------------------------- |
| ThreadPoolExecutor.AbortPolicy()          | 丢弃任务并抛出RejectedExecutionException异常。**默认策略** |
| ThreadPoolExecutor. DiscardPolicy()       | 丢弃任务，但是不抛出异常，这是**不推荐**的做法             |
| ThreadPoolExecutor. DiscardOldestPolicy() | 抛弃队列中等待最久的任务 然后把当前任务加入队列中          |
| ThreadPoolExecutor. CallerRunsPolicy()    | 由主线程负责调用任务的run()方法从而绕过线程池直接执行      |

示例：——处理Runnable任务

```java
public static void main(String[] args) {
    // 创建线程池
    ExecutorService pool = new ThreadPoolExecutor(2, 4,
            10, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(3),
            Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());
    // 提交任务
    Runnable task = new MyRunnable();
    pool.execute(task); // 会创建新线程执行
    pool.execute(task); // 会创建新线程执行
    pool.execute(task); // 复用线程(队列)
    pool.execute(task); // 复用线程(队列)
    pool.execute(task); // 复用线程(队列)
    pool.execute(task); // 创建新线程
    pool.execute(task); // 创建新线程
    pool.execute(task); // 拒绝
    // 关闭线程池（不会立即停止，等线程执行完再停止）
    pool.shutdown(); // 一般不会关闭
}
```

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            if (i == 0) {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            System.out.println(Thread.currentThread().getName() + " " + i);
        }
    }
}
```

示例——处理Callable任务：

```java
public class MyCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        return Thread.currentThread().getName() + "hello";
    }
}
```

```java
public static void main(String[] args) {
    // 创建线程池
    ExecutorService pool = new ThreadPoolExecutor(2, 4,
            10, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(3),
            Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());
    // 提交任务
    MyCallable task = new MyCallable();
    Future<String> submit1 = pool.submit(task); // 创建新线程
    Future<String> submit2 = pool.submit(task);

    try {
        System.out.println(submit1.get());
        System.out.println(submit2.get());
    } catch (Exception e) {
        e.printStackTrace();
    }

    pool.shutdown();
}
```

#### Executors工具类创建线程池

这些方法的底层，都是通过线程池的实现类ThreadPoolExecutor创建的线程池对象。

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| public static Executorservice newFixedThreadPool(int nThreads) | 创建固定线程数量的线程池，如果某个线程因为执行异常而结束，那么线程池会补充一个新线程替代它。 |
| public static ExecutorService newsingleThreadExecutor()      | 创建只有一个线程的线程池对象，如果该线程出现异常而结束，那么线程池会补充一个新线程。 |
| public static ExecutorService newCachedThreadPool()          | 线程数量随着任务增加而增加，如果线程任务执行完毕且空闲了60s则会被回收掉。 |
| public static ScheduledExecutorService newscheduledThreadPool(int corePoolsize) | 创建一个线程池，可以实现在给定的延迟后运行任务，或者定期执行任务。 |

示例：

```java
ExecutorService pool = Executors.newFixedThreadPool(3);
```

**Executors使用可能存在的陷阱**：

大型并发系统环境中使用Executors如果不注意可能会出现系统风险。

1. FixedThreadPool和SingleThreadPool

   允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致 OOM。

2. CachedThreadPool和ScheduledThreadPool

   允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，从而导致 OOM。

### 并发和并行

进程：

- 正在运行的程序(软件)就是一个独立的进程
- 线程是属于进程的，一个进程中可以同时运行很多个线程
- 进程中的多个线程其实是并发和并行执行的

并发：

- 进程中的线程是由CPU负责调度执行的，但CPU能同时处理线程的数量有限，为了保证全部线程都能往前执行CPU会轮询为系统的每个线程服务，由于CPU切换的速度很快，给我们的感觉这些线程在同时执行，这就是并发。

并行：

- 在同一个时刻上，同时有多个线程在被CPU调度执行。

多线程是并发和并行同时进行的。

