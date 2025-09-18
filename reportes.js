const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports/json', 
  reportPath: 'reports/html', 
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'Proyecto Playwright + Screenplay + BDD',
    data: [
      { label: 'Proyecto', value: 'Demo Reservas Espaciales' },
      { label: 'Tester', value: 'Jhoan Márquez' },
      { label: 'Fecha', value: new Date().toLocaleString() }
    ]
  }
});
