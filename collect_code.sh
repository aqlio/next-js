#!/bin/bash

# Script: collect_code.sh
# Description: Concatenates all code files in the current directory into all_code.txt,
#              excluding files and directories specified in .gitignore and additional exclusions.

# Exit immediately if a command exits with a non-zero status
set -e

# Define the output file
OUTPUT_FILE="all_code.txt"

# Remove existing output file if it exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Initialize the output file
touch "$OUTPUT_FILE"

# Function to check if Git is installed
check_git() {
    if ! command -v git &> /dev/null; then
        echo "Error: Git is not installed. Please install Git to use this script."
        exit 1
    fi
}

# Function to gather files using Git, excluding specific files
gather_files_with_git() {
    # Get all tracked files
    tracked_files=$(git ls-files)

    # Get all untracked files that are not ignored
    untracked_files=$(git ls-files --others --exclude-standard)

    # Combine both lists
    all_files=$(printf "%s\n%s" "$tracked_files" "$untracked_files")

    # Define additional exclusions
    EXCLUDE_ADDITIONAL=("package-lock.json" "favicon.ico")

    # Filter out the additional exclusions
    for exclude in "${EXCLUDE_ADDITIONAL[@]}"; do
        all_files=$(echo "$all_files" | grep -v -F "$exclude")
    done

    echo "$all_files"
}

# Function to gather files without Git (fallback)
gather_files_without_git() {
    # Define default exclusions (add more if needed)
    EXCLUDE_DIRS=("node_modules" ".git" "env" "venv" "build" "dist")
    EXCLUDE_FILES=(
        ".DS_Store"          # macOS specific
        "all_code.txt"      # Output file
        "package-lock.json" # Added exclusion
        "favicon.ico"       # Added exclusion
    )

    # Build the find command with exclusions
    FIND_CMD="find . -type f"

    for dir in "${EXCLUDE_DIRS[@]}"; do
        FIND_CMD+=" ! -path \"./$dir/*\""
    done

    for file in "${EXCLUDE_FILES[@]}"; do
        FIND_CMD+=" ! -name \"$file\""
    done

    # Execute the find command and remove the leading './'
    eval $FIND_CMD | sed 's|^\./||'
}

# Function to check if a file is binary
is_binary() {
    local file="$1"
    if file "$file" | grep -qE 'binary|image|executable'; then
        return 0
    else
        return 1
    fi
}

# Main script execution starts here

# Check if Git is available and the directory is a Git repository
if git rev-parse --is-inside-work-tree &> /dev/null; then
    GIT_AVAILABLE=true
    check_git
    FILE_LIST=$(gather_files_with_git)
else
    GIT_AVAILABLE=false
    echo "Warning: Not inside a Git repository. Using default exclusions."
    FILE_LIST=$(gather_files_without_git)
fi

# Iterate over each file and append its contents to all_code.txt
while IFS= read -r file; do
    # Skip if the file is the output file itself
    if [ "$file" == "$OUTPUT_FILE" ]; then
        continue
    fi

    # Check if the file exists and is a regular file
    if [ -f "$file" ]; then
        # Write the filename as a header
        echo "===== $file =====" >> "$OUTPUT_FILE"

        # Check if the file is binary
        if is_binary "$file"; then
            echo "[Binary file or inaccessible]" >> "$OUTPUT_FILE"
        else
            # Append the file's content
            cat "$file" >> "$OUTPUT_FILE"
        fi

        # Add a separator for readability
        echo -e "\n" >> "$OUTPUT_FILE"
    fi
done <<< "$FILE_LIST"

echo "All code has been concatenated into $OUTPUT_FILE"
