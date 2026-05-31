---
title: Build System
description: Project structure, build.maxon, and multi-project workspaces.
sidebar:
  order: 14
---

Maxon uses a `build.maxon` file as a script file with exported functions that can be run via `maxon run`. This file serves as both a project root marker and a task runner.

### Project Structure

A Maxon project is defined by the presence of a `build.maxon` file:

```text
myproject/
├── build.maxon          # Script file with exported functions
├── main.maxon           # Entry point
├── lib.maxon            # Project file
└── utils/
    └── math.maxon       # Files in subdirectories are included
```

### build.maxon

The `build.maxon` file contains exported functions that serve as runnable commands. Each exported function must return `ExitCode` and must not throw. Private helper functions (without `export`) are not listed or runnable.

Each exported function may be preceded by `///` doc-comment lines; those lines are rendered next to the command name in the `maxon run` listing. Plain `//` comments are treated as in-source notes and are not surfaced to the CLI.

```maxon
/// Build the project.
export function build() returns ExitCode
	let exe = try FilePath.from("maxon") otherwise return 2
	var argv = StringArray.create()
	argv.push("build")
	argv.push(".")
	let result = try Subprocess.run(.path(exe), arguments: argv, workingDirectory: Directory.currentPath(), timeoutMs: 60000) otherwise return 1
	if not result.succeeded() 'failed'
		return 1
	end 'failed'
	return 0
end 'build'

/// Compile the self-hosted compiler and run its spec tests.
export function spec_test_selfhosted() returns ExitCode
	print("Compiling...\n")
	let exe = try FilePath.from("bin/maxon.exe") otherwise return 2
	var argv = StringArray.create()
	argv.push("build")
	argv.push("maxon-selfhosted")
	let result = try Subprocess.run(.path(exe), arguments: argv, workingDirectory: Directory.currentPath(), timeoutMs: 120000) otherwise return 1
	if not result.succeeded() 'failed'
		return 1
	end 'failed'
	return 0
end 'spec_test_selfhosted'

// Private helper - not listed or runnable via maxon run
function log(msg String)
	print(msg)
end 'log'
```

This automatically:
- Sets output to `myapp.exe` in the project root
- Discovers all `.maxon` files in the project directory (recursively)
- Skips directories containing a `.maxonignore` flag file
- Uses default compilation settings

Use `maxon run` to execute exported functions from `build.maxon`:

```bash
# List available commands (names shown with dashes)
maxon run

# Run a specific function (dashes are translated to underscores)
maxon run spec-test-selfhosted

# maxon build is shorthand for maxon run build
maxon build
```

> **Note:** The CLI translates dashes to underscores, so `maxon run spec-test-selfhosted` runs the function `spec_test_selfhosted`. The listing displays function names with dashes for convenience.

### Multi-Project Workspaces

Multiple projects can coexist in a workspace. Each project is isolated by its `build.maxon`:

```text
workspace/
├── project-a/
│   ├── build.maxon      # Project A root
│   └── main.maxon
└── project-b/
    ├── build.maxon      # Project B root
    └── main.maxon
```

The LSP automatically detects project boundaries and provides:
- Project-scoped symbol completion
- Cross-file go-to-definition within a project
- Isolated diagnostics per project

---
