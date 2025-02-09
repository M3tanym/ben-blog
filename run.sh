#!/bin/zsh

cleanup() {
  # Kill all child processes of the current script
  kill -- -$$ 2>/dev/null
}

# Set up the trap to call cleanup on EXIT
trap cleanup EXIT

serve -l 8080 &
npm start
