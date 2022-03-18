# Homepage-Front

키퍼 홈페이지 프론트엔드

### module 설치

```
npm install
```

---

### env 환경 설정

- **.env**

```
REACT_APP_MODE=production
GENERATE_SOURCEMAP=false
REACT_APP_API_URL=API_URL:port
REACT_APP_CHAT_URL=FRONT_URL:3002
```

프로젝트 디렉토리에 위와 같이 **.env** 파일 작성

- 배포모드에서는 `REACT_APP_MODE=production`으로 설정해 주세요.

---

### 실행

- **배포**

  ```shell
  npm run pro
  ```

  배포는 80번 포트로 서비스합니다.

- **개발**

  ```shell
  npm run dev
  ```

  개발모드에서는 3000번 포트로 서비스합니다.

---
