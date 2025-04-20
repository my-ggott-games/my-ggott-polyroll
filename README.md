# 🎲 my-ggott-polyroll

**TRPG/DND에서 사용하는 3D 주사위 컴포넌트를 React로 구현한 라이브러리입니다.**  
Canvas 기반의 렌더링, 물리엔진, 그리고 다양한 주사위 타입 지원을 목표로 합니다.

---

## 🧱 사용한 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| Language | TypeScript |
| Framework | React |
| 3D Engine | Three.js |
| React 3D Wrapper | @react-three/fiber, @react-three/drei |
| 빌드 | tsup |
| 린트/포맷터 | ESLint (v8), Prettier |
| Git Hooks | Husky, lint-staged |
| 커밋 검사 | Commitlint (@commitlint/config-conventional) |

---

## 🧾 커밋 메시지 컨벤션 (with 이모지)

> 커밋 메시지는 아래 형식을 따릅니다:
> <emoji> <type>(optional-scope): <message>

### 예시

| 이모지 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| 🎉 | `init:` | 프로젝트 초기 설정 | `🎉 init: 프로젝트 초기 세팅` |
| ✨ | `feat:` | 새로운 기능 추가 | `✨ feat: DiceD6 주사위 추가` |
| 🐛 | `fix:` | 버그 수정 | `🐛 fix: Canvas 렌더링 오류 수정` |
| ♻️ | `refactor:` | 코드 리팩토링 | `♻️ refactor: useDice 훅 리팩토링` |
| 📄 | `docs:` | 문서 수정 | `📄 docs: README.md 작성` |
| 🎨 | `style:` | 코드 스타일 변경 | `🎨 style: prettier 포맷 적용` |
| ✅ | `test:` | 테스트 코드 추가/수정 | `✅ test: DiceD6 테스트 추가` |
| 🔧 | `chore:` | 설정 변경, 기타 | `🔧 chore: tsconfig 설정 수정` |
| 🔁 | `revert:` | 이전 커밋 되돌리기 | `🔁 revert: DiceD6 롤백` |

---

## 💡 참고 명령어

```bash
npm run lint            # ESLint 실행
npm run build           # 라이브러리 빌드(tsup)
npm run prepare         # Husky 초기화
```

## 📦 설치 예정 기능
 🎲 사면체(D4), 팔면체(D8), 십면체(D10), 십이면체(D12), 이십면체(D20) 추가

 🌌 WebXR (AR/VR) 지원

 🎛️ 주사위 커스터마이징 (색상, 폰트, 애니메이션 등)
