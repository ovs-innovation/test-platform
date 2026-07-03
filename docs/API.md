# AssessPro API Reference

Base URL (local): `http://localhost:5000/api`

All responses are JSON. Authenticated endpoints require an `Authorization: Bearer <token>` header.
Errors use the shape `{ "message": string, "details"?: [{ field, message }] }` with an appropriate
HTTP status code (400, 401, 403, 404, 409, 429, 500).

Roles: `candidate`, `admin`.

---

## Auth

### POST `/auth/register`
Candidate self-registration. _Public._ Rate-limited.
```json
// body
{ "name": "Jane Doe", "email": "jane@x.com", "password": "secret12" }
// 201
{ "token": "<jwt>", "user": { "id": 1, "name": "Jane Doe", "email": "jane@x.com", "role": "candidate" } }
```

### POST `/auth/login`
Shared candidate/admin login. _Public._ Rate-limited.
```json
// body
{ "email": "admin@assess.io", "password": "Admin@12345" }
// 200
{ "token": "<jwt>", "user": { "id": 2, "name": "Platform Admin", "email": "admin@assess.io", "role": "admin" } }
```

### GET `/auth/me`
Returns the current user. _Auth required._
```json
{ "user": { "id": 1, "name": "Jane Doe", "email": "jane@x.com", "role": "candidate" } }
```

---

## Assessments

### GET `/assessments/available` _(candidate)_
Published assessments (with ≥1 question) plus the caller's attempt status.
```json
{ "assessments": [ { "id": 1, "title": "...", "duration_minutes": 15, "question_count": 5,
  "total_marks": 10, "passing_marks": 6, "attempt_status": null, "attempt_id": null } ] }
```

### GET `/assessments` _(admin)_
All assessments with `question_count`, `total_marks`, `attempt_count`.

### GET `/assessments/:id` _(admin)_
Full assessment + its questions (including `correct_index`).

### POST `/assessments` _(admin)_
```json
// body
{ "title": "Backend Screening", "description": "", "instructions": "",
  "duration_minutes": 30, "passing_marks": 10, "max_violations": 3, "result_visible": true }
// 201 -> { "assessment": { ... } }
```

### PUT `/assessments/:id` _(admin)_
Partial update — any subset of the create fields. Returns `{ "assessment": { ... } }`.

### PATCH `/assessments/:id/publish` _(admin)_
```json
// body
{ "is_published": true }   // requires at least one question to publish
```

### DELETE `/assessments/:id` _(admin)_
Cascades to questions, attempts, answers, scores, violations.

---

## Questions

### GET `/assessments/:assessmentId/questions` _(admin)_
List questions for an assessment.

### POST `/assessments/:assessmentId/questions` _(admin)_
```json
// body
{ "question_text": "2 + 2 = ?", "options": ["3", "4", "5"], "correct_index": 1, "marks": 2 }
// 201 -> { "question": { ... } }
```

### PUT `/questions/:id` _(admin)_
Same body shape as create. Returns `{ "question": { ... } }`.

### DELETE `/questions/:id` _(admin)_
Returns `{ "message": "Question deleted", "id": 12 }`.

---

## Attempts (Assessment Engine)

### POST `/attempts/start` _(candidate)_
Starts or resumes the single allowed attempt.
```json
// body
{ "assessment_id": 1 }
// 201 (new) or 200 (resumed)
{ "attempt": { "id": 5, "status": "in_progress", "ends_at": "..." }, "resumed": false }
// 409 if already completed or time expired
```

### GET `/attempts/:id` _(owner)_
Live exam state. Auto-submits if expired. Questions are returned **without** `correct_index`.
```json
{ "attempt": { ... }, "assessment": { "id": 1, "title": "...", "duration_minutes": 15, "max_violations": 3 },
  "questions": [ { "id": 9, "question_text": "...", "options": ["a","b"], "marks": 2 } ],
  "answers": [ { "question_id": 9, "selected_index": 1 } ] }
```

### PUT `/attempts/:id/answer` _(candidate, owner)_
Real-time autosave (upsert).
```json
// body
{ "question_id": 9, "selected_index": 1 }   // selected_index may be null
// 200 -> { "saved": true }   // 409 if time expired (auto-submitted)
```

### POST `/attempts/:id/submit` _(candidate, owner)_
Finalizes and scores. `reason: "manual"` -> status `submitted`, otherwise `auto_submitted`.
```json
// body
{ "reason": "manual" }
// 200
{ "attempt": { "status": "submitted", ... },
  "score": { "marks_obtained": 8, "total_marks": 10, "percentage": 80.00, "passed": true } }
```

### POST `/attempts/:id/violation` _(candidate, owner)_
Logs a violation, increments the counter, and auto-submits when the limit is exceeded.
```json
// body
{ "violation_type": "tab_switch" }
// 200
{ "violation_count": 2, "max_violations": 3, "autoSubmitted": false }
```
Violation types: `tab_switch`, `window_blur`, `fullscreen_exit`, `copy`, `cut`, `paste`, `right_click`.

### GET `/attempts/:id/result` _(owner or admin)_
Respects `assessment.result_visible` for candidates (admins always see the score).
```json
{ "attempt": { "id": 5, "status": "submitted", "submitted_at": "...", "violation_count": 2 },
  "assessment": { "id": 1, "title": "...", "passing_marks": 6 },
  "score": { "marks_obtained": 8, "total_marks": 10, "percentage": 80, "passed": true },
  "resultVisible": true }
```

---

## Admin Dashboard

### GET `/admin/stats` _(admin)_
```json
{ "totalCandidates": 12, "totalAssessments": 3, "publishedAssessments": 2,
  "totalAttempts": 25, "completedAttempts": 20, "passed": 14, "failed": 6, "avgPercentage": 71.5 }
```

### GET `/admin/candidates` _(admin)_
Candidate roster with `attempts` and `completed` counts.

### GET `/admin/reports` _(admin)_
Every attempt joined with candidate, assessment and score.

### GET `/admin/attempts/:id` _(admin)_
Deep report: `attempt`, `score`, `answers` (with `correct_index` + `selected_index`), and the full `violations` log.

---

## Health

### GET `/health`
`{ "status": "ok", "time": "<iso>" }`
