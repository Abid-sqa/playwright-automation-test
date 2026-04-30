# Playwright E2E Automation Framework

A professional end-to-end testing framework built with Playwright and TypeScript, following the Page Object Model (POM) pattern for maintainable and scalable test automation.

## 🚀 Features

- **TypeScript Support**: Full type safety and modern JavaScript features
- **Page Object Model**: Maintainable and reusable page objects
- **Custom Fixtures**: Dependency injection for test fixtures
- **Multi-Environment Support**: Dev, Stage, and Production environments
- **Multi-Browser Testing**: Chrome, Firefox, and WebKit (Safari)
- **HTML Reports**: Comprehensive test execution reports
- **Trace on Retry**: Automatic trace collection on test failures
- **Parallel Execution**: Configurable worker threads for faster test runs
- **CI/CD Ready**: Built-in CI configuration support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control

## 🛠️ Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd playwright-automation-course-2025
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

4. **Set up environment files**:
   Create environment-specific configuration files in the root directory:
   - `.env.dev` - Development environment
   - `.env.stage` - Staging environment
   - `.env.prod` - Production environment

   Example `.env.dev` file:
   ```env
   BASE_URL=https://example.com
   TEST_ENV=dev
   ```

## 📁 Project Structure

```
playwright-automation-course-2025/
├── tests/
│   ├── fixture/
│   │   └── base-test.ts          # Custom test fixtures with page objects
│   ├── pages/
│   │   ├── BasePage.ts           # Base page class with common methods
│   │   ├── HomePage.ts           # Home page object
│   │   ├── LoginPage.ts          # Login page object
│   │   ├── CartPage.ts           # Cart page object
│   │   └── ProductDetailsPage.ts # Product details page object
│   ├── test/
│   │   ├── login.spec.ts         # Login test scenarios
│   │   └── test-cart.spec.ts     # Cart test scenarios
│   └── utils/
│       └── helper.ts             # Utility functions
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies and scripts
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

### Git Ignore Configuration

The `.gitignore` file excludes the following from version control:

- `node_modules/` - Node.js dependencies
- `/test-results/` - Test execution results and artifacts
- `/playwright-report/` - HTML test reports
- `/blob-report/` - Blob storage reports
- `/playwright/.cache/` - Playwright browser cache
- `/playwright/.auth/` - Authentication state files

**Note**: Environment files (`.env.dev`, `.env.stage`, `.env.prod`) should also be added to `.gitignore` if they contain sensitive information.

## ⚙️ Configuration

### Playwright Configuration

The framework is configured via `playwright.config.ts` with the following features:

- **Test Directory**: `./tests`
- **Test Pattern**: `**/*.spec.ts`
- **Workers**: 5 parallel workers
- **Retries**: 2 retries in CI, 0 locally
- **Reporter**: HTML reporter for detailed test reports
- **Trace**: Enabled on first retry for debugging

### Environment Configuration

The framework supports multiple environments through environment files:

- **Development**: `.env.dev`
- **Staging**: `.env.stage`
- **Production**: `.env.prod`

Set the `TEST_ENV` environment variable to switch between environments.

### Browser Configuration

Supported browsers:
- **Chrome** (Chromium)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (Pixel 5)
- **Mobile Safari** (iPhone 13)

Set the `BROWSER` environment variable to specify the browser.

## 🧪 Running Tests

### Basic Test Commands

**Run all tests in development environment:**
```bash
npm run test:dev
```

**Run tests in a specific browser:**
```bash
npm run test:dev:chrome
npm run test:dev:firefox
npm run test:dev:webkit
```

**Run tests in headed mode (visible browser):**
```bash
npm run test:dev:headed
```

**Run specific test file:**
```bash
npm run test:stage:cart:headed
```

**Run tests in production environment:**
```bash
npm run test:prod
```

### Advanced Test Execution

**Run tests with custom viewport:**
```bash
VIEWPORT_WIDTH=1920 VIEWPORT_HEIGHT=1080 npm run test:dev
```

**Run tests in non-headless mode:**
```bash
HEADLESS=false npm run test:dev
```

**Run a specific test file:**
```bash
npx playwright test tests/test/login.spec.ts
```

**Run tests in debug mode:**
```bash
npx playwright test --debug
```

**Run tests in UI mode:**
```bash
npx playwright test --ui
```

## 📊 Test Reports

After test execution, view the HTML report:

```bash
npx playwright show-report
```

The report includes:
- Test execution summary
- Pass/fail status
- Execution time
- Screenshots and videos (if configured)
- Trace files for failed tests

## 🏗️ Architecture

### Page Object Model (POM)

The framework follows the Page Object Model pattern:

- **BasePage**: Contains common methods used across all page objects
- **Page Objects**: Each page has its own class with specific methods
- **Test Fixtures**: Custom fixtures inject page objects into tests

### Custom Fixtures

The framework uses Playwright's fixture system to inject page objects:

```typescript
test('Example test', async ({ page, homePage, loginPage }) => {
  // Page objects are automatically available
  await homePage.navigateTo('/');
  await loginPage.performLogin('user', 'pass');
});
```

Available fixtures:
- `basePage`: BasePage instance
- `homePage`: HomePage instance
- `loginPage`: LoginPage instance
- `cartPage`: CartPage instance
- `productDetailsPage`: ProductDetailsPage instance

## 📝 Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from "../fixture/base-test";

test.describe('Feature Tests', () => {
  test('Should perform action', async ({ page, homePage, basePage }) => {
    await test.step('Navigate to page', async () => {
      await basePage.navigateTo('/');
    });

    await test.step('Verify page title', async () => {
      expect(await basePage.getPageTitle()).toBe('Expected Title');
    });
  });
});
```

### Best Practices

1. **Use test steps**: Organize test actions with `test.step()`
2. **Use page objects**: Access UI elements through page objects
3. **Use meaningful assertions**: Use descriptive `expect` statements
4. **Keep tests independent**: Each test should be able to run standalone
5. **Use environment variables**: Store configuration in `.env` files

## 🔧 Troubleshooting

### Common Issues

**Issue**: Tests fail with "Environment file not found"
- **Solution**: Ensure `.env.dev`, `.env.stage`, or `.env.prod` files exist in the root directory

**Issue**: Browsers not installed
- **Solution**: Run `npx playwright install`

**Issue**: Tests timeout
- **Solution**: Increase timeout in `playwright.config.ts` or check network connectivity

## 🚀 CI/CD Integration

The framework is configured for CI/CD environments:

- **CI Detection**: Automatically detects CI environment
- **Headless Mode**: Runs in headless mode in CI
- **Retries**: Automatically retries failed tests (2 retries)
- **Trace Collection**: Collects traces on retry for debugging

Example GitHub Actions workflow:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm run test:prod
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Dependencies

- **@playwright/test**: ^1.56.1 - Playwright testing framework
- **@types/node**: ^24.9.2 - TypeScript types for Node.js
- **dotenv**: ^16.3.1 - Environment variable management
- **cross-env**: ^7.0.3 - Cross-platform environment variable setting
- **faker**: ^6.6.6 - Test data generation
- **moment**: ^2.29.4 - Date manipulation

