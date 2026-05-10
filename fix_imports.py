import os
import re

def fix_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace imports from 'interfaces/code-example' with '@app/shared'
    content = re.sub(r"from\s+['\"].*interfaces/code-example['\"]", "from '@app/shared'", content)

    # 2. Replace imports from 'topic-template/topic-template' with '@app/shared'
    content = re.sub(r"from\s+['\"].*topic-template/topic-template['\"]", "from '@app/shared'", content)

    # 3. Replace imports from 'generic-topic/generic-topic.component' with '@app/shared'
    content = re.sub(r"from\s+['\"].*generic-topic/generic-topic.component['\"]", "from '@app/shared'", content)

    # 4. Replace imports from 'src/app/constants/...' or relative paths to constants
    # Pattern for relative paths like ../../../../constants/prerequisites.const
    content = re.sub(r"from\s+['\"](?:\.\./)+constants/(.*?)['\"]", r"from '@app/features/topics/constants/\1'", content)
    
    # Pattern for src/app/constants/...
    content = re.sub(r"from\s+['\"]src/app/constants/(.*?)['\"]", r"from '@app/features/topics/constants/\1'", content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    root_dir = r'D:\Practice\angular\Projects\angular_training\src\app\features\topics'
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.ts'):
                fix_imports(os.path.join(root, file))

if __name__ == "__main__":
    main()
