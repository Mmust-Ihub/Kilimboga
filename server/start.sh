#! /bin/bash

set -e

exec npm run dev || {
    echo "Failed starting the development server."
    exit 1
}
