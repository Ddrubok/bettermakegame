# 접촉 효과 종료 처리 수정

`impact.mjs`에서 종료된 이벤트 ID를 현재 라운드 동안 `finished` 집합에 보관하도록 수정했습니다. `finish(id)` 이후 높은 revision을 받아도 메시지 이력은 갱신하되 효과를 재생성하거나 성공 burst를 추가하지 않습니다. 확인 전 종료된 pending 이벤트에도 적용됩니다. `nextRound()`와 `dispose()`는 종료 기록도 정리합니다.

적용 범위는 표시 수명 관리입니다. 기존 pending/confirmed 구분, 활성 효과 위치 보정, revision 및 중복 처리, 공개 메서드와 반환 동작을 유지했습니다. 시뮬레이션·권한·시계·효과 종류는 변경하지 않았습니다. 제공된 bettermakegame 스킬 및 관련 선택/피드백 참고 문서를 적용했습니다.

실제로 실행한 검사(세션 폴더에서 Node.js v22.18.0):

- `node check.mjs` — 수정 전 `pending: finished effect resurrected` assertion 실패로 결함 재현.
- 동일 명령 — 수정 후 통과. pending/confirmed 종료 후 후속 확인·거절·재확인, 반복 finish, 신규 이벤트, 새 라운드의 ID 재사용, 중복·역순 revision, 확정 후 pending 방지, 활성 preview/impact 위치 보정, 거절 시 제거, dispose, 잘못된 입력을 검사했습니다. 메시지 수신 전 finish도 검사했습니다.
- 위 검사에서 `simulate()`와 표시 콜백을 연결한 `simulate()`의 결과 일치를 확인했습니다.
- `node --check impact.mjs` — 문법 검사 통과.

검사 파일은 `check.mjs`로 남겼습니다. 실제 네트워크·렌더러가 없는 fixture이므로 화면 재생, 체감 품질, 실제 지연·다중 기기 동작은 검증하지 않았습니다. 성능 측정도 수행하지 않았습니다.
