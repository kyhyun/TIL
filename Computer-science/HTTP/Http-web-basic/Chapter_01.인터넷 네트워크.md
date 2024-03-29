## 1. 인터넷 네트워크
#### 1.인터넷 통신
- 인터넷에서는 클라이언트(화면)와 서버는 어떻게 통신할까?
- 항상 단순한 로직으로 보여줄 때는 클라이언트에서 서버를 요청(Request)하고, 그것을 서버가 받아서 응답(Response)을 요청한 클라이언트에 돌려주는 것만 알고 있었지만 그 사이에 인터넷이라는 서버와 연결하기 위한 중간 단계를 거친다고 한다.
> 클라이언트 <=> 인터넷 <=> 서버

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165696558-2ec20073-44b9-479e-ad63-a94b31d56c80.png" alt="인터넷 통신 관계도" border="1px" width="500px"></p></p>

- 인터넷은 그 사이에 광케이블이나 인공위성 등 클라이언트가 서버에 도달하기까지 수 많은 중간의 서버로써 노드(node)를 거쳐 이 둘은 서로 통신을 이루게 된다.
  - 노드는 전기통신망으로 서버 주소를 재분배하는 지점 혹은 종단이 되는 지점을 말한다.

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165698406-f7155e9c-0537-4c24-bbec-6e76a1aaa83a.png" alt="인터넷 통신의 노드 구조 그림" border="1px" width="500px"></p></p>


- 이 많은 중간 지점은 어떤 규칙에 의해 그 내용을 서로 주고 받을 수 있는지 알아볼 필요가 있다.

#### 2. IP(Internet Protocol)
- 인터넷은 IP라는 통신규약을 통해서 데이터를 주고 받을 수 있으며, 클라이언트와 서버는 지정된 주소를 부여 받아 데이터를 서로 주고 받을 수 있게 된다.
  - ex) 클라이언트 ( 100.100.100.1 ) <=> 서버 ( 200.200.200.2 )
  - 실생활로 예를들면 우편물을 보내기 위한 수신지와 발신지 주소를 생각하면 된다.
- 데이터를 주고 받기 위해서는 패킷(Packet)이라는 통신 단위로 데이터를 전달한다.
  - IP 패킷 정보 : IP 패킷(출발지 IP, 목적지 IP, 기타 ...) + 전송 데이터

**클라이언트 패킷 전달**
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165705846-775afc43-fbc3-4b4b-b181-359f2c3c9379.png" alt="클라이언트 패킷 전달 그림" border="1px" width="500px"></p>

- 클라이언트에서 데이터를 주고 받을 때는 이와 같이 패킷에 정보들과 전달할 데이터를 담아서 노드를 거치고, 최종적으로 서버에 전달하게 된다.
- 이 과정은 서버에서 패킷을 전달하는 과정과 동일하지만 중간에 노드를 거치는 경위는 서로 다를 수 있다.(중간 노드가 처해진 상황 등에 따라 전달하는 경로가 매번 달라진다.)

**IP 프로토콜의 한계**
인터넷을 통신하기 위한 수단으로는 IP만으로는 여러 한계점이 존재한다.
- **비연결성** : 패킷을 받을 대상이 문제가 발생하더라도 그 상황을 알 수가 없기 때문에 연결되지 못할 가능성을 항상 염두해 두어야 한다.
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165709713-330ab3f7-75e4-452c-a6f6-46f1ec188018.png" alt="비연결성 설명 그림" border="1px" width="500px"></p>

- **비신뢰성**
  - **패킷 유실 문제** : 중간에 패킷은 누군가 가로채거나 중간 노드의 문제 발생 등으로 소실될 수 있다.

  <p align="center"><img src="https://user-images.githubusercontent.com/77887712/165710048-b64f7b76-5280-4fec-8452-2e08c0a698c1.png" alt="패킷 유실 문제 설명 그림" border="1px" width="500px"></p>

  - **패킷 순서의 문제** : 보내야할 데이터의 크기가 크면 나눠서 전송해야할 수도 있는데, 중간 노드의 경위에 따라 전달되는 순서가 뒤바뀔 수 있기 때문에 우리가 예상했던 동작을 수행하지 못할 가능성도 존재한다.

  <p align="center"><img src="https://user-images.githubusercontent.com/77887712/165710347-26618e4d-48be-4374-a9e4-f49fefb22886.png" alt="" border="1px" width="500px"></p>

  - 이 그림처럼 "Hello"와 "World"라는 2개의 패킷 데이터를 순서대로 전송하는데, 중간 노드 간의 통신에 따라 결과가 완전히 뒤바뀌어 "World"와 "Hello"라는 순서로 실행 흐름이 바뀔 수도 있다.

- **프로그램 구분**
  - 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 복수로 존재하는 경우, 이를 구분할 수 있는 방법이 없다.
  - ex) 유튜브로 음악을 듣고, 게임을 하는 등 프로그램을 2개 이상 동작하는 경우


#### 3. TCP와 UDP
**인터넷 프로토콜 스택의 4계층(TCP/IP Conceptual Layers 관점)**
- 애플리케이션 계층 - HTTP, FTP
- 전송 계층 - TCP, UDP
- 인터넷 계층 - IP
- 네트워크 인터페이스 계층 - LAN

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165713565-97ff6494-55a5-4fc0-8289-a3e97eef806a.png" alt="인터넷 프로토콜의 4계층 그림" width="500px"></p>


- 관점에 따라 OSI 7계층 등 더 세분화 될 수 있으며, 4 계층의 경우에는 `애플리케이션 > 전송 > 인터넷 > 네트워크`로 분류된다.

**프로토콜 계층의 데이터 전송 과정**

- 클라이언트와 서버가 데이터를 주고 받기 위해 이 계층을 거치는데, 전송될 데이터가 HTTP, TCP, IP, Ethernet Frame의 정보들을 전송할 데이터와 같이 포함하게 되고 최종적으로 이 패킷을 인터넷을 거쳐 서버에 전달하게 된다.
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165720445-5e2631f7-5a0b-4b28-88df-26c49568b488.png" alt="프로토콜 계층의 데이터 전송 과정 그림" width="500px"></p>


**TCP/IP 패킷 정보**
- IP 패킷 (출발지 IP, 목적지 IP, 기타 ...)
- TCP 세그먼트 (출발지 PORT, 목적지 PORT, 전송제어, 순서, 검증 정보 ...) + 전송 데이터
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165721280-740b2d29-edcc-4352-86ff-9e5bedb9b28b.png" alt="TCP/IP의 패킷 정보 그림" width="500px"></p>


**TCP 특징**
> 전송 제어 프로토콜(Transmission Control Protocol)

- **연결 지향적 (TCP 3 way handshake, 가상연결)**
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165724187-a0fe3184-64d5-4ef4-aa8b-3edf2b335926.png" alt="TCP 3 way handshake에 대해 설명하는 그림" border="1px" width="500px"></p>
  - 연결 과정(Connect)
    1. 클라이언트 > 서버 : SYN (접속 요청)
    2. 서버 > 클라이언트 :  SYN(접속 요청) + ACK(요청 수락)
    3. 클라이언트 > 서버 :  ACK(요청 수락)
    4. 데이터 전송
  - SYN: 접속 요청, ACK: 요청 수락
  - 참고: 3. ACK와 함께 데이터 전송 가능
  - 논리적으로 연결된 상황으로 현재 물리적으로 연결된 상태는 아니다.

- **데이터 전달 보증**
  1. 클라이언트 > 서버 : 데이터 전송
  2. 서버 > 클라이언트 : 데이터 수신 완료
  - 이와 같은 과정을 통해 데이터가 전달 됐는지 확인할 수 있다.
- **순서 보장**
  - 1. 클라이언트 > 서버 : 패킷 1, 2, 3 순서로 전송
  - 2. 서버 > 클라이언트 : 패킷 1, 3, 2 순서로 도착
  - 3. 서버 > 클라이언트 : 패킷 2부터 다시 보내도록 요청
  <p align="center"><img src="https://user-images.githubusercontent.com/77887712/165725824-db44afed-a0ab-4232-a5eb-295ad34badcc.png" alt="TCP 순서 보장에 대해 설명하는 그림" border="1px" width="500px"></p>
- 신뢰할 수 있는 프로토콜로 현재 대부분의 사이트는 TCP를 이용하고 있다고 보면 된다.

**UDP 특징**
> 사용자 데이터그램 프로토콜(User Datagram Protocol)
- 비연결지향, 데이터 전달 및 순서 보장 X
- IP와 비슷하지만 PORT와 CheckSum으로 데이터 중복 검사하는 정도만 추가된 형태
- TCP보다 전달할 정보가 적기 때문에 데이터 전달과 순서에 대한 보장은 할 수 없지만 단순하고 빠르다는 장점이 있다.
- 기능이 거의 없으며, 애플리케이션 단에서 추가적인 작업이 필요하다.
- HTTP 3.0에서 이전 TCP보다 최적화를 위해 UDP를 채택함으로써 최근 주목받고 있다.

#### 4. PORT
- 같은 IP 안에 있는 통신하는 애플리케이션(게임, 음악, 브라우저 요청) 등을 구분하기 위한 식별 정보

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165731041-bbbbaa0e-99b7-486b-972c-d32b8148147b.png" alt="PORT를 설명하기 위한 그림" border="1px" width="500px"></p>

- TCP/IP 패킷 구성 요소 : 출발 IP/PORT, 목적지 IP/PORT, 전송 데이터 ...
- 0 ~ 65535 할당 가능
- 0 ~ 1023 : 잘 알려진 포트, 사용하지 않는 것이 좋음
  - FTP - 20, 21
  - TELNET - 23
  - HTTP - 80
  - HTTPS - 443

#### 5. DNS(Domain Name Server)
- IP를 그대로 사용하기에는 몇 가지 불편한 점이 있다.
  1. IP 주소를 기억하기 어렵다.
    - ex) IP : 200.200.200.2
  2. IP는 변경 될 수 있다.
    - 과거 IP가 신규 IP로 바뀌거나 하면 접근을 못하는 문제점을 가지고 있다.
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165731862-5e618c77-e485-4358-9825-98b1068fd326.png" alt="IP 주소 변경에 대해 설명하는 그림" border="1px" width="500px"></p>

- DNS는 전화번호부와 같이 IP 주소에 도메인 이름을 치환하여 이러한 불편한 점을 줄여줄 수 있다.
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/165733323-5c52d322-d405-4e63-bded-21c89a81ba75.png" alt="DNS의 과정에 대해 설명하는 그림" border="1px" width="500px"></p>