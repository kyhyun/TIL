# 1. 작게 만들기

- 각 함수가 명백하게 어떤 일을 하는지 알아볼 수 있도록 해야하며 가능한 짧아야 한다.
- 들여쓰기(indent)는 3단계 이하로 작성해야하며, 함수의 길이는 약 20줄 이내가 적당하다고 본다.
  - 블록 구문(조건, 반복)에는 들여쓰기 수준이 1~2단 이내로 중첩 수준을 유지한다.
  - 그 이상 중첩이 길어지는 경우 적절한 이름을 가진 함수를 호출해서 가독성을 좋게 만들어야 한다.

---

# 2. 한 가지 역할만 하기

- 함수는 한 가지 기능만을 해야한다.
  - 여기서 한 가지 기능이라는 건 함수 이름 아래에서 동작하는 추상화 수준이 하나라는 것을 말한다.
  - 예를들어 사과를 구매하고, 사과를 씻은 다음 과일을 깎아서 접시에 올리는 이 과정을 보자.
    - 이 세 기능은 하나의 추상화로 묶어보자면 `ApplePlating`으로 할 수도 있다.
- 함수를 만드는 이유는 큰 개념(=동작/기능)을 다음 추상화 수준에서 여러 단계로 나눠 작업하기 위해서다.

---

# 3. 각 함수의 단일 추상화

- 한 함수 내 추상화 수준은 모두 동일해야 좋다.
  - 그렇지 않으면 특정 표현이 핵심 로직인지 아니면 세부적인 내용인지 구분하기 힘들어진다.
  - 또한 사람들도 헷갈려서 해당 함수에 복잡한 세부사항을 추가하게 된다.

---

# 4. switch 문

- 본질적으로 switch 문은 N가지를 처리하도록 만들어졌다.
- 이를 작게 만들기 위해서는 저차원 클래스에 숨기고 절대로 반복하지 않도록 하는 방법을 사용한다.(다형성)

```java
// 예시 : 직원 유형에 따라 다른 값을 계산해 반환하는 함수
public Money calculatePay(Employee e)
throw InvalidEmployeeType {
 switch (e.type) {
  case COMMISSIONED:
   return calculateCommissionedPay(e);
  case HOURLY:
   return calculateHourlyPay(e);
  case SALARIED:
   return calculateSalariedPay(e);
  default:
   throw new InvalidEmployeeType(e.type);
 }
}
```

- 이 코드의 문제는 다음과 같다.

  1. 함수가 길다.
  2. 한 가지 작업만 수행하지 않는다.
  3. 단일 책임의 원칙(SRP)를 위반하고 있다. ⇒ 코드 변경할 이유가 2개 이상이다.
  4. 개방 폐쇄의 원칙(OCP)를 위반하고 있다. ⇒ 새 직원 유형을 추가하면 코드가 변경된다.

- 이 문제를 해결하려면 switch문을 추상 팩토리에 숨기고 Employee 파생 클래스의 인스턴스로 내부 함수를 호출할 수 있도록 하면 다형성으로 인해 위와 같은 문제들을 해결할 수 있다.

```java
// 추상 팩토리 패턴을 활용한 코드 개선
public abstract class Employee {
 public abstract boolean isPayday();
 public abstract Money calculatePay();
 public abstract void deliverPay(Money pay);
}

public interface EmployeeFactory {
 public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

public class EmployeeFactoryImpl implements EmployeeFactory {
 public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
  case COMMISSIONED:
   return new CommissionedEmployee(r);
  case HOURLY:
   return new HourlyEmployee(r);
  case SALARIED:
   return new SalariedEmployee(r);
  default:
   throw new InvalidEmployeeType(r.type);
 }
}
```

---

# 5. 함수 인수

- 함수에서 이상적인 인수는 적을수록 좋고, 0~2개 사이로 고려하는 것이 좋다.
  - 최선은 0개, 차선은 1개를 담을 수 있도록 고려해보자.
- 테스트 관점에서도 인수가 많을 수록 케이스 작성에 대한 조합을 만들기가 까다로워진다.

## 5-1. 많이 사용하는 단항 형식

- 언제 단항 형식(함수 인수 1개)을 사용해야할까 ?
  1. 인수에 질문을 던지는 경우(해당 인수에 매치 되는 값이 있는가? 등)
  2. 인수에 대한 변환 작업을 하고 그 결과를 반환하는 경우
  3. 이벤트 함수를 사용하는 경우
- 그 외의 경우가 아니라면 단항 함수는 가급적 피한다.

## 5-2. 플래그 인수

- 함수로 `boolean` 값을 인수로 넘기는 것은 정말 좋지 않다.
  - `true` 일 때, 수행하는 동작과 `false` 일 때, 수행하는 동작을 하기 때문에 여러 가지를 처리 할 수 있다는 것을 암시한다.

## 5-3. 이항 함수

- 언제 이항 함수 형식(함수 인수 2개)을 사용해야할까?
  - 직교 좌표계(x, y)와 같이 인수 2개가 한 값을 표현하려는 구성요소가 되는 경우
  - 두 인자에 자연적인 순서가 존재하는 경우

## 5-4. 단항 함수 이상의 경우

- 그 이상 인수가 늘어나는 상황은 되도록 피하는 것이 좋다고 저자는 책에서 말하고 있다.🤔
- 만약 인수가 2~3개 필요하다면 일부를 독자적인 클래스 변수로 선언해야할 시점임을 의미한다.

```java
Circle makeCircle(double x, double y, double radius); // 개선 전
Circle makeCircle(Point center, double radius); // 개선 후
```

위 예제와 같이 x와 y를 묶어 중앙 지점을 의미하는 center 라는 개념을 표현해서 인수의 수를 줄일 수 있게 된다.

---

# 6. 부수 효과(Side Effect)

- 함수로 넘어온 인수나 전역 변수를 수정하는 등 예기치 못한 일을 발생시킬 수 있으므로 피한다.
  - 이는 코드의 순서적인 종속성 및 시간적인 결합을 강제하게 된다.
    - 호출을 언제 하느냐에 따라 결과가 변화하거나, 순서에 따라 다른 결과가 출력되는 등을 말한다.

---

# 8. 예외 사용하기

- 명령 함수에서 오류 코드를 반환하는 방식은 명령/조회 기능을 분리하는 규칙에서 벗어난다.
  - 이때 예외를 사용한다면 오류 처리 코드가 원래 코드에서 분리되어 코드가 개선된다.
- 오류 처리도 “한 가지” 작업에 속하며, 오류를 처리하는 함수는 오류만 처리할 수 있도록 해야한다.

## 8-1. Try/Catch 블록 분리하기

- 정상 동작하는 코드와 오류 처리하는 동작을 뒤섞기 때문에 이 구문은 별도의 함수로 분리하는게 좋다.

```java
public void delete(Page page) {
 try {
  deletePageAndAllReferences(page);
 } catch (Exception e) {
  logError(e);
 }
}

private void deletePageAndAllReferences(Page page) throws Exception {
 deletePage(page);
 registry.deleteReference(page.name);
 configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e){
 logger.log(e.getMessage());
}
```

이처럼 delete 함수에 모든 오류를 처리하도록 하면 정상 동작과 오류 처리 동작을 분리해서 코드를 이해하고 수정하기 쉬워진다.

---

# 9. 구조적 프로그래밍

- 구조적 프로그래밍의 원칙인 “모든 함수와 함수내 모든 블록(반복, 조건)에 입구와 출구가 하나만 존재하도록 해야한다”는 것은 함수가 클 때 많은 이익을 제공 하지만 함수를 작게 만든다면 return, break, continue 등을 한 함수내에 여러 차례 사용하는 것도 괜찮다.
