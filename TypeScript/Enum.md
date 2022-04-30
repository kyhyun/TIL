## 타입스크립트 - 이넘
> 이름이 있는 상수들의 집합으로 열거형 데이터를 의미한다.

```
나이키
아디다스
뉴발란스
```
- 주어진 옵션 안에서 선택할 수 있도록 범위를 제한하는 목적으로 사용한다. (DropDown, Tab List 등)

**숫자형 이넘**

```ts
enum Shoes {
  Nike,
  Adidas,
  NewBalance = 10
}

var myShoes = Shoes.Nike;
console.log(myShoes); // 0
console.log(Shoes.Adidas); // 1
console.log(Shoes.NewBalance); // 10
```
- enum에 담겨진 데이터의 속성에 접근해서 출력하면 별도로 초기화를 하지 않는 한 첫 번째 값은 0으로 시작하며, 그 다음 데이터부터 1씩 증가한다.

**문자형 이넘**

```ts
enum Shoes {
  Nike = '나이키',
  Adidas = '아디다스',
  NewBalance = '뉴발란스'
}

var myShoes = Shoes.Nike;
console.log(myShoes); // 나이키
console.log(Shoes.Adidas); // 아디다스
console.log(Shoes.NewBalance); // 뉴발란스
```
- 문자열도 마찬가지로 초기화 값을 지정해서, 그 속성 값들을 출력하면 지정된 값들이 나온다.

**활용 예시**

```ts
enum Answer = {
  Yes = 'Y',
  No = 'N'
}

function askQuestion(answer: Answer) {
  if(answer === Answer.Yes){
    console.log('answer');
  }
  if(answer === Answer.No) {
    console.log('wrong');
  }
}

askQuestion(Answer.Yes);
askQuestion('Yes'); // error
```