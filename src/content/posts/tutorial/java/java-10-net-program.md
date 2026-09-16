---
title: Java 进阶-网络编程
published: 2021-12-28
pinned: false
description: 本文介绍 Java 进阶部分，你将学习到 Java 网络编程的知识。文章内容来自站主大学时期的课程笔记。
# image: ./image-20230811161806416.png
tags: [Java, Java 教程, Java 进阶, 教程, 网络编程]
category: Java 教程:从入门到精通
slug: tutorial-java-net-program
series: "Java 教程:从入门到精通"
seriesOrder: 10
---

# Java 进阶:网络编程

> [!NOTE] 温馨提示
> 转载请标注来源哦~~
> 
> 本文介绍 Java 进阶部分，你将学习到 Java 网络编程的知识。文章内容来自站主大学时期的课程笔记。

## 网络编程

可以让设备中的程序与网络上其他设备中的程序进行数据交互的技术（实现网络通信）

### 基本的通信架构

基本的通信架构有2种形式：CS架构(Client客户端/Server服务端)、BS架构(Browser浏览器/Server服务端)。

BS架构(Browser浏览器/Server服务端)：

- Browser浏览器
  - 不需要程序员开发
    需要用户下载安装浏览器
- Server服务端
  - 需要程序员开发服务端程序

### 网络编程三要素

1. IP：设备在网络中的地址，是设备在网络中的唯一标识
2. 端口：应用程序在设备中的唯一标识
3. 协议：连接和数据在网络中传输的规则

#### IP地址

IP(Internet Protocol)：全称”互联网协议地址”，是分配给上网设备的唯一标识。

- IPv4是Internet Protocol version 4的缩写，它使用32位地址，通常以点分十进制表示。

- IPv6是Internet Protocol version 6的缩写，它使用128位地址，号称可以为地球上的每一粒沙子编号

  IPV6分成8段，每段每四位编码成一个十六进制位表示，每段之间用冒号(:)分开，将这种方式称为冒分十六进制

**IP域名(Domain Name)**

- 用于在互联网上识别和定位网站的人类可读的名称。

**DNS域名解析(Domain Name System)**

- 是互联网中用于**将域名转换为对应IP地址**的分布式命名系统。

**公网IP、内网IP**

- 公网IP：是可以连接到互联网的IP地址。
- 内网IP：也叫局域网IP，是只能组织机构内部使用的IP地址。例如，192.168开头的就是常见的局域网地址，范围为192.168.0.0--192.168.255.255，专门为组织机构内部使用。

**本机IP**

- 127.0.0.1、localhost：代表本机IP，只会寻找当前程序所在的主机。

**IP常用命令**

- ipconfig：查看本机IP地址
- ping IP地址：检查网络是否连通

**<span style="color: red;">InetAddress</span>**

面向对象编程使用InetAddress代表IP地址

| InetAddress常用方法                                          | 说明                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| public static inetAddress **getLocalHost**() throws UnknownHostException | 获取本机IP，返回一个InetAddress对象            |
| public String **getHostName**()                              | 获取该ip地址对象对应的主机名。                 |
| public String **getHostAddress**()                           | 获取该ip地址对象中的ip地址信息                 |
| public static lnetAddress **getByName**(String host)throws UnknownHostException | 根据ip地址或者域名，返回一个inetAddress对象    |
| public boolean **isReachable**(int timeout) throws lOException | 判断主机在指定亳秒内与该ip对应的主机是否能连通 |

示例：

```java
try {
    // 获取本机的InetAddress对象
    InetAddress address = InetAddress.getLocalHost();
    System.out.println(address);
    System.out.println(address.getHostAddress());

    // 获取某对方的InetAddress对象
    InetAddress address2 = InetAddress.getByName("www.baidu.com");
    System.out.println(address2);
    System.out.println(address2.getHostAddress());

    // ping 判断本机与对方是否互通
    System.out.println(InetAddress.getByName("www.baidu.com").isReachable(3000));
} catch (Exception e) {
    e.printStackTrace();
}
```

#### 端口

用来标记标记正在计算机设备上运行的应用程序，被规定为一个16位的二进制，范围是 0~65535。

**端口分类**：

- 周知端口：0~1023，被预先定义的知名应用占用(如:HTTP占用 80，FTP占用21)
- 注册端口：1024~49151，分配给用户进程或某些应用程序
- 动态端口：49152到65535，之所以称为动态端口，是因为它一般不固定分配某种进程，而是动态分配

注意：我们自己开发的程序一般选择使用注册端口，且一个设备中不能出现两个程序的端口号一样，否则报错

需求：用微信给唔西迪西发送爱你哟

#### 协议

网络上通信的设备，事先规定的连接规则，以及传输数据的规则被称为网络通信协议。

OSI网络参考模型：全球网络互联标准。

- 应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

TCP/IP网络模型：事实上的国际标准。

- 应用层（应用层+表示层+会话层）、传输层、网络层、数据链路层+物理层

**传输层**的通信协议：

- UDP(User Datagram Protocol)：用户数据报协议。

  通信效率高（视频直播、语音通话）

  - 特点：无连接、不可靠通信。
  - 不事先建立连接，数据按照包发，一包数据包含：自己的IP、端口、目的地IP、端口和数据(限制在64KB内)等。
    发送方不管对方是否在线，数据在中间丢失也不管，如果接收方收到数据也不返回确认，故是不可靠的。

- TCP(Transmission Control Protocol)：传输控制协议。

  通信效率相对不高，可靠性高（网页、文件下载、支付）

  - 特点：面向连接、可靠通信。
  - TCP的最终目的：要保证在不可靠的信道上实现可靠的数据传输
  - TCP主要有三个步骤实现可靠传输：三次握手建立连接，传输数据进行确认，四次挥手断开连接。

### UDP通信

Java提供了一个java.net.DatagramSocket类来实现UDP通信

**DatagramSocket**：用于创建客户端、服务端

| 构造器                          | 说明                                                   |
| ------------------------------- | ------------------------------------------------------ |
| public DatagramSocket()         | 创建**客户端**的socket对象，系统会随机分配一个端口号。 |
| public DatagramSocket(int port) | 创建**服务端**的socket对象，并指定端口号               |

| 方法                                 | 说明                   |
| ------------------------------------ | ---------------------- |
| public void send(DatagramPacket dp)  | **发送**数据包         |
| public void receive(DatagramPacketp) | 使用数据包**接收**数据 |

DatagramPacket：**创建数据包**

| 构造器                                                       | 说明                         |
| ------------------------------------------------------------ | ---------------------------- |
| public DatagramPacket(byte[] buf, int length, InetAddress address,int port) | 创建**发出去的数据包对象**   |
| public DatagramPacket(byte[]buf,int length)                  | 创建用来**接收数据的数据包** |

#### 示例：一发一收

Server

```java
public class UDPServer01 {
    public static void main(String[] args) throws Exception{
        System.out.println("服务器端已经启动...");
        //1.创建一个DatagramSocket对象，并指定端口号
        DatagramSocket socket = new DatagramSocket(8080);
        //2.创建一个DatagramPacket对象，用于接收数据包
        byte[] buf = new byte[1024];
        DatagramPacket packet = new DatagramPacket(buf, buf.length);
        //3.调用DatagramSocket对象的receive方法，接收数据包
        socket.receive(packet);
        //4.获取数据包中的数据，并显示
        String msg = new String(packet.getData(), 0, packet.getLength());
        System.out.println(msg);
        // 5.获取数据包中的发送端的IP地址和端口号
        System.out.println(packet.getAddress().getHostAddress() + ":" + packet.getPort());
        socket.close();
    }
}
```

Client

```java
public class UDPClient01 {
    public static void main(String[] args) throws Exception {
        System.out.println("客户端启动...");
        // 1. 创建发送端套接字
        DatagramSocket socket = new DatagramSocket(); // 不指定端口号，系统自动分配
        // 2. 发送数据
        String msg = "你好，我是客户端";
        byte[] data = msg.getBytes();
        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 8080);
        socket.send(packet);
        // 3. 关闭资源
        socket.close();
    }
}
```

#### 示例：多发多收

服务端**可以接收多个客户端的消息**，可以将客户端程序多开试验效果。

因为接收端只负责接收数据包，无所谓是哪个发送端的数据包

Server

```java
public static void main(String[] args) throws Exception{
    System.out.println("服务器端已经启动...");
    //1.创建一个DatagramSocket对象，并指定端口号
    DatagramSocket socket = new DatagramSocket(8080);
    byte[] buf = new byte[1024];
    DatagramPacket packet = new DatagramPacket(buf, buf.length);
    while (true) {
        socket.receive(packet);
        String msg = new String(packet.getData(), 0, packet.getLength());
        System.out.println(msg);
        System.out.println(packet.getAddress().getHostAddress() + ":" + packet.getPort());
        System.out.println("--------------------------");
    }
}
```

Client

```java
public static void main(String[] args) throws Exception {
    System.out.println("客户端启动...");
    // 1. 创建发送端套接字
    DatagramSocket socket = new DatagramSocket();
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请输入要发送的数据：");
        String str = sc.nextLine();
        if ("886".equals(str)) {
            System.out.println("客户端退出...");
            socket.close();
            break;
        }
        byte[] data = str.getBytes();
        DatagramPacket packet = new DatagramPacket(data, data.length, InetAddress.getByName("127.0.0.1"), 8080);
        socket.send(packet);
    }
}
```

### TCP通信

**客户端**：

客户端通过java.net.Socket类来实现。

| 构造器                               | 说明                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| public Socket(String host, int port) | 根据指定的服务器ip、端口号请求**与服务端建立连接**，连接通过，就获得了客户端socket |

| 方法                                  | 说明                             |
| ------------------------------------- | -------------------------------- |
| public 0utputStream getOutputStream() | 获得字节**输出流对象，发送**数据 |
| public InputStream getInputStream()   | 获得字节输入流对象               |

**服务端**：

服务端是通过java.net包下的Serversocket类来实现的。

| 构造器                        | 说明                     |
| ----------------------------- | ------------------------ |
| public ServerSocket(int port) | 为**服务端**程序注册端口 |

| 方法                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| public Socket accept() | 阻塞等待客户端的连接请求，一旦与某个客户端成功连接，则返回服务端这边的Socket对象。 |

#### 示例：一发一收

**服务端**：

```java
public class TCPServer01 {
    public static void main(String[] args) throws Exception {
        System.out.println("服务器启动...");
        //1.创建一个服务器Socket，即ServerSocket，指定绑定的端口，并监听此端口
        ServerSocket serverSocket = new ServerSocket(8080);
        //2.调用accept()方法开始监听，阻塞等待客户端的连接
        java.net.Socket socket= serverSocket.accept();
        //3.获取输入流，并读取客户端信息
        InputStream inputStream = socket.getInputStream();
        //特殊数据输入流
        DataInputStream dis = new DataInputStream(inputStream);
        String name = dis.readUTF();
        int age = dis.readInt();
        System.out.println("name="+name+",age="+age);
        System.out.println("Client is "+socket.getInetAddress()+ " : " +socket.getPort());
    }
}
```

**客户端**：

```java
public class TCPClient01 {
    public static void main(String[] args) throws Exception {
        System.out.println("客户端启动....");
        //1.创建客户端的套接字，指定服务器的IP和端口号
        Socket socket = new Socket("127.0.0.1",8080);
        //2.获取输出流，发送数据
        OutputStream os = socket.getOutputStream();
        // 特殊数据流
        DataOutputStream dos = new DataOutputStream(os);
        dos.writeUTF("你好，我是客户端");
        dos.writeInt(100);
        socket.close();
    }
}
```

#### 示例：多发多收

**服务端**：

```java
public static void main(String[] args) throws Exception {
    System.out.println("服务器启动...");
    ServerSocket serverSocket = new ServerSocket(8080);
    Socket socket= serverSocket.accept();
    InputStream inputStream = socket.getInputStream();
    //特殊数据输入流
    DataInputStream dis = new DataInputStream(inputStream);
    while (true) {
        String msg = dis.readUTF();
        System.out.println("Client:"+msg);
        System.out.println("Client is "+socket.getInetAddress()+ " : " +socket.getPort());
        System.out.println("--------------------------");
    }
}
```

**客户端**：

```java
public static void main(String[] args) throws Exception {
    System.out.println("客户端启动....");
    Socket socket = new Socket("127.0.0.1",8080);
    OutputStream os = socket.getOutputStream();
    // 特殊数据流
    DataOutputStream dos = new DataOutputStream(os);
    Scanner sc = new Scanner(System.in);
    while (true) {
        System.out.println("请输入：");
        String msg = sc.nextLine();
        if ("886".equals(msg)) {
            System.out.println("客户端退出...");
            socket.close();
            break;
        }
        dos.writeUTF(msg);
        dos.flush();
    }
}
```

#### 同时接收多个客户端消息

上面的程序不支持同时与多个客户端通信。因为服务端现在只有一个主线程，只能处理一个客户端的消息（accept）。

解决方案：多线程

- 主线程负责接收客户端连接，然后交给独立的子线程处理
- 可以追踪客户端上线、下线情况

示例：

```java
public class TCPServer01 {
    public static void main(String[] args) throws Exception {
        System.out.println("服务器启动...");
        ServerSocket serverSocket = new ServerSocket(8080);

        while (true) {
            Socket socket= serverSocket.accept();
            System.out.println("Client is online " + socket.getRemoteSocketAddress() + ":" + socket.getPort());
            // 2. 把客户端请求交给一个子线程处理
            new ServerThread(socket).start();
        }

    }
}
class ServerThread extends Thread {
    private Socket socket;

    public ServerThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            // 3. 从socket中获取一个输入流，并读取客户端发送的数据
            InputStream inputStream = socket.getInputStream();
            DataInputStream dataInputStream = new DataInputStream(inputStream);
            while (true) {
                String msg = dataInputStream.readUTF();
                System.out.println("服务器接收到数据：" + msg);
            }
        } catch (Exception e) {
            System.out.println("客户端" + socket.getRemoteSocketAddress() + ":" + socket.getPort() + "断开连接");
        }
    }
}
```

### TCP—B/S架构

要求：从浏览器中访问服务器，并立即让服务器响应一个很简单的网页给浏览器展示，网页内容就是“听虎哥讲Java”。

注意

- **服务器必须给浏览器响应HTTP协议规定的数据格式**，否则浏览器不识别返回的数据
- 每次请求都开一个新线程，不好！浏览器请求会很多——使用**线程池进行优化**
- 用线程池就很**高级**！

服务端：

```java
public class TCPServer01 {
    public static void main(String[] args) throws Exception {
        System.out.println("服务器启动...");
        ServerSocket serverSocket = new ServerSocket(8080);
        //创建一个线程池
        ExecutorService pool = new ThreadPoolExecutor(3, 10, 10,
                TimeUnit.SECONDS, new ArrayBlockingQueue<>(100), Executors.defaultThreadFactory(), new ThreadPoolExecutor.AbortPolicy());

        while (true) {
            Socket socket= serverSocket.accept();
            System.out.println("Client is online " + socket.getRemoteSocketAddress() + ":" + socket.getPort());
            // 2. 把客户端管道包装为线程池线程，每个客户端一个线程
            pool.execute(new ServerThread(socket));
        }
    }
}
class ServerThread extends Thread {
    private Socket socket;
    public ServerThread(Socket socket) {
        this.socket = socket;
    }
    @Override
    public void run() {
        try {
            // 给浏览器发送数据
            OutputStream os = socket.getOutputStream();
            PrintStream ps = new PrintStream(os);
            ps.println("HTTP/1.1 200 OK");
            ps.println("Content-Type:text/html;charset=utf-8");
            ps.println(); // must be blank line, end of header
            ps.println("<html>");
            ps.println("<head>");
            ps.println("<title>");
            ps.println("欢迎您！");
            ps.println("</title>");
            ps.println("</head>");
            ps.println("<body>");
            ps.println("<h1>听虎哥讲Java，欢迎您！</h1>");
            ps.println("</body>");
            ps.println("</html>");
            ps.flush();
            ps.close();
            os.close();
            socket.close(); // BS架构浏览器请求是短连接，所以需要关闭
        } catch (Exception e) {
            System.out.println("客户端" + socket.getRemoteSocketAddress() + ":" + socket.getPort() + "断开连接");
        }
    }
}
```
