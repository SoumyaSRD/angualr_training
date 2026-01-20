

// ============================================================================
// ANGULAR CLI: INSTALLATION & OVERVIEW
// ============================================================================

import { ITopicContent } from "../../../../../interfaces/topic";

export const ANGULAR_CLI_OVERVIEW: ITopicContent = {
    title: "Angular CLI: Your Development Assistant",
    tags: ["angular", "cli", "command-line", "tools", "development"],

    paragraphs: [
        "Angular CLI is a command-line tool that helps you create, develop, and maintain Angular applications. Think of it as a Swiss Army knife for Angular developers.",
        "It automates common tasks like creating components, building projects, and running tests - saving you time and ensuring consistency."
    ],

    keyPoints: [
        "Command-line interface for Angular",
        "Generates files and structure",
        "Builds and serves applications",
        "Runs tests and linting",
        "Manages dependencies and updates"
    ],

    sections: [
        {
            heading: "What Angular CLI Does",
            content: "The main jobs of Angular CLI",
            list: [
                "🚀 Creates new Angular projects",
                "🔧 Generates components, services, modules",
                "🏗️ Builds for development and production",
                "🌐 Serves apps with live reload",
                "✅ Runs tests and linting",
                "📦 Adds and removes packages"
            ]
        },
        {
            heading: "Why Use Angular CLI",
            content: "Benefits of using the CLI",
            list: [
                "Saves time on repetitive tasks",
                "Ensures consistent project structure",
                "Follows Angular best practices",
                "Reduces configuration headaches",
                "Integrates with other tools"
            ]
        }
    ],

    codeExamples: [
        {
            title: "Basic Installation & Setup",
            language: "bash",
            code: `# 1. Install Angular CLI globally
npm install -g @angular/cli

# 2. Check installation
ng version

# 3. Create a new Angular project
ng new my-app

# Answer questions:
# ✓ Add Angular routing? Yes
# ✓ Which stylesheet format? CSS

# 4. Navigate to project
cd my-app

# 5. Run the application
ng serve --open`,
            description: "Complete setup from zero to running app"
        },
        {
            title: "Common Commands",
            language: "bash",
            code: `# Project Management
ng new app-name         # Create new app
ng serve               # Start dev server
ng build               # Build for production
ng test                # Run tests
ng lint                # Check code quality

# Generating Files
ng generate component user-list
ng generate service auth
ng generate module admin
ng generate pipe format-date

# Short versions
ng g c user-list      # Component
ng g s auth           # Service
ng g m admin          # Module
ng g p format-date    # Pipe

# Updating & Managing
ng update             # Update packages
ng add @angular/pwa   # Add features`,
            description: "Essential commands for daily development"
        }
    ],

    bestPractices: [
        "Use ng new for consistent project structure",
        "Generate files with CLI instead of creating manually",
        "Use --dry-run to preview changes before applying",
        "Regularly update CLI with npm update -g @angular/cli",
        "Use ng lint before committing code",
        "Add flags like --skip-tests for faster prototyping",
        "Use --style flag to choose CSS preprocessor"
    ]
};

