alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

alias dbgenerate='poetry run alembic revision --autogenerate -m'
alias dbupgrade='poetry run alembic upgrade head'