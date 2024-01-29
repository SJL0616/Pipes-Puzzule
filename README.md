https://sjl0616.github.io/Pipes-Puzzule.github.io/
# Pipes-Puzzule

<H2> 게임 소개 및 개요</H2>
제한된 횟수 내에서 파이프를 연결하여 파이프 퍼즐을 완성하는 게임입니다.<br>
<img width="183" alt="mygameIntro" src="https://github.com/SJL0616/Pipes-Puzzule.github.io/assets/81796008/6b7c2ef3-72a0-423c-9f87-c343ac7fa91d">

 <H3>개발 중점 요소</H3>
<ul>
 <li>BFS, DFS 알고리즘을 활용하여 파이프 퍼즐을 동적 생성.</li>
 <li>게임 요소별 객체화</li>
</ul>

<H3>게임 시작 -> 종료 플로우차트</H3>
<img width="500" heigth="1000" src= "https://github.com/SJL0616/Pipes-Puzzule/assets/81796008/fc3f1be7-ce5e-44c2-ae82-b6f6fa1a3430">
<ul>
 <li>
  <b>제작자</b> : 이상준
 </li>
  <li>
   <b>제작 기간</b>  : 1주일
 </li>
  <li>
   <b>스택</b> 
   <ul>
  <li>JavaScript</li>
  <li>HTML5</li>
  <li>CSS</li>
</ul>
 </li>
</ul>
<H2>스크립트 설명</H2>
-PipeManager.js (링크)
https://github.com/SJL0616/Pipes-Puzzule.github.io/blob/main/JS/PipeManager.js
<H3>파이프 퍼즐이 완성됬는지 확인하는 로직</H3> <h4>findPath() 함수</h4>  <br>
파이프 드랍 시 너비 우선 탐색 함수(BFS)를 사용해서 퍼즐이 완성되었는지 확인.
단 한개의 파이프라인만 존재하고, 단순히 엔드 노드에 도달했는지 확인하면 되기 떄문에
너비 우선 탐색을 bfs 사용하였음

<H3>힌트를 생성하는 로직</H3> <h4>getHints() 함수</h4>  <br>
스타트 노드부터 주위 노드를 깊이 우선 탐색(DFS)방법으로 재귀 함수로 순회하여 모든 방향의 퍼즐 답안을 반환하는 함수
전체 힌트를 만들때에는 모든 파이프라인을 순회하기 때문에 깊이 우선 탐색 을 사용한 재귀함수를 사용해서 모든
정답 리스트를 만들고 그중에 램덤하게 1개를 힌트로 사용하였음.
