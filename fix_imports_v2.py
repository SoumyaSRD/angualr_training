import os
import re

def fix_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    for line in lines:
        # Skip lines that are not imports
        if not line.strip().startswith('import '):
            new_lines.append(line)
            continue

        # 1. Replace imports from 'interfaces/...' with '@app/shared'
        # (This covers interfaces/code-example and interfaces/topic)
        line = re.sub(r"from\s+['\"].*interfaces/.*['\"]", "from '@app/shared'", line)

        # 2. Replace imports from 'topic-template/topic-template' with '@app/shared'
        line = re.sub(r"from\s+['\"].*topic-template/topic-template['\"]", "from '@app/shared'", line)

        # 3. Replace imports from 'generic-topic/generic-topic.component' with '@app/shared'
        line = re.sub(r"from\s+['\"].*generic-topic/generic-topic.component['\"]", "from '@app/shared'", line)

        # 4. Replace imports from 'constants/...' or relative paths to constants
        # Pattern for relative paths like ../../../../constants/prerequisites.const
        # We replace the whole thing with @app/features/topics/constants
        line = re.sub(r"from\s+['\"](?:\.\./)+constants/.*?['\"]", "from '@app/features/topics/constants'", line)
        
        # Pattern for src/app/constants/...
        line = re.sub(r"from\s+['\"]src/app/constants/.*?['\"]", "from '@app/features/topics/constants'", line)

        # Pattern for @app/features/topics/constants/something.const
        line = re.sub(r"from\s+['\"]@app/features/topics/constants/.*?['\"]", "from '@app/features/topics/constants'", line)

        new_lines.append(line)

    # Combine imports from the same source
    combined_imports = {} # source -> set of symbols
    final_lines = []
    import_ended = False
    
    for line in new_lines:
        match = re.match(r"import\s+\{(.*?)\}\s+from\s+['\"](.*?)['\"]", line.strip())
        if match and not import_ended:
            symbols = [s.strip() for s in match.group(1).split(',')]
            source = match.group(2)
            if source not in combined_imports:
                combined_imports[source] = set()
            for s in symbols:
                if s:
                    combined_imports[source].add(s)
        else:
            if combined_imports:
                # Flush combined imports
                for source, symbols in sorted(combined_imports.items()):
                    if symbols:
                        sorted_symbols = sorted(list(symbols))
                        final_lines.append(f"import {{ {', '.join(sorted_symbols)} }} from '{source}';\n")
                combined_imports = {}
            
            if line.strip().startswith('import '):
                # This might be an import without braces or we already finished combining
                final_lines.append(line)
            else:
                if line.strip():
                    import_ended = True
                final_lines.append(line)
                
    if combined_imports:
         for source, symbols in sorted(combined_imports.items()):
            if symbols:
                sorted_symbols = sorted(list(symbols))
                final_lines.append(f"import {{ {', '.join(sorted_symbols)} }} from '{source}';\n")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)

def main():
    root_dir = r'D:\Practice\angular\Projects\angular_training\src\app\features\topics'
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.ts'):
                fix_imports(os.path.join(root, file))

if __name__ == "__main__":
    main()
