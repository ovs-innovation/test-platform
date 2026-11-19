# Load testing

Isolated Windows setup for the candidate exam flow. These files live only in `load-testing/` and call the running app over HTTP.

The only k6 entry point is `k6/index.js`. `k6/exam-flow.js` is deprecated and must not be run.

## Configure

Copy `k6/data/students.example.csv` to `k6/data/students.csv` and replace the rows with staging students. Each virtual user owns one row. Set `STUDENTS_FILE=data/students.csv` when that file exists.

From `load-testing`:

```powershell
$env:BASE_URL = "http://localhost:5000"
$env:ASSESSMENT_ID = "0"
$env:STUDENTS_FILE = "data/students.example.csv"
$env:TOTAL_VUS = "10"
$env:EXAM_WINDOW = "30s"
```

`ASSESSMENT_ID=0` is refused. `localhost` is allowed. A staging host must be listed in `ALLOWED_HOSTS`. Production hosts are refused.

Optional split: `PCT_FAST`, `PCT_SLOW`, `PCT_SKIP`, `PCT_REVIEW`, `PCT_RANDOM`. They must add up to 100. Defaults are 40, 20, 15, 15, and 10.

Leave `access_token` empty to log in from the password, or fill it with a token created before the run. The test does not wait on the auth limiter. A 429 stops the run.

## Run later

```powershell
k6 run k6/index.js
```

Each virtual user logs in only its own row, when that row has no token, then starts only its own attempt. Behaviours are fast, slow, skip, review, and random. The script does not submit, and it does not open result or analytics.
