# E2E tests with [Cypress](https://www.cypress.io/) and [Cucumber](https://www.cucumber.io/)

## What is inside?
- Page Object Pattern
- TypeScript
- [Gherkin lint](https://github.com/vsiakka/gherkin-lint)
- [Allure Report](http://allure.qatools.ru/)

## Getting Started
Installing dependencies: 
```bash
npm install
```

Run self hosted application `http://localhost:4200/`
```bash
ng serve
```

Running e2e tests:
```bash
npm run cypress:run
```

## Gherkin lint
This project use [Gherkin lint](https://github.com/vsiakka/gherkin-lint) to keep the files `.feature` organized.
Running Ghergin format code:
```bash
npm run code:gherkin
```

## Reports
### Generate and open Allure report locally
```bash
npm run allure:generate && npm run allure:open
```