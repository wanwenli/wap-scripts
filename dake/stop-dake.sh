ps ax | grep 'start-dake.sh' | awk '{print $1}' | xargs kill -SIGTERM
