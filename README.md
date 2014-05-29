restify-node
============

### Local Setup Command

> sudo npm run-script install-local

### Run Cluster Command

> npm start

### Run Single Process Command

> npm server.js

### Run Tests Command

> npm test

### Debugging Command

> node-debug server.js

### Command Line Args

> npm server.js {clustered} {hostname} {masterport} {workerport}

**clustered** (bit): Tells the application to use cluster-service.  Default is 0.

**hostname** (string): Tells the application what hostname to use.  Default is 127.0.0.1.

**masterport** (int): Tells the application which port to use for the master process (this is a backdoor port that allows you to talk to your master process).  Default is 3000.

**workerport** (int): Tells the application which port to use for the worker processes (this is the port the application will take requests on). Default is 9000.

### Command Line Example

> npm server.js 1 www.mysite.com 9000 80
