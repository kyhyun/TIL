## URI와 브라우저 요청 흐름

### 1) URI(Uniform Resource Identifier)
> 리소스를 식별하는 통합된 방법으로 Locator과 Name 또는 둘다 추가로 분류 될 수 있다.

<p align="center"><img src="https://user-images.githubusercontent.com/77887712/166185881-c498f386-834d-4351-9128-a45b347a306f.png" alt="URI 전체 모식도" border="1px" width="500px">
</p>

- 그림처럼 URI는 URL과 URN을 모두 포함할 수 있는 포괄적인 개념이다.

**URL(Uniform Resource Locator)**
> 리소스 위치 지정
- 위치는 변경될 수 있다.
- URN은 잘 사용하지 않기 때문에 URI와 URL을 같은 의미로 봐도 된다.
```
// URL의 구조
foo://example.com:8042/over/there?name=ferret#nose
- Scheme : foo
- Authority : example.com:8042
- Path : over/there
- Query : name=ferret
- Fragment : nose 
```

**URN(Uniform Resource Name)**
> 리소스 이름 부여
- 부여된 이름은 값이 변경될 수 없다.
- urn:isbn:8060777331 등과 같은 도서 ISBN에 쓴다.
- 하지만 URN의 이름만으로 실제 리소스를 찾는 보편적인 방법이 없다.
```
// URN의 구조
urn:example:animal:ferret:nose
- Scheme : urn 
- Path : example.animal:ferret:nose  
```

**URL의 전체 문법**
```
scheme://[userinfo@]host[:port][?query][#fragment]
https://www.google.com:443/search?q=hello&hl=ko
```
- 프로토콜(https)
- 호스트명(www.google.com)
- 포트번호(443)
- 경로(/search)
- 쿼리 파라미터(q=hello=hl=ko)

**Scheme**
- 주로 프로토콜을 사용
- 프로토콜 : 어떤 방식으로 자원에 접근할 것인지 정하는 규칙 (http, https, ftp 등)
- 포트는 생략이 가능

**userinfo**
- URL에서 사용자 정보를 포함해서 인증
- 거의 사용하지 않는다.

**host**
- 호스트명
- 도메인명 또는 IP 주소를 직접 사용할 수 있다.

**port**
- 접속 포트
- 일반적으로 생략 가능하다.
- http : 80, https : 443

**path**
- 리소스 경로를 계층적 구조로 표현
- 예시
  - /home/file1.jpg
  - /members
  - /members/100

**query**
- key : value 형태
- `?` : 시작, `&` : 추가
- 예) ?keyA=valueA&keyB=valueB
- query parameter 혹은 query string이라고 부른다.

**fragment**
- html 내부의 북마크 등에 사용
- 서버에 전송되는 정보가 아니다.

### 2) 브라우저 요청 흐름
<p align="center"><img src="https://user-images.githubusercontent.com/77887712/166201085-4fbc001c-9413-4c56-add6-f6c38c9861f4.png" width="500px"></p>
1. 웹 브라우저가 구글 서버에 https:///www.google.com;443/search/?q=hello&hl=ko 라는 URL의 리소스 요청을 하기 위해 HTTP 요청 메시지를 생성한다.
```
/* HTTP 요청 메시지 */
GET / Search?q=hello&hl=ko HTTP1.1
Host:www.google.com
```

2. Socket 라이브러리를 통해서 TCP/IP로 3-way hand-shake를 실행해 서버와 가상으로 연결됨을 확인한다.

3. 운영체제 TCP/IP 계층으로 데이터 전송을 하기 위해 데이터를 전달한다.

4. HTTP 메시지가 포함된 TCP/IP 패킷을 생성한다.

5. 패킷 정보가 인터넷을 통해 여러 노드 서버를 거쳐 서버에 전달된다.

6. 서버에 전달된 패킷 정보는 브라우저 요청 메시지를 전달하는 과정의 역순으로 진행하면서, 패킷 껍데기를 버리고, 최종적으로 HTTP 메시지를 서버가 해석한다.

7. HTTP 응답 메시지를 마찬가지 방식으로 패킷을 생성하여 응답 패킷을 전달한다.
```
/* HTTP 응답 메시지 */
HTTP/1.1 200 OK
Content-Type : text/html;charset=UTF-8
Content-Length : 3423

<html>
  <body> ... </body>
</html>
```

8. 수 많은 노드들을 통해서 응답 패킷이 도착하게 되면 웹 브라우저가 HTML 렌더링하여 화면에 보여준다.
