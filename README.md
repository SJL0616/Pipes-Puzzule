https://sjl0616.github.io/Pipes-Puzzule.github.io/
# Pipes-Puzzule

<H2> 게임 소개 및 개요</H2>
램덤으로 생성되는 파이프들을 연결해서 제한된 사용 횟수 내에서 파이프를 연결하는 게임입니다.
 <H3>개발 중점 요소</H3>
<ul>
 <li>BFS, DFS 알고리즘을 활용하여 파이프 퍼즐을 동적 생성.</li>
 <li>게임 요소별 객체화</li>
</ul>

<H3>게임 시작 -> 종료 플로우차트</H3>
<img width="500" heigth="1000" src= "https://github.com/SJL0616/Pipes-Puzzule/assets/81796008/fc3f1be7-ce5e-44c2-ae82-b6f6fa1a3430">
<H2>스택</H2>
<ul>
  <li>JavaScript</li>
  <li>HTML5</li>
  <li>CSS</li>
</ul>
<H2>스크립트 설명</H2>
-PipeManager.js (링크)
https://github.com/SJL0616/Pipes-Puzzule.github.io/blob/main/JS/PipeManager.js
<H3>파이프 퍼즐이 완성됬는지 확인하는 로직</H3> -findPath()  함수
파이프 드랍 시 너비 우선 탐색 함수(BFS)를 사용해서 퍼즐이 완성되었는지 확인.
단 한개의 파이프라인만 존재하고, 단순히 엔드 노드에 도달했는지 확인하면 되기 떄문에
너비 우선 탐색을 bfs 사용하였음



