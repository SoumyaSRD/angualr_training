

// ============================================================================
// NODE.JS VS NPM: THE COMPLETE GUIDE
// ============================================================================

import { ICodeExample } from "../../../../interfaces/code-example";
import { ISection, ITopicContent } from "../../../../interfaces/topic";

export const NODEJS_VS_NPM: ITopicContent = {
    title: "Node.js vs NPM: Understanding the Difference",
    tags: ["nodejs", "npm", "javascript", "backend", "package-manager"],

    paragraphs: [
        "Node.js is a JavaScript runtime that lets you run JavaScript on your computer or server. NPM (Node Package Manager) is a tool that comes with Node.js to help you install and manage packages (libraries).",
        "Think of Node.js as the engine of a car, and NPM as the toolbox and spare parts you need to build and maintain that car."
    ],

    keyPoints: [
        "Node.js: JavaScript runtime environment",
        "NPM: Package manager for Node.js",
        "NPM comes bundled with Node.js",
        "Node.js executes code, NPM manages packages",
        "Both essential for modern JavaScript development"
    ],

    sections: [
        {
            heading: "What is Node.js?",
            content: "Node.js is a platform for building server-side applications with JavaScript",
            list: [
                "Runs JavaScript outside the browser",
                "Uses Chrome's V8 JavaScript engine",
                "Event-driven, non-blocking I/O model",
                "Perfect for building APIs, servers, and tools",
                "Includes core modules for file system, HTTP, etc."
            ]
        },
        {
            heading: "What is NPM?",
            content: "NPM is the world's largest software registry and package manager",
            list: [
                "Default package manager for Node.js",
                "Manages project dependencies",
                "Hosts over 2 million packages",
                "Manages versions and updates",
                "Handles project scripts and configurations"
            ]
        },
        {
            heading: "How They Work Together",
            content: "The relationship between Node.js and NPM",
            list: [
                "Install Node.js → Get NPM automatically",
                "Use NPM to install packages for Node.js projects",
                "Node.js uses packages installed by NPM",
                "NPM manages the node_modules folder",
                "package.json acts as the project blueprint"
            ]
        }
    ],

    codeExamples: [
        {
            title: "Installation & Setup Commands",
            language: "bash",
            code: `# 1. Check if Node.js and NPM are installed
node --version
npm --version

# 2. Install a package locally (for one project)
npm install express

# 3. Install a package globally (for all projects)
npm install -g nodemon

# 4. Initialize a new Node.js project
npm init                 # Interactive setup
npm init -y              # Quick setup with defaults

# 5. Install and save to package.json
npm install axios --save
npm install typescript --save-dev`,
            description: "Essential commands to get started with Node.js and NPM"
        },

    ],

    bestPractices: [
        "Always start with 'npm init' to create package.json",
        "Use 'npm install --save' for production dependencies",
        "Use 'npm install --save-dev' for development dependencies",
        "Never commit node_modules folder to Git",
        "Use .gitignore to exclude node_modules",
        "Regularly update packages with 'npm update'",
        "Use specific version numbers in package.json",
        "Create separate scripts in package.json for different tasks",
        "Use 'npx' to run packages without installing globally"
    ]
};

// ============================================================================
// COMPARISON TABLE: NODE.JS VS NPM
// ============================================================================

export const COMPARISON_TABLE: ISection[] = [
    {
        heading: "Node.js vs NPM: Quick Comparison",
        content: "Understanding their different roles",
        list: [
            "Node.js → Runtime Environment | NPM → Package Manager",
            "Node.js → Executes JavaScript code | NPM → Installs JavaScript packages",
            "Node.js → Built on Chrome's V8 engine | NPM → Registry of packages",
            "Node.js → Can work without NPM | NPM → Needs Node.js to function",
            "Node.js → For running applications | NPM → For managing dependencies"
        ]
    },
    {
        heading: "File Structure Explained",
        content: "Key files and folders in a Node.js project",
        list: [
            "package.json → Project configuration and dependencies",
            "package-lock.json → Exact versions of installed packages",
            "node_modules/ → Folder where NPM installs packages",
            ".js files → Your application code (run by Node.js)",
            ".gitignore → File to exclude node_modules from Git"
        ]
    }
];

// ============================================================================
// STEP-BY-STEP SETUP GUIDE
// ============================================================================

export const SETUP_GUIDE: ITopicContent = {
    title: "Complete Setup Guide: From Zero to Running",

    sections: [
        {
            heading: "Step 1: Install Node.js & NPM",
            content: "Get both tools with one installation",
            list: [
                "Download Node.js from nodejs.org",
                "Choose LTS (Long Term Support) version",
                "Run the installer (includes NPM automatically)",
                "Verify installation in terminal: node -v and npm -v"
            ]
        },
        {
            heading: "Step 2: Create Your First Project",
            content: "Set up a new Node.js project from scratch",
            list: [
                "Create project folder: mkdir my-project && cd my-project",
                "Initialize NPM: npm init -y",
                "Create main file: touch index.js",
                "Write your first code: console.log('Hello Node.js!')",
                "Run it: node index.js"
            ]
        },
        {
            heading: "Step 3: Add Dependencies with NPM",
            content: "Enhance your project with packages",
            list: [
                "Install packages: npm install package-name",
                "Check package.json to see installed dependencies",
                "Explore node_modules folder structure",
                "Use the packages in your code with require()"
            ]
        }
    ],

    codeExamples: [
        {
            title: "Complete Project Setup Example",
            language: "bash",
            code: `# Complete workflow example
# -------------------------------------------------
# 1. Create and navigate to project folder
mkdir my-first-node-project
cd my-first-node-project

# 2. Initialize package.json
npm init -y

# 3. Install necessary packages
npm install express
npm install dotenv --save-dev
npm install nodemon --save-dev

# 4. Create .gitignore file
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore

# 5. Create environment file
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# 6. Create main application file
cat > app.js << 'EOF'
require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Node.js project is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});
EOF

# 7. Update package.json scripts
# Add this to package.json:
# "scripts": {
#   "start": "node app.js",
#   "dev": "nodemon app.js"
# }

# 8. Run the project
npm run dev  # For development with auto-restart
# OR
npm start    # For production`,
            description: "Complete step-by-step setup for a Node.js project"
        }
    ]
};

// ============================================================================
// COMMON SCENARIOS AND SOLUTIONS
// ============================================================================

export const COMMON_SCENARIOS: ICodeExample[] = [
    {
        title: "Scenario 1: Creating a Basic API",
        language: "javascript",
        code: `// Install: npm install express body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(\`API server running at http://localhost:\${PORT}\`);
});`,
        description: "Building a REST API with Node.js and Express"
    },
    {
        title: "Scenario 2: Reading/Writing Files",
        language: "javascript",
        code: `// Using Node.js built-in modules (no NPM needed)
const fs = require('fs');
const path = require('path');

// Read a file
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Write to a file
const content = 'Hello, this is written by Node.js!';
fs.writeFile('output.txt', content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
});

// Read JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    console.log('JSON data:', jsonData);
});`,
        description: "Using Node.js core modules for file operations"
    },
    {
        title: "Scenario 3: Using External NPM Packages",
        language: "javascript",
        code: `// First install packages: npm install axios chalk
const axios = require('axios');
const chalk = require('chalk');

// Make HTTP request with axios
async function fetchData() {
    try {
        console.log(chalk.blue('Fetching data from API...'));
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        console.log(chalk.green('Success! Received data:'));
        console.log(chalk.yellow(\`Number of posts: \${response.data.length}\`));
        
        // Display first 3 posts
        response.data.slice(0, 3).forEach(post => {
            console.log(chalk.cyan(\`Title: \${post.title}\`));
        });
        
    } catch (error) {
        console.log(chalk.red('Error fetching data:'), error.message);
    }
}

// Using moment.js for dates (install: npm install moment)
const moment = require('moment');
console.log('Current date:', moment().format('MMMM Do YYYY, h:mm:ss a'));
console.log('Two days from now:', moment().add(2, 'days').format('LL'));

fetchData();`,
        description: "Using popular NPM packages in your Node.js application"
    }
];

// ============================================================================
// TROUBLESHOOTING COMMON ISSUES
// ============================================================================

export const TROUBLESHOOTING: ITopicContent = {
    title: "Common Issues and Solutions",

    sections: [
        {
            heading: "Installation Problems",
            content: "Fixing common installation issues",
            list: [
                "'node' is not recognized → Reinstall Node.js or add to PATH",
                "Permission errors → Use sudo (macOS/Linux) or Run as Administrator (Windows)",
                "Version conflicts → Use nvm (Node Version Manager)",
                "Slow installation → Check internet connection, use npm cache clean"
            ]
        },
        {
            heading: "Package Issues",
            content: "Solving NPM package problems",
            list: [
                "Package not found → Check spelling, ensure package exists",
                "Version conflicts → Delete node_modules and package-lock.json, run npm install",
                "Missing dependencies → Check if package.json is correct",
                "Global vs local confusion → Use npx for one-time commands"
            ]
        }
    ],

    bestPractices: [
        "Always use version control (Git)",
        "Document your project with a README.md",
        "Use environment variables for configuration",
        "Implement error handling in your code",
        "Write tests for your application",
        "Use logging for debugging",
        "Keep dependencies updated regularly",
        "Follow semantic versioning",
        "Use ESLint for code quality",
        "Set up continuous integration"
    ]
};