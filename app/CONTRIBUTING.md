# Contributing to Driver App

The following is a set of guidelines for contributing to Driver App, which is hosted in the [Marketsoup organization](https://bitbucket.org/marketsoup/) on Bitbucket. These are not just guidelines, yet also rules; however, use your best judgment and feel free to propose changes to this document in a pull request.

#### Table of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
  * [Driver App](#driver-app)
  * [Design Decisions](#design-decisions)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)
  * [Specs Styleguide](#specs-styleguide)
  * [Documentation Styleguide](#documentation-styleguide)


## What should I know before I get started?

### Driver App

Driver App is a mobile application designed to make our drivers and dispatchers life easier. The main concept lying in it is to provide an easy-to-walk-through user interface accessible for drivers of the big trash disposal trucks. Driver should be able to log in, check in, pre-trip, start a work order, get a direction to go, and do other work order related stuff until it's completion.

### Design Decisions

When we make a significant decision in how we maintain the project and what we can or cannot support, we will be documenting them in the [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) file. If you have a question around how we do things, check to see if it is documented there. If it is *not* documented there, please open a new topic in [jira](https://marketsoup.atlassian.net/) and ask your question.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Driver App. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). If you'd like, you can use [this template](#template-for-submitting-bug-reports) to structure the information.

#### Before Submitting A Bug Report

* **Check the [debugging guide](DEBUGGING.md).** You might be able to find the cause of the problem and fix things yourself. Most importantly, check if you can reproduce the problem in the latest version of Driver App.
* **Perform a [cursory search](https://marketsoup.atlassian.net/issues/?filter=-4)** to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [Jira issues](https://marketsoup.atlassian.net/issues/?filter=-4). After you've determined the way to reproduce the bug, create an issue and provide the following information.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If you're reporting that Driver App crashed**, include a crash report with a stack trace.
* **If the problem is related to performance**, include a CPU profile capture and a screenshot with your report.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version of Driver App) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of Driver App?** What's the most recent version in which the problem doesn't happen? You can download older versions of Driver App from [the releases page](https://bitbucket.org/marketsoup/driverapp/downloads?tab=downloads).
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of Driver App are you using?** You can get the exact version in the `package.json`.
* **What's the name and version of the OS you're using**?
* **Are you running Driver App in a browser?** If so, which browser are you using?
* **Are you running Driver App in an emulator?** If so, which emulator are you using and which Android AVD settings are used?

#### Template For Submitting Bug Reports

    [Short description of problem here]

    **Reproduction Steps:**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Expected behavior:**

    [Describe expected behavior here]

    **Observed behavior:**

    [Describe observed behavior here]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which follow reproduction steps to demonstrate the problem](url)

    **Driver App version:** [Enter Driver App version here]
    **OS and version:** [Enter OS name and version here]
    **Browser and version:** [Enter OS name and version here]
    **Emulator and version:** [Enter OS name and version here]

    **Additional information:**

    * Problem started happening recently, didn't happen in an older version of Driver App: [Yes/No]
    * Problem can be reliably reproduced, doesn't happen randomly: [Yes/No]

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Driver App, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the developers understand your suggestion and find related suggestions.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). If you'd like, you can use [this template](#template-for-submitting-enhancement-suggestions) to structure the information.

#### Before Submitting An Enhancement Suggestion

* **Check the [debugging guide](DEBUGGING.md)** for tips — you might discover that the enhancement is already available. Most importantly, check if you're using the latest version of Driver App.
* **Perform a [cursory search](https://marketsoup.atlassian.net/issues/?filter=-4)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [Jira issues](https://marketsoup.atlassian.net/issues/?filter=-4). After you've determined your enhancement suggestions is related to, create an issue in Jira and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Driver App which the suggestion is related to. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most Driver App users.
* **List some other applications where this enhancement exists.**
* **Specify which version of Driver App you're using.** You can get the exact version in `package.json`.
* **Specify the name and version of the OS you're using.**
* **Specify the name and version of the emulator you're using.**
* **Specify the name and version of the browser you're using.**

#### Template For Submitting Enhancement Suggestions

    [Short description of suggestion]

    **Steps which explain the enhancement**

    1. [First Step]
    2. [Second Step]
    3. [Other Steps...]

    **Current and suggested behavior**

    [Describe current and suggested behavior here]

    **Why would the enhancement be useful to most users**

    [Explain why the enhancement would be useful to most users]

    [List some other applications where this enhancement exists]

    **Screenshots and GIFs**

    ![Screenshots and GIFs which demonstrate the steps or part of Driver App the enhancement suggestion is related to](url)

    **Driver App Version:** [Enter Driver App version here]
    **OS and Version:** [Enter OS name and version here]
    **Emulator and Version:** [Enter OS name and version here]
    **Browser and Version:** [Enter OS name and version here]

### Your First Code Contribution

### Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](#javascript-styleguide),
  and [CSS](#css-styleguide) styleguides.
* Include thoughtfully-worded, well-structured
  [AVA](https://github.com/avajs/ava) tests in the `./test/unit` folder or/and in the each separate component as a `*.test.js`. Run them using `npm run test:unit`. See the [Specs Styleguide](#specs-styleguide) below.
* Document new code based on the
  [Documentation Styleguide](#documentation-styleguide)
* End files with a newline.
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
    * Local Modules (using relative paths)
* Avoid platform-dependent code:
    * Use `require('fs-plus').getHomeDirectory()` to get the home directory.
    * Use `path.join()` to concatenate filenames.
    * Use `os.tmpdir()` rather than `/tmp` when you need to reference the
      temporary directory.
* Using a plain `return` when returning explicitly at the end of a function.
    * Not `return null`, `return undefined`, `null`, or `undefined`

## Styleguides

### Git Commit Messages

* Use `npm run commit` instead of any other way to commit
* Choose the right type of a change
    * **feat** is a new feature.
      It means that if this change is allowed to merge to the master branch, it will bump the minor version of the Driver App (1.x.0)
    * **fix** is a bug fix.
      Will bump the bugfix version of the Driver App (1.0.x)
* Use the present tense ("add feature" not "added feature")
* Use the imperative mood ("move cursor to..." not "moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally

### JavaScript Styleguide

All JavaScript must adhere to this style guide. You can check it using `npm run lint`.

* Use the principle:
    * no code - no problem.
    * the less code we write, the less problems we have.
    * the more code we write, the more problems we have.
* Do not overengineer it.
* Do not get carried away by the decomposition.
* Do not implement things which are not required by your task.

### Specs Styleguide

- Include thoughtfully-worded, well-structured
  [AVA](https://github.com/avajs/ava) tests in the `./test/unit` folder or/and in the each separate component as a `*.test.js`.
- Include representative storybooks for components in the directories of each separate component as a `*.story.js`.
- Include thoughtfully-worded, well-structured [calabash](http://calaba.sh/) features in the `./features` folder.

### Documentation Styleguide

* Use inline comments to explain difficult points.
* Do not write code comments to the code that is obvious enough.
* Use Hindley-Milner type system notation to document functions.
* Write input/output examples for the functions to make easy to reason about them without any execution.

#### Example

```js
// map :: (a -> b) -> a -> b
// map(R.add(1), [1, 2, 3])
// > [2, 3, 4]
const map = (f, a) => a.map(f);
```
