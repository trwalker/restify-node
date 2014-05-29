restify-node
============

### Local Setup Command
sudo npm run-script install-local
### Run Cluster Command
npm start
### Run Single Process Command
npm server.js
### Command Line Args
npm server.js {clustered=0|1} {hostname} {masterport} {workerport}

example: npm server.js 1 www.mysite.com 9000 80
### Run Tests
npm test
