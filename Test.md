// "dev": "nodemon --exec 'NODE_ENV=dev REST_PORT=1337 ts-node ./src/app.ts'",}

#### Lint configuration

Let's imagine you and your team are shipping a code that is:

1. Inconsistent Coding Styles.
2. Potential for Bugs and Typos
3. Unused Variables and Imports
4. Lack of Best Practices Enforcement.

if you are code has all of these attributes, the code review would be a nightmare and I feel sorry for onboarding a new developer to your team.
And on top of that, maintaining the code would kill a lot of time and time is money.

we want to ship a clean and well structured code, and to do so, we are going to use a static code analysis tool to identify problematic patterns in our code called `eslint`.

Install

1. install

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. Create a file called `.eslintrc.json` and add the following code to it:

```json
{
  "env": {
    "node": true,
    "jest": true
  },
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-assertion": "error",
    "eqeqeq": "error",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "no-constant-condition": "error",
    "curly": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-redeclare": "error",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "callback-return": "warn",
    "handle-callback-err": "error",
    "no-path-concat": "error"
  }
}
```

- `env`: Sets up the environment for Node.js and ECMAScript 2021.
- `extends`: Extends the recommended ESLint rules and the recommended rules from the TypeScript ESLint plugin.
- `parser`: Specifies the parser to be used (in this case, the TypeScript parser).
- `parserOptions`: Specifies the ECMAScript version and source type.
- `plugins`: Specifies the plugins to be used (in this case, the TypeScript ESLint plugin).
- `rules`: Defines custom rules.

#### Husky

Sometimes, we make changes, committed, and pushed it, and then the CI builds failed, why? well for many reasons but one of them is linting. It's a good to lint before commit, and because we are human and our minds have thousands of thoughts that makes you forget not matter how careful you are, there's a plugin called husky that would run before the commit and exit the `git commit` when the code does not pass linting.

Install

```bash
npm install husky --save-dev
```

and add the following to your `package.json`:

```json
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
```

#### Environments variables

There's times when you don't want to hard-code some of your configuration in your code. For example, you might have a database connection string that you don't want to hard-code in your code and be seen to public, and you might have a secret key that you don't want to hard-code in your code be seen to public.

Fortunately, Node has a package called `dotenv` that allows you to load environment variables from a `.env` file into `process.env`. This package is very useful when you want to keep your secret keys and configuration in a safe place.

for example:
create a file called .env and add the following code to it:

```js
TEST = 'test';
```

and then in your code, you can access the variable like this:

```ts
import { config } from 'dotenv';
config();

const test = process.env.TEST;
console.log(test);
```

Run your server, and you should see "test" inside your terminal.

# NodeTS-ProductionSetup

**Setup a Node/Typescript production ready project.**

Hi, my name is Yasir, I'am a full-stack developer(more focus on the backend), working with mainly in Asp.net(C#) for my company Oxe.fit.
The last time I started a project from scratch to the end was almost 15 months ago. So I missed that. And I was waiting for a reason(an idea) to start one.
and couple of days ago, on the weekend, I decided to delete unnecessary repositories on GitHub, I deleted some and it felt like a tedious process to visit every repository and go to the settings and following all the steps to delete one (kill me).
Then struck me, what if I build a cli command to delete multiple repositories at once. holla, I found the reason. I googled I found it already built years ago, and I thought it was original, I got a little upset, but I said to myself, so what, let me start build one and then use the already built-ones as reference if I needed help.

I miss working with Nodejs and because I work with React and Typescript, I decided to build the project using Node.js and Typescript, and build as a production ready application.

So I started with setting up the project, and while I was working on the setup, if feels like I forget who to setup a project. I googled, chatGpt it, and I didn't like what's there. So decided to write an article for me before you and use it as a reference every time I want to set up a project.

(Yasir do not get ahead of yourself)

setup:

## create a package.json file

run the command

```shell
npm init -y
```

What is npm?
Each programming language has some sort of a tool to use for install chunk of code that lives somewhere on the internet that you would use for your project. For instance, if you are working with Python, you would use something called `pip`(short for installing package.json). In C#(Aps.Net), we are using NuGet and so of so forth.
In NodeJs, we are using NPM. Npm stands for Node Package Manager. NPM is the tool, It consists of a command-line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website.

what is init?
`init` is the command that tells npm to create `package.json` file

`-y`? This is an optional flg that tells to skip questions and use the default values for the package.json file.

Now, what is `package.json`, and why do we use it?
Imagine you have a magical car. The car is special because it can change its parts as needed. One day, you might need to a turbo engine for speed, another day it might need a snow plow for winter weather.

The car's starter (which represents your program) is the part that gets the car going. To run the car, the starter needs to know what parts(or packages) are needed for the day's journey.

That's where the package.json file comes in. You can think of it as a checklist the starter needs to be able to run the car before starting.

When you run your program, it looks at the `package.json` file. It sees a list of parts. It then goes to the internet(if there's none) and downloads the parts it needs, and runs the car.

Simply, `package.json` file tells your programs what parts it needs to run.

## Installation

Now, let's install the dependencies for the project.

```bash
npm install express
```

I always like to test things before I move on, so let's test server using javascript.

In your root directory, create a folder called src(short for source and it is a conventional name that most if not all of developers have agreed upon).

inside `/src/app.js` create a file called `app.js`

```js
// This is a simple server that returns a json object with a message of "World!" when you visit the /hello endpoint.

// grab the express package
const express = require('express');
// create an instance of the express server
const app = express();
// set the port
const port = 8080;

// create a route that returns a json object with a message of "World!" when you visit the /hello endpoint.
app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'World!' });
});

// start the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

Navigate inside the `/src` and then run

```bash
node app.js
```

After you run the command, you should see the following message in your terminal:
`http://localhost:8080`

click it, and you should not see the message unless you add the `/hello` endpoint to the url.
The complete url will be: `http://localhost:8080/hello`

and then you should see the message

```js
{"message":"World!"}
```

and if you don't want to use the Browser as your REST API client for sending requests to the server, you can use different clients such as Insomnia(I use it) or Postman.
in your root directory, create a file called `tsconfig.json` and add the following code to it.

```json
{
  "compilerOptions": {
    "lib": ["es2018", "dom"], // Specify a list of libraries the project will use
    "target": "es2018", // Set the JavaScript version for output files
    "module": "commonjs", // Set the module system (Node.js uses CommonJS)
    "strict": true, // Enable all strict type-checking options
    "baseUrl": ".", // Base directory to resolve non-relative module names
    "outDir": "dist", // Redirect output structure to the 'dist' folder
    "rootDir": ".", // Specify the root directory of source files
    "skipLibCheck": true, // Skip type checking of all declaration files (*.d.ts)
    "esModuleInterop": true, // Enables compatibility with default imports from modules
    "moduleResolution": "node", // Choose a module resolution strategy
    "resolveJsonModule": true,
    "removeComments": true,

    "paths": {
      "@src/*": ["src/*"] // absolute paths
    },

    "strictNullChecks": true, // Enable strict null checks
    "strictFunctionTypes": true, // Enable strict checking of function types
    "strictPropertyInitialization": true, // Ensure non-undefined class properties are initialized in the constructor
    "strictBindCallApply": true, // Enable stricter checking of the bind, call, and apply methods on functions
    "forceConsistentCasingInFileNames": true, // Disallow inconsistently-cased references to the same file

    "noImplicitAny": true, // Raise error on expressions and declarations with an implied 'any' type
    "noImplicitThis": true, // Raise error on 'this' expressions with an implied 'any' type
    "alwaysStrict": true, // Parse in strict mode and emit "use strict" for each source file

    "noUnusedLocals": true, // Report errors on unused locals
    "noUnusedParameters": true, // Report errors on unused parameters
    "noImplicitReturns": true, // Report error when not all code paths in function return a value
    "noFallthroughCasesInSwitch": true // Report errors for fallthrough cases in switch statement
  },
  "include": [
    "src/**/*" // Include all files in the src directory
  ],
  "exclude": [
    "node_modules", // Exclude the node_modules directory
    "**/*.spec.ts",
    "**/*.test.ts" // Exclude test files
  ]
}
```

To help NodeJs understand the Typescript's paths and baseUrl options in `tsconfig.json` file during the development time, we need to install a package called `tsconfig-paths`.
This package would help to resolve the paths in the `tsconfig.json` file. This is why im able to use the absolute path rather than relative.

For example:

```
import User from @src/models/user.models
```

instead of:

```
import User from '../../../models/user.models';

```

install `tsconfig-paths`

```bash
npm install --save-dev tsconfig-paths
```

To run your program now matter where you are inside your terminal, in your `package.json` file, add the following

scripts:

```json
{
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/app.ts"
  }
}
```

To test the absolute path of the application. Create a folder inside `/src` and name math. And inside the math folder create a file called `add.ts`.
Inside the `src/math/add.ts` file add the following code:

```ts
export const add = (x: number, y: number): number => {
  return x + y;
};
```

Go to `src/app.ts` and add the following code:

```ts
import { add } from '@src/math/add';

console.log(add(1, 2));
```

run your program in terminal

```bash
npm run dev
```

you should see "3" inside your terminal.

**\*Note:** The `tsconfig-paths` package is only used during the development time, and it is not used in the production.
Most applications should use a fille called `.gitignore` to ignore not needed files in the repository. For example, we don't need to push the `node_modules` folder to the repository, and we don't need to push the `dist` folder to the repository.

create inside your root directory file called `.gitignore` and the following script:

```
# Logs

logs
_.log
npm-debug.log_
yarn-debug.log*
yarn-error.log*

# Runtime data

pids
_.pid
_.seed
\*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover

lib-cov

# Coverage directory used by tools like istanbul

coverage

# nyc test coverage

.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)

.grunt

# Bower dependency directory (https://bower.io/)

bower_components

# node-waf configuration

.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)

build/Release

# Dependency directories

node_modules/
jspm_packages/

# TypeScript v1 declaration files

typings/

# Optional npm cache directory

.npm

# Optional eslint cache

.eslintcache

# Microbundle cache

.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history

.node_repl_history

# Output of 'npm pack'

\*.tgz

# Yarn Integrity file

.yarn-integrity

# dotenv environment variables file

.env
.env.test

# parcel-bundler cache (https://parceljs.org/)

.cache

# next.js build output

.next

# nuxt.js build / generate output

.nuxt
dist/

# vuepress build output

.vuepress/dist

# Serverless directories

.serverless/

# FuseBox cache

.fusebox/

# DynamoDB Local files

.dynamodb/

# TSC cache

\*.tsbuildinfo

# IDE / Editor
```

We have done basic setup for the project. We have installed the dependencies, we have created the `tsconfig.json` file, and we have created the `.gitignore` file.

#### Adding testing library called jest

Let me tell you a story how Testing makes my life easier, as well as helping me to understand the flow of the application.
Couple of days ago, at my current company, I was working on the frontend using React to create a new feature that would help our sales and shipping teams greatly. I needed to make CRUD requests for a new endpoint, easy and simple. But when I call this endpoint, some of the operations work fine and other don't. So, I was like, what the hell is going on? I needed to read the test on the backend for it. I went there and I only find unit tests been written which it didn't help much because I wanted to see how different components of the application work together. So, I created an integration test for and put break points all over the place to see and track the flow from the beginning to the end. The application runs fantastic, and the integration test passes(all green😍). At that point, I knew that I suck at the frontend hahah (jk😉). It turns out I didn't pass some of the params on React-query. Moral of the story, if integration test was written I wouldn't waste time looking for a solution for a non-problems. Writing test helping yourself and others on the team.

For our project, we are going to use a testing library called `jest`.
run this:

```bash
npm install --save-dev jest @types/jest ts-jest
```

This will install Jest, its types, and ts-jest.
`ts-jest` is a preprocessor that allows `Jest` to transpile `Typescript` files to `JavaScript`. It allows you to write testing in `ts` code and run it in the node environment. You can think of it as `ts-node` but for testing.

To work with `jest`, we need to configure the the Jest compiler.
To do so, we need to create a file called `jest.config.js`, and copy the following:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: { 'src/(.*)': '<rootDir>/src/$1' },
  moduleDirectories: ['node_modules', 'src'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

`preset`: "ts-jest" ▶️ Jest by default runs on javascript, but we are working with ts. In that case we want to transpile the code to javascript. And this is why we are telling jest through this option `preset: "ts-jest"` to use the `ts-jest` so it transpile ts to js.

`testEnvironment`: "node" ▶️ we want to run the test in NodeJs environment. This option sets the test environment.

`coverageDirectory`: "coverage" ▶️ Jest will output the test coverage in the `coverage` directory.

`collectCoverageFrom`: ["src/**/*.{js,ts}"] ▶️ Jest will collect the coverage information from all js and ts files in the `src` directory.

`transform`: { "^.+\\.tsx?$": "ts-jest" } ▶️ This tells Jest to use the `ts-jest` to transpile files that end with `.ts` or `.tsx` to `.js` before running tests.

`moduleNameMapper`: { "src/(.\*)": "<rootDir>/src/$1" } ▶️ This used for module aliasing. Simply, it tells jest to replace `src/...` with the path from the root directory to the `src` folder.

`moduleDirectories`: ["node_modules", "src"] ▶️ this tells jest to look inside these folders for modules

`testRegex`: "(/**tests**/.\*|(\\.|/)(test|spec))\\.tsx?$" ▶️ This is a regular expression Jest uses to find test files.

moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"] ▶️ This tells Jest to recognize these file extensions as modules.

now add this script to your `package.json` file, under the script

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Prettier

Prettier is a code formatter that will format your code to a consistent style, and it will make your code look beautiful and consistent just like me 😆.

install

```bash
npm install --save-dev prettier
```

create file under your root directory called .prettierrc and add the following code to it:

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

This configuration does the following:

- semi: Ensures that statements are ended with semicolons.
- trailingComma: Includes trailing commas wherever possible.
- singleQuote: Uses single quotes instead of double quotes.
- printWidth: Wraps lines longer than 80 characters.
- tabWidth: Specifies the number of spaces per indentation-level.

Now, to format your code using prettier, run the following command:

```bash
npx prettier --write .
```

or you can add this script to your package.json file:

```json
  "scripts": {
    "format": "prettier --write ."
  },
```

Breakdown and Implementation Strategies
1 Model Updates:

Add a new Invalid status in OrderStatus. This indicates that the order is not valid due to missing or incorrect information.
Replace StatusMessage in the Order class with a list of OrderValidationError objects. This allows for a more detailed representation of what's wrong with the order.
Order Creation Logic Modification:

2 Modify OrderCreationService and related services to allow the creation of orders even if they are considered invalid due to missing information like account ID, product ID, or SKU.
Implement logic to save orders with a status of "Invalid" and no attempt to fulfill these orders until they are valid.
PATCHing Invalid Orders:

Implement an endpoint to PATCH orders with missing information.
Each PATCH operation should trigger validation checks. If the order becomes valid, update its status to "Submitted" and proceed with fulfillment.
Ensure that the PATCH operation is idempotent and handles concurrent requests appropriately.
Shopify Webhook Processing:

Update the logic to create orders from Shopify webhook requests, allowing orders with missing account IDs or invalid product details.
Implement logic to associate a Shopify order with an internal order based on external references or order number.
Internal API for Filtering Orders:

Enhance the internal API to filter orders based on status and other criteria (like tags).
Claiming Orphaned Orders:

Implement logic for new or existing customers to claim orphaned orders. This involves matching email addresses and creating/updating accounts as necessary.
Ensure appropriate authorization and security checks to prevent unauthorized claiming of orders.
Handling Forbidden Operations:

Implement checks to prevent users from updating or claiming orders they should not have access to.
Staff Operations:

Allow staff (e.g., BackOffice client) to assign orphaned orders to accounts.
Prevent staff from reassigning already submitted valid orders to different accounts.
Acceptance Criteria Verification
Make sure each acceptance criterion is explicitly tested, either through automated tests or manual testing procedures.
Pay special attention to edge cases, such as attempts to claim orders with mismatched email addresses or PATCHing orders with invalid data.
Additional Considerations
Error Handling and Logging: Ensure robust error handling and logging mechanisms are in place, especially for the PATCH endpoint and webhook processing logic.
Security and Permissions: Validate that only authorized subjects can PATCH orders and that the system correctly enforces role-based access controls.
Performance and Scalability: Consider the impact of these changes on the system's performance, especially if the order volume is high or if the PATCH operations are complex.
Data Validation and Sanitization: Ensure that all inputs are properly validated and sanitized, especially in the context of PATCH requests and webhook processing.
Documentation and API Design: Update API documentation to reflect new endpoints, PATCH operations, and any changes in the order creation process.
Given the complexity of this story, careful planning, thorough testing, and close attention to security and data integrity are crucial. If there are specific areas where you need more detailed advice or if you encounter any challenges while implementing these features, feel free to reach out for further assistance.

## 2

Great! Moving on to the second part, "Order Creation Logic Modification," involves updating your order creation process to accommodate the creation and handling of "invalid" orders, particularly in scenarios like processing Shopify webhook requests where certain information may be missing or incorrect. Here's a breakdown of what you might need to consider and implement:

2. Order Creation Logic Modification
   This step involves modifying the logic in the OrderCreationService and possibly other related services. The goal is to ensure that orders can be created and saved even if they are marked as "invalid" due to missing or incorrect information, such as a missing account ID or invalid product ID/SKU.

Key Implementation Points:
Allow Saving Invalid Orders:

Update the logic to save orders with a status of "Invalid" in your database or order storage system.
This might involve modifying validation checks that currently prevent saving such orders.
Handling Missing Account ID:

Modify the order creation process to proceed even if the accountId is missing in the INewOrder object or if the account resolution fails.
This may require adjusting how your system handles orders without associated accounts.
Proceeding with Invalid Product Details:

Allow the order creation process to proceed even if product details like ID or SKU are missing or invalid.
Ensure that these cases are marked as validation errors in the order.
Status Management:

Ensure that orders with missing or incorrect information are flagged with the "Invalid" status.
Implement logic to update the order status based on the validation results.
Skipping Fulfillment for Invalid Orders:

Modify the fulfillment logic to skip orders marked as "Invalid."
This ensures that no fulfillment processes (like shipping, inventory deduction, etc.) are initiated for these orders.
Shopify Integration:

If integrating with Shopify or other external systems, ensure that the webhook or data ingestion process is aligned with this new logic.
Consider how to handle and store external reference IDs like Shopify order numbers.
Additional Considerations:
Error Handling: Ensure robust error handling and logging for cases where the order is saved as "Invalid."
Testing: Update or add new unit tests and integration tests to cover these changes. Test scenarios with missing account IDs, invalid product details, and successful conversions of invalid orders to valid ones.
Performance: Consider the performance implications of these changes, especially if they might lead to an increased volume of saved orders.
Transaction Management: If your order creation involves multiple steps or interactions with different systems, ensure that transaction management is handled correctly to maintain data integrity.
API and Documentation: If these changes affect any API endpoints, make sure to update the API documentation accordingly.
Once you have implemented the changes for the order creation logic, feel free to share any specific code snippets or descriptions of your implementation for further review and feedback. Good luck, and if you have any questions along the way, I'm here to help!
