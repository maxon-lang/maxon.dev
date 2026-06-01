---
title: Installation
description: Build the Maxon compiler from source with the .NET SDK.
sidebar:
  order: 2
---

Maxon is installed by building the compiler from source. There is no prebuilt binary or
installer yet.

For a full walk-through — prerequisites, the VS Code extension, and verifying your build — see
the dedicated [Install page](/install/).

## Quick version

Once you have the prerequisites installed:

```bash
git clone https://github.com/maxon-lang/maxon.git
cd maxon

dotnet build maxon-sharp               # build the compiler -> bin/maxon
bin/maxon build examples/basic.maxon   # compile and run a program
bin/maxon spec-test                    # run the spec-test suite
```

On Windows, `buildall.bat` builds and tests the full toolchain — the C# compiler, the
self-hosted compiler, and their spec tests — in one step.

## Prerequisites at a glance

- [.NET 10 SDK](https://dotnet.microsoft.com/download) — the compiler (`maxon-sharp`) targets
  `net10.0`.
- Git
- Node.js 20+ — only needed to build the VS Code extension.

See the [Install page](/install/) for the complete instructions and editor setup.
