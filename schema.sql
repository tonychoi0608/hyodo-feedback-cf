CREATE TABLE IF NOT EXISTS feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO feedbacks (name, content) VALUES
  ('테스터1', '디자인이 깔끔하고 보기 좋습니다. 어르신들도 글씨가 커서 좋아하실 것 같아요.'),
  ('김효도', '일정 추가할 때 음성 인식 기능이 있으면 더 편리할 것 같습니다.'),
  ('사용자A', '알림 기능이 잘 작동해서 부모님이 약 드실 시간을 안 잊어버리셔서 좋네요.');
