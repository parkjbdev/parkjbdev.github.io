---
title: "BOARDCOVER"
date: 2020-11-20T16:03:13+09:00
categories: ["Algorithm"]
tags: ["algorithm", "exhaustive search"]
slug: algospot-boardcover
---
## [문제읽기](https://www.algospot.com/judge/problem/read/BOARDCOVER)

## 문제요약

![](http://algospot.com/media/judge-attachments/2b7bfee35cbec2f4e799bb011ac18f69/03.png) 

게임보드가 주어졌을 때, 'ㄱ'모양 도형을 이용하여 게임보드를 채울 수 있는 방법의 수를 구하는 문제이다.


## 풀이

```map```에서 벽이거나 'ㄱ'모양 도형이 채워지지 빈 공간을 차례대로 순회하면서 해당 위치에 4가지 블럭을 대입해보면서 계산하면 된다.
즉, 과정을 예시를 들자면, 다음과 같다.


    1. 다음 빈 좌표로 이동
    2. 'ㄱ'모양 도형 채워넣기 (방향 돌려가면서 반복!!)
        2-1. 다음 빈 좌표로 이동
        2-2. 'ㄱ'모양 도형 채워넣기
            2-2-1. 다음 빈 좌표로 이동
            2-2-2. 'ㄱ'모양 도형 채워넣기
                (계속 깊게 반복하다가 return)
            2-2-3. 'ㄱ'모양 도형 지우기
        2-3. 'ㄱ'모양 도형 지우기
    3. 'ㄱ'모양 도형 지우기



위의 예시에서처럼 크게 '좌표이동, 도형채우기, 재귀, 도형지우기'의 과정을로 진행된다.

이를 코드로 구현하면 다음과 같다.

```java
private void recursive(Pair coord)
{
	if (isAllFilled())
	{
		Answer++;
		return;
	}

	coord = nextPair(coord);

	for (int blockType = 0; blockType < blocks.length; blockType++)
	{
		if (isFillPossible(coord, blockType))
		{
			fillBlock(coord, blockType);
			recursive(coord);
			deleteBlock(coord, blockType);
		}
	}
}
```

이번문제도 책을 보지않고 풀었다ㅎㅎ 특정기능은 메소드로 따로 빼주는거를 좋아하는지라 수행하는 기능에 따라서 나누어 주었고, 덕분에 가독성적인 측면에서 이득이 있었다.
​
## 코드 전문 - [Github 링크](https://github.com/parkjbdev/AlgoStudy/blob/master/APSS/CH06/BOARDCOVER/src/Main.java)