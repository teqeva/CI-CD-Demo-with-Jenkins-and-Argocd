const fs = require('fs');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('<title>WEEK 10 CI/CD Demo</title>'), 'Missing expected title');
assert(html.includes('Jenkins + ArgoCD'), 'Missing expected CI/CD description text');
assert(html.includes('Kubernetes'), 'Missing expected platform reference');

console.log('All tests passed.');