---
title: "PICNIC"
date: 2020-11-10T15:05:13+09:00
categories: ["Algorithm"]
tags: ["algorithm", "exhaustive search"]
slug: algospot-picnic
---

## [문제읽기](https://www.algospot.com/judge/problem/read/PICNIC)

## 문제요약

간단하게, 가능한 친구쌍(짝)의 경우가 주어졌을 때, 이를 조합하여 학생들을 짝지어줄 수 있는 경우의 수를 구하는 문제이다. 예를 들어 다음의 두 경우는 서로 다른 경우로 카운팅 해준다.

- (태연,제시카) (써니,티파니) (효연,유리)
- (태연,제시카) (써니,유리) (효연,티파니)


## 풀이

책을 안보고 풀었다ㅎㅎ 개인적으로는 책보다 더 나은 코드를 작성한 것 같아 뿌듯하다.

먼저, 학생의 수가 홀수일 경우, 짝이 없는 학생이 반드시 발생하므로, solve method에서 바로 return 시켜주었다. 홀수가 아닐 경우 recursive method에서 문제를 해결하도록 하였다. 짝이 있는 학생들과 짝이 정해지지 않은 학생들을 구분하기 위해서 ```isPaired``` boolean array에서 짝이 있는 학생들의 경우 ```true```, 짝이 없는 학생들의 경우 ```false```로 저장하도록 하였다.

recursive 메소드는 ```pairs``` array에 저장되어 있는 짝꿍이 가능한 ```pair```들을 입력받은 순서대로 순회하면서, 해당 ```pair```를 이용하였을 때 짝이 만들어 지면 ```pairs``` array의 다음 인덱스 ```pair```에서도 recursive 메소드를 돌면서 해당 ```pair```를 이용하였을 때 짝이 만들어지는지 또 확인한다.

예를 들어, 다음과 같이 입력되었을 경우를 생각해보자.

    6 10
    
    0 1 0 2 1 2 1 3 1 4 2 3 2 4 3 4 3 5 4 5

이때, 가능한 짝궁들을 정리하면 다음과 같다.

- (0, 1) - 0번
- (0, 2) - 1번
- (1, 2) - 2번
- (1, 3) - 3번
- (1, 4) - 4번
- (2, 3) - 5번
- (2, 4) - 6번
- (3, 4) - 7번
- (3, 5) - 8번
- (4, 5) - 9번

먼저, ```isPaired``` 배열은 초기에 모두 ```false```인데, 0번 ```pair```를 수용한다고 하면, ```isPaired[0]```과 ```isPaired[1]```은 ```true```이다.

또 다음 1번 ```pair```가 수용되는지 체크하는데, ```isPaired[0]```이 true이므로 다음 index로 넘어간다.

2번, 3번, 4번도 ```isPaired[1]```이 ```true```이므로 다음 index로 넘어가면, 5번 index의 pair (2,3)를 체크한다.

```isPaired[2]```와 ```isPaired[3]```은 ```false```로 짝궁이 없으므로 둘다 ```true```로 바꿔준 후 다음 index를 마찬가지로 계속 검사한다.

이렇게 검사하다가, ```isPaired``` 배열이 모두 ```true```로 모두 짝이 있는 경우가 될 경우 한 가지 경우를 찾은 것이므로 ```Answer```를 1 늘려주고 return 시켜준다.

모두 검사했는데 ```isPaired``` 배열이 모두 ```true```는 아닌 경우에는 모두 짝이 있는 경우가 아니므로 단순 return 시켜준다.

이와같은 코드가 다음과 같다.

```java
public void recursive(int pairIdx)
{
	// 모두 각자 짝이 있을 경우
	if (isAllTrue(isPaired))
	{
		Answer++;
		return;
	}
	// 모든 경우를 순회했을 경우
	if (pairIdx == pairs.length) return;

	// 둘 다 짝이 없는 경우
	// isPaired true로 할당 후 다음 pairIdx로 넘어감, return 후에는 원래대로 false로 할당
	if (!isPaired[pairs[pairIdx].pair1] && !isPaired[pairs[pairIdx].pair2])
	{
		isPaired[pairs[pairIdx].pair1] = true;
		isPaired[pairs[pairIdx].pair2] = true;

		recursive(pairIdx + 1);

		isPaired[pairs[pairIdx].pair1] = false;
		isPaired[pairs[pairIdx].pair2] = false;
	}

	// 어느 하나라도 짝이 있는 경우 - 다음 pairIdx로 넘어감
	recursive(pairIdx + 1);
}
```
## 코드 전문 - [Github 링크](https://github.com/parkjbdev/AlgoStudy/blob/master/APSS/CH06/PICNIC/src/Main.java)