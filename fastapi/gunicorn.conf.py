#
# Gunicorn config file
#

# Server Mechanics
# ========================================
# current directory
chdir = "/home/ubuntu/barifac/fastapi"

# daemon mode
daemon = False


# Server Socket
# ========================================
bind = "0.0.0.0:8000"

# Worker Processes
# ========================================
workers = 4

#  Logging
# ========================================
# access log
accesslog = "access.log"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# gunicorn log
errorlog = "error.log"
loglevel = "info"

worker_class = "uvicorn.workers.UvicornWorker"
