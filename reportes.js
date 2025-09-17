const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports/json', // aquí Cucumber guarda los resultados en JSON
  reportPath: 'reports/html', // aquí se generará el HTML
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: 'Local Test Machine',
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
