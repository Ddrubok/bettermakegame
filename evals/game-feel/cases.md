# Game-feel use cases

These are the task inputs for the 2026-10-31 check. Workspace paths and runner wrapper wording have been omitted for portability; the substantive user requests are preserved. They are synthetic situations, not reports from measured play sessions.

Use the selected `bettermakegame/SKILL.md` and its relevant references. Provide only the chosen case and raw artifacts. Recommendation cases do not authorize source edits. No evaluation requires access to a real account, production game or external publishing service.

## R — Scoped implementation

이 간단한 레이싱 프로토타입의 움직임을 개선해주세요. 가속 버튼을 누르면 최고 속도로 바로 튀고, 아날로그 스틱이 조금 흔들려도 방향이 급격히 꺾여서 조작이 불편합니다. 최고 속도 12m/s는 유지하고 버튼을 놓으면 0.4초 이내에 멈춰야 합니다. 키보드의 -1/0/1 조향도 계속 지원해야 합니다. 여러 기법 중 맞는 것을 골라 적용해주세요.

Raw artifact: `racer/before.mjs`, supplied as `controller.mjs` in an isolated workspace. It is the entire controller fixture; no rendering runtime or asset package is provided. The agent may edit that workspace and run meaningful checks with the installed Node runtime. Ask it to state what actually ran and what remains unverified. No new dependencies are needed.

## A — Online physical impacts

온라인 물리 대전에서 기물 충돌이 밋밋합니다. 히트스톱을 포함해서 몇 가지 방법을 비교해주세요. 게임 결과와 60Hz 물리 진행, 턴 시간은 바뀌면 안 됩니다. 충돌 이벤트에는 eventId, contact point, strength가 있으며 같은 접촉 이벤트가 중복 수신될 수 있습니다. 아직 구현하지 말고 추천해주세요.

## B — Repeated puzzle success

퍼즐 게임입니다. 모든 올바른 배치마다 0.8초 축하 팝업이 나오고 그동안 다음 입력을 막습니다. 빠르게 여러 조각을 놓는 사람이 답답하다고 합니다. 어떤 기법으로 개선할까요? 규칙과 점수는 그대로입니다. 추천만 해주세요.

## C — Calm gardening feedback

정원 돌보기 게임입니다. 물주기가 성공하면 자원 숫자만 줄고 식물 모습은 다음 성장 단계에만 바뀝니다. 성공했는지 헷갈린다는 반응이 있어요. 차분한 분위기를 유지하는 피드백을 추천해주세요.

## D — Narrow UI scope

설정 화면 닫기 버튼의 실제 터치 영역만 넓히는 작업 계획을 짧게 알려주세요. 위치와 그림은 유지하고 싶습니다.

## E — Rhythm calibration

리듬 게임에서 블루투스 이어폰을 쓰면 박자가 늦다고 느끼는 사람이 있습니다. 입력 판정 구간이나 점수 규칙은 넓히지 않고 개선하는 방법을 제안해주세요. 측정 결과는 아직 없습니다.
