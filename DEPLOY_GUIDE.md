# 효도달력 피드백 게시판 - Cloudflare Pages 배포 가이드

## 1단계: Wrangler 설치 (아직 안 했다면)
```bash
npm install -g wrangler
wrangler login
```

## 2단계: D1 데이터베이스 생성
```bash
npx wrangler d1 create hyodo-feedback-db
```
출력되는 `database_id`를 복사해서 `wrangler.toml` 파일의 `database_id`에 붙여넣으세요.

## 3단계: 데이터베이스 테이블 생성
```bash
npx wrangler d1 execute hyodo-feedback-db --remote --file=./schema.sql
```

## 4단계: Cloudflare Pages에 배포
```bash
npx wrangler pages project create hyodo-feedback
npx wrangler pages deploy ./public
```

## 5단계: D1 바인딩 연결
Cloudflare 대시보드에서:
1. Workers & Pages > hyodo-feedback 프로젝트 선택
2. Settings > Functions > D1 database bindings
3. Variable name: `DB`, D1 database: `hyodo-feedback-db` 선택
4. Save

이후 다시 배포하면 완료됩니다:
```bash
npx wrangler pages deploy ./public
```

## GitHub 연동 자동 배포 (선택)
1. 이 코드를 GitHub 저장소에 푸시
2. Cloudflare Pages 대시보드 > Create a project > Connect to Git
3. Build settings:
   - Build command: (비워두기)
   - Build output directory: `public`
4. D1 바인딩 설정 (위 5단계 참고)
