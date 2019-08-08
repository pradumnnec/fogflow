docker build . -f discovery/Dockerfile_staged -t fogflow/discovery:1.0 -t fogflow/discovery
docker build . -f broker/Dockerfile_staged -t fogflow/broker:1.0 -t fogflow/broker
docker build . -f broker/Dockerfile4Arm_staged -t fogflow/broker-arm:1.0 -t fogflow/broker-arm
docker build . -f master/Dockerfile_staged -t fogflow/master:1.0 -t fogflow/master
docker build . -f worker/Dockerfile_staged -t fogflow/worker:1.0 -t fogflow/worker
docker build . -f worker/Dockerfile4Arm_staged -t fogflow/worker-arm:1.0 -t fogflow/worker-arm
(cd designer; docker build . -t fogflow/designer:1.0 -t fogflow/designer)

echo "finished generating docker images"