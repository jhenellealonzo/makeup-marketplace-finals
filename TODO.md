# Task: Fix /api/v1/products/top-3-cheap to return only 3 cheapest products

## Plan Steps:
1. [x] Clean DB: `node import-dev-data.js --delete` (done, duplicates remain?)
2. [x] Re-import data: `node import-dev-data.js --import` (done)
3. [ ] Add debug logging to productController.js and apiFeatures.js
4. [ ] Edit files with logs
5. [ ] Kill server (Ctrl+C), restart `node server.js`
6. [ ] Test endpoint, verify logs and response (results:3, sorted price asc)
7. [ ] Remove logs if fixed
8. [ ] Complete task

Current status: DB has 20 duplicate products (old batches not fully deleted?), limit/sort not applying despite clean logic. Need logs to debug req.query application.
