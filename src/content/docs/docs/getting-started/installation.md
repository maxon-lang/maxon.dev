---
title: Installation
description: Build the Maxon compiler from source on Windows or Linux.
sidebar:
  order: 2
---

Maxon v1.0 is installed by building the compiler from source. There is no prebuilt binary or
installer yet.

For a full walk-through — prerequisites, per-OS steps, the VS Code extension, and verifying
your build — see the dedicated [Install page](/install/).

## Quick version

Once you have the prerequisites installed and the repository cloned:

```bash
make all                              # build the compiler, LSP, and extension
./bin/maxon examples/basic.maxon      # compile and run a program
make test                             # run the test suite
```

On Windows, run these commands in **Git Bash** (not PowerShell or cmd).

## Prerequisites at a glance

**Windows**

- Git for Windows (includes Git Bash)
- Visual Studio 2022 with the C++ development tools
- CMake 3.13+
- Ninja

**Linux**

- The provided dev container (recommended), or
- `build-essential`, `cmake`, `ninja-build`, and Node.js 20+

See the [Install page](/install/) for the complete instructions and editor setup.
