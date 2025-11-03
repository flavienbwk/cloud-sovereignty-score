#!/bin/bash

################################################################################
# EU Cloud Sovereignty Framework Assessment Script
# Version: 2.0 - Refactored with YAML configuration
# Based on: EU Cloud Sovereignty Framework (Version 1.2.1, October 2025)
#
# This script assesses a project against the 8 sovereignty objectives
# and calculates a Cloud Sovereignty Score using the SEAL methodology
################################################################################

set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration file
QUESTIONS_FILE="${QUESTIONS_FILE:-questions.yml}"

# Assessment results
declare -A scores
declare -A answers
total_score=0
max_score=0

# Output file
OUTPUT_FILE="cloud-sovereignty-assessment-$(date +%Y%m%d-%H%M%S).txt"

################################################################################
# YAML Parsing Functions
################################################################################

# Check if yq is installed
check_yq() {
    if ! command -v yq &> /dev/null; then
        echo -e "${RED}Error: 'yq' is not installed.${NC}" >&2
        echo -e "${YELLOW}Please install yq to parse YAML files:${NC}" >&2
        echo "  - Ubuntu/Debian: sudo snap install yq" >&2
        echo "  - macOS: brew install yq" >&2
        echo "  - Or download from: https://github.com/mikefarah/yq" >&2
        exit 1
    fi
}

# Get number of objectives
get_objective_count() {
    yq eval '.objectives | length' "$QUESTIONS_FILE"
}

# Get objective field
get_objective_field() {
    local index=$1
    local field=$2
    yq eval ".objectives[$index].$field" "$QUESTIONS_FILE"
}

# Get number of questions for an objective
get_question_count() {
    local index=$1
    yq eval ".objectives[$index].questions | length" "$QUESTIONS_FILE"
}

# Get question field
get_question_field() {
    local obj_index=$1
    local q_index=$2
    local field=$3
    yq eval ".objectives[$obj_index].questions[$q_index].$field" "$QUESTIONS_FILE"
}

# Get number of options for a question
get_option_count() {
    local obj_index=$1
    local q_index=$2
    yq eval ".objectives[$obj_index].questions[$q_index].options | length" "$QUESTIONS_FILE"
}

# Get option field
get_option_field() {
    local obj_index=$1
    local q_index=$2
    local opt_index=$3
    local field=$4
    yq eval ".objectives[$obj_index].questions[$q_index].options[$opt_index].$field" "$QUESTIONS_FILE"
}

################################################################################
# Helper Functions
################################################################################

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

ask_yes_no() {
    local question="$1"
    local response

    while true; do
        echo -e "${YELLOW}$question${NC}" >&2
        echo "  [Y] Yes" >&2
        echo "  [N] No" >&2
        echo "  [P] Partial/In Progress" >&2
        echo -n "Your answer (Y/N/P): " >&2
        read -r response
        case "${response^^}" in
            Y|YES) echo "yes"; return 0;;
            N|NO) echo "no"; return 0;;
            P|PARTIAL) echo "partial"; return 0;;
            *) echo -e "${RED}Invalid input. Please enter Y, N, or P.${NC}" >&2;;
        esac
    done
}

ask_multiple_choice() {
    local question="$1"
    shift
    local options=("$@")
    local response

    echo -e "${YELLOW}$question${NC}" >&2
    for i in "${!options[@]}"; do
        echo "  [$((i+1))] ${options[$i]}" >&2
    done

    while true; do
        echo -n "Your answer (1-${#options[@]}): " >&2
        read -r response
        if [[ "$response" =~ ^[0-9]+$ ]] && [ "$response" -ge 1 ] && [ "$response" -le "${#options[@]}" ]; then
            echo "$((response-1))"
            return 0
        else
            echo -e "${RED}Invalid input. Please enter a number between 1 and ${#options[@]}.${NC}" >&2
        fi
    done
}

calculate_score() {
    local answer="$1"
    local multiplier="${2:-1}"  # Default multiplier is 1
    local base_score
    case "$answer" in
        yes) base_score=10;;
        partial) base_score=5;;
        no) base_score=0;;
        *) base_score="$answer";;
    esac
    echo "$((base_score * multiplier))"
}

################################################################################
# Dynamic Assessment Function
################################################################################

assess_objective() {
    local obj_index=$1

    # Get objective metadata
    local obj_id=$(get_objective_field "$obj_index" "id")
    local obj_name=$(get_objective_field "$obj_index" "name")
    local obj_code=$(get_objective_field "$obj_index" "code")
    local obj_weight=$(get_objective_field "$obj_index" "weight")
    local obj_max=$(get_objective_field "$obj_index" "max_score")

    print_header "$obj_code: $obj_name ($obj_weight%)"

    local obj_score=0
    local question_count=$(get_question_count "$obj_index")

    # Process each question
    for ((q=0; q<question_count; q++)); do
        echo ""
        local q_id=$(get_question_field "$obj_index" "$q" "id")
        local q_text=$(get_question_field "$obj_index" "$q" "text")
        local q_type=$(get_question_field "$obj_index" "$q" "type")

        if [ "$q_type" == "yes_no" ]; then
            local multiplier=$(get_question_field "$obj_index" "$q" "multiplier")
            local answer=$(ask_yes_no "$q_id: $q_text")
            obj_score=$((obj_score + $(calculate_score "$answer" "$multiplier")))

        elif [ "$q_type" == "multiple_choice" ]; then
            local option_count=$(get_option_count "$obj_index" "$q")
            local options=()

            # Build options array
            for ((opt=0; opt<option_count; opt++)); do
                local label=$(get_option_field "$obj_index" "$q" "$opt" "label")
                options+=("$label")
            done

            # Ask question and get answer
            local answer_idx=$(ask_multiple_choice "$q_id: $q_text" "${options[@]}")
            local score=$(get_option_field "$obj_index" "$q" "$answer_idx" "score")
            obj_score=$((obj_score + score))
        fi
    done

    scores["$obj_id"]=$obj_score
    max_score=$((max_score + obj_max))

    echo ""
    echo -e "${GREEN}$obj_code $obj_name Score: $obj_score/$obj_max ($obj_weight%)${NC}"
    echo ""
}

################################################################################
# Calculate Final Score and SEAL Level
################################################################################

calculate_final_score() {
    print_header "Cloud Sovereignty Assessment Results"

    # Calculate total score
    for objective in "${!scores[@]}"; do
        total_score=$((total_score + scores[$objective]))
    done

    # Calculate percentage
    local percentage=$((total_score * 100 / max_score))

    # Determine SEAL level
    local seal_level
    local seal_description

    if [ $percentage -ge 90 ]; then
        seal_level="SEAL 5 - Maximum Sovereignty"
        seal_description="Highest level of cloud sovereignty compliance"
    elif [ $percentage -ge 75 ]; then
        seal_level="SEAL 4 - High Sovereignty"
        seal_description="Strong sovereignty with minimal dependencies"
    elif [ $percentage -ge 60 ]; then
        seal_level="SEAL 3 - Moderate Sovereignty"
        seal_description="Adequate sovereignty for many use cases"
    elif [ $percentage -ge 40 ]; then
        seal_level="SEAL 2 - Limited Sovereignty"
        seal_description="Basic sovereignty measures in place"
    else
        seal_level="SEAL 1 - Minimal Sovereignty"
        seal_description="Significant sovereignty gaps"
    fi

    # Display results
    echo ""
    echo -e "${CYAN}┌─────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│${NC}  ${YELLOW}CLOUD SOVEREIGNTY SCORE BREAKDOWN${NC}                       ${CYAN}│${NC}"
    echo -e "${CYAN}├─────────────────────────────────────────────────────────────┤${NC}"

    # Display scores for each objective
    local obj_count=$(get_objective_count)
    for ((i=0; i<obj_count; i++)); do
        local obj_id=$(get_objective_field "$i" "id")
        local obj_code=$(get_objective_field "$i" "code")
        local obj_name=$(get_objective_field "$i" "name")
        local obj_weight=$(get_objective_field "$i" "weight")
        local obj_max=$(get_objective_field "$i" "max_score")
        local obj_score=${scores[$obj_id]:-0}

        printf "${CYAN}│${NC}  %-43s %7s ${CYAN}│${NC}\n" "$obj_code $obj_name ($obj_weight%):" "$obj_score/$obj_max"
    done

    echo -e "${CYAN}├─────────────────────────────────────────────────────────────┤${NC}"
    printf "${CYAN}│${NC}  ${GREEN}%-43s %8s${NC} ${CYAN}│${NC}\n" "TOTAL SCORE:" "$total_score/1000"
    printf "${CYAN}│${NC}  ${GREEN}%-43s %7s%%${NC} ${CYAN}│${NC}\n" "PERCENTAGE:" "$percentage"
    echo -e "${CYAN}├─────────────────────────────────────────────────────────────┤${NC}"
    printf "${CYAN}│${NC}  ${YELLOW}%-57s${NC} ${CYAN}│${NC}\n" "$seal_level"
    printf "${CYAN}│${NC}  %-57s ${CYAN}│${NC}\n" "$seal_description"
    echo -e "${CYAN}└─────────────────────────────────────────────────────────────┘${NC}"
    echo ""

    # Provide recommendations
    echo ""
    print_header "Recommendations for Improvement"
    echo ""

    # Dynamic recommendations based on YAML
    for ((i=0; i<obj_count; i++)); do
        local obj_id=$(get_objective_field "$i" "id")
        local obj_code=$(get_objective_field "$i" "code")
        local obj_name=$(get_objective_field "$i" "name")
        local obj_max=$(get_objective_field "$i" "max_score")
        local obj_score=${scores[$obj_id]:-0}
        local threshold=$((obj_max * 75 / 100))

        if [ "$obj_score" -lt "$threshold" ]; then
            echo -e "${YELLOW}• $obj_code $obj_name:${NC} Score is below 75% threshold ($obj_score/$obj_max)"
        fi
    done

    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Assessment complete! Results saved to: $OUTPUT_FILE"
    echo ""
}

################################################################################
# Save Results to File
################################################################################

save_results() {
    {
        echo "EU CLOUD SOVEREIGNTY FRAMEWORK ASSESSMENT"
        echo "=========================================="
        echo ""
        echo "Assessment Date: $(date '+%Y-%m-%d %H:%M:%S')"
        echo "Project: $(basename "$(pwd)")"
        echo ""
        echo "SCORE BREAKDOWN (Based on Official EU Framework Weights)"
        echo "--------------------------------------------------------"

        local obj_count=$(get_objective_count)
        for ((i=0; i<obj_count; i++)); do
            local obj_id=$(get_objective_field "$i" "id")
            local obj_code=$(get_objective_field "$i" "code")
            local obj_name=$(get_objective_field "$i" "name")
            local obj_weight=$(get_objective_field "$i" "weight")
            local obj_max=$(get_objective_field "$i" "max_score")
            local obj_score=${scores[$obj_id]:-0}

            printf "%-45s %s/%s\n" "$obj_code $obj_name ($obj_weight%):" "$obj_score" "$obj_max"
        done

        echo ""
        echo "TOTAL SCORE: $total_score/1000 ($((total_score * 100 / max_score))%)"
        echo ""
        echo "Reference: EU Cloud Sovereignty Framework v1.2.1 (October 2025)"
    } > "$OUTPUT_FILE"
}

################################################################################
# Main Execution
################################################################################

main() {
    clear

    # Check dependencies
    check_yq

    # Check if questions file exists
    if [ ! -f "$QUESTIONS_FILE" ]; then
        echo -e "${RED}Error: Questions file '$QUESTIONS_FILE' not found.${NC}" >&2
        exit 1
    fi

    echo ""
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  ${CYAN}EU CLOUD SOVEREIGNTY FRAMEWORK ASSESSMENT TOOL${NC}          ${BLUE}║${NC}"
    echo -e "${BLUE}╟───────────────────────────────────────────────────────────────╢${NC}"
    echo -e "${BLUE}║${NC}  Version: 2.0 (YAML-based)                                  ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC}  Based on: EU Cloud Sovereignty Framework v1.2.1            ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC}  Date: October 2025                                          ${BLUE}║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "This tool will assess your project against the 8 sovereignty objectives"
    echo "defined by the European Commission's Cloud Sovereignty Framework."
    echo ""
    echo "The assessment will take approximately 10-15 minutes to complete."
    echo ""
    read -p "Press Enter to begin the assessment..."

    # Run all assessments dynamically
    local obj_count=$(get_objective_count)
    for ((i=0; i<obj_count; i++)); do
        assess_objective "$i"
    done

    # Calculate and display final score
    calculate_final_score

    # Save results
    save_results

    echo -e "${GREEN}Thank you for completing the Cloud Sovereignty Assessment!${NC}"
    echo ""
}

# Run main function
main
